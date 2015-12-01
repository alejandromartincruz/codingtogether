(function() {
	var app = angular.module('eventManager', [/*'uiGmapgoogle-maps','nemLogging'*/]);

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

    $scope.computeShow = function (event, showEvents) {
        if (showEvents === 'upcomming' && moment(event.date).isAfter(moment())) {
            return true;
        } else if (showEvents === 'today' && moment().isSame(event.date, 'day')) {
            return true;
        } else if (showEvents === 'all') {
            return true;
        }

        return false;
    }

  }]);

/*
  	app.directive('eventForm',function(){
  		return{
  			restrict: 'E',
  			templateUrl: 'angularForm.html.erb'
  		};
  	});

    app.config(function (uiGmapGoogleMapApiProvider) {
        uiGmapGoogleMapApiProvider.configure({
            key: 'AIzaSyCjWs8h-6_5cCNsyTKC0H0x85NZ2ZjSq9U&signed_in=true',
            v: '3.17',
            libraries: 'places'
        });
    })
    app.controller("mapController", function ($scope, uiGmapGoogleMapApi) {

        // Define variables for our Map object
        var areaLat = 44.2126995,
            areaLng = -100.2471641,
            areaZoom = 3;

        uiGmapGoogleMapApi.then(function (maps) {
            $scope.map = { center: { latitude: areaLat, longitude: areaLng }, zoom: areaZoom };
            $scope.options = { scrollwheel: false };
        });
      });
*/

})();