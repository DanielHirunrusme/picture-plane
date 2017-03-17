<?php


/*

The $limit parameter can be passed to this snippet to
display only a specified amount of projects:

```
<?php snippet('showcase', ['limit' => 3]) ?>
```

Learn more about snippets and parameters at:
https://getkirby.com/docs/templates/snippets

*/

$count = 0;


?>

<ul id="hero" class="hero-showcase showcase-item <?php if($page->template() == 'project'): ?>deactivate<?php endif; ?>">
  <?php foreach(page('home')->images()->sortBy('sort', 'asc') as $hero): ?>
	
	<li style="background-image:url(<?= $hero->url(); ?>);" class="<?php if($count != 0): ?>inactive<?php else: ?>active<?php endif; ?>"></li>
  <?php $count++; ?>
  <?php endforeach; ?>
</ul>