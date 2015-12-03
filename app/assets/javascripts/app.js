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
            $(".void-input").val('');
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

    var access_token = "345565214.1677ed0.99162ff841f44dea86279962a74ead89"
    $scope.access_parameters = {
        access_token: access_token
    };

    $scope.instagramTags = function(tags){
      $('.pictures').empty();
      tags.forEach(function(tag) {
        grabImages(tag.name, 9, $scope.access_parameters);
      });
    }

    function grabImages(tag, count, access_parameters) {
      var instagramUrl = 'https://api.instagram.com/v1/tags/' + tag + '/media/recent?callback=?&count=' + count;
      $.getJSON(instagramUrl, access_parameters, onDataLoaded);
    }

    function onDataLoaded(instagram_data) {
      var target = $(".pictures");
      //console.log(instagram_data);
      if (instagram_data.meta.code == 200) {
          var photos = instagram_data.data;
          //console.log(photos);
          if (photos.length > 0) {
              //target.empty();
              for (var key in photos) {
                  var photo = photos[key];
                  target.append('<a href="' + photo.link + '"><img class="thumbnail" src="' + photo.images.thumbnail.url + '"></a>')
              }
          } else {
              target.html("nothing found");
          }
      } else {
          var error = instagram_data.meta.error_message;
          target.html(error);
      }
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