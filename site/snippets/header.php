<!doctype html>
<html lang="<?= site()->language() ? site()->language()->code() : 'en' ?>">
<head>

  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />

  <title><?= $site->title()->html() ?> | <?= $page->title()->html() ?></title>
  <meta name="description" content="<?= $site->description()->html() ?>">
  
  <link rel="shortcut icon" type="image/x-icon" href="<?= url('assets/images/favicon.jpg'); ?>" />
  
  <?= css('assets/plugins/oembed/css/oembed.css') ?>
  <?= css('assets/css/main.min.css') ?>

</head>
<body data-url="<?= $site->url() ?>/" class="<?php if(!$page->isHomePage() && $page->template() != 'project'): ?>menu-open<?php endif; ?> <?php if($page->template() == 'project'): ?>project-opening project-open show-project<?php endif; ?>" data-device="<?php if(s::get('device_class') == 'mobile'):?>mobile<?php endif; ?>">

<a href="<?= $site->url() ?>" class="logo" rel="home"><img src="<?= url('assets/images/picture-plane-logo-png.png'); ?>" title="<?= $site->title() ?>"><img src="<?= url('assets/images/pp_logo.png'); ?>" class="smaller-logo" title="<?= $site->title() ?>"></a>


<?php snippet('notification') ?>


<div id="projects-container">
  <?php snippet('hero') ?>
  <?php snippet('projects') ?>
</div>


<div id="menu-toggle" data-module-init="menu"><a href="<?= $site->url() ?>/studio" class="hamburger"><span></span><span></span><span></span></a><a href="<?= $site->url() ?>" class="close" title="home"><span></span><span></span></a></div>


<?php
	
// Load the projects here
	
?>


<div id="barba-wrapper" class="no-trans" data-module-init="barba">
  <div class="barba-container">
	  
  <?php snippet('menu') ?>
   
<?php

// Loaded here:	
// 1. Projects
// 2. Aside content
	
?>