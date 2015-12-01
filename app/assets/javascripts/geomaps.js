'use strict'
var map;
var markers = []
var oms

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

oms = new OverlappingMarkerSpiderfier(map);
var iw = new gm.InfoWindow();
oms.addListener('click', function(marker, event) {
  iw.setContent(marker.desc);
  iw.open(map, marker);
});

for (var i = 0; i < window.mapData.length; i ++) {
  var datum = window.mapData[i];
  var loc = new gm.LatLng(datum.lat, datum.lon);
  var marker = new gm.Marker({
    position: loc,
    title: datum.h,
    map: map
  });
  marker.desc = datum.d;
  oms.addMarker(marker);  // <-- here
}

function createMarker(position, position_hash) {
  //debugger;
  console.log(position);
  console.log(position_hash.title);
  console.log(position_hash.description);

  function postionExist(latitude, longitude){
    markers.forEach(function(marker) {
        console.log(marker.position.lat.function() == latitude)
    });
  }

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
      $("location-placeholder").val(place.formatted_address);
      $("location-placeholder").trigger('input');
      map.setCenter(place.geometry.location);
      createMarker(place.geometry.location, place.formatted_address);
    } else {
      alert("The place has no location...?")
    }
  });
}



/*
//-------------------- cookies time... does it work?

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
    }
    return "";
}
*/
