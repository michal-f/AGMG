<?php
////////////////////////////////////
// DYNAMICALLY CREATE THE CSS //////
////////////////////////////////////
require_once('functions.php');

// remove the HTTP/HTTPS for SSL compatibility
$safe_baseurl = str_replace(array('http:', 'https:', 'HTTP:', 'HTTPS:'), '', GG_URL);

// slider style
$slider_style = (get_option('gg_slider_old_cmd')) ? '' : '_minimal';
?>

@import url("<?php echo $safe_baseurl; ?>/css/frontend.css");
@import url("<?php echo $safe_baseurl; ?>/js/jquery.galleria/themes/ggallery/galleria.ggallery<?php echo $slider_style ?>.css");


.gg_loader div {
	background-color: <?php echo get_option('gg_loader_color', '#888') ?>;
}

.gg_gallery_wrap .gg_container, 
.gg_masonry_gallery,
.gg_coll_outer_container {
	<?php if(get_option('gg_img_shadow')) echo 'padding: 3px;'; ?>
}


/* image border, radius and shadow */
.gg_img,
.gg_masonry_gallery .gg_img_inner,
.gg_coll_container .gg_main_img_wrap {
	<?php
	$border = get_option('gg_img_border');
	if(!$border || $border == 0) {echo 'border: none';}
	else {
		(!get_option('gg_img_border_color')) ? $border_col = '#444' : $border_col = get_option('gg_img_border_color');
		echo 'border: '.$border.'px solid '.$border_col.';';
	}
	?>
    
    <?php 
	$radius = get_option('gg_img_radius');
	if($radius && (int)$radius  > 0) {
		echo 'border-radius: '.$radius.'px;';	
	}
	?>
	
	<?php if(get_option('gg_img_shadow')) echo 'box-shadow: 0px 0px 2px rgba(25,25,25,0.6);'; ?>
}


<?php 
$mo = get_option('gg_overlay_type'); 
if(!empty($mo)) : 
?>
/* main overlay */
.gg_gallery_wrap .gg_img .gg_main_overlay {
    <?php 
	// position
	$position = get_option('gg_main_overlay');
	if(!$position || $position == 'bottom') {echo 'bottom: 0px;';}
	elseif($position == 'top') {echo 'top: 0px;';}
	else {
		echo 'top: 0px;
		height: 100%;
		text-align: center;';	
	}
	?>
    
    <?php 
	// opacity - for always visible option
	if(get_option('gg_main_ol_always')) { echo 'opacity: 1 !important; filter: alpha(opacity=100);'; }
	?>
    
    <?php
	// color
	$color = gg_hex2rgb(get_option('gg_main_ol_color', 'rgb(245,245,245)'));
	$txt_color = get_option('gg_main_ol_txt_color', '#222');
 
	echo '
	color: '.$txt_color.';
	background: '.$color.';
	';  
	
	$alpha = (int)get_option('gg_main_ol_opacity') / 100;
	if($alpha != 0) {
		$rgba = str_replace(array('rgb', ')'), array('rgba', ', '.$alpha.')'), $color);
		echo 'background: '.$rgba.';'; 
	}
	?>
}
.gg_gallery_wrap .gg_img .gg_main_overlay span {
	<?php if($position == 'full') { echo 'display: block; padding-top: 30px;'; } ?>
}
<?php endif; // main overlay ?>


<?php if(get_option('gg_overlay_type') == 'both') : ?>
/* secondary overlay */
<?php
$color = get_option('gg_sec_ol_color', '#eee'); // color
$pos = get_option('gg_sec_overlay', 'tl'); // position
?>
.gg_gallery_wrap .gg_img .gg_sec_overlay {
     <?php
	if(!$pos || $pos == 'tl') {
		echo '
		border-top: 60px solid '.$color.';
		border-right: 60px solid transparent;
		left: -60px;
		top: -60px;';
	}
	elseif($pos == 'tr') {
		echo '
		border-top: 60px solid '.$color.';
		border-left: 60px solid transparent;
		right: -60px;
		top: -60px;';
	}
	elseif($pos == 'bl') {
		echo '
		border-bottom: 60px solid '.$color.'; 
		border-right: 60px solid transparent;
		left: -60px;
		bottom: -60px;';
	}
	elseif($pos == 'br') { 
		echo '
		border-left: 60px solid transparent;
		border-bottom: 60px solid '.$color.'; 
		right: -60px;
		bottom: -60px;';
	}
	?>
}
.gg_gallery_wrap .gg_img:hover .gg_sec_overlay {
	<?php
    if(!$pos || $pos == 'tl') { echo 'left: 0px; top: 0px;'; }
	elseif($pos == 'tr') { echo 'right: 0px; top: 0px;'; }
	elseif($pos == 'bl') { echo 'left: 0px; bottom: 0px;'; }
	elseif($pos == 'br') { echo 'bottom: 0px; right: 0px;'; }
	?>
}
.gg_gallery_wrap .gg_img .gg_sec_overlay span:before {
	color: <?php echo get_option('gg_icons_col', '#fcfcfc') ?> !important;
}
<?php endif; // secondary overlay ?>


/* collections - texts under images */
.gg_coll_img .gg_main_overlay_under .gg_img_title_under {
	color: <?php echo get_option('gg_txt_u_title_color', '#444444') ?>;
}
.gg_coll_img .gg_main_overlay_under .gg_img_descr_under {
	color: <?php echo get_option('gg_txt_u_descr_color', '#555555') ?>;
}

/* collection filters + back to collection button */
.gg_filter {
	text-align: <?php echo get_option('gg_filters_align', 'left'); ?>;
    padding: 0px <?php echo (int)get_option('gg_cells_margin'); ?>px;
}
.gg_filter a.ggf,
.gg_coll_back_to_new_style {	
	color: <?php echo get_option('gg_filters_txt_color', '#444444'); ?>;
}
.gg_filter a.ggf:hover,
.gg_coll_back_to_new_style:hover {	
	color: <?php echo get_option('gg_filters_txt_color_h', '#666666'); ?> !important;
}
.gg_filter a.ggf.gg_cats_selected,
.gg_filter a.ggf.gg_cats_selected:hover {	
	color: <?php echo get_option('gg_filters_txt_color_sel', '#222222'); ?> !important;;
}
.gg_new_filters a.ggf,
.gg_coll_back_to_new_style {	
	background-color: <?php echo get_option('gg_filters_bg_color', '#ffffff'); ?>;
    border: 1px solid <?php echo get_option('gg_filters_border_color', '#999999'); ?>;
    border-radius: <?php echo (int)get_option('gg_filters_radius', 2); ?>px;
    
    <?php if(get_option('gg_filters_align', 'left') == 'right') : ?>
    margin-right: 0px !important;
    <?php else : ?>
    margin-left: 0px !important;
    <?php endif; ?>
}
.gg_new_filters a.ggf:hover,
.gg_coll_back_to_new_style:hover {	
	background-color: <?php echo get_option('gg_filters_bg_color_h', '#ffffff'); ?>;
    border: 1px solid <?php echo get_option('gg_filters_border_color_h', '#666666'); ?>;
}
.gg_new_filters a.ggf.gg_cats_selected,
.gg_new_filters a.ggf.gg_cats_selected:hover {	
	background-color: <?php echo get_option('gg_filters_bg_color_sel', '#ffffff'); ?>;
    border: 1px solid <?php echo get_option('gg_filters_border_color_sel', '#555555'); ?>;
}

<?php 
// responsive part for dropdown filters
if(get_option('gg_dd_mobile_filter')) :
?>
@media screen and (max-width: 760px) { 
	.gg_filter {
    	display: none !important;
    }
    .gg_mobile_filter_dd {
    	display: block !important;
    }
}
<?php endif; ?>


/* ************************************************** */

/* standard gallery images */
.gg_standard_gallery .gg_img {
	margin-right: <?php echo (int)get_option('gg_standard_hor_margin') ?>px;
    margin-bottom: <?php echo (int)get_option('gg_standard_ver_margin') ?>px;
}

/* masonry gallery images */
.gg_masonry_gallery .gg_img {
	<?php $margin = get_option('gg_masonry_margin', 5); ?>
    padding-left: <?php echo floor((int)$margin / 2) ?>px;
    padding-right: <?php echo ceil((int)$margin / 2) ?>px;
    margin-bottom: <?php echo $margin ?>px;
}

/* photostring gallery images */
.gg_string_gallery .gg_img {
	margin-right: <?php echo get_option('gg_photostring_margin') ?>px;
    margin-bottom: <?php echo get_option('gg_photostring_margin') ?>px;
}

/* collection images */
.gg_collection_wrap .gg_coll_container .gg_img {
	padding-right: <?php echo floor((int)get_option('gg_coll_hor_margin') / 2) ?>px;
    padding-left: <?php echo ceil((int)get_option('gg_coll_hor_margin') / 2) ?>px;
    margin-bottom: <?php echo get_option('gg_coll_ver_margin') ?>px;
}

/* pagination button alignment */
.gg_paginate {
	text-align: <?php echo get_option('gg_pag_align', 'center') ?>;
}


/* ************************************************** */

<?php 
// slider thumbs toggle visibility
$thumbs_visibility = get_option('gg_slider_thumbs', 'yes');
if($thumbs_visibility == 'always' || $thumbs_visibility == 'never') : 
?>
.gg_galleria_slider_wrap .galleria-gg-toggle-thumb {
	display: none !important;
}
<?php endif; ?>
<?php if($thumbs_visibility == 'no') :  ?>
.gg_galleria_slider_wrap .galleria-thumbnails-container {
	opacity: 0;
    filter: alpha(opacity=0);
}
<?php endif; ?>

<?php
// slider elements to hide
$to_hide = get_option('gg_slider_to_hide');
if(is_array($to_hide) && count($to_hide) > 0) {
	$elems = array();
	
	if(in_array('play', $to_hide)) 		{$elems[] = '.gg_galleria_slider_wrap .galleria-gg-play , .gg_galleria_slider_wrap .galleria-gg-pause';}
	if(in_array('lightbox', $to_hide)) 	{$elems[] = '.gg_galleria_slider_wrap .galleria-gg-lightbox';}
	if(in_array('info', $to_hide)) 		{$elems[] = '.gg_galleria_slider_wrap .galleria-gg-info-link, .gg_galleria_slider_wrap .galleria-info-text';}
	
	echo implode(' , ', $elems) . '{display: none !important;}';
}

// slider - if thumbs always hidden
if(get_option('gg_slider_thumbs', 'yes') == 'never') {
	echo '
	.gg_galleria_slider_wrap .galleria-thumbnails-container {
		display: none !important;
	}
	';	
}

// slider thumbs size
$s_thumb_h = (int)get_option('gg_slider_thumb_h', 40); 
echo '
.gg_galleria_slider_wrap .galleria-thumbnails .galleria-image {
	width: '. get_option('gg_slider_thumb_w', 60) .'px !important;
}
.gg_galleria_slider_wrap .galleria-thumbnails .galleria-image,
.gg_galleria_slider_wrap .galleria-thumbnails-container {
     height: '.$s_thumb_h.'px !important;
}
.gg_galleria_slider_wrap.gg_galleria_slider_show_thumbs {
	padding-bottom: '. ($s_thumb_h + 2 + 12) .'px !important;	
}
.gg_galleria_slider_show_thumbs .galleria-thumbnails-container {
	bottom: -'. ($s_thumb_h + 2 + 10) .'px !important;		
}
';
?>


<?php // magnific popup 
if(get_option('gg_lightbox') == 'mag_popup') : ?>
/* ************************************************** */

.gg_mp .mfp-arrow-left:before, .mfp-arrow-left .mfp-b,
.gg_mp .mfp-arrow-right:before, .mfp-arrow-right .mfp-b  {
	border-color: transparent !important; 
}
.gg_mp.mfp-bg {
	<?php $opacity = ((int)get_option('gg_lb_opacity', 75) == 0) ? 5 : (int)get_option('gg_lb_opacity', 75); ?>
    opacity: <?php echo $opacity / 100 ?>;
    filter: alpha(opacity=<?php echo $opacity ?>);
	background-color: <?php echo get_option('gg_lb_ol_color', '#111'); ?> !important;
    
    <?php 
	if(get_option('gg_lb_ol_pattern', 'none') != 'none') {
    	echo '
		background-image: url('.GG_URL.'/js/lightboxes/lcweb.lightbox/img/patterns/'.get_option('gg_lb_ol_pattern', 'none').'.png) !important;
		background-position: top left !important;
		background-repeat: repeat !important;
		';
	} 
	?>
}
.gg_mp .mfp-image-holder .mfp-content {
    max-width: <?php echo get_option('gg_lb_max_w', 90) ?>% !important;
}
.gg_mp button:hover, .gg_mp button:active, .gg_mp button:focus {
	background: none !important;
    box-shadow: none !important;
    border: none !important;
    padding: none !important;
}
.gg_mag_popup_loader {
    display: inline-block;
    width: 30px;
    height: 30px;
    background: url(<?php echo GG_URL.'/js/lightboxes/magnific-popup/mp_loader.gif'; ?>) no-repeat center center transparent;
}
.gg_mp .mfp-bottom-bar {
	text-shadow: 1px 1px 0px rgba(0, 0, 0, 0.2);
    margin-top: -40px;   
    padding: 13px;
    background: url(<?php echo GG_URL.'/js/lightboxes/magnific-popup/txt_bg.png'; ?>) repeat center center transparent;
}
.gg_mp .mfp-counter {
    right: 13px;
    top: 13px;
}
.gg_mp .mfp-figure {
	display: none;
}
.mfp-figure small {
    color: #D7D7D7;
    line-height: 18px;
}
.mfp-figure small p {
	display: inline;
}


<?php // tosrus lightbox 
elseif(get_option('gg_lightbox') == 'tosrus') : ?>
/* ************************************************** */

<?php $bg_color = gg_hex_to_rgb(get_option('gg_lb_ol_color', '#111'), get_option('gg_lb_opacity', 75)); ?>
.gg_tosrus.tos-wrapper {
	background-color: <?php echo $bg_color ?> !important;
}


.tosrus_ie8.tos-wrapper.tos-fixed {
    background: url(<?php echo GG_URL.'/js/lightboxes/jQuery.TosRUs/over_bg_d.png'; ?>) repeat center center transparent !important;
}
.tosrus_ie8 .tos-prev span, .tosrus_ie8 .tos-prev span:before, 
.tosrus_ie8 .tos-next span, .tosrus_ie8 .tos-next span:before,
.tosrus_ie8 .tos-close span, .tosrus_ie8 .tos-close span:before, .tosrus_ie8 .tos-close span:after {
	font-family: 'globalgallery';
	speak: none;
	font-style: normal;
	font-weight: normal;
	font-variant: normal;
	text-transform: none;
	line-height: 1;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
    
    color: #fff;
    border: none !important;
}
.tosrus_ie8 .tos-prev span:before {
    margin-left: -3px !important;
	content: "\e608";	
} 
.tosrus_ie8 .tos-next span:before {
    margin-right: -7px;
	content: "\e605";
}
.tosrus_ie8 .tos-close {
	background-image: url(<?php echo GG_URL.'/js/lightboxes/jQuery.TosRUs/close_icon.png'; ?>) !important;
    background-position: center center !important;
    background-repeat: no-repeat !important;
}


<?php // tosrus lightbox 
elseif(get_option('gg_lightbox') == 'lightgall') : ?>
/* ************************************************** */

.gg_lightgall #lightGallery-close {top: 13px !important;}
#lightGallery-close:after {top: 2px !important;}
#lightGallery-action a#lightGallery-prev:before, #lightGallery-action a#lightGallery-next:after {bottom: 2px !important;}
#lightGallery-action a.cLthumb:after {bottom: 3px !important;}
#lightGallery-Gallery .thumb_cont .thumb_info .close {margin-top: -1px !important;}
#lightGallery-Gallery .thumb_cont .thumb_info .close i:after {top: 2px !important;}

.gg_lightgall .title small {
	font-size: 12px;
    font-style: italic;
    font-weight: normal;
}

<?php $bg_color = gg_hex_to_rgb(get_option('gg_lb_ol_color', '#111'), get_option('gg_lb_opacity', 75)); ?>
.gg_lightgall, .gg_lightgall .info.group {
	background-color: <?php echo $bg_color ?> !important;
}

<?php if((int)get_option('gg_lb_opacity', 75) < 100) { ?>
.lightgall_ie8, .lightgall_ie8 .info.group {
    background: url(<?php echo GG_URL.'/js/lightboxes/jQuery.TosRUs/over_bg_d.png'; ?>) repeat center center transparent !important;
}
<?php } ?>
<?php endif; ?>


<?php 
// custom CSS
echo get_option('gg_custom_css');
?>