(function() {
	var app = angular.module('eventManager', []);

	app.controller('eventController', ['$rootScope', '$scope', '$http', function($rootScope, $scope, $http){
  			var store = this;
  			store.events = [];

  			$http.get('/events.json').success(function(data){
  				$scope.events = data;
  			});


        this.addEvent = function(event) {
        
          $http.post('/events.json', store).success(function(){
            $( ".events-left-bar" ).toggle();
            store.event={};
            $http.get('/events.json').success(function(data){
            store.events = data;
          });  
        });
          

  	}]);

  	app.directive('eventForm',function(){
  		return{
  			restrict: 'E',
  			templateUrl: 'angularForm.html.erb'
  		};
  	});

})();