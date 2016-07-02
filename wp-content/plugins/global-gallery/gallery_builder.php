<?php
// METABOXES FOR THE GALLERIES

// register
function gg_gall_builder_metaboxes() {
	require_once(GG_DIR . '/functions.php');
	add_meta_box('submitdiv', __('Publish', 'gg_ml'), 'post_submit_meta_box', 'gg_galleries', 'side', 'high');
	
	add_meta_box('gg_gallery_type', __('Gallery Type', 'gg_ml'), 'gg_gallery_type', 'gg_galleries', 'side', 'core');
	add_meta_box('gg_main_settings', __('Main Settings', 'gg_ml'), 'gg_main_settings', 'gg_galleries', 'side', 'core');
	add_meta_box('gg_sort_mode', __('Sort mode', 'gg_ml'), 'gg_sort_mode', 'gg_galleries', 'side', 'low');
	
	if(is_array( gg_getimagesize(get_option('gg_watermark_img'))) && preg_match( '/(^.*\.jpg|jpeg|png|gif|ico*)/i', get_option('gg_watermark_img'))) {
		add_meta_box('gg_create_gall_wmark_cache', __('Watermark Cache', 'gg_ml'), 'gg_create_gall_wmark_cache', 'gg_galleries', 'side', 'low');
	}
	
	add_meta_box('gg_specific_settings', __('Specific Settings', 'gg_ml'), 'gg_specific_settings', 'gg_galleries', 'normal', 'default');
	add_meta_box('gg_gallery_builder', __('Gallery Builder', 'gg_ml'), 'gg_gallery_builder', 'gg_galleries', 'normal', 'default');
}
add_action('admin_init', 'gg_gall_builder_metaboxes');


//////////////////////////
// GALLERY TYPE
function gg_gallery_type() {
	require_once(GG_DIR . '/functions.php');	
	global $post;
	
	$type = get_post_meta($post->ID, 'gg_type', true);
	$username = get_post_meta($post->ID, 'gg_username', true);
	$psw = get_post_meta($post->ID, 'gg_psw', true);
	?>

    <div class="lcwp_sidebox_meta">
        <div class="misc-pub-section">
          <label><?php _e("Choose the type", 'gg_ml'); ?></label>
          <select data-placeholder="<?php _e('Select a type', 'gg_ml') ?> .." name="gg_type" id="gg_type" class="lcweb-chosen" autocomplete="off" tabindex="2">
            <?php 
			foreach(gg_types() as $id => $name) {
				($id == $type) ? $sel = 'selected="selected"' : $sel = '';
				echo '<option value="'.$id.'" '.$sel.'>'.$name.'</option>'; 
			}
			?>
          </select> 
        </div>
        
        <div class="misc-pub-section" id="gg_username_wrap" <?php if(!$type || $type == 'wp' || $type == 'wp_cat' || $type == 'gg_album' || $type == 'ngg') {echo 'style="display: none;"';} ?>>
            <label><?php echo gg_username_label($type); ?></label>
            <input type="text" name="gg_username" value="<?php echo gg_sanitize_input($username); ?>" id="gg_username" /> 
            
            <div id="gg_dropbox_get_token" <?php if(!$type || $type != 'dropbox') {echo 'style="display: none;"';} ?>><a href="https://www.dropbox.com/1/oauth2/authorize?locale=&client_id=u2c4ra23x2fnzlb&response_type=code" target="_blank"><?php _e("Get your Dropbox token", 'gg_ml'); ?> &raquo;</a></div>
        </div>
        
        <div class="misc-pub-section" id="gg_psw_wrap" <?php if(!$type || ($type != 'picasa' && $type != 'instagram')) {echo 'style="display: none;"';} ?>>
            <label><?php echo ($type == 'instagram') ? __('Access Token', 'gg_ml') : __('Password', 'gg_ml'); ?></label>
            <input type="password" name="gg_psw" value="<?php echo $psw; ?>" id="gg_psw" />
            
            <a href="https://instagram.com/oauth/authorize/?client_id=7fc8464dc65d41629ae0b7be0841c4fe&redirect_uri=http://projects.lcweb.it&response_type=token" target="_blank" id="gg_instagram_get_token" <?php if(!$type || $type != 'instagram') {echo 'style="display: none;"';} ?>><?php _e("Get your Instagram token", 'gg_ml'); ?> &raquo;</a>
        </div>
        
        <input type="button" name="gg_handle_user" value="Connect" id="gg_handle_user_btn" class="button-secondary" style="margin-top: 7px; 
		<?php if(!$type || $type == 'wp' || $type == 'wp_cat' || $type == 'gg_album' || $type == 'ngg') {echo 'display: none;';} ?>" />
    </div>   
    <?php	
	// create a custom nonce for submit verification later
    echo '<input type="hidden" name="gg_gallery_noncename" value="' . wp_create_nonce(__FILE__) . '" />';
	
	return true;	
}


//////////////////////////
// GALLERY MAIN SETTINGS
function gg_main_settings() {	
	require_once(GG_DIR . '/functions.php');
	global $post;
	
	$layout = get_post_meta($post->ID, 'gg_layout', true);
	$thumb_w = get_post_meta($post->ID, 'gg_thumb_w', true);
	$thumb_h = get_post_meta($post->ID, 'gg_thumb_h', true);	
	$masonry_cols = get_post_meta($post->ID, 'gg_masonry_cols', true);
	$ps_height = get_post_meta($post->ID, 'gg_photostring_h', true);
	$paginate = get_post_meta($post->ID, 'gg_paginate', true);
	$per_page = get_post_meta($post->ID, 'gg_per_page', true);
	
	// default values
	if(!$layout || $layout == 'default') {
		$thumb_w = get_option('gg_thumb_w');
		$thumb_h = get_option('gg_thumb_h');
		$masonry_cols = get_option('gg_masonry_cols');
		$ps_height = get_option('gg_photostring_h');
	}
	
	if(!$paginate || $paginate == 'default') {
		$per_page = get_option('gg_img_per_page');	
	}
	
	// switches
	($layout != 'standard') ? $standard_show = 'style="display: none;"' : $standard_show = '';
	($layout != 'masonry') ? $masonry_show = 'style="display: none;"' : $masonry_show = '';
	($layout != 'string') ? $ps_show = 'style="display: none;"' : $ps_show = '';
	($paginate != '1') ? $per_page_show = 'style="display: none;"' : $per_page_show = '';
	
	?>
    <div class="lcwp_sidebox_meta lcwp_form"> 
      <div class="misc-pub-section">
      	<div style="float: right; margin-top: -7px;">
        	<select data-placeholder="<?php _e('Select a layout', 'gg_ml') ?> .." name="gg_layout" id="gg_layout" class="lcweb-chosen" autocomplete="off" tabindex="2" style="width: 122px; min-width: 0px;">
                <option value="default">Default</option>  
                <option value="standard" <?php if($layout == 'standard') {echo 'selected="selected"';} ?>>Standard</option>  
                <option value="masonry" <?php if($layout == 'masonry') {echo 'selected="selected"';} ?>>Masonry</option>
                <option value="string" <?php if($layout == 'string') {echo 'selected="selected"';} ?>>PhotoString</option>  
            </select>
        </div>
        <label><?php _e('Gallery Layout', 'gg_ml') ?></label>
      </div>
      
      <div class="misc-pub-section" id="gg_tt_sizes" <?php echo $standard_show; ?>>
        <div style="float: right; margin-top: -5px;">
            <input type="text" name="gg_thumb_w" value="<?php echo $thumb_w ?>" maxlength="4" style="width: 45px; margin-right: 3px; text-align: center;" /> x 
            <input type="text" name="gg_thumb_h" value="<?php echo $thumb_h ?>" maxlength="4" style="width: 45px; margin-left: 3px; text-align: center;" /> px
        </div>
        <label><?php _e('Thumbnail Sizes', 'gg_ml') ?></label>
      </div>
      <div class="misc-pub-section" id="gg_masonry_cols" <?php echo $masonry_show; ?>>
        <div style="float: right; margin-top: -3px;">
            <div style="float: right; margin-top: -5px;">
                <select data-placeholder="<?php _e('Select an option', 'gg_ml') ?> .." name="gg_masonry_cols" class="lcweb-chosen" tabindex="2" style="width: 122px; min-width: 0px;">
                	<?php
					for($a=1; $a<=20; $a++) {
						($a == (int)$masonry_cols) ? $sel = 'selected="selected"' : $sel = '';	
						echo '<option value="'.$a.'" '.$sel.'>'.$a.'</option>';
					}
					?>
                </select>
            </div>
        </div>
        <label><?php _e('Image Columns', 'gg_ml') ?></label>
      </div>
      <div class="misc-pub-section" id="gg_ps_height" <?php echo $ps_show; ?>>
        <div style="float: right; margin-top: -3px; width: 123px;">
        	<input type="text" name="gg_photostring_h" value="<?php echo $ps_height ?>" maxlength="4" style="width: 45px; margin-right: 2px; text-align: center;" /> px
        </div>
        <label><?php _e('Thumbs Height', 'gg_ml') ?></label>
      </div>
      
      <div class="misc-pub-section">
        <div style="float: right; margin-top: -5px;">
        	<select data-placeholder="<?php _e('Select an option', 'gg_ml') ?> .." name="gg_paginate" id="gg_paginate" class="lcweb-chosen" tabindex="2" style="width: 122px;">
                <option value="default"><?php _e('As Default', 'gg_ml') ?></option>  
                <option value="1" <?php if($paginate == '1') {echo 'selected="selected"';} ?>><?php _e('Yes', 'gg_ml') ?></option>  
                <option value="0" <?php if($paginate == '0') {echo 'selected="selected"';} ?>><?php _e('No', 'gg_ml') ?></option>  
            </select>
        </div>
        <label><?php _e('Use pagination?', 'gg_ml') ?></label>
      </div>
      <div class="misc-pub-section-last" id="gg_per_page" <?php echo $per_page_show; ?>>
        <div style="float: right; margin-top: -3px;">
        	<input type="text" name="gg_per_page" value="<?php echo $per_page ?>" maxlength="4" style="width: 45px; margin-right: 76px; text-align: center;" />
        </div>
        <label><?php _e('Images per page', 'gg_ml') ?></label>
      </div>
    </div> 
      
    <?php	
	return true;	
}


//////////////////////////
// SORT MODE SWITCH
function gg_sort_mode() {
	global $post;
	?>
    <div class="lcwp_mainbox_meta">
    	<div><a>Turn <span id="gg_sm_flag" class="off">on</span> the easy-sorting mode</a></div>
    </div>
    
    <script type="text/javascript">
	jQuery(document).ready(function($) {
		gg_sort_mode_on = false; 
		
		jQuery('body').delegate('#gg_sort_mode', 'click', function(){
			if( jQuery('#gg_sm_flag').hasClass('off') ) {
				jQuery('#gg_fb_builder').addClass('gg_is_sorting');	
				
				jQuery('.gg_is_sorting li').css('min-width', 0);
				jQuery('.gg_is_sorting li .gg_cmd_bar').fadeOut('fast');
				jQuery('.gg_is_sorting li .gg_builder_img').css('max-height', '100%').css('margin-left', -80);
				jQuery('.gg_is_sorting li').animate({width: 145, height: 145}, 200);

				jQuery('.gg_is_sorting li .gg_img_sizes').fadeOut();
				jQuery('.gg_is_sorting li .gg_img_texts').slideUp('fast');
				
				jQuery('.gg_is_sorting li').prepend('<div class="gg_sm_handler lcwp_move_row"></div>');
				jQuery('#gg_sm_flag').removeClass('off').addClass('on').text('off');
				gg_sort_mode_on = true;
			} 
			else {
				jQuery('.gg_is_sorting li .gg_builder_img').css('max-height', 190).css('margin-left', 0);
				jQuery('.gg_is_sorting li').removeAttr('style');
				
				jQuery('.gg_is_sorting li .gg_cmd_bar').fadeIn('fast');
				jQuery('.gg_is_sorting li .gg_img_sizes').fadeIn('fast');
				jQuery('.gg_is_sorting li .gg_img_texts').slideDown('fast');
				jQuery('#gg_fb_builder').removeClass('gg_is_sorting', 'lcwp_move_row');
				
				jQuery('.gg_sm_handler').remove();
				jQuery('#gg_sm_flag').removeClass('on').addClass('off').text('on');
				gg_sort_mode_on = false;
			}
		});
	});
	</script>
    
    <?php if(get_post_meta($post->ID, 'gg_autopop', true)) : ?> 
	<style type="text/css">
	#gg_sort_mode {display: none;}
	</style>
    <?php else : ?>
    <style type="text/css">
	#gg_sort_mode {display: block;}
	</style>
	<?php endif;
}


//////////////////////////
// CREATE WATERMARK CACHE
function gg_create_gall_wmark_cache() {
	global $post;
	if(gg_get_gall_first_img($post->ID, 'img')) :
	?>
    <div class="lcwp_mainbox_meta">
    	<div><a><?php _e('Create the watermark cache', 'gg_ml') ?></a> <span></span></div>
    </div>
    
    <script type="text/javascript">
	jQuery(document).ready(function($) {
		var $wmark_box = jQuery('#gg_create_gall_wmark_cache .lcwp_mainbox_meta > div');
		jQuery('body').delegate('#gg_create_gall_wmark_cache .lcwp_mainbox_meta a', 'click', function() {
			var wm_img = '<?php echo get_option('gg_watermark_img') ?>';
			
			$wmark_box.find('div').remove(); // clean past results
			$wmark_box.find('span').html('<div style="width: 20px; height: 20px;" class="lcwp_loading"></div>');
			$wmark_box.append('<small style="padding-left: 15px;">(<?php echo gg_sanitize_input( __('might take very long if you have many images to manage', 'gg_ml')) ?>)</small>');
			
			var data = {
				action: 'gg_create_wm_cache',
				gid: <?php echo $post->ID ?>
			};
			jQuery.post(ajaxurl, data, function(response) {
				var resp = jQuery.trim(response);
				
				$wmark_box.find('span').empty();
				$wmark_box.find('small').remove();
				
				if(resp == 'success') { $wmark_box.append('<div><?php echo gg_sanitize_input( __('Cache created succesfully', 'gg_ml')) ?>!</div>'); }
				else {
					if(resp.indexOf("Maximum execution") != -1) {
						$wmark_box.append('<div><?php _e('Process took too much time for your server. Try creating the cache again', 'gg_ml' ) ?></div>'); 
					}
					else if(resp.indexOf("bytes exhausted") != -1) {
						$wmark_box.append('<div><?php _e('The process requires too much memory for your server. Try applying it to smaller images', 'gg_ml' ) ?></div>'); 	
					}
					else {
						$wmark_box.append('<div><?php _e('Error during the cache creation', 'gg_ml' ) ?></div>'); 
					}
				}
			});	
		});
	});
	</script>
    
    <style type="text/css">
	#gg_create_gall_wmark_cache {display: block;}
	</style>
    <?php else : ?>
    
    <style type="text/css">
	#gg_create_gall_wmark_cache {display: none;}
	</style>
    
    <?php endif;
}


//////////////////////////
// GALLERY SPECIFIC SETTINGS
function gg_specific_settings() {
	?>
    <div class="lcwp_mainbox_meta">
    	<div id="gg_settings_wrap"><em><?php _e('Select a gallery type and fill the data to get the images', 'gg_ml') ?></em></div>
    </div>
    <?php
}


//////////////////////////
// GALLERY BUILDER
function gg_gallery_builder() {
	include_once(GG_DIR . '/functions.php');
	global $post;
	
	$type = get_post_meta($post->ID, 'gg_type', true);
	$autopop = get_post_meta($post->ID, 'gg_autopop', true);
	?>
    
	<?php 
	if( (float)substr(get_bloginfo('version'), 0, 3) >=  3.8) {
		echo '
		<style type="text/css">
		#gg_bulk_opt_wrap input {
			margin-top: 0px;	
		}
		</style>';
	}
	?>
    
    <div class="lcwp_mainbox_meta">
    	<div id="gg_builder_wrap">
		<?php 
		if($autopop != '1') {
			$gallery = gg_gall_data_get($post->ID);

			// picked images gallery
			if(!$gallery || !is_array($gallery) || (is_array($gallery) && count($gallery) == 0)) {echo '<em>'. __('Select the WP images or the images source', 'gg_ml') .'</em>';}
			else {
				echo '
				<table class="widefat lcwp_table lcwp_metabox_table">
				  <thead>
				  <tr>
					  <th style="width: 73px; padding-right: 20px;"><div id="gg_select_all_img">('. __('select all', 'gg_ml') .')</div></th>
					  <th>
						<div id="gg_bulk_opt_wrap" style="display: none;"></div>
					  </th>
				  </tr>
				  </thead>
				</table>
				<ul id="gg_fb_builder">';
				
				if(!$gallery || !is_array($gallery)) {$gallery = array();}
				foreach($gallery as $item) {
					$link_opt = (isset($item['link_opt'])) ? $item['link_opt'] : 'none';
					$link_val = (isset($item['link'])) ? $item['link'] : '';

					$img_full_src = gg_img_src_on_type($item['img_src'], $type);	
					$img_full_url = gg_img_url_on_type($item['img_src'], $type);
					
					if(ini_get('allow_url_fopen') && count($gallery) < 100) {list($w, $h) = gg_getimagesize($img_full_src);}
					else {$w = false; $h=false;}
					($w && $h) ? $sizes = $w.' x '.$h : $sizes = 'NaN'; 
					
					$thumb = (!get_option('gg_use_admin_thumbs')) ? $img_full_url : gg_thumb_src($img_full_src, $width = 320, $height = 190, 80, $alignment = $item['thumb']);
					echo '<li>
						<div class="gg_cmd_bar">
							<div class="lcwp_row_to_sel"></div>
							<div class="lcwp_del_row"></div>
							<div class="lcwp_move_row"></div>
							<div class="gg_sel_thumb" title="set the thumbnail center">
								<input type="hidden" name="gg_item_thumb[]" value="'.gg_sanitize_input($item['thumb']).'" class="gg_item_thumb" />
							</div>
						</div>
						<div class="gg_img_sizes">
							<table>
							  <tr>
							  	<td class="gg_img_data_icon"><img src="'.GG_URL.'/img/img_sizes.png" title="image sizes" /></td>
								<td>'.$sizes.'</td>
							  </tr>
							</table>
						</div>
						<div class="gg_builder_img_wrap">
							<img src="'.$thumb.'" class="gg_builder_img" fullurl="'.gg_sanitize_input($img_full_url).'" />
							<input type="hidden" name="gg_item_img_src[]" value="'.gg_sanitize_input($item['img_src']).'" class="gg_item_img_src" />
						</div>	
						<div class="gg_img_texts">
							<table>
							  <tr>
								<td class="gg_img_data_icon"><img src="'.GG_URL.'/img/photo_author.png" title="photo author" /></td>
								<td><input type="text" name="gg_item_author[]" value="'.gg_sanitize_input($item['author']).'" class="gg_item_author" /></td>
							  </tr>
							  <tr>
								<td class="gg_img_data_icon"><img src="'.GG_URL.'/img/photo_title.png" title="photo title" /></td>
								<td><input type="text" name="gg_item_title[]" value="'.gg_sanitize_input($item['title']).'" class="gg_item_title" /></td>
							  </tr>
							  <tr>
								<td class="gg_img_data_icon"><img src="'.GG_URL.'/img/photo_descr.png" title="photo description" /></td>
								<td><textarea name="gg_item_descr[]" class="gg_item_descr">'.gg_sanitize_input($item['descr']).'</textarea></td>
							  </tr>
							  <tr>
								<td class="gg_img_data_icon"><img src="'.GG_URL.'/img/link_icon.png" title="photo link" /></td>
								<td>
									<select name="gg_link_opt[]" class="gg_linking_dd">
										<option value="none">'. __('No link', 'gg_ml') .'</option>
										<option value="page" '; if($link_opt == 'page') {echo 'selected="selected"';} echo '>'. __('To a page', 'gg_ml') .'</option>
										<option value="custom" '; if($link_opt == 'custom') {echo 'selected="selected"';} echo '>'. __('Custom link', 'gg_ml') .'</option>
									</select>
									<div class="gg_link_wrap">'.gg_link_field($link_opt, $link_val).'</div>
								</td>
							  </tr>
							</table>
						</div>
					</li>';			
				}
				
				echo '</ul>';
			}
		}
		
		// auto population gallery
		else {
			$gallery = gg_gall_data_get($post->ID, true);
			
			if(!is_array($gallery) || count($gallery) == 0) {echo '<em>'. __('No images found', 'gg_ml') .' .. </em>';}
			else {
				echo '<ul id="gg_fb_builder">';
				
				foreach($gallery as $img) {
					$img_full_src = gg_img_src_on_type($img['img_src'], $type);
					$img_full_url = gg_img_url_on_type($img['img_src'], $type);
					
					if(ini_get('allow_url_fopen') && count($gallery) < 100) {list($w, $h) = gg_getimagesize($img_full_src);}
					else {$w = false; $h = false;}
					($w && $h) ? $sizes = $w.' x '.$h : $sizes = 'NaN'; 
					
					$thumb = (!get_option('gg_use_admin_thumbs')) ? $img_full_url : gg_thumb_src($img_full_src, $width = 320, $height = 190);
					echo '<li>
						<div class="gg_img_sizes">
							<table>
							  <tr>
							  	<td class="gg_img_data_icon"><img src="'.GG_URL.'/img/img_sizes.png" title="image sizes" /></td>
								<td>'.$sizes.'</td>
							  </tr>
							</table>
						</div>
						<div class="gg_builder_img_wrap">	
							<img src="'.$thumb.'" class="gg_autopop_img" fullurl="'.gg_sanitize_input($img_full_url).'" />
						</div>	
						<div class="gg_img_texts">
							<table>
							  <tr>
								<td class="gg_img_data_icon"><img src="'.GG_URL.'/img/photo_author.png" title="photo author" /></td>
								<td>'.gg_sanitize_input($img['author']).'</td>
							  </tr>
							  <tr>
								<td class="gg_img_data_icon"><img src="'.GG_URL.'/img/photo_title.png" title="photo title" /></td>
								<td>'.gg_sanitize_input($img['title']).'</td>
							  </tr>
							  <tr>
								<td class="gg_img_data_icon"><img src="'.GG_URL.'/img/photo_descr.png" title="photo description" /></td>
								<td>'.gg_sanitize_input($img['descr']).'</td>
							  </tr>
							  <tr style="display: none;">
								<td colspan="2">
									<select name="gg_link_opt[]" class="gg_linking_dd"><option value="none">'. __('No link', 'gg_ml') .'</option></select>
									'.gg_link_field('none').'
								</td>
							  </tr>
							</table>
						</div>
					</li>';
				}
				
				echo '</ul>';
			}
		}
		
		if(is_array($gallery) && count($gallery) > 60) {
			echo '<style type="text/css">.gg_img_sizes {display: none;}</style>';	
		}
        ?>
        </div>
    </div>
    
    <?php // hidden code to set the thumbnail center ?>
    <div id="gg_set_thumb_center" style="display: none;">
    	<h4><?php _e('Select the thumbnail center clicking on a cell', 'gg_ml') ?>:</h4>
        <table class="gg_sel_thumb_center">
            <tr>
                <td id="gg_tl"></td>
                <td id="gg_t"></td>
                <td id="gg_tr"></td>
            </tr>
            <tr>
                <td id="gg_l"></td>
                <td id="gg_c"></td>
                <td id="gg_r"></td>
            </tr>
            <tr>
                <td id="gg_bl"></td>
                <td id="gg_b"></td>
                <td id="gg_br"></td>
            </tr>
        </table>
    </div>
    
    <?php // ////////////////////// ?>
    
    <?php // SCRIPTS ?>
	<script src="<?php echo GG_URL; ?>/js/functions.js" type="text/javascript"></script>
    <script src="<?php echo GG_URL; ?>/js/chosen/chosen.jquery.min.js" type="text/javascript"></script>
    <script src="<?php echo GG_URL; ?>/js/iphone_checkbox/iphone-style-checkboxes.js" type="text/javascript"></script>
    <script src="<?php echo GG_URL; ?>/js/lightboxes/fancybox-1.3.4/jquery.fancybox-1.3.4.pack.js" type="text/javascript"></script>
    <script src="<?php echo GG_URL; ?>/js/jquery.jstepper.min.js" type="text/javascript"></script>
    
    <script src="<?php echo GG_URL; ?>/js/jquery.event.drag-2.2/jquery.event.drag-2.2.js" type="text/javascript"></script>
    <script src="<?php echo GG_URL; ?>/js/jquery.event.drag-2.2/jquery.event.drag.live-2.2.js" type="text/javascript"></script>
    <script src="<?php echo GG_URL; ?>/js/jquery.event.drop-2.2/jquery.event.drop-2.2.js" type="text/javascript"></script>
    <script src="<?php echo GG_URL; ?>/js/jquery.event.drop-2.2/jquery.event.drop.live-2.2.js" type="text/javascript"></script>
    
    <script type="text/javascript">
	jQuery(document).ready(function($) {
		// First init - gallery settings & builder load 
		gid = <?php echo $post->ID; ?>;
		TT_url = '<?php echo GG_TT_URL ?>';
		EWPT_url = '<?php echo GG_EWPT_URL ?>';
		gg_use_tt = <?php echo (get_option('gg_use_timthumb')) ? 'true' : 'false'; ?>;
		gg_erase_past = false;
		
		gg_gallery_init();
		gg_set_img_num();
		jQuery('#gg_fb_builder .gg_builder_img, #gg_fb_builder .gg_autopop_img').gg_img_fill_wrap(322, 190);
		
		function gg_gallery_init() {
			gg_basic_data();
			gg_load_settings();		
		}
		
		
		// update on gallery type change
		jQuery(document).delegate('#gg_type', 'change', function(e) {
			if( jQuery('#gg_fb_builder').size() == 0 || ( jQuery('#gg_fb_builder').size() && confirm('<?php echo gg_sanitize_input( __('The current gallery will be erased. Continue?', 'gg_ml')) ?>') ) ) {
				
				gg_erase_past = 1;
				gg_reset_gallery();
				if( jQuery(this).val() == 'wp' || jQuery(this).val() == 'wp_cat' || jQuery(this).val() == 'gg_album' || jQuery(this).val() == 'ngg'  ) { gg_gallery_init(); }
				
				// change username label
				switch( jQuery(this).val() ) {
					case 'flickr'	: jQuery('#gg_username_wrap label').text('<?php echo gg_sanitize_input( __('Set URL', 'gg_ml')) ?>'); break; 
					case 'pinterest': jQuery('#gg_username_wrap label').text('<?php echo gg_sanitize_input( __('Board URL', 'gg_ml')) ?>'); break; 
					case 'fb'		: jQuery('#gg_username_wrap label').text('<?php echo gg_sanitize_input( __('Page URL', 'gg_ml')) ?>'); break;
					case 'dropbox'	: jQuery('#gg_username_wrap label').text('<?php echo gg_sanitize_input( __('User Token', 'gg_ml')) ?>'); break;
					case 'tumblr'	: jQuery('#gg_username_wrap label').text('<?php echo gg_sanitize_input( __('Blog URL', 'gg_ml')) ?>'); break;
					case '500px'	: jQuery('#gg_username_wrap label').text('<?php echo gg_sanitize_input( __('User URL', 'gg_ml')) ?>'); break;
					case 'rss'		: jQuery('#gg_username_wrap label').text('<?php echo gg_sanitize_input( __('Feed URL', 'gg_ml')) ?>'); break;
					default			: jQuery('#gg_username_wrap label').text('<?php echo gg_sanitize_input( __('Username', 'gg_ml')) ?>'); break;		
				}
				
				// change password label
				switch( jQuery(this).val() ) {
					case 'instagram': 	jQuery('#gg_psw_wrap label').text('Access Token'); break; 
					default:			jQuery('#gg_psw_wrap label').text('Password'); break;		
				}
				
				// gallery type auth data toggle
				var gg_new_type = jQuery(this).val();
				if(gg_type != gg_new_type) { jQuery('#gg_username_wrap input, #gg_psw_wrap input').val(''); }
				
				if(gg_new_type != 'wp' && gg_new_type != 'wp_cat' && gg_new_type != 'gg_album' && gg_new_type != 'ngg') { 
					jQuery('#gg_username_wrap, #gg_handle_user_btn').slideDown(); 

					if(gg_new_type == 'picasa' || gg_new_type == 'instagram') { jQuery('#gg_psw_wrap').slideDown(); }
					else {jQuery('#gg_psw_wrap').slideUp();}
					
					if(gg_new_type == 'instagram') {jQuery('#gg_instagram_get_token').slideDown();}
					else {jQuery('#gg_instagram_get_token').slideUp();}
					
					if(gg_new_type == 'dropbox') {jQuery('#gg_dropbox_get_token').slideDown();}
					else {jQuery('#gg_dropbox_get_token').slideUp();}					
				}
				else { jQuery('#gg_username_wrap, #gg_psw_wrap, #gg_handle_user_btn, #gg_instagram_get_token, #gg_dropbox_get_token').slideUp(); }
			}
			else { return false; }
		});
		jQuery(document).delegate('#gg_handle_user_btn', 'click', function() { 
			gg_erase_past = 1;
			gg_reset_gallery();
			gg_gallery_init(); 
		});

		
		// basic gallery data handle
		function gg_basic_data() {
			gg_type = jQuery('#gg_type').val();
			gg_username = jQuery('#gg_username').val();
			gg_psw = jQuery('#gg_psw').val();
			
			return true;	
		}
		
		// gallery settings display
		function gg_load_settings() {
			jQuery('#gg_settings_wrap').html('<div style="height: 30px;" class="lcwp_loading"></div>');
			
			var data = {
				action: 'gg_load_settings',
				gallery_id: gid,
				gg_type: gg_type,
				gg_username: gg_username,
				gg_psw: gg_psw
			};
			
			jQuery.post(ajaxurl, data, function(response) {
				jQuery('#gg_settings_wrap').html(response);
				gg_numeric_fields();
				gg_live_chosen();
				gg_ip_checks();
			});	
			
			return true;
		}

		// reset gallery
		function gg_reset_gallery() {
			jQuery('#gg_settings_wrap').html('<em><?php echo gg_sanitize_input( __('Select a gallery type and fill the data to get the images', 'gg_ml')) ?></em>'); 
			jQuery('#gg_builder_wrap').html('<em><?php echo gg_sanitize_input( __('Select the WP images or the images source', 'gg_ml')) ?></em>'); 	
			
			jQuery('#gg_gallery_builder h3.hndle small').remove();
		}
		
		// main settings toggle
		jQuery(document).delegate('#gg_layout', 'change', function() {
			var layout = jQuery(this).val();
			
			if(layout == 'standard') {
				jQuery('#gg_tt_sizes').fadeIn();
				jQuery('#gg_masonry_cols, #gg_ps_height').hide();
			}
			else if (layout == 'masonry') {
				jQuery('#gg_masonry_cols').fadeIn();
				jQuery('#gg_tt_sizes, #gg_ps_height').hide();
			}
			else if (layout == 'string') {
				jQuery('#gg_ps_height').fadeIn();
				jQuery('#gg_tt_sizes, #gg_masonry_cols').hide();
			}
			else { jQuery('#gg_tt_sizes, #gg_masonry_cols, #gg_ps_height').fadeOut(); }
		});
		
		jQuery(document).delegate('#gg_paginate', 'change', function() {
			var paginate = jQuery(this).val();
			
			if(paginate == '1') { jQuery('#gg_per_page').fadeIn(); }
			else { jQuery('#gg_per_page').fadeOut(); }		
		});
		
		/////////////////////////////////////
		
		////////////////////////
		// gallery management
		
		// show images count in the gallery
		function gg_set_img_num() {
			var num = jQuery('#gg_gallery_builder #gg_fb_builder li').size();
			
			jQuery('#gg_gallery_builder h3.hndle small').remove();	
			
			if(num > 0) {
				jQuery('#gg_gallery_builder h3.hndle span').append(' <small>('+num+' images)</small>');
			}
		}
		
		// add selected images to the gallery
		jQuery(document).delegate('#gg_add_img', 'click', function() {
			if( jQuery('#gg_builder_wrap > ul').size() == 0 ) {
				jQuery('#gg_builder_wrap').html('\
					<table class="widefat lcwp_table lcwp_metabox_table">\
					  <thead><tr>\
						  <th style="width: 73px; padding-right: 20px;"><div id="gg_select_all_img">(<?php echo gg_sanitize_input( __('select all', 'gg_ml')) ?>)</div></th>\
						  <th><div id="gg_bulk_opt_wrap" style="display: none;"></div></th>\
					  </tr></thead>\
					</table>\
					<ul id="gg_fb_builder"></ul>');
			}
			
			jQuery.each(gg_sel_img, function(index, value) {
            	var img_id = value.substr(4);
				var img_url = jQuery('#'+img_id).attr('fullurl');
				
				var img_full_src = jQuery('#'+img_id).attr('img_full_src');
				var img_src = jQuery('#'+img_id).attr('img_src');
				
				var img_w = jQuery('#'+img_id).attr('img_w');
				var img_h = jQuery('#'+img_id).attr('img_h');
				var sizes = (img_w && img_h) ? img_w+' x '+img_h : 'NaN';
				
				var author = jQuery('#'+img_id).attr('author');
				var title = jQuery('#'+img_id).attr('title');
				var descr = jQuery('#'+img_id).attr('alt');

				var base_script = (gg_use_tt) ? TT_url : EWPT_url;
				var thumb_url = <?php echo (!get_option('gg_use_admin_thumbs')) ? 'img_url' : "base_script +'?src='+img_full_src+'&w=320&h=190&q=80'"; ?>;	
				
				var new_tr ='<li id="'+img_id+'">\
					<div class="gg_cmd_bar">\
						<div class="lcwp_row_to_sel"></div>\
						<div class="lcwp_del_row"></div>\
						<div class="lcwp_move_row"></div>\
						<div class="gg_sel_thumb" title="set the thumbnail center">\
							<input type="hidden" name="gg_item_thumb[]" value="c" class="gg_item_thumb" />\
						</div>\
					</div>\
					<div class="gg_img_sizes">\
						<table>\
						  <tr>\
							<td class="gg_img_data_icon"><img src="<?php echo GG_URL ?>/img/img_sizes.png" title="image sizes" /></td>\
							<td>'+sizes+'</td>\
						  </tr>\
						</table>\
					</div>\
					<div class="gg_builder_img_wrap">\
						<img src="'+ thumb_url +'" class="gg_builder_img" fullurl="'+img_url+'" />\
						<input type="hidden" name="gg_item_img_src[]" value="'+img_src+'" class="gg_item_img_src" />\
					</div>\
					<div class="gg_img_texts">\
						<table>\
						  <tr>\
							<td class="gg_img_data_icon"><img src="<?php echo GG_URL ?>/img/photo_author.png" title="photo author" /></td>\
							<td><input type="text" name="gg_item_author[]" value="'+author+'" class="gg_item_author" /></td>\
						  </tr>\
						  <tr>\
							<td class="gg_img_data_icon"><img src="<?php echo GG_URL ?>/img/photo_title.png" title="photo title" /></td>\
							<td><input type="text" name="gg_item_title[]" value="'+title+'" class="gg_item_title" /></td>\
						  </tr>\
						  <tr>\
							<td class="gg_img_data_icon"><img src="<?php echo GG_URL ?>/img/photo_descr.png" title="photo description" /></td>\
							<td><textarea name="gg_item_descr[]" class="gg_item_descr">'+descr+'</textarea></td>\
						  </tr>\
						  <tr>\
							<td class="gg_img_data_icon"><img src="<?php echo GG_URL ?>/img/link_icon.png" title="photo link" /></td>\
							<td><select name="gg_link_opt[]" class="gg_linking_dd">\
									<option value="none"><?php echo gg_sanitize_input( __('No link', 'gg_ml')) ?></option><option value="page"><?php echo gg_sanitize_input( __('To a page', 'gg_ml')) ?></option><option value="custom"><?php echo gg_sanitize_input( __('Custom link', 'gg_ml')) ?></option>\
								</select>\
								<div class="gg_link_wrap"><?php echo gg_link_field('none') ?></div>\
							</td>\
						</table>\
					</div>\
				</li>';
				
				jQuery('#gg_fb_builder').prepend( new_tr );  
            });
			
			jQuery('#gg_img_picker ul li.gg_img_sel').removeClass('gg_img_sel');
			jQuery('#gg_img_picker ul li.selected').removeClass('selected');
			jQuery('#gg_add_img').fadeOut();
			
			gg_sel_picker_img_status();
			gg_img_gallery_fancybox();
			gg_items_sort();
			gg_set_img_num();
		});
		
		
		// sort
		function gg_items_sort() { 
			jQuery('#gg_fb_builder').sortable({
				placeholder: {
					element: function(currentItem) {
						if(!gg_sort_mode_on) {
							return jQuery('<li style="border: 1px solid #73BF26; background-color: #97dd52; height: 287px; margin-bottom: -133px;"></li>')[0];
						} else {
							return jQuery('<li style="border: 1px solid #73BF26; background-color: #97dd52; height: 150px; min-width: 0px; max-width: 150px; margin-bottom: -133px;"></li>')[0];	
						}
					},
					update: function(container, p) {
						return;
					}
				},
				tolerance: 'intersect',
				handle: '.lcwp_move_row',
				items: 'li',
				opacity: 0.9,
				scrollSensivity: 50,
				create: function() {
					jQuery("#gg_fb_builder table input, #gg_fb_builder table textarea").bind('mousedown.ui-disableSelection selectstart.ui-disableSelection', function(e) {
					  e.stopImmediatePropagation();
					});
				},
				stop: function () {
					jQuery("#gg_fb_builder table input, #gg_fb_builder table textarea").bind('mousedown.ui-disableSelection selectstart.ui-disableSelection', function(e) {
					  e.stopImmediatePropagation();
					});
				}
			}); 
		}
		gg_items_sort();
		
		// rows select 
		jQuery(document).delegate('.lcwp_row_to_sel', 'click', function() {
			jQuery(this).toggleClass('lcwp_sel_row');
			jQuery(this).parent().parent().toggleClass('selected');
			gg_bulk_opt();
		});
		jQuery(document).delegate('#gg_select_all_img', 'click', function() {
			if( jQuery(this).hasClass('selected') ) {
				jQuery(this).removeClass('selected').text('(<?php echo gg_sanitize_input( __('select all', 'gg_ml')) ?>)');
				jQuery('.lcwp_row_to_sel').each(function() {
                    jQuery(this).removeClass('lcwp_sel_row');
					jQuery(this).parent().parent().removeClass('selected');
                });	
				gg_bulk_opt();	
			}
			else {
				jQuery(this).addClass('selected').text('(<?php echo gg_sanitize_input( __('deselect all', 'gg_ml')) ?>)');
				jQuery('.lcwp_row_to_sel').each(function() {
                    jQuery(this).addClass('lcwp_sel_row');
					jQuery(this).parent().parent().addClass('selected');
                });	
				gg_bulk_opt();	
			}
		});
		
		// remove item 
		jQuery(document).delegate('.lcwp_del_row', 'click', function() {
			if(confirm('Remove the image?')) {
				jQuery(this).parent().parent().fadeOut(function() {
					jQuery(this).remove();
					gg_sel_picker_img_status();
					gg_set_img_num();
				});
			}
		});
		
		// bulk controls
		function gg_bulk_opt() {
			var bulk_opt_code = '\
			  <label style="padding-right: 5px;"><?php echo gg_sanitize_input( __('Bulk Options', 'gg_ml')) ?></label>\
			  <select data-placeholder="<?php echo gg_sanitize_input( __('Select an option', 'gg_ml')) ?> .." id="gg_bulk_opt" class="lcweb-chosen" tabindex="2" style="width: 200px;">\
				<option value="remove"><?php echo gg_sanitize_input( __('Remove Images', 'gg_ml')) ?></option>\
				<option value="author"><?php echo gg_sanitize_input( __('Set the Author', 'gg_ml')) ?></option>\
				<option value="title"><?php echo gg_sanitize_input( __('Set the Title', 'gg_ml')) ?></option>\
				<option value="descr"><?php echo gg_sanitize_input( __('Set the Description', 'gg_ml')) ?></option>\
				<option value="thumb"><?php echo gg_sanitize_input( __('Set the Thumb Center', 'gg_ml')) ?></option>\
			  </select>\
			  \
			  <input type="text" value="" id="gg_bulk_val" style="margin-left: 15px; padding: 3px; display: none;" />\
			  \
			  <span id="gg_bulk_thumb_wrap" style="padding-left: 20px; display: none;">\
			  <select data-placeholder="<?php echo gg_sanitize_input( __('Select an option', 'gg_ml')) ?> .." id="gg_bulk_thumb_val" class="lcweb-chosen" tabindex="2" style="width: 100px;">\
				<option value="tl"><?php echo gg_sanitize_input( __('Top-left', 'gg_ml')) ?></option>\
				<option value="t"><?php echo gg_sanitize_input( __('Top', 'gg_ml')) ?></option>\
				<option value="tr"><?php echo gg_sanitize_input( __('Top-right', 'gg_ml')) ?></option>\
				<option value="l"><?php echo gg_sanitize_input( __('Left', 'gg_ml')) ?></option>\
				<option value="c"><?php echo gg_sanitize_input( __('Center', 'gg_ml')) ?></option>\
				<option value="r"><?php echo gg_sanitize_input( __('Right', 'gg_ml')) ?></option>\
				<option value="bl"><?php echo gg_sanitize_input( __('Bottom-left', 'gg_ml')) ?></option>\
				<option value="b"><?php echo gg_sanitize_input( __('Bottom', 'gg_ml')) ?></option>\
				<option value="br"><?php echo gg_sanitize_input( __('Bottom-right', 'gg_ml')) ?></option>\
			  </select>\
			  </span>\
			  <input type="button" value="<?php echo gg_sanitize_input( __('Apply', 'gg_ml')) ?>" id="gg_bulk_perform" class="button-secondary" style="margin-left: 15px; padding: 3px 8px;" />\
			';
			
			if(jQuery('#gg_fb_builder li.selected').size() > 0) {
				jQuery('#gg_bulk_opt_wrap').empty();
				jQuery('#gg_bulk_opt_wrap').append(bulk_opt_code).fadeIn();	
				gg_live_chosen();
				gg_bulk_opt_input_toggle();	
			}
			else {
				jQuery('#gg_bulk_opt_wrap').fadeOut(function() {
					jQuery(this).empty();
				});		
			}
		}
		
		// bulk opt input toggle
		function gg_bulk_opt_input_toggle() {
			jQuery(document).delegate('#gg_bulk_opt', 'change', function() {
				if( jQuery(this).val() == 'remove') {jQuery('#gg_bulk_val, #gg_bulk_thumb_wrap').fadeOut();}
				else if( jQuery(this).val() == 'thumb') {
					jQuery('#gg_bulk_val').val('').fadeOut();
					jQuery('#gg_bulk_thumb_wrap').fadeIn();
				}
				else {	
					jQuery('#gg_bulk_val').val('').fadeIn();
					jQuery('#gg_bulk_thumb_wrap').fadeOut();
				}
			});	
		}
		
		// perform bulk opt
		jQuery(document).delegate('#gg_bulk_perform', 'click', function() {
			var type = jQuery('#gg_bulk_opt').val();
			var bulk_val = jQuery('#gg_bulk_val').val();
			var new_center = jQuery('#gg_bulk_thumb_val').val();
			
			if(type == 'remove') {
				if(confirm('<?php echo gg_sanitize_input( __('Remove the selected images?', 'gg_ml')) ?>')) {
					jQuery('#gg_fb_builder li.selected').fadeOut(function() {
						jQuery(this).remove();
						gg_sel_picker_img_status();
					});
					gg_reset_selection();
					gg_set_img_num();
				}
			}
			else if(type == 'thumb') {
				jQuery('#gg_fb_builder li.selected').each(function() {
                    jQuery(this).find('.gg_item_thumb').val(new_center);
			
					var img_url =  jQuery(this).find('.gg_builder_img').attr('fullurl');
					var new_thumb_url = TT_url+'?src='+img_url+'&w=400&h=190&q=90&a='+new_center;
					jQuery(this).find('.gg_builder_img').attr('src', new_thumb_url); 
                });
				
				gg_reset_selection();	
			}	
			else {
				if(type == 'author') {
					jQuery('#gg_fb_builder li.selected .gg_item_author').val(bulk_val);	
				}
				else if(type == 'title') {
					jQuery('#gg_fb_builder li.selected .gg_item_title').val(bulk_val);	
				}
				else if(type == 'descr') {
					jQuery('#gg_fb_builder li.selected .gg_item_descr').val(bulk_val);	
				}
				
				gg_reset_selection();
			}
		});
		
		// reset items selection
		function gg_reset_selection() {
			jQuery('.lcwp_sel_row').each(function() {
                jQuery(this).removeClass('lcwp_sel_row');
				jQuery(this).parent().parent().removeClass('selected');
				
				if(jQuery('#gg_select_all_img').hasClass('selected')) {
					jQuery('#gg_select_all_img').removeClass('selected').text('(select all)');	
				}
				gg_bulk_opt();
            });	
		}
		
		// status updater for selected images
		function gg_sel_picker_img_status() {
			var gg_gallery_img = jQuery.makeArray();	
			jQuery('.gg_builder_img').each(function() { 
				var img_url = jQuery(this).attr('fullurl');
				gg_gallery_img.push(img_url); 
			});
			
			jQuery('.gg_all_img').each(function() {
                var img_url = jQuery(this).attr('fullurl');
				if( jQuery.inArray(img_url, gg_gallery_img) != -1) {
					jQuery(this).parent().addClass('gg_img_inserted');	
				}
				else { jQuery(this).parent().removeClass('gg_img_inserted'); }
            });
		}
		
		// linking management
		jQuery(document).delegate('.gg_img_texts select.gg_linking_dd', 'change', function() {
			var link_opt = jQuery(this).val();
			
			if(link_opt == 'page') {
				var link_field = '<?php echo str_replace("'", "\'", gg_link_field('page')); ?>';
			}
			else if(link_opt == 'custom') {
				var link_field = '<?php echo gg_link_field('custom'); ?>';
			}
			else {
				var link_field = '<?php echo gg_link_field('none'); ?>';	
			}
			
			jQuery(this).parent().find('.gg_link_wrap').html(link_field);
		});

		
		/////////////////////////////////////
		
		////////////////////////
		// automatic gallery population
		
		// autopop switch behaviours
		jQuery(document).delegate('#gg_autopop > div', 'click', function() {
			if(jQuery(this).find('.iPhoneCheckLabelOn').width() < 20) { 
				gg_autopop_make_cache();
				gg_sel_picker_img_status();
				jQuery('#gg_sort_mode').fadeOut();
			}
			else {
				jQuery('#gg_builder_wrap').html('<em><?php echo gg_sanitize_input( __('Select the WP images or the images source', 'gg_ml')) ?></em>'); 	
				gg_sel_picker_img_status();
				jQuery('#gg_sort_mode').fadeIn();
			}
		});
		
		// re-load on click 
		jQuery(document).delegate('.gg_rebuild_cache', 'click', function() {
			gg_autopop_make_cache();
		});
	
		// create the cache and display images in the builder
		function gg_autopop_make_cache() {
			var max_img = jQuery('#gg_max_images').val();
			
			if(jQuery('#gg_auto_random').find('.iPhoneCheckLabelOn').width() > 20) {var random_img = 1;}
			else {var random_img = 0;}
			
			var data = {
				action: 'gg_make_autopop',
				gg_type: gg_type,
				gallery_id: gid,
				gg_extra: get_type_extra(),
				gg_max_img: max_img,
				gg_random_img: random_img,
				gg_erase_past: gg_erase_past
			};
			
			jQuery('#gg_builder_wrap').html('<div style="height: 30px;" class="lcwp_loading"></div>');
			
			jQuery.post(ajaxurl, data, function(response) {
				jQuery('#gg_builder_wrap').html(response);
				gg_img_autopop_fancybox();
				gg_set_img_num();
				
				if(gg_erase_past) {
					gg_erase_past = false;	
				}
			});
			
			return true;  	
		}
		
		// gallery auto-population toggle
		jQuery(document).delegate('#gg_autopop > div', 'click', function() {
			if(jQuery(this).find('.iPhoneCheckLabelOn').width() < 20) { 
				jQuery('.gg_autopop_fields').slideDown();
				jQuery('#gg_img_picker_area').fadeOut(); 
			}
			else { 
				jQuery('.gg_autopop_fields').slideUp(); 
				jQuery('#gg_img_picker_area').fadeIn();
			}
		});
		
		
		/////////////////////////////////////
		
		////////////////////////
		// images picker 
		gg_img_pp = 15;
		gg_sel_img = jQuery.makeArray();
		
		// load images picker
		window.gg_load_img_picker = function(page) {
			var data = {
				action: 'gg_img_picker',
				gg_type: gg_type,
				page: page,
				per_page: gg_img_pp,
				gallery_id: gid,
				gg_search: (jQuery('.gg_img_search').size() > 0) ? jQuery('.gg_img_search').val() : '',
				gg_extra: get_type_extra()
			};
			
			jQuery('#gg_img_picker').html('<div style="height: 30px;" class="lcwp_loading"></div>');
			
			jQuery.post(ajaxurl, data, function(response) {
				jQuery('#gg_img_picker').html(response);
				gg_img_picker_fancybox();
				gg_sel_img_on_drag();
				gg_sel_picker_img_status();
				jQuery('#gg_img_picker li > img').gg_img_fill_wrap(90, 90);
			});	
			
			return true;
		}

		// change imges picker's page
		jQuery('body').delegate('.gg_img_pick_back, .gg_img_pick_next', 'click', function() {
			var page = jQuery(this).attr('id').substr(4);
			gg_load_img_picker(page);
		});
		
		// change images per page
		jQuery('body').delegate('#gg_img_pick_pp', 'keyup', function() {
			var pp = jQuery(this).val();
			
			setTimeout(function() {
				if( pp.length >= 2 ) {
					if( parseInt(pp) < 15 ) { 
						jQuery('#gg_img_pick_pp').val(15);
						gg_img_pp = 15;
					}
					else {gg_img_pp = pp;}
					
					gg_load_img_picker(1);
				}
			}, 300);
		});
		
		// get the additional vars depending on the type
		function get_type_extra() {
			if( gg_type == 'wp_cat' ) {return jQuery('#gg_wp_cat').val();}
			else if( gg_type == 'gg_album' ) {return jQuery('#gg_album').val();}
			else if( gg_type == 'fb' ) {return jQuery('#gg_fb_album').val();}
			else if( gg_type == 'picasa' ) {return jQuery('#gg_picasa_album').val();}
			else if( gg_type == 'dropbox' ) {return jQuery('#gg_dropbox_album').val();}
			else if( gg_type == 'ngg' ) {return jQuery('#gg_ngg_gallery').val();}
			else {return '';}
		}
		
		// re-fetch images on search
		jQuery(document).delegate('.gg_img_search_btn', 'click', function() { gg_load_img_picker(1); });
		
		// img selection with mouse drag
		function gg_sel_img_on_drag() {
			if(jQuery('.gg_all_img').size() > 2) {
				jQuery('#gg_img_picker_area').drag("start",function( ev, dd ){
					return jQuery('<div id="gg_drag_selection" />')
						.css('opacity', .45 )
						.appendTo( document.body );
				})
				.drag(function( ev, dd ){
					jQuery( dd.proxy ).css({
						top: Math.min( ev.pageY, dd.startY ),
						left: Math.min( ev.pageX, dd.startX ),
						height: Math.abs( ev.pageY - dd.startY ),
						width: Math.abs( ev.pageX - dd.startX )
					});
				})
				.drag("end",function( ev, dd ){
					jQuery( dd.proxy ).remove();
					gg_man_img_array();
				});
					
				jQuery('#gg_img_picker ul li')
					.drop(function( ev, dd ){
						if(!jQuery(this).hasClass('gg_img_inserted')) {
							jQuery(this).toggleClass('gg_img_sel');
						}
					})
				jQuery.drop({ multi: true });
			}
		}
		
		// "select all" action
		jQuery(document).delegate('.gg_sel_all_btn', 'click', function() {
			jQuery('#gg_img_picker ul li').not('.gg_img_inserted').each(function() {
                jQuery(this).addClass('gg_img_sel');
            });
			gg_man_img_array();
		});
		
		// img selection with click
		jQuery(document).delegate('#gg_img_picker ul li img', 'click', function() {
			if(!jQuery(this).parent().hasClass('gg_img_inserted')) {
				jQuery(this).parent().toggleClass('gg_img_sel');
				gg_man_img_array();
			}
		});

		// dynamic selection button title
		jQuery(document).delegate('#gg_img_picker ul li', 'hover', function() {
			if ( jQuery(this).hasClass('gg_img_sel') ) { jQuery(this).attr('title', 'Click to unselect'); }
			else if ( jQuery(this).hasClass('gg_img_inserted') ) { jQuery(this).attr('title', 'Image already in the gallery'); }
			else { jQuery(this).attr('title', 'Click to select');}	
		});
		
		//selected images array management
		function gg_man_img_array() {
			gg_sel_img = jQuery.makeArray();
			jQuery('.gg_img_sel').each(function() {
                gg_sel_img.push( jQuery(this).attr('id') );
            });	
			
			if( gg_sel_img.length == 0) { jQuery('#gg_add_img').fadeOut(); }
			else { jQuery('#gg_add_img').fadeIn(); }
		}
		
		
		// reload on category/album change - ask for confirmation
		jQuery(document).delegate('#gg_wp_cat, #gg_album, #gg_picasa_album, #gg_fb_album, #gg_dropbox_album, #gg_ngg_gallery', 'change', function() {
			if(confirm('<?php echo gg_sanitize_input( __('The current gallery will be erased. Continue?', 'gg_ml')) ?>')) {
				if( jQuery('#gg_autopop').find('.iPhoneCheckLabelOn').width() > 20) {  
					gg_erase_past = 1;
					gg_autopop_make_cache();
				}
				else {
					gg_load_img_picker(1);
					jQuery('#gg_builder_wrap').html('<em><?php echo gg_sanitize_input( __('Select the WP images or the images source', 'gg_ml')) ?></em>'); 
				}
			} else {
				return false;	
			}
		});
		
		
		////////////////////////////////
		
		////////////////////////
		// custom file uploader for wp gallery
		gg_TB = 0;
		
		// open tb and hide tabs
		jQuery(document).delegate('.gg_TB', 'click', function(e) {
			
			// thickBox
			if(typeof(wp.media) == 'undefined') {
				gg_TB = 1;
				post_id = jQuery('#post_ID').val();
				
				tb_show('', '<?php echo admin_url(); ?>media-upload.php?post_id='+post_id+'&amp;type=image&amp;TB_iframe=true');
				
				setInterval(function() {
					if(gg_TB == 1) {
						if( jQuery('#TB_iframeContent').contents().find('#tab-type_url').is('hidden') ) { return false;	}
						
						jQuery('#TB_iframeContent').contents().find('#tab-type_url').hide();
						jQuery('#TB_iframeContent').contents().find('#tab-gallery').hide();
					}
				}, 1);
			}
			
			// new lightbox management
			else {
				e.preventDefault();
				var custom_uploader = wp.media({
					title: 'WP Images Management',
					button: { text: 'Ok' },
					library : { type : 'image'},
					multiple: false
				})
				.on('select close', function() {
					gg_load_img_picker(1);
				})
				.open();
			}
		});
		
		// reload picker on thickbox unload
		jQuery(window).bind('tb_unload', function() {
			if(gg_TB == 1) {
				gg_load_img_picker(1); 
				gg_TB = 0;		
			}
		});
		
		////////////////////////////////
		
		// open thumbnail center wizard
		jQuery(document).delegate('.gg_sel_thumb', 'click', function() {
			$sel = jQuery(this).parents('li');
			var thumb_center = jQuery(this).find('input').val();
			if(thumb_center.length == 0) { var thumb_center = 'c'; }

			var gg_H = 417;
			var gg_W = 480;
			tb_show( 'Thumbnail center', '#TB_inline?height='+gg_H+'&width='+gg_W+'&inlineId=gg_set_thumb_center' );
			
			jQuery('#TB_ajaxContent .gg_sel_thumb_center td').removeClass('thumb_center');
			jQuery('#TB_ajaxContent .gg_sel_thumb_center #gg_'+thumb_center).addClass('thumb_center');
			
			jQuery('#TB_window').css("height", gg_H);
			jQuery('#TB_window').css("width", gg_W);	
			
			jQuery('#TB_window').css("top", ((jQuery(window).height() - gg_H) / 4) + 'px');
			jQuery('#TB_window').css("left", ((jQuery(window).width() - gg_W) / 4) + 'px');
			jQuery('#TB_window').css("margin-top", ((jQuery(window).height() - gg_H) / 4) + 'px');
			jQuery('#TB_window').css("margin-left", ((jQuery(window).width() - gg_W) / 4) + 'px'); 
			
		});
		
		// set the thumbnail center
		jQuery(document).delegate('#TB_ajaxContent .gg_sel_thumb_center td', 'click', function() {
			var new_center = jQuery(this).attr('id').substr(3);

			jQuery('#TB_ajaxContent .gg_sel_thumb_center td').removeClass('thumb_center');
			jQuery('#TB_ajaxContent .gg_sel_thumb_center #gg_'+new_center).addClass('thumb_center');
			
			$sel.find('.gg_item_thumb').val(new_center);
			
			<?php if(get_option('gg_use_admin_thumbs')) : ?>
			var img_src = $sel.find('.gg_item_img_src').val();
			var base_script = (gg_use_tt) ? TT_url : EWPT_url;
			var new_thumb_url = base_script +'?src='+img_src+'&w=320&h=190&q=80&a='+new_center;	
			
			$sel.find('.gg_builder_img').attr('src', new_thumb_url); 
			<?php endif; ?>
		}); 
		
		////////////////////////////////
		
		///////////////////////////
		// live preview link
		<?php 
		$preview_pag = get_option('gg_preview_pag');
		if($preview_pag && $gallery) : 
			$link = get_permalink($preview_pag);
		?>
			var gg_live_preview = '<div class="misc-pub-section-last">\
				<a href="<?php echo $link; ?>?gg_gid=<?php echo $post->ID; ?>" target="_blank" id="gg_live_preview_link"><?php echo gg_sanitize_input( __('Go to the gallery preview', 'gg_ml')) ?> &raquo;</a></div>';
			
			jQuery('#submitpost').parent().append(gg_live_preview);
			jQuery('#major-publishing-actions').addClass('misc-pub-section');
		<?php endif; ?>
		
		
		////////////////////////////////
		
		// fancybox for image selector 
		function gg_img_picker_fancybox() {
			jQuery(document).delegate(".gg_zoom_img",'click', function() {
				var sel_img = [{ 'href' : jQuery(this).siblings('img').attr('fullurl') }];
				  
				jQuery.fancybox(
					sel_img,
					{
						'padding': 0,
						'transitionIn': 'elastic',
						'transitionOut': 'elastic',
						'type' : 'image',
						'changeFade' : 0,
						'overlayOpacity': 0.8,
						'overlayColor': '#000000',
						'centerOnScroll' : true 
					} 
				); 
			});	
		}
		
		// fancybox for gallery builder
		function gg_img_gallery_fancybox() {
			jQuery(document).delegate(".gg_builder_img, .gg_autopop_img", 'click', function() {
				var full_url = jQuery(this).attr('fullurl');
				var sel_img = [{ 'href' : full_url }];
				  
				jQuery.fancybox(
					sel_img,
					{
						'padding': 0,
						'transitionIn': 'elastic',
						'transitionOut': 'elastic',
						'type' : 'image',
						'changeFade' : 0,
						'overlayOpacity': 0.8,
						'overlayColor': '#000000',
						'centerOnScroll' : true 
					} 
				); 
			});	
		}
		gg_img_gallery_fancybox();
		
		// fancybox for autopop gallery
		function gg_img_autopop_fancybox() {
			jQuery(document).delegate(".gg_autopop_img", 'click', function() {
				var full_url = jQuery(this).attr('fullurl');
				var sel_img = [{ 'href' : full_url }];
				  
				jQuery.fancybox(
					sel_img,
					{
						'padding': 0,
						'transitionIn': 'elastic',
						'transitionOut': 'elastic',
						'type' : 'image',
						'changeFade' : 0,
						'overlayOpacity': 0.8,
						'overlayColor': '#000000',
						'centerOnScroll' : true 
					} 
				); 
			});	
		}
		gg_img_autopop_fancybox();
		
		// numeric fields control
		function gg_numeric_fields() {
			jQuery('#gg_main_settings .lcwp_sidebox_meta input, #gg_max_images').jStepper({minLength:1, allowDecimals:false});
		}
		gg_numeric_fields();
		
		// live iphone-checkboxes init
		function gg_ip_checks() {
			jQuery('.ip-checkbox').each(function() {
				jQuery(this).iphoneStyle({
				  checkedLabel: 'YES',
				  uncheckedLabel: 'NO'
				});
			});	
		}
		
		// live chosen init
		function gg_live_chosen() {
			jQuery('.lcweb-chosen').each(function() {
				var w = jQuery(this).css('width');
				jQuery(this).chosen({width: w}); 
			});
			jQuery(".lcweb-chosen-deselect").chosen({allow_single_deselect:true});
		}
		
		// fix for chosen overflow
		jQuery('#wpbody').css('overflow', 'hidden');
		
		// fix for subcategories
		jQuery('#gg_gall_categories-adder').remove();
	});
	
	// image management if no thumbs are used for the backend
	jQuery.fn.gg_img_fill_wrap = function(wrap_w, wrap_h) {
		<?php if(!get_option('gg_use_admin_thumbs')) : ?>
		return this.each(function() {
			var $img = jQuery(this);
			jQuery('<img />').bind("load", function(){ 
				var img_w = this.width;
				var img_h = this.height;
				
				// if both sides are bigger
				if(img_h > wrap_h && img_w > wrap_w) {
					
					var ratio = Math.max(wrap_w/img_w, wrap_h/img_h);
					var new_w = Math.ceil(img_w * ratio);
					var new_h = Math.ceil(img_h * ratio);
					
					var t_offset = Math.floor( (new_h - wrap_h) / 2) * -1;
					var l_offset = Math.floor( (new_w - wrap_w) / 2) * -1; 
					
					if(t_offset > 0) {t_offset = 0;}
					if(l_offset > 0) {l_offset = 0;}
					
					$img.css('width', new_w).css('height', new_h).css('margin-left', l_offset).css('margin-top', t_offset).css('max-height', 'none').css('max-width', 'none');
				}
				
				// if only one side is bigger
				else if(img_w > wrap_w && img_h <= wrap_h) {	
					$img.find('img').css('max-width', '100%').css('max-height', 'none').css('margin-left', 0).css('margin-top', 0);;	
				}
				else if(img_h > wrap_h && img_w <= wrap_w) {
					$img.find('img').css('max-height', '100%').css('max-width', 'none').css('margin-left', 0).css('margin-top', 0);;	
				}
				
				// basic position - smaller than wrapper
				else {
					var l_margin = Math.floor( (wrap_w - img_w) / 2);
					var t_margin = Math.floor( (wrap_h - img_h) / 2)
					
					$img.css('width', 'auto').css('height', 'auto').css('margin-left', l_margin).css('margin-top', t_margin);
				}
			}).attr('src', jQuery(this).attr('src'));	
		});
		<?php endif; ?>
	}
	</script>
       
    <?php	
	return true;
}



//////////////////////////
// SAVING METABOXES

function gg_gallery_meta_save($post_id) {
	if(isset($_POST['gg_gallery_noncename'])) {
		// authentication checks
		if (!wp_verify_nonce($_POST['gg_gallery_noncename'], __FILE__)) return $post_id;

		// check user permissions
		if ($_POST['post_type'] == 'page') {
			if (!current_user_can('edit_page', $post_id)) return $post_id;
		}
		else {
			if (!current_user_can('edit_post', $post_id)) return $post_id;
		}
		
		require_once(GG_DIR.'/functions.php');
		require_once(GG_DIR.'/classes/simple_form_validator.php');
				
		$validator = new simple_fv;
		$indexes = array();
		
		$indexes[] = array('index'=>'gg_type', 'label'=>'Gallery type');
		$indexes[] = array('index'=>'gg_username', 'label'=>'Username or Page ID');
		$indexes[] = array('index'=>'gg_psw', 'label'=>'password');
		
		$indexes[] = array('index'=>'gg_wp_cat', 'label'=>'WP category');
		$indexes[] = array('index'=>'gg_album', 'label'=>'GG album name');
		$indexes[] = array('index'=>'gg_fb_album', 'label'=>'Facebook album');
		$indexes[] = array('index'=>'gg_picasa_album', 'label'=>'Picasa album');
		$indexes[] = array('index'=>'gg_dropbox_album', 'label'=>'Dropbox album');
		$indexes[] = array('index'=>'gg_ngg_gallery', 'label'=>'nextGEN Gallery album');
		
		$indexes[] = array('index'=>'gg_layout', 'label'=>'gallery Layout');
		$indexes[] = array('index'=>'gg_thumb_w', 'label'=>'Thumbs Width');
		$indexes[] = array('index'=>'gg_thumb_h', 'label'=>'Thumbs Height');
		$indexes[] = array('index'=>'gg_masonry_cols', 'label'=>'Masonry Columns');
		$indexes[] = array('index'=>'gg_photostring_h', 'label'=>'PhotoString Height');

		$indexes[] = array('index'=>'gg_paginate', 'label'=>'gallery pagination');
		$indexes[] = array('index'=>'gg_per_page', 'label'=>'images per page');

		$indexes[] = array('index'=>'gg_autopop', 'label'=>'Gallery auto population');
		$indexes[] = array('index'=>'gg_auto_author', 'label'=>'Catch authors');
		$indexes[] = array('index'=>'gg_auto_title', 'label'=>'Catch titles');
		$indexes[] = array('index'=>'gg_auto_descr', 'label'=>'Catch descriptions');
		$indexes[] = array('index'=>'gg_cache_interval', 'label'=>'Cache interval');
		$indexes[] = array('index'=>'gg_auto_random', 'label'=>'Random Catching');
		$indexes[] = array('index'=>'gg_max_images', 'label'=>'Max images in gallery');
		
		$indexes[] = array('index'=>'gg_item_img_src', 'label'=>'Item Image source');
		$indexes[] = array('index'=>'gg_item_thumb', 'label'=>'Item Thumb Center');
		$indexes[] = array('index'=>'gg_item_author', 'label'=>'Item Author');
		$indexes[] = array('index'=>'gg_item_title', 'label'=>'Item Title');
		$indexes[] = array('index'=>'gg_item_descr', 'label'=>'Item Description');
		$indexes[] = array('index'=>'gg_link_opt', 'label'=>'Item Link option');
		$indexes[] = array('index'=>'gg_item_link', 'label'=>'Item Link source');
		
		$validator->formHandle($indexes);
		
		$fdata = $validator->form_val;
		$error = $validator->getErrors();

		// clean data
		foreach($fdata as $key=>$val) {
			if(!is_array($val)) {
				$fdata[$key] = stripslashes($val);
			}
			else {
				$fdata[$key] = array();
				foreach($val as $arr_val) {$fdata[$key][] = stripslashes($arr_val);}
			}
		}
		
		// gallery data array builder
		if(!$fdata['gg_item_img_src']) {$fdata['gg_gallery'] = false;}
		else {
			$a = 0;
			$fdata['gg_gallery'] = array();
			foreach($fdata['gg_item_img_src'] as $img_src) {
				if(!isset($fdata['gg_item_link'][$a]) || !$fdata['gg_item_link'][$a]) {$fdata['gg_link_opt'][$a] = 'none';}
				
				$fdata['gg_gallery'][] = array(
					'img_src'	=> $fdata['gg_item_img_src'][$a],
					'thumb' 	=> $fdata['gg_item_thumb'][$a],
					'author'	=> $fdata['gg_item_author'][$a],
					'title'		=> $fdata['gg_item_title'][$a],
					'descr'		=> $fdata['gg_item_descr'][$a],
					'link_opt'	=> $fdata['gg_link_opt'][$a], 
					'link'		=> $fdata['gg_item_link'][$a]
				);	
				$a++;
			}
		}
		unset( 
			$fdata['gg_item_img_src'], 
			$fdata['gg_item_thumb'],
			$fdata['gg_item_author'], 
			$fdata['gg_item_title'], 
			$fdata['gg_item_descr'], 
			$fdata['gg_link_opt'],  
			$fdata['gg_item_link']
		);

		// save data
		foreach($fdata as $key=>$val) {
			if($key == 'gg_gallery') {
				gg_gall_data_save($post_id, $val);
			}
			else {
				delete_post_meta($post_id, $key);
				add_post_meta($post_id, $key, $fdata[$key], true); 
			}
		}
	}
 
    return $post_id;
}
add_action('save_post','gg_gallery_meta_save');


?>