(function() {
	var app = angular.module('eventManager', []);

	app.controller('eventController', ['$http', function($http){
  			var store = this;
  			store.events = [];

  			$http.get('/events.json').success(function(data){
  				store.events = data;
  			});

  			$('#submit-event-button').click(function() {
	    		$http.get('/events.json').success(function(data){
  					store.events = data;
  				});
			});
  	}]);

  	app.controller('newEventController', ['$http', function($http){
  		var store = this;
      
  		this.addEvent = function(event) {
        
  			$http.post('/events.json', store).success(function(){
  				$( ".events-left-bar" ).toggle();
          store.event={}
  			});
  			
  		};
  		
  	}]);

  	app.directive('eventForm',function(){
  		return{
  			restrict: 'E',
  			templateUrl: 'angularForm.html.erb'
  		};
  	});

})();