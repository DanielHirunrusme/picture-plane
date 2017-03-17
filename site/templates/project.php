<?php snippet('header') ?>

    <header class="project-description <?php if($page->featured_video()->isNotEmpty()): ?>video-description<?php endif; ?>">
		<?php if( $page->images()->sortBy('sort', 'asc')->first()->caption()->isEmpty() ): ?>
			<h2><?= $page->title()->html() ?></h2>
			<h3><?= $page->subtitle()->html() ?></h3>
	  	<?php else: ?>
			<h2><?= $page->images()->sortBy('sort', 'asc')->first()->caption() ?></h2>
			<h3></h3>
		<?php endif; ?>
    </header>
	
  <main class="main main-project" data-page="project" data-module-init="project" data-project-type="<?php if($page->featured_video()->isNotEmpty()): ?>video<?php else: ?>images<?php endif; ?>" role="main" data-title="<?= $page->title()->html() ?>" data-subtitle="<?= $page->subtitle()->html() ?>">
    
    
	<?php if($page->featured_video()->empty()): ?>
    
    <div class="project-images">
      
      

      <?php
      // Images for the "project" template are sortable. You
      // can change the display by clicking the 'edit' button
      // above the files list in the sidebar.
      foreach($page->images()->sortBy('sort', 'asc') as $image): ?>
	 	<?php if($image->url() != $page->image($page->cover_image()->value())->url()): ?>
        <figure class="project-figure" data-caption="<?= $image->caption() ?>">
          <img class="project-image" data-w="<?= $image->width() ?>" data-h="<?= $image->height() ?>" data-orientation="<?= $image->orientation(); ?>" src="<?= $image->url() ?>" alt="<?= $page->title()->html() ?>" />
        </figure>
		<?php endif ?>
      <?php endforeach ?>
      
    </div>
	
	<?php else: ?>
	
	<?= $page->featured_video()->oembed([
	  'thumb' => true,
	  'autoplay' => true,
	  'jsapi' => true,
	  'lazyvideo' => false
	]) ?>
	
	<?php endif; ?>
    
    <?php //snippet('prevnext') ?>
	<?= js('assets/plugins/oembed/js/oembed.js') ?>
  </main>

<?php snippet('footer') ?>