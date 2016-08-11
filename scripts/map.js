petApp.initMap = function() {
	petApp.mymap = L.map('mapid')//.setView([43.6532, -79.3832], 13); // lan&lng now is toronto; will change to query to match user's input;
	L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
	    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
	    maxZoom: 18,
	    id: 'joy9017mapbox.11h51ekk',
	    accessToken: 'pk.eyJ1Ijoiam95OTAxN21hcGJveCIsImEiOiJjaW94M2RneXQwMDJ1d2ZtNXp4a29pbTV4In0.TebEkoRfRP8E0hw_Nd3PFA'
	}).addTo(petApp.mymap);
};

petApp.displayPet = function(pets){
	$('.secondForm').fadeIn();
	var markers = [];
	petApp.shelterWithPets.forEach(function(shelterLocation){
		// console.log(shelterLocation);
		var latLng = L.latLng(shelterLocation.latitude.$t, shelterLocation.longitude.$t);
		var marker = L.marker(latLng, {
			alt: shelterLocation.name.$t, 
			title: shelterLocation.name.$t
		}).bindPopup(
			`<div><p>${shelterLocation.name.$t}</p></div>`
		);
		markers.push(marker);
	}); //end of for each loop
	var markerGroup = L.featureGroup(markers);

	console.log('markerGroup', markerGroup)//.getBounds())

	petApp.mymap.fitBounds(markerGroup.getBounds());
	markerGroup.addTo(petApp.mymap);
};


