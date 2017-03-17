<?php snippet('header') ?>

  <main class="main contact-main" role="main" data-page="default" >
	
    <header class="wrap">
  
      <div class="intro text">
        <?= $page->intro()->kirbytext() ?>
      </div>       
	  
      <div class="contact-information text">
        <?= $page->text()->kirbytext() ?>
      </div>
	  
	    
    </header>
    
	<?php
	/*
    <div class="wrap wide">
      
      <ul class="contact-options">
        <?php foreach($page->contactoptions()->toStructure() as $item): ?>
          <?php $icon = $page->image($item->icon()); ?>
          <li class="contact-item column">
            <div class="contact-item-content">
              <img src="<?= $icon->url() ?>" width="<?= $icon->width() ?>" alt="<?= $item->title()->html() ?> icon" class="contact-item-icon" />
              <h3 class="contact-item-title"><?= $item->title()->html() ?></h3>
              <p class="contact-item-text">
                <?= $item->text()->html() ?>
              </p>
            </div>
            <p class="contact-item-action">
              <a href="<?= $item->url()->html() ?>" class="contact-action btn"><?= $item->linktext()->html() ?></a>
            </p>
          </li>
        <?php endforeach ?>
      </ul>
    </div>
      */
	?>
    
	
    <div id="map" data-module-init="contact" data-long="<?= $page->map_longitude() ?>" data-lat="<?= $page->map_latitude() ?>" data-zoom="<?= $page->map_zoom() ?>">
    
    </div>
	<?php
	/*
	<script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyC2QGsYctdtgUz0_omARYyiNXmIv50PpXw&callback=initMap"></script>
	<script type="text/javascript">
		var user_lat,user_lng;
		var map;
		function initMap() {
			map = new google.maps.Map(document.getElementById('map'), {
				center: {lat:<?= $page->map_latitude() ?>, lng: <?= $page->map_longitude() ?>},
				zoom: <?= $page->map_zoom() ?>,
				panControl: false,
  			  streetViewControl: false,
  			  mapTypeId: google.maps.MapTypeId.ROADMAP,
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
		});
		var marker = new google.maps.Marker({
			position: {lat:<?= $page->map_latitude() ?>, lng: <?= $page->map_longitude() ?>},
			map: map,
			title: 'Studio H'
		}); 
		}
	</script>
	*/
	?>
  </main>

<?php snippet('footer') ?>