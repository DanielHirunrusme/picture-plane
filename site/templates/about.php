<?php snippet('header') ?>


  <main class="main main-about" role="main" data-page="default">

    <div class="wrap">
      
      <div class="text">
        <?= $page->text()->kirbytext() ?>
      </div>
      
    </div>
    
    <section class="team wrap wide">
      
      <h1>People</h1>

      <ul class="team-list grid gutter-1">
        <?php foreach($page->children()->visible() as $member): ?>
          <li class="team-item column">
            
            <figure class="team-portrait">
              <img src="<?= $member->image()->url() ?>" alt="Portrait of <?= $member->title()->html() ?>" />
            </figure>
            
            <div class="team-info">
              <h2 class="team-name"><?= $member->title()->html() ?></h2>
              <h3 class="team-position"><?= $member->position()->html() ?></h3>
              <div class="team-about text">
                <?= $member->about()->kirbytext() ?>
              </div>
            </div>
            
          </li>
        <?php endforeach ?>
      </ul>
      
    </section>

  </main>

<?php snippet('footer') ?>