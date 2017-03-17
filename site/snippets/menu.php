

<nav id="menu" class="navigation column" role="navigation">
  <ul>
    <?php foreach($pages->visible()->not('projects') as $item): ?>
    <li class="menu-item<?= r($item->isOpen(), ' is-active') ?>">
      <a href="<?= $item->url() ?>"><?= $item->title()->html() ?></a>
    </li>
    <?php endforeach ?>
  </ul>
</nav>