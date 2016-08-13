// ------------------ defining function called petApp.init
// ------------------ storing action required to start loading map
petApp.initMap = function() {
// ------------------ look for element with id of 'mapid', chain .map method to it, store it in a property inside petApp
	petApp.mymap = L.map('mapid');
// ------------------ grabbing tileLay from mapBox
	L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
	    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
	    maxZoom: 18,
	    id: 'joy9017mapbox.11h51ekk',
	    accessToken: 'pk.eyJ1Ijoiam95OTAxN21hcGJveCIsImEiOiJjaW94M2RneXQwMDJ1d2ZtNXp4a29pbTV4In0.TebEkoRfRP8E0hw_Nd3PFA'
// ------------------ add tilelayer to petApp.mymap to be ready to initiate map
	}).addTo(petApp.mymap);
};// /.initMap()

// ------------------ defining function to use to display shelters
petApp.displayShelter = function(shelters){
// ------------------ first fade in the form, aka all the checkboxes
	$('.secondForm').fadeIn();
// ------------------ create empty array to store makers
	L.shelterMarker = L.Marker.extend ({
		options: {
			shelterID: null
		},
		getShelterID: function() {
			return this.options.shelterID;
		}
	});
	var markers = [];
// ------------------ loop through the array to pass on as parameter, aka to-be-displayed-shelters
	shelters.forEach(function(shelterLocation){
// ------------------ use leaflet L.latLng to create readable latitude and longtitide, and store in variable.
		var myPopup = L.DomUtil.create('div', 'infoWindow');
		myPopup.innerHTML = `<div data-shelterID="${shelterLocation.id.$t}"><p>${shelterLocation.name["$t"]}</p></div>`;
		var latLng = L.latLng(shelterLocation.latitude.$t, shelterLocation.longitude.$t);
// ------------------ use leaflet L.marker() and pass on the L.latLng() to create readable marker elements
		// var marker = L.marker(latLng, {
		// 	alt: shelterLocation.name.$t, 
		// 	title: shelterLocation.name.$t
		// })
		var marker = new L.shelterMarker(latLng, {
			alt: shelterLocation.name.$t, 
			title: shelterLocation.name.$t,
			shelterID: shelterLocation.id.$t
		})
		marker.bindPopup(myPopup);
		petApp.mymap.on("popupopen", function (e) {
		
		});1
		// console.log("mypopup", marker);
		myPopup.addEventListener("click",  function() {
			$('.flickity-container').empty().removeClass("hide");

			var popupDivID = $(this).children()[0].dataset.shelterid;
			petApp.shelterWithPets.forEach(function(shelter){
				if ($.isEmptyObject(shelter.finalpet3)){
					shelter.pet.forEach(function(pup){
						if(pup.shelterId.$t === popupDivID) {
							$(".flickity-container").append(`
								<div class="carouselElem">
									<div class="pupPic">
										<img src="${pup.media.photos.photo[0].$t}" alt="picture of ${pup.name.$t}" />
									</div>
									<div class="pupInfo">
										<h3>${pup.name.$t}</h3>
										<p>${pup.description.$t}</p>
									</div>
								</div>
							`)
						}
					}) //.forEach()
				} else {
					shelter.finalpet3.forEach(function(pup){
						if(pup.shelterId.$t === popupDivID) {
							$(".flickity-container").append(`
								<div class="carouselElem">
									<div class="pupPic">
										<img src="${pup.media.photos.photo[0].$t}" alt="picture of ${pup.name.$t}" />
									</div>
									<div class="pupInfo">
										<h3>${pup.name.$t}</h3>
										<p>${pup.description.$t}</p>
									</div>
								</div>
							`)
						} //if
					}) //.forEach()
				} // else
			}); // .forEach()
			$(".closeFlickity").on('click', function(){
				$(".flickity-container").flickity("destroy");
				$(".flickity-container").addClass("hide");
				
			})
			$(".flickity-container").flickity({ "imagesLoaded": true });
		});//.addEventListener
// ------------------ bind a pop to each marker, put content in popup box
		
// ------------------ push all created markers into the empty array created before
		markers.push(marker);
	}); // /.shelter.forEach()

// ------------------ use leaflet's L.featureGroup() to store all markers, and store the method as a property inside petApp
	petApp.markerGroup = L.featureGroup(markers);
// ------------------ use leaflet's .findBounds() to get the square that contains all markers center the map at the center of all markers
	petApp.mymap.fitBounds(petApp.markerGroup.getBounds());
// ------------------ display all markers on the map
	petApp.markerGroup.addTo(petApp.mymap);
};// /petApp.displayShelter()

//-------------------defines the onClick event
