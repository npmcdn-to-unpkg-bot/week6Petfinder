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
	var markers = [];
// ------------------ loop through the array to pass on as parameter, aka to-be-displayed-shelters
	shelters.forEach(function(shelterLocation){
// ------------------ use leaflet L.latLng to create readable latitude and longtitide, and store in variable.
		var latLng = L.latLng(shelterLocation.latitude.$t, shelterLocation.longitude.$t);
// ------------------ use leaflet L.marker() and pass on the L.latLng() to create readable marker elements
		var marker = L.marker(latLng, {
			alt: shelterLocation.name.$t, 
			title: shelterLocation.name.$t
		}).bindPopup(
// ------------------ bind a pop to each marker, put content in popup box
			`<div><p>${shelterLocation.name.$t}</p></div>`
		);// /.bindPopup()
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


