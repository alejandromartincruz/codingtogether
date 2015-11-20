var map;

if ("geolocation" in navigator){
  navigator.geolocation.getCurrentPosition(onLocation, onError);
}

function onLocation(position){

  var myPosition = {
    lat: position.coords.latitude,
    lng: position.coords.longitude
  };

  //var x = document.cookie;
  //reopen(x);

  createMap(myPosition);
  //setupAutocomplete();
}

function onError(err){
  console.log("What are you using, IE 7??", err);
}
/*
function reopen(x){
  positions = x.split("=");
  console.log(positions)
  var pos = [];
  for (var i=1; i<x.length;i=i+2){
      pos.push(x[i]);
  }
  console.log(pos);
}
*/

function createMap(position){
  map = new google.maps.Map($('#map')[0], {
    center: position,
    zoom: 17
  });
  createMarker(position);

}

function createMarker(position, info) {
  var marker = new google.maps.Marker({
   position: position,
   map: map,
   title: info,
   content: info
 });
  var timestamp = Number(new Date());
  //setCookie("marker"+timestamp, position, 1);

}

/*
function setupAutocomplete(){
  var input = $('#get-places')[0];
  var autocomplete = new google.maps.places.Autocomplete(input);
  autocomplete.addListener('place_changed', function(){
    var place = autocomplete.getPlace();
    var infowindow = new google.maps.InfoWindow({
    });
    if (place.geometry.location) {
      map.setCenter(place.geometry.location);
      map.setZoom(17);
      createMarker(place.geometry.location, place.formatted_address);
    } else {
      alert("The place has no location...?")
    }
  });
}

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
