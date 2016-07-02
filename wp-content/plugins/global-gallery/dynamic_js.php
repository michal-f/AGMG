<?php
// loader class in footer
function gg_loader_class() {
	?>
    <script type="text/javascript">
    if(	navigator.appVersion.indexOf("MSIE 8.") != -1 || navigator.appVersion.indexOf("MSIE 9.") != -1 ) {
		document.body.className += ' gg_old_loader';
	} else {
		document.body.className += ' gg_new_loader';
	}
	</script>
    <?php	
}
add_action('wp_footer', 'gg_loader_class', 1);




// TEMP LOADER, RIGHT CLICK, DEEPLINK FLAG, SLIDER INIT
function gg_footer_elements() {
    // linked images function ?>
	<script type="text/javascript">
	jQuery('body').delegate('.gg_linked_img', 'click', function() {
		var link = jQuery(this).attr('gg-link');
		window.open(link ,'<?php echo get_option('gg_link_target', '_top') ?>');
	});
	</script>
	
	<?php
	// if prevent right click
	if(get_option('gg_disable_rclick')) {
		?>
        <script type="text/javascript">
		jQuery(document).ready(function() {
			jQuery('body').delegate('.gg_gallery_wrap *, .gg_galleria_slider_wrap *, #lcl_wrapper *', "contextmenu", function(e) {
                e.preventDefault();
            });
		});
		</script>
        <style type="text/css">
		.gg_gallery_wrap *, .gg_galleria_slider_wrap *, #lcl_wrapper * {
			-webkit-touch-callout: none; 
			-webkit-user-select: none;
		}
		</style>
        <?php	
	}
	
	// collection flags ?>
	<script type="text/javascript">
	gg_use_deeplink =  <?php echo (get_option('gg_disable_dl') == '1') ? 'false' : 'true'; ?>;
	gg_masonry_max_w = <?php echo get_option('gg_masonry_basewidth', 1100) ?>;
    </script>
	
	<?php
	$fx = get_option('gg_slider_fx', 'fadeslide');
	$fx_time = get_option('gg_slider_fx_time', 400);
	$crop = get_option('gg_slider_crop', 'true');
	$delayed_fx = (get_option('gg_delayed_fx')) ? 'false' : 'true';
	?>
	<script type="text/javascript">
	// global vars
	gg_galleria_toggle_info = <?php echo (get_option('gg_slider_tgl_info')) ? 'true' : 'false'; ?>;
	gg_galleria_fx = '<?php echo $fx ?>';
	gg_galleria_fx_time = <?php echo $fx_time ?>; 
	gg_galleria_img_crop = <?php echo ($crop=='true' || $crop=='false') ? $crop : '"'.$crop.'"' ?>;
	gg_galleria_autoplay = <?php echo (get_option('gg_slider_autoplay')) ? 'true' : 'false'; ?>;
	gg_galleria_interval = <?php echo get_option('gg_slider_interval', 3000) ?>;
	gg_delayed_fx = <?php echo $delayed_fx ?>;
	
	// Load the LCweb theme
	Galleria.loadTheme('<?php echo GG_URL ?>/js/jquery.galleria/themes/ggallery/galleria.ggallery.js');
	</script>
	<?php
}
add_action('wp_footer', 'gg_footer_elements', 999);

