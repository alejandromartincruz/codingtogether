jQuery(document).ready(function(){
     
	$( "#button" ).click(function() {
	    $( ".events-right-bar" ).toggle();
	});

	$( "#new-event-button" ).click(function() {
	    $( ".events-left-bar" ).toggle();
	});

 });