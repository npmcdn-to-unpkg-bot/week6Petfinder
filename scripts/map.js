// ------------------ defining function called petApp.init
// ------------------ storing action required to start loading map
petApp.initMap = function() {
// ------------------ look for element with id of 'mapid', chain .map method to it, store it in a property inside petApp
	var accessToken = 'pk.eyJ1Ijoiam95OTAxN21hcGJveCIsImEiOiJjaW94M2RneXQwMDJ1d2ZtNXp4a29pbTV4In0.TebEkoRfRP8E0hw_Nd3PFA';
		// Replace 'mapbox.streets' with your map id.
	var mapboxTiles = L.tileLayer('https://api.mapbox.com/v4/mapbox.run-bike-hike/{z}/{x}/{y}@2x.png?access_token=' + accessToken, {
	    attribution: '© <a href="https://www.mapbox.com/map-feedback/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
	});

	petApp.mymap = L.map('mapid').addLayer(mapboxTiles);
	petApp.mymap.scrollWheelZoom.disable();
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
		myPopup.innerHTML = `
			<div data-shelterID="${shelterLocation.id.$t}">
			<div class="clientDog">
			<img src="images/barkingDog.svg" alt="drawing of a barking dog" />
			</div>
			<div class="shelterInfo">
			<h3>${shelterLocation.name["$t"]}</h3>
			<p>${shelterLocation.city["$t"]}, ${shelterLocation.state["$t"]} ${shelterLocation.zip["$t"]}</p>
			<p>${shelterLocation.email.$t}
			</div>
			</div>
		`;
		var latLng = L.latLng(shelterLocation.latitude.$t, shelterLocation.longitude.$t);
// ------------------ use leaflet L.marker() and pass on the L.latLng() to create readable marker elements
		var markerIcon = L.icon ({
			iconUrl: "./images/marker.png",
			iconAnchor: [16, 40],
			popupAnchor:  [0, -33]
		});

		var marker = new L.shelterMarker(latLng, {
			alt: shelterLocation.name.$t, 
			title: shelterLocation.name.$t,
			shelterID: shelterLocation.id.$t,
			icon: markerIcon
		})
		console.log(marker)
		marker.bindPopup(myPopup);
		// console.log("mypopup", marker);
		myPopup.addEventListener("click",  function() {
			$('.flickity-container').empty().removeClass("hide");
			$('.closeFlickity').removeClass("hide");
			var popupDivID = $(this).children()[0].dataset.shelterid;
			petApp.shelterWithPets.forEach(function(shelter){
				if ($.isEmptyObject(shelter.finalpet3)){
					shelter.pet.forEach(function(pup){
						if(pup.shelterId.$t === popupDivID) {
							$(".flickity-container").append(`
								<div class="carouselElem">
									<div class="pupHead">
										<h3 class="carousel-subtitle">${shelter.city.$t}</h3>
										<h3 class="carousel-title">${shelter.name.$t}</h3>
									</div>
									<div class="pupPic">
										<img src="${pup.media.photos.photo[2].$t}" alt="picture of ${pup.name.$t}" />
									</div>
									<div class="pupInfo">
										<h3 class="carousel-title">${pup.name.$t}</h3>
										<p>Age: ${pup.age.$t}</p>
										<p>Size: ${pup.size.$t}</p>
										<p>Gender: ${pup.sex.$t}</p>
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
									<div class="pupHead">
										<h3>${shelter.city.$t}</h3>
										<h3>${shelter.name.$t}</h3>
									</div>
									<div class="pupPic">
										<img src="${pup.media.photos.photo[2].$t}" alt="picture of ${pup.name.$t}" />
									</div>
									<div class="pupInfo">
										<h3>${pup.name.$t}</h3>
										<p>Age: ${pup.age.$t}</p>
										<p>Size: ${pup.size.$t}</p>
										<p>Gender: ${pup.sex.$t}</p>
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
				$(this).addClass("hide");
			})
			$(".flickity-container").flickity({ "imagesLoaded": true, "pageDots": false });
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