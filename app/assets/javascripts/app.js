(function() {
	var app = angular.module('eventManager', []);

	app.controller('eventController', ['$rootScope', '$scope', '$http', function($rootScope, $scope, $http){

        var store = this;
        $scope.loadData = function () {
  			$http.get('/events.json').success(function(data){
  				$rootScope.events = data;
  			});
        };

        $scope.loadData();

        $scope.clear = function(){
          event = {};
        }
        $scope.index = 0;

        this.addEvent = function(event) {
          $http.post('/events.json', store).success(function(){
            //$scope.loadData();
            $rootScope.events.push(store.event);
            $( ".events-left-bar" ).toggle();
            store.event={};
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