<?php snippet('header') ?>

  <main class="main main-<?= $page->uri() ?>" role="main" data-page="default">

    <header class="wrap">
      <div class="intro text">

		
      </div>
    </header>
	
    <div class="wrap wide">
      
      <ul class="client-list">
		<?php $total = count($page->clients()->toStructure());  ?>
        <?php foreach($page->clients()->toStructure()->limit($total/2) as $item): ?>
         
          <li class="contact-item column">
            <div class="contact-item-content">
              <p class="contact-item-title"><?= $item->title()->html() ?></p>
            </div>
          </li>
        <?php endforeach ?>
      </ul>
	  
      <ul class="client-list">
		<?php $total = count($page->clients()->toStructure());  ?>
        <?php foreach($page->clients()->toStructure()->offset($total/2) as $item): ?>
         
          <li class="contact-item column">
            <div class="contact-item-content">
              <p class="contact-item-title"><?= $item->title()->html() ?></p>
            </div>
          </li>
        <?php endforeach ?>
      </ul>
	  
	  
    </div>
      
   

  </main>

<?php snippet('footer') ?>