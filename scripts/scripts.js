// -------------- creating empty object and properties to use in Ajax  call -------------- 
var petApp = {};
	petApp.apiKey = '6e0b64b1d094adcd97940c98d9e86423';
	petApp.apiUrlPup = 'http://api.petfinder.com/pet.find';
	petApp.apiUrlShelter = 'http://api.petfinder.com/shelter.find'

// --------------- making ajax call for pet data -------------- 
petApp.getPet = function (query) {
	return $.ajax({
			url: petApp.apiUrlPup,
			method: 'GET',
			dataType: 'JSONP',
			data: {
				key: petApp.apiKey,
				location: query,
				format: 'json',
				animal: "dog",
				count: 100
			} // /data
	});// /$.ajax
};// /.getPet
// ---------------- making ajax call for shelter data -------------- 
petApp.getShelter = function (query) {
	return $.ajax({
			url: petApp.apiUrlShelter,
			method: 'GET',
			dataType: 'JSONP',
			data: {
				key: petApp.apiKey,
				location: query,
				format: 'json',
				count: 100
			} // /data
	});// /$.ajax
};// /.getShelter
// ------------------ initiating App -------------- 
petApp.init = function () {
// ------------------ when form is submitted-------------- 
	$('.searchForm').on('submit', function(e) {
// ------------------ prevent default form page refreshing action-------------- 
	    e.preventDefault(); 
// ------------------ grab the user's locaiton input value-------------- 
	    petApp.locationInput = $('input[name=location]').val();
// ------------------ clearing the input field when user has entered a location-------------- 
	    $('input[name=location]').val('');
// ------------------ pass on the location as the API's location search query-------------- 
		$.when(petApp.getPet(petApp.locationInput), petApp.getShelter( petApp.locationInput)) 
// ------------------ when the app's data is returned to us -------------- 
			.done(function(gotPet, gotShelter){
// ------------------ grab the pet array from pet data and store it in a new variable-------------- 
				var pets = gotPet[0].petfinder.pets.pet;
// ------------------ grab the shelter array from shelter data and store it in a new variable-------------- 
				var shelters = gotShelter[0].petfinder.shelters.shelter;
// ------------------ looping through shelter array-------------- 
				//put this into it's own function - RANJAN
				shelters.forEach(function(shelterObj) {
// ------------------ inside the loop, look for a match between shelters and pets-------------- 
// ------------------ store the result in a shelter as the key to a new pet property-------------- 
					shelterObj.pet = pets.filter(function(petObj) {
						return petObj.shelterId.$t === shelterObj.id.$t
					});// /.filter
// ------------------ creating a new property inside petApp, return all the shelters that have pets
				});// forEach-------------- 
				petApp.shelterWithPets = shelters.filter(function(shelterObj){
					return shelterObj.pet.length > 0
				});// /.filter
// ------------------ if no map, start map. this statement hides map when page first loads-------------- 
				if (petApp.mymap === undefined) {
					petApp.initMap();
				} // if
// ------------------ calling function to display shelter, pass query to only display shelter that have pets. 
// --------------  In map.js, we grab those shelter's longtitude and latitude and assign them to makers	-------------- 	
				petApp.displayShelter(petApp.shelterWithPets);
			}) //.done
			.fail(function(err1, err2) {
				alert('No Puppies for you :/')
			}); //.fail
	}); // form on submit
// ------------------ defining eventlistener, when the status of checkboxes change-------------- 
	$('input[type=checkbox]').on('change', function () {
// ------------------ storing checkedboxes in a variable -------------- 
// --------------  grabbing their values and turn those values into an array-------------- 
		var checkedInputs = $('input[type=checkbox]:checked');
		var checkedValues = checkedInputs.map(function(index, input) {
			return $(input).val();
		}).toArray();
// ------------------ remove previous layer of markers. create a new layer based on checked boxes-------------- 
			petApp.mymap.removeLayer(petApp.markerGroup);
// ------------------ reiterate previously filtered shelters-------------- 
			var newShelter = petApp.shelterWithPets.map(function(shelter){
// ------------------ reiterate checked values-------------- 
				var filteredPets = checkedValues.map(function(criteria){
// ------------------ reiterate previous pet array inside each shelter object-------------- 
					return shelter.pet.filter(function(pet){
// ------------------ look for property values inside each pet according to the criteria provded-------------- 
						return pet.age.$t === criteria;
					}); // /.filter
				});// /.map
// ------------------ pets filtered according to criteria, generate a new multidimensional array-------------- 
// ------------------ flatten said array into a new one dimensional array -------------- 
// -------------- store them as new property in each shelter object  -------------- 
//--------------  leaving the proviously location-filtered pet array untouched -------------- 
				shelter.finalpet = flattenedPets = $.map(filteredPets, function(n){
					return n;
				});// /$.map, a flatten method
// ------------------ return a result of all shelters, store it in a variable creatied before -------------- 
// --------------  newShelter. we use this array of shelters to decide which marker goes on the map-------------- 
				return shelter;
// ------------------ filter out shelters that don't have pets that match the user's criteria-------------- 
			}).filter(function(shelter){
				return shelter.finalpet.length > 0;
			});	// /.filter
// ------------------ pass newly filtered shelter that have dogs that match user's criteria -------------- 
// --------------  display those shelters on a map. -------------- 
			petApp.displayShelter(newShelter);
	}); // /.$('input[type=checkbox]').on('change',....)

}; // /.petApp.init()
// ------------------ when document is ready, aka when page is loaded, start running petApp.-------------- 
$(function() {
	petApp.init();
}); // /.documentReady
