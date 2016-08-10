var petApp = {};
petApp.apiKey = '6e0b64b1d094adcd97940c98d9e86423';
petApp.apiUrl = 'http://api.petfinder.com/pet.find';

petApp.getPet = function (query) {
	$.ajax({
		url: petApp.apiUrl,
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

petApp.displayPet = function(pets){
	console.log(pets);
};

petApp.init = function () {
	petApp.getPet('toronto, ON');
}

$(function() {
	petApp.init();
});

