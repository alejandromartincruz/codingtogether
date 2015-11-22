(function() {
	var app = angular.module('eventManager', []);

	app.controller('eventController', ['$http', function($http){
    	var events = {title: "hola", description: "this is an event"};
  			var store = this;
  			store.events = [];

  			$http.get('/events.json').success(function(data){
  				store.events = data;
  			});
  	}]);

})();