<?php snippet('header') ?>

  <main class="main main-<?= $page->uri() ?>" role="main" data-page="default">

    <header class="wrap">
      <div class="intro text">
        <?= $page->intro()->kirbytext() ?>
      </div>
    </header>
      
    <div class="text wrap">
      <?= $page->text()->kirbytext() ?>
    </div>

  </main>

<?php snippet('footer') ?>