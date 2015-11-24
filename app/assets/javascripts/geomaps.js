'use strict'
var map;

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
        path: google.maps.SymbolPath.CIRCLE,
        strokeColor: "blue",
        scale: 6
    },
    label:"Y",
    title: "You are here",
    content:"This is your actual position",
    color: "blue"
  });
};



function createMarker(position, info) {
  //debugger;
  console.log(position);
  console.log(info);
  var marker = new google.maps.Marker({
    position: position,
    map: map,
    animation: google.maps.Animation.DROP,
    label: 'E',
    title: info,
    content: info
  });
  console.log("marker created")
};



  function handleSucess(data){
    //displayCharacters(data);
    data.forEach(function(position_hash) {

      console.log(position_hash);
      var eventPosition = {
        lat: position_hash.latitude,
        lng: position_hash.longitude
      };
      createMarker(eventPosition, position_hash.formatted_addres);
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
