'use strict'
  var map;
  var oms;

  //Create info window (need only one)   
  var infowindow = new google.maps.InfoWindow(); 

  if ("geolocation" in navigator){
    navigator.geolocation.getCurrentPosition(onLocation, onError);
  }

  function onLocation(position){

    var myPosition = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    };

    createMap(myPosition);
    oms = new OverlappingMarkerSpiderfier(map);
    // listeners need to be registered only once
    oms.addListener('click', function(marker, event) {
      infowindow.setContent(marker.description);
      infowindow.open(map, marker);
    });

    oms.addListener('spiderfy', function(markers) {
      for(var i = 0; i < markers.length; i++) {
        markers[i].setShadow(null);
      } 
      infowindow.close();
    });

    setupAutocomplete();
  }

  function createMap(position){
    map = new google.maps.Map($('#map')[0], {
      center: position,
      zoom: 15,
    });
    yourPosition(position);

    $( document ).ready(function() {
      $.ajax({
        url:"http://localhost:3000/events.json",
        dataType: "json",
        success: handleSucess,
        error: handleError
      });
    });
  }

    function handleSucess(data){
      data.forEach(function(position_hash) {
        if (moment(position_hash.date).isAfter(moment())) {
          handleItem(position_hash);
        };
      });
    };

    function handleItem(position_hash){
      //Info window content 
      var contentString = '<div id="content">'+
                          '<div id="siteNotice">'+
                          '</div>'+
                          '<h1 id="firstHeading" class="firstHeading">'+position_hash.title+'</h1>'+
                          '<div id="bodyContent">'+
                          '<p>'+position_hash.description+'</p>'+
                          '<p>'+ position_hash.date +'</p>'+
                          '<p>'+ position_hash.formatted_addres +'</p>'
                          '</div>'+
                          '</div>';

      var img = 'http://www.google.com/mapfiles/marker.png';
      var myLatLng = new google.maps.LatLng(position_hash.latitude, position_hash.longitude);
      var marker = new google.maps.Marker({
          position: myLatLng,
          map: map,
          icon: "https://cdn1.iconfinder.com/data/icons/Map-Markers-Icons-Demo-PNG/48/Map-Marker-Marker-Inside-Azure.png"
          });

      marker.description = contentString;

      oms.addMarker(marker);

    };


  function onError(err){
    console.log("What browser are you using? IE 7??", err);
  }

  function createMap(position){
    map = new google.maps.Map($('#map')[0], {
      center: position,
      zoom: 15,
    });
    yourPosition(position);

    $( document ).ready(function() {
      $.ajax({
        url:"http://localhost:3000/events.json",
        dataType: "json",
        success: handleSucess,
        error: handleError
      });
    });
  }

  function yourPosition(position){

    var marker = new google.maps.Marker({
      position: position,
      animation: google.maps.Animation.DROP,
      map: map,
      icon: {
      url: 'assets/your_pos.png',
      scaledSize: new google.maps.Size(60, 60), // scaled size
      origin: new google.maps.Point(0,0), // origin
      anchor: new google.maps.Point(0, 0) // anchor
      },          
      title: "You are here",
    });
  };

    function handleError(jqXHR, status, errorThrown){
      alert("Something bad happened: "
        + status + ', ' + errorThrown);
    }


  function setupAutocomplete(){
    var input = $('#location-placheholder')[0];
    var autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.addListener('place_changed', function(){
      var place = autocomplete.getPlace();
      if (place.geometry.location) {
        $("#location-longitude").val(place.geometry.location.lng().toFixed(7));
        $("#location-longitude").trigger('input');
        $("#location-latitude").val(place.geometry.location.lat().toFixed(7));
        $("#location-latitude").trigger('input');
        $(".filling").val(place.formatted_address);
        $(".filling").trigger('input');
        map.setCenter(place.geometry.location);
        //createMarker(place.geometry.location, place.formatted_address);
      } else {
        alert("The place has no location...?")
      }
    });
  };