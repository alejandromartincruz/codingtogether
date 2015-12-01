'use strict'
var map;
var markers = [];
var oms;

if ("geolocation" in navigator){
  navigator.geolocation.getCurrentPosition(onLocation, onError);
}

function onLocation(position){

  var myPosition = {
    lat: position.coords.latitude,
    lng: position.coords.longitude
  };

  createMap(myPosition);
  setupAutocomplete();
}

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
    color: "blue"
  });
};



function createMarker(position, position_hash) {
  //debugger;
  console.log(position);
  console.log(position_hash.title);
  console.log(position_hash.description);

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

  var infowindow = new google.maps.InfoWindow({
    content: contentString
  });

  if (moment(position_hash.date).isAfter(moment())) {

    var marker = new google.maps.Marker({
      position: position,
      map: map,
      icon: "https://cdn1.iconfinder.com/data/icons/Map-Markers-Icons-Demo-PNG/48/Map-Marker-Marker-Inside-Azure.png",
      animation: google.maps.Animation.DROP,
      title: position_hash.title,
    });

    marker.addListener('click', function() {
      infowindow.open(map, marker);
    });

    console.log("marker created");
    markers.push(marker);
    console.log(markers)
  };
};



  function handleSucess(data){
    //displayCharacters(data);
    data.forEach(function(position_hash) {

      console.log(position_hash);
      var eventPosition = {
        lat: position_hash.latitude,
        lng: position_hash.longitude
      };
      createMarker(eventPosition, position_hash);
    });
  }

  function handleError(jqXHR, status, errorThrown){
    alert("Something bad happened: "
      + status + ', ' + errorThrown);
  }


function setupAutocomplete(){
  var input = $('#location-placheholder')[0];
  var autocomplete = new google.maps.places.Autocomplete(input);
  autocomplete.addListener('place_changed', function(){
    var place = autocomplete.getPlace();
    var infowindow = new google.maps.InfoWindow({
    });
    if (place.geometry.location) {
      $("#location-longitude").val(place.geometry.location.lng().toFixed(7));
      $("#location-longitude").trigger('input');
      $("#location-latitude").val(place.geometry.location.lat().toFixed(7));
      $("#location-latitude").trigger('input');
      $(".filling").val(place.formatted_address);
      $(".filling").trigger('input');
      map.setCenter(place.geometry.location);
      createMarker(place.geometry.location, place.formatted_address);
    } else {
      alert("The place has no location...?")
    }
  });
};