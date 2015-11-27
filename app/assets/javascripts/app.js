(function() {
	var app = angular.module('eventManager', []);

	app.controller('eventController', ['$rootScope', '$scope', '$http', function($rootScope, $scope, $http){

        var store = this;

  			$http.get('/events.json').success(function(data){
  				$scope.events = data;
  			});

        $scope.clear = function(){
          event = {};
        }
        $scope.index = 0;

        this.addEvent = function(event) {
        
          $http.post('/events.json', store).success(function(){
            $( ".events-left-bar" ).toggle();
            store.event={};
            $http.get('/events.json').success(function(data){
              $scope.events = data;
          });  
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