var petApp = {};
petApp.apiKey = '6e0b64b1d094adcd97940c98d9e86423';
petApp.apiUrlPup = 'http://api.petfinder.com/pet.find';
petApp.apiUrlShelter = 'http://api.petfinder.com/shelter.get'

petApp.getPet = function (query) {
	$.ajax({
		url: petApp.apiUrlPup,
		method: 'GET',
		dataType: 'JSONP',
		data: {
			key: petApp.apiKey,
			location: query,
			format: 'json',
			animal: "dog",
			count: 100
		}
	})
	.then(function(e) {
		console.log(e);
		petApp.displayPet(e);
	});
};

petApp.getShelter = function (query) {
	$.ajax({
		url: petApp.apiUrlShelter,
		method: 'GET',
		dataType: 'JSONP',
		data: {
			key: petApp.apiKey,
			location: query,
			format: 'json',
			count: 100
		}
	})
	.then(function(e) {
		console.log("shelter call", e);
		petApp.displayPet(e);
	});
};

petApp.displayPet = function(pets){
	console.log(pets);
};

petApp.init = function () {
	petApp.getPet('toronto, ON');
	petApp.getShelter("toronto, on")
}

$(function() {
	petApp.init();
});


// get data about puppies

// once page is loaded, do ajax call

// give the user an option to geoloate or put in location (postalcode/city, province)

// filter out user's puppies based on form input value

// take array of dogs's shelter id value

// take array of shelter's shelter id value 

// check dogs' shelter id value against array of shelter's shelter id value 

// group dogs with the same shelter id

//if the dog's shelter id matches shelter's shelter id, push into a= 

// take matched shelter's location (lat; lng)

// map out shelters
