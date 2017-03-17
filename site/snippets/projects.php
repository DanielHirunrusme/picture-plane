<?php

$projects = page('projects')->children()->visible();

/*

The $limit parameter can be passed to this snippet to
display only a specified amount of projects:

```
<?php snippet('showcase', ['limit' => 3]) ?>
```

Learn more about snippets and parameters at:
https://getkirby.com/docs/templates/snippets

*/



?>

<ul id="projects-grid" class="showcase">
   
   

  
  <?php foreach($projects as $project): ?>
	
	<?php if($image = $project->images()->sortBy('sort', 'asc')->first()): $thumb = $image->crop(600, 600); ?>
	<?php if($project->cover_image()->isNotEmpty() ): $image = $project->cover_image(); $image_url = $project->image($project->cover_image()->value())->url(); endif; ?>
    <li data-h="<?= $image->height(); ?>" data-w="<?= $image->width(); ?>" class="showcase-item column grid-sizer <?= $project->cover_size() ?> <?php if($project->cover_size() == 'full' && $project->image($project->cover_image()->value())->orientation() == 'portrait'):?>full-portrait <?php endif; ?> <?php if($page->template() == 'project'): ?>deactivate<?php endif; ?>">
        <a href="<?= $project->url() ?>" class="showcase-link <?php if($project->isOpen()):?>is-active<?php endif; ?>" style="background-image:url('<?= $image_url ?>');">
          <?php if($project->featured_video()->isNotEmpty()): ?>
		  <div class="play-button">
		  </div>
		  <?php endif; ?>
          <img class="showcase-image" src="<?= $image_url ?>" />
          <div class="showcase-caption"> 
            <h2 class="showcase-title"><?= $project->title()->html() ?></h2>
			<h3 class="showcase-subtitle"><?= $project->subtitle()->html() ?></h3>
          </div>
        </a>
    </li>
	<?php endif ?>

  <?php endforeach ?>

</ul>