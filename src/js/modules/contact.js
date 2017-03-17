var settings = require( "modules/settings" ),
	GoogleMapsLoader = require('google-maps'); 

module.exports = function( el ) {
	var $el = $( el ),
	$window = $( window )
		
	init();
	
	function init(){
		
	}
	
	var options = {
				center: {lat:Number( $el.data('lat') ), lng: Number( $el.data('long')) },
				zoom: 17,
  			  	streetViewControl: false,
  			  	mapTypeId: 'terrain',
				disableDefaultUI: true,   //disables controls
				styles: [
	            {elementType: 'geometry', stylers: [{color: '#D3D1CA'}]},
	            {elementType: 'labels.text.stroke', stylers: [{color: 'transparent'}]},
	            {elementType: 'labels.text.fill', stylers: [{color: '#000000'}]},
	            {
	              featureType: 'administrative.locality',
	              elementType: 'labels.text.fill',
	              stylers: [{color: '#000000'}]
	            },
	            {
	              featureType: 'poi',
	              elementType: 'labels.text.fill',
	              stylers: [{color: '#000000'}]
	            },
	            {
	              featureType: 'poi.park',
	              elementType: 'geometry',
	              stylers: [{color: '#C2E6C0'}]
	            },
	            {
	              featureType: 'poi.park',
	              elementType: 'labels.text.fill',
	              stylers: [{color: '#000000'}]
	            },
	            {
	              featureType: 'road',
	              elementType: 'geometry',
	              stylers: [{color: '#EBE9E1'}]
	            },
	            {
	              featureType: 'road',
	              elementType: 'geometry.stroke',
	              stylers: [{color: '#D3D1CA'}]
	            },
	            {
	              featureType: 'road',
	              elementType: 'labels.text.fill',
	              stylers: [{color: '#000000'}]
	            },
	            {
	              featureType: 'road.highway',
	              elementType: 'geometry',
	              stylers: [{color: '#EBE9E1'}]
	            },
	            {
	              featureType: 'road.highway',
	              elementType: 'geometry.stroke',
	              stylers: [{color: '#EBE9E1'}]
	            },
	            {
	              featureType: 'road.highway',
	              elementType: 'labels.text.fill',
	              stylers: [{color: '#000000'}]
	            },
	            {
	              featureType: 'transit',
	              elementType: 'geometry',
	              stylers: [{color: '#AAA8A1'}]
	            },
	            {
	              featureType: 'transit.station',
	              elementType: 'labels.text.fill',
	              stylers: [{color: '#d59563'}]
	            },
	            {
	              featureType: 'water',
	              elementType: 'geometry',
	              stylers: [{color: '#B6D0E0'}]
	            },
	            {
	              featureType: 'water',
	              elementType: 'labels.text.fill',
	              stylers: [{color: '#000000'}]
	            },
	            {
	              featureType: 'water',
	              elementType: 'labels.text.stroke',
	              stylers: [{color: '#EBE9E1'}]
	            }
	          ]
		};
	
	
	
	GoogleMapsLoader.KEY = 'AIzaSyC2QGsYctdtgUz0_omARYyiNXmIv50PpXw';
	GoogleMapsLoader.LANGUAGE = 'en';
	GoogleMapsLoader.load(function(google) {
		console.log('loadeed')
		
	    var map = new google.maps.Map(el, options);
		var marker_options = { position: {lat:Number( $el.data('lat')), lng: Number( $el.data('long')) }, map: map, title: 'Studio H' };
		var marker = new google.maps.Marker(marker_options); 
	});
};
  