<?php

/* notification.php top left */

?>

<?php if(page('home')->intro()->kirbytext() != ''): ?>
<div id="notification">
	<div class="text">
	<?= page('home')->intro()->kirbytext() ?>
</div>
</div>
<?php endif; ?>