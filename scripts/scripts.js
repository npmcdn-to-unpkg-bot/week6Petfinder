var petApp = {};
	petApp.apiKey = '6e0b64b1d094adcd97940c98d9e86423';
	petApp.apiUrlPup = 'http://api.petfinder.com/pet.find';
	petApp.apiUrlShelter = 'http://api.petfinder.com/shelter.find'

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
			}
	});
};

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
			}
	});
};

petApp.init = function () {
	// console.log(locationInput);
	$('.searchForm').on('submit', function(e) {
	    e.preventDefault(); // default action is refreshing the page, we don't want thats
	    petApp.locationInput = $('input[name=location]').val();
	    $('input[name=location]').val('');
	    console.log(petApp.locationInput);
	    // getting lat lng of user location
		$.when(petApp.getPet(petApp.locationInput), petApp.getShelter( petApp.locationInput)) 

			.done(function(gotPet, gotShelter){
				var pets = gotPet[0].petfinder.pets.pet;
				var shelters = gotShelter[0].petfinder.shelters.shelter;
				// console.log(shelters)

				shelters.forEach(function(shelterObj) {
					var filteredPets = pets.filter(function(petObj) {
						return petObj.shelterId.$t === shelterObj.id.$t
					});
					shelterObj.pet = filteredPets;//this takes each objects out of our shelters array, creats a property called pet, whichs stores out filtered puppies
				});
				petApp.shelterWithPets = shelters.filter(function(shelterObj){
					return shelterObj.pet.length > 0
				});
				//go through the shelters and look at the pets
				//if the pets array is not empty, return that shelter object into a variable
				//variable called shelter with pets.
				// petApp.events(); come back to this to listen for on.change events
				// petApp.initMap();

				// once the second form i
				if (petApp.mymap === undefined) {
					petApp.initMap();
				} 				
				petApp.displayPet(petApp.shelterWithPets);
				// console.log(petApp.shelterWithPets)



			}) //done
			.fail(function(err1, err2) {
				console.log(err1, err2)
			}); //fail
	});

	$('.secondForm').on('submit', function(e) {
		e.preventDefault();
		// console.log($("input[type=checkbox]:checked").val())
		var checkedInputs = $('input[type=checkbox]:checked');
		var checkedValues = checkedInputs.map(function(index, input) {
			return $(input).val();
		}).toArray();
		console.log(checkedValues);
		// go through the checkedvalues array 
		// gainn access to each value 
		// console.log(petApp.shelterWithPets);
		// for (var i = 0; i < checkedValues.length; i ++){
			// go to our filteredPets thingy 
			// get pets' age 
			// filter out pets whose age match any checked values 


			petApp.shelterWithPets.forEach(function(shelter){
				var filteredPets = checkedValues.map(function(criteria){
					return shelter.pet.filter(function(pet){
						return pet.age.$t === criteria;
					});
				});
				console.log(filteredPets);
			});		
			// var checkedPups = petApp.shelterWithPets.filter(function(shelter) {
			// 	var dogs = shelter.pet.forEach(function(pup){
			// 		var filteredValues = checkedValues.map(function(criteria){
			// 			return 
			// 		});
			// });

				// console.log(dogs)
			// });

		// };




	});
}; //end of init function


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

// use a foreach loop to find pets and shelters

// use a filter method to filter out pets that share the id we want 
