<?php
// SHORCODES TO DISPLAY THE GALLERY

/////////////////////////////////////////////////////
// [g-gallery]
function gg_gallery_shortcode( $atts, $content = null ) {
	include_once(GG_DIR . '/functions.php');
	
	extract( shortcode_atts( array(
		'gid' => '',
		'random' => 0,
		'watermark' => 0,
		'wp_gall_hash' => '' // hidden parameter for WP galleries - images list hash
	), $atts ) );

	if($gid == '') {return '';}
	
	// init
	$gallery = '';
	
	$type = (!empty($wp_gall_hash)) ? 'wp_gall' : get_post_meta($gid, 'gg_type', true);
	$raw_layout = get_post_meta($gid, 'gg_layout', true);
	$raw_paginate = get_post_meta($gid, 'gg_paginate', true);
	$thumb_q = get_option('gg_thumb_q', 90);
	$timestamp = current_time( 'timestamp' );
	$unique_id = uniqid();
	
	// layout options
	$layout = gg_check_default_val($gid, 'gg_layout', $raw_layout);
	if($layout == 'standard') {
		$thumb_w = gg_check_default_val($gid, 'gg_thumb_w', $raw_layout);
		if(!$thumb_w) {$thumb_w = 150;}
		
		$thumb_h = gg_check_default_val($gid, 'gg_thumb_h', $raw_layout);
		if(!$thumb_h) {$thumb_h = 150;}
	}
	elseif($layout == 'masonry') { 
		$cols = gg_check_default_val($gid, 'gg_masonry_cols', $raw_layout); 
		(!get_option('gg_masonry_basewidth')) ? $default_w = 960 : $default_w = (int)get_option('gg_masonry_basewidth');
		
		$min_w = get_option('gg_masonry_min_width', 960);
		$col_w = floor( $default_w / $cols );
		if($col_w < $min_w) {$col_w = $min_w;}
	}
	else { 
		$row_h = gg_check_default_val($gid, 'gg_photostring_h', $raw_layout); 
	}
	
	$paginate = gg_check_default_val($gid, 'gg_paginate', $raw_paginate);
	$per_page = (int)gg_check_default_val($gid, 'gg_per_page', $raw_paginate);
	if(!$per_page) {$per_page = 15;}
	
	
	// gallery images array 
	$autopop = get_post_meta($gid, 'gg_autopop', true);
	if(!$autopop) { 
		$images = gg_gall_data_get($gid, false, $wp_gall_hash); 
	}
	else {
		$images = gg_autopop_expiry_check($gid);
		
		$show_authors = get_post_meta($gid, 'gg_auto_author', true);
		$show_titles = get_post_meta($gid, 'gg_auto_title', true);
		$show_descr = get_post_meta($gid, 'gg_auto_descr', true);	
	}
	
	
	// check for expired images
	$last_check = (int)get_post_meta($gid, 'gg_last_check', true);
	$check_interval = (int)get_option('gg_check_interval');
	
	if($check_interval != 'none' && ini_get('allow_url_fopen') && $timestamp - $last_check >= $check_interval) {
		$old_images = $images;
		$images = gg_gallery_img_exists($images, $type);
		
		// if there are differences - overwrite
		if(count($old_images) != count($images)) {
			if(!$autopop) {
				delete_post_meta($gid, 'gg_gallery');
				add_post_meta($gid, 'gg_gallery', $images, true); 	
			}
			else {
				delete_post_meta($gid, 'gg_autopop_cache');
				add_post_meta($gid, 'gg_autopop_cache', $images, true);
			}
		}
		
		delete_post_meta($gid, 'gg_last_check');
		add_post_meta($gid, 'gg_last_check', $timestamp, true);	
	}

	$tot_images_num = count($images);
	if(!is_array($images) || $tot_images_num == 0) {return '';}
		
		
	// use watermarked images	
	if($watermark == '1' && filter_var(get_option('gg_watermark_img'), FILTER_VALIDATE_URL)) {
		for($a=0; $a < $tot_images_num; $a++) {
			if(isset($images[$a]['img_src'])) {
				$orig_src = gg_img_src_on_type($images[$a]['img_src'], $type);
				
				if(trim($orig_src) != '') {
					$new_paths = gg_watermark($orig_src);
					
					$images[$a]['wm_url'] = $new_paths['url'];
					$images[$a]['wm_path'] = $new_paths['path'];
				}
			}
		}
	}
	

	// randomize images 
	if((int)$random == 1) {shuffle($images);}
	
	
	// pagination limit
	if($paginate && $tot_images_num > $per_page) {

		// store serialized images array in a javascript global object 
		$js_pagination = '<script type="text/javascript"> 
		jQuery(document).ready(function($) { 
			if(typeof(gg_temp_data) == "undefined") { gg_temp_data = {};  }
			gg_temp_data["'.$unique_id.'"] = "'. gg_img_serialize_compress($images) .'";
		});
		</script>';
		
		// split images
		$images = array_slice($images, 0, $per_page);
		$tot_pages = ceil( $tot_images_num / $per_page );	
	}
	
	// additional parameters
	if($layout == 'masonry') { $add_param = 'col-num="'.$cols.'" gg-minw="'.$min_w.'"'; }
	elseif($layout == 'string') { $add_param = 'gg-minw="'.get_option('gg_photostring_min_width').'"'; }
	else {$add_param = '';} 
	

	// build
	$gallery .= '
	<div id="'.$unique_id.'" class="gg_gallery_wrap gg_'.$layout.'_gallery gid_'.$gid.'" '.$add_param.'>
      '.gg_preloader().'
	  <div class="gg_container">
	  
	  ';
	  
	  foreach($images as $img) {
		if($autopop && !$show_titles) {$img['title'] = '';}
		if($autopop && !$show_authors) {$img['author'] = '';}
		if($autopop && !$show_descr) {$img['descr'] = '';}  

		if($autopop) {$img['thumb'] = 'c';}
		
		if(isset($img['wm_path'])) {
			$thumb_src =  $img['wm_path'];
			$img_url =  $img['wm_url'];
		} else {
			$thumb_src = gg_img_src_on_type($img['img_src'], $type);
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
	  
	// container height trick for photostring
	if($layout == 'string') {$gallery .= '<div class="gg_string_clear_both" style="clear: both;"></div>';}

	// container closing
	$gallery .= '</div>'; 
	
	
	/////////////////////////
	// pagination
	if($paginate && $tot_images_num > $per_page) {		
		$gallery .= '<div class="gg_paginate gg_pag_'.get_option('gg_pag_style', 'light').'" gg-random="'.$random.'">';
		
		// classic pagination
		if(!get_option('gg_infinite_scroll')) {
			$pag_layout = get_option('gg_pag_layout', 'standard'); 
			$pl_class = '';
			
			if($pag_layout == 'only_num') {$pl_class .= 'gg_pag_onlynum';}
			if($pag_layout == 'only_arr_mb' || $pag_layout == 'only_arr') {$pl_class .= 'gg_only_arr';}
			if($pag_layout == 'only_arr_mb') {$pl_class .= ' gg_monoblock';}
			
			// mid nav - layout code
			if($pag_layout == 'standard') {
				$mid_code = '<div class="gg_nav_mid"><div>'. __('page', 'gg_ml') .' <span>1</span> '. __('of', 'gg_ml') .' '.$tot_pages.'</div></div>';	
			}
			elseif($pag_layout == 'only_num') {
				$mid_code = '<div class="gg_nav_mid"><div><span>1</span> <font>-</font> '.$tot_pages.'</div></div>';	
			}
			else {
				$mid_code = '<div class="gg_nav_mid" style="display: none;"><div><span>1</span> <font>-</font> '.$tot_pages.'</div></div>';
			}
			
			$gallery .= '
			<div class="gg_standard_pag '.$pl_class.'">
				<div class="gg_nav_left gg_prev_page gg_pag_disabled"><div></div></div>
				'.$mid_code.'
				<div class="gg_nav_right gg_next_page"><div></div></div>
			</div>';		
		}
		
		// infinite scroll
		else {
			$gallery .= '
			<div class="gg_infinite_scroll">
				<div class="gg_nav_left"></div>
				<div class="gg_nav_mid"><span>'. __('show more', 'gg_ml') .'</span></div>
				<div class="gg_nav_right"></div>
			  </tr>
			</div>';
		}
		
		$gallery .= '</div>';
	}
	
	$gallery .= '<div style="clear: both;"></div>
	</div>'; // gallery wrap closing
	
	if(isset($js_pagination)) { $gallery .= $js_pagination; }
	
	// ajax suppport
	if(get_option('gg_enable_ajax')) {
		$gallery .= '<script type="text/javascript"> 
		jQuery(document).ready(function($) { 
			if(typeof(gg_galleries_init) == "function") {
				gg_galleries_init("'.$unique_id.'"); 
			}
		});
		</script>';
	}

	$gallery = str_replace(array("\r", "\n", "\t", "\v"), '', $gallery);
	return $gallery;
}
add_shortcode('g-gallery', 'gg_gallery_shortcode');



/////////////////////////////////////////////////////
// [g-collection]
function gg_collection_shortcode( $atts, $content = null ) {
	require_once(GG_DIR . '/functions.php');
	
	extract( shortcode_atts( array(
		'cid' => '',
		'filter' => 0,
		'random' => 0,
	), $atts ) );

	if($cid == '') {return '';}
	
	// init
	$collection = '';
	
	(get_option('gg_thumb_q')) ? $thumb_q = get_option('gg_thumb_q') : $thumb_q = 90;
	$timestamp = current_time( 'timestamp' );
	$unique_id = uniqid();
	
	$thumb_col_w = (float)get_option('gg_coll_thumb_w', 0.3333);
	$thumb_min_w = get_option('gg_coll_thumb_min_w', 200);
	$thumb_h = get_option('gg_coll_thumb_h', 200);
	
	$basewidth = get_option('gg_masonry_basewidth', 960);
	$thumb_w = floor($basewidth * $thumb_col_w);

	// collection elements
	$coll_data = get_term($cid, 'gg_collections');
	$coll_composition = unserialize($coll_data->description);
	
	$coll_galleries = $coll_composition['galleries'];
	$coll_cats = $coll_composition['categories'];
	
	
	// fetch galleries elements
	$galleries = array();
	if(is_array($coll_galleries)) {
		foreach($coll_galleries as $gdata) {
			$gid = $gdata['id'];
			$img_data = gg_get_gall_first_img($gid, 'full');
			
			if($img_data) {
				if($gdata['wmark'] && filter_var(get_option('gg_watermark_img'), FILTER_VALIDATE_URL)) {
					$new_paths = gg_watermark($img_data['src']);	
					$img_data['src'] = $new_paths['path'];
				}
				
				$galleries[] = array(
					'id' => $gid, 
					'thumb' => gg_thumb_src($img_data['src'], $thumb_w, $thumb_h, $thumb_q, $img_data['align']),
					'title' => get_the_title($gid), 
					'rand' => $gdata['rand'],
					'wmark' => $gdata['wmark'],
					'link_subj' => (isset($gdata['link_subj'])) ? $gdata['link_subj'] : 'none',
					'link_val' => (isset($gdata['link_val'])) ? $gdata['link_val'] : '',
					'descr'	=> (isset($gdata['descr'])) ? $gdata['descr'] : ''
				);	
			}
		}
	}
	
	// check for existing galleries
	if(count($galleries) == 0) {return '';}	
		
	// randomize images 
	if((int)$random == 1) {shuffle($galleries);}
	

	// build
	$collection .= '
	<div id="'.$unique_id.'" class="gg_gallery_wrap gg_collection_wrap cid_'.$cid.'" rel="'.$cid.'" col-num="'.gg_float_to_cols_num($thumb_col_w).'" gg-minw="'.$thumb_min_w.'">';
      
	  // table structure start
	  $collection .= '<table class="gg_coll_table">
	  	<tr><td class="gg_coll_table_cell gg_coll_table_first_cell">';
	  
		  // filter
		  if($filter) {
			  $filter_code = gg_coll_filter_code($coll_cats);
			  
			  if($filter_code) {
				  $filter_type = (get_option('gg_use_old_filters')) ? 'gg_old_filters' : 'gg_new_filters';
				  $collection .= '<div id="ggf_'.$cid.'" class="gg_filter '.$filter_type.'">'.$filter_code.'</div>';
			  }
			  
			  // mobile dropdown 
			  if(get_option('mg_dd_mobile_filter')) {
				  $filter_code = gg_coll_filter_code($coll_cats, 'dropdown');
				  
				  if($filter_code) {
					  $collection .= '<div id="ggmf_'.$cid.'" class="gg_mobile_filter">'. $filter_code .'<i></i></div>';
				  }
			  }
		  }
	  
		  // collection container 
		  $collection .= '<div class="gg_coll_outer_container"><div class="gg_container gg_coll_container">'.gg_preloader();
		  $ol_type = get_option('gg_overlay_type');
		  
		  foreach($galleries as $gal) {
			  $gall_cats = gg_gallery_cats($gal['id'], $return = 'class_list');
			  $gall_cats_list = (is_array($gall_cats)) ? '' : $gall_cats;
			 
			  // image link codes
			  if(isset($gal['link_subj']) && trim($gal['link_subj']) != 'none') {
				  if($gal['link_subj'] == 'page') {$thumb_link = get_permalink($gal['link_val']);}
				  else {$thumb_link = $gal['link_val'];}
				  
				  $link_tag = 'gg-link="'.$thumb_link.'"';
				  $add_class = "gg_linked_img";
			  } else {
				  $link_tag = '';
				  $add_class = '';
			  }
			 
			  // title overlay position switch
			  if(get_option('gg_coll_title_under')) {
				$descr = (!empty($gal['descr'])) ? '<div class="gg_img_descr_under">'.$gal['descr'].'</div>' : '';
				
				if($ol_type == 'both') {$inner_ol = gg_overlay_manager('', 'secondary');}
				elseif(get_option('gg_thumb_fx')) {$inner_ol = gg_overlay_manager('', 'fx');}
				else {$inner_ol = '';}

				$outer_ol = '<div class="gg_main_overlay_under"><div class="gg_img_title_under">'.$gal['title'].'</div>'.$descr.'</div>';  
			  } else {
				  $inner_ol = gg_overlay_manager($gal['title']);
				  $outer_ol = ''; 
			  }
			  
			  $collection .= '
			  <div class="gg_img gg_coll_img '.$gall_cats_list.' '.$add_class.'" rel="'.$gal['id'].'" gall-data="'.$gal['id'].';'.$gal['rand'].';'.$gal['wmark'].'" '.$link_tag.' style="width: '.$thumb_w.'px; height: '.$thumb_h.'px; max-width: '.$thumb_w.'px;">
			  	<div class="gg_coll_img_inner">
					<div class="gg_main_img_wrap">
				  		<img src="'.$gal['thumb'].'" alt="'.$gal['title'].'" class="gg_photo gg_main_thumb" />
					</div>
					<div class="gg_overlays">'.$inner_ol.'</div>
				</div>  
				'.$outer_ol.'
			  </div>';	
		  }

		  // container - outer-container closing
		  $collection .= '</div></div>'; 
		  
	// end collection cell and start gallery one
	$collection .= '</td><td class="gg_coll_table_cell">';  
		
		// "back to" elements
		$back_to_str = get_option('gg_coll_back_to');
		if(empty($back_to_str)) {$back_to_str = '&laquo; '.__('Back to collection', 'gg_ml');}
		$btn_style = (get_option('gg_use_old_filters')) ? '' : 'gg_coll_back_to_new_style';
		   
		// gallery container
		$collection .= '	
		<div class="gg_coll_gallery_container">
		   <span id="gg_cgb_'.$unique_id.'" class="gg_coll_go_back '.$btn_style.'">'.$back_to_str.'</span>
		   <div class="gg_gallery_wrap"></div>
		</div>';
	
	// close table and the main wrapper
	$collection .= '</td></tr></table>
		<div style="clear: both;"></div>
	</div>'; // collection wrap closing
	
	// ajax suppport
	if(get_option('gg_enable_ajax')) {
		$collection .= '<script type="text/javascript"> 
		jQuery(document).ready(function($) { 
			if(typeof(gg_galleries_init) == "function") {
				gg_galleries_init("'.$unique_id.'");
			}
		});
		</script>';
	}
	
	$collection = str_replace(array("\r", "\n", "\t", "\v"), '', $collection);
	return $collection;
}
add_shortcode('g-collection', 'gg_collection_shortcode');



/////////////////////////////////////////////////////
// [g-slider]
function gg_slider_shortcode( $atts, $content = null ) {
	require_once(GG_DIR . '/functions.php');
	
	extract( shortcode_atts( array(
		'gid' => '',
		'width' => '100%',
		'height' => '55%', 
		'random' => 0,
		'watermark' => 0,
		'autoplay' => 'auto',
		'wp_gall_hash' => '' // hidden parameter for WP galleries - images list hash
	), $atts ) );

	if($gid == '') {return '';}
	
	// init
	$slider = '';
	
	(get_option('gg_thumb_q')) ? $thumb_q = get_option('gg_thumb_q') : $thumb_q = 90;
	$type = (!empty($wp_gall_hash)) ? 'wp_gall' : get_post_meta($gid, 'gg_type', true);
	$timestamp = current_time('timestamp');
	$unique_id = uniqid();
	$style = get_option('gg_slider_style', 'light');
	$thumbs = get_option('gg_slider_thumbs', 'yes');
	
	// slider thumbs visibility
	$thumbs_class = ($thumbs == 'yes' || $thumbs == 'always') ? 'gg_galleria_slider_show_thumbs' : '';	

	// no border class
	$borders_class = (get_option('gg_slider_no_border')) ? 'gg_slider_no_borders' : '';

	// slider proportions parameter
	if(strpos($height, '%') !== false) {
		$val = (int)str_replace("%", "", $height) / 100;
		$proportions_param = 'asp-ratio="'.$val.'"';
		$proportions_class = "gg_galleria_responsive";
		$slider_h = '';
	} else {
		$proportions_param = '';	
		$proportions_class = "";
		$slider_h = 'height: '.$height.';';
	}

	// gallery images array 
	$autopop = get_post_meta($gid, 'gg_autopop', true);
	if(!$autopop) { 
		$images = gg_gall_data_get($gid, false, $wp_gall_hash); 
	}
	else {
		$images = gg_autopop_expiry_check($gid);
		
		$show_authors = get_post_meta($gid, 'gg_auto_author', true);
		$show_titles = get_post_meta($gid, 'gg_auto_title', true);
		$show_descr = get_post_meta($gid, 'gg_auto_descr', true);	
	}
	
	// check for expired images
	$last_check = (int)get_post_meta($gid, 'gg_last_check', true);
	$check_interval = (int)get_option('gg_check_interval');
	
	if($check_interval != 'none' && ini_get('allow_url_fopen') && $timestamp - $last_check >= $check_interval) {
		$old_images = $images;
		$images = gg_gallery_img_exists($images, $type);
		
		// if there are differences - overwrite
		if(count($old_images) != count($images)) {
			if(!$autopop) {
				delete_post_meta($gid, 'gg_gallery');
				add_post_meta($gid, 'gg_gallery', $images, true); 	
			}
			else {
				delete_post_meta($gid, 'gg_autopop_cache');
				add_post_meta($gid, 'gg_autopop_cache', $images, true);
			}
		}
		
		delete_post_meta($gid, 'gg_last_check');
		add_post_meta($gid, 'gg_last_check', $timestamp, true);	
	}

	$tot_images_num = count($images);
	if(!is_array($images) || $tot_images_num == 0) {return '';}
		
		
	// use watermarked images	
	if($watermark == '1' && filter_var(get_option('gg_watermark_img'), FILTER_VALIDATE_URL)) {
		for($a=0; $a < $tot_images_num; $a++) {
			if(isset($images[$a]['img_src'])) {
				$orig_src = gg_img_src_on_type($images[$a]['img_src'], $type);
				
				if(trim($orig_src) != '') {
					$new_paths = gg_watermark($orig_src);
					
					$images[$a]['wm_url'] = $new_paths['url'];
					$images[$a]['wm_path'] = $new_paths['path'];
				}
			}
		}
	}	

	// randomize images 
	if((int)$random == 1) {shuffle($images);}
	
	// build
	$slider .= '<div id="'.$unique_id.'" gg-autoplay="'.$autoplay.'"
		class="gg_galleria_slider_wrap gg_galleria_slider_'.$style.' '.$thumbs_class.' '.$borders_class.' '.$proportions_class.' ggs_'.$gid.'" 
		style="width: '.$width.'; '.$slider_h.'" '.$proportions_param.'
	>';
	  
	  foreach($images as $img) {
		if($autopop && !$show_authors) {$img['author'] = '';}
		if($autopop && !$show_descr) {$img['descr'] = '';} 
		 
		if($autopop && !$show_titles) {$img['title'] = '';} 
		else {
			if(trim($img['author']) != '') {
				$img['title'] = gg_sanitize_input($img['title']).' &lt;span&gt;by '.gg_sanitize_input(strip_tags($img['author'])).'&lt;/span&gt;';	
			}
		}
		
		// if show author but not the title
		if(trim($img['author']) != '' && trim($img['title']) == '') {
			$img['title'] = '&lt;span&gt;by '.gg_sanitize_input(strip_tags($img['author'])).'&lt;/span&gt;';	
		}
		
		if($autopop) {$img['thumb'] = 'c';}
		
		if(isset($img['wm_path'])) {
			$thumb_src =  $img['wm_path'];
			$large_img =  $img['wm_url'];
		} else {
			$thumb_src =  gg_img_src_on_type($img['img_src'], $type);
			$large_img =  gg_img_url_on_type($img['img_src'], $type);
		}
		
		if(empty($img['descr'])) {$img['descr'] = '&nbsp;';}
		
		$thumb = gg_thumb_src($thumb_src, (int)get_option('gg_slider_thumb_w', 60), (int)get_option('gg_slider_thumb_h', 40), $thumb_q, $img['thumb']);
		$slider .= '
		<a href="'.$large_img.'"><img src="'.gg_sanitize_input($thumb).'" data-big="'.gg_sanitize_input($large_img).'" data-title="'.gg_sanitize_input($img['title']).'" data-description="'.gg_sanitize_input($img['descr']).'" alt="'.gg_sanitize_input($img['title']).'" /></a>';
	}

	$slider .= '<div style="clear: both;"></div>
	</div>'; // slider wrap closing
	
	// slider init
	$slider .= '<script type="text/javascript"> 
	jQuery(document).ready(function($) { 
		if(typeof(gg_galleria_init) == "function") { 
			gg_galleria_show("#'.$unique_id.'");
			gg_galleria_init("#'.$unique_id.'");
		}
	});
	</script>';

	$slider = str_replace(array("\r", "\n", "\t", "\v"), '', $slider);
	return $slider;
}
add_shortcode('g-slider', 'gg_slider_shortcode');
?>