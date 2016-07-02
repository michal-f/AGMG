<?php
///////////////////////////////////////////////////
// if php v5.3 - include dropbox elements
if( (float)substr(PHP_VERSION, 0, 3) >= 5.3) {
	include_once(GG_DIR . '/dropbox_functions.php');
}
///////////////////////////////////////////////////


// get the current URL
function gg_curr_url() {
	$pageURL = 'http';
	
	if (isset($_SERVER["HTTPS"]) && $_SERVER["HTTPS"] == "on") {$pageURL .= "s";}
	$pageURL .= "://" . $_SERVER['HTTP_HOST'].$_SERVER["REQUEST_URI"];

	return $pageURL;
}
	

// get file extension from a filename
function gg_stringToExt($string) {
	$pos = strrpos($string, '.');
	$ext = strtolower(substr($string,$pos));
	return $ext;	
}


// get filename without extension
function gg_stringToFilename($string, $raw_name = false) {
	$pos = strrpos($string, '.');
	$name = substr($string,0 ,$pos);
	if(!$raw_name) {$name = ucwords(str_replace('_', ' ', $name));}
	return $name;	
}


// string to url format // NEW FROM v1.11 for non-latin characters 
function gg_stringToUrl($string){
	
	// if already exist at least an option, use the default encoding
	if(!get_option('mg_non_latin_char')) {
		$trans = array("à" => "a", "è" => "e", "é" => "e", "ò" => "o", "ì" => "i", "ù" => "u");
		$string = trim(strtr($string, $trans));
		$string = preg_replace('/[^a-zA-Z0-9-.]/', '_', $string);
		$string = preg_replace('/-+/', "_", $string);	
	}
	
	else {$string = trim(urlencode($string));}
	
	return $string;
}


// normalize a url string
function gg_urlToName($string) {
	$string = ucwords(str_replace('_', ' ', $string));
	return $string;	
}


// remove a folder and its contents
function gg_remove_folder($path) {
	if($objs = @glob($path."/*")){
		foreach($objs as $obj) {
			@is_dir($obj)? gg_remove_folder($obj) : @unlink($obj);
		}
	 }
	@rmdir($path);
	return true;
}


// checkbox checked attribute
function gg_checkbox_check($val) {
	return ($val == 1) ? 'checked="checked"' : '';	
}


// sanitize input field values
function gg_sanitize_input($val) {
	return trim(
		str_replace(array('\'', '"', '<', '>'), array('&apos;', '&quot;', '&lt;', '&gt;'), (string)$val)
	);	
}


// convert HEX to RGB
function gg_hex2rgb($hex) {
   	// if is RGB or transparent - return it
   	$pattern = '/^#[a-f0-9]{6}$/i';
	if(empty($hex) || $hex == 'transparent' || !preg_match($pattern, $hex)) {return $hex;}
  
	$hex = str_replace("#", "", $hex);
   	if(strlen($hex) == 3) {
		$r = hexdec(substr($hex,0,1).substr($hex,0,1));
		$g = hexdec(substr($hex,1,1).substr($hex,1,1));
		$b = hexdec(substr($hex,2,1).substr($hex,2,1));
	} else {
		$r = hexdec(substr($hex,0,2));
		$g = hexdec(substr($hex,2,2));
		$b = hexdec(substr($hex,4,2));
	}
	$rgb = array($r, $g, $b);
  
	return 'rgb('. implode(",", $rgb) .')'; // returns the rgb values separated by commas
}


// convert RGB to HEX
function gg_rgb2hex($rgb) {
   	// if is hex or transparent - return it
   	$pattern = '/^#[a-f0-9]{6}$/i';
	if(empty($rgb) || $rgb == 'transparent' || preg_match($pattern, $rgb)) {return $rgb;}

  	$rgb = explode(',', str_replace(array('rgb(', ')'), '', $rgb));
  	
	$hex = "#";
	$hex .= str_pad(dechex( trim($rgb[0]) ), 2, "0", STR_PAD_LEFT);
	$hex .= str_pad(dechex( trim($rgb[1]) ), 2, "0", STR_PAD_LEFT);
	$hex .= str_pad(dechex( trim($rgb[2]) ), 2, "0", STR_PAD_LEFT);

	return $hex; 
}


// get the upload directory (for WP MU)
function gg_wpmu_upload_dir() {
	$dirs = wp_upload_dir();
	$basedir = $dirs['basedir'] . '/YEAR/MONTH';
	
	return $basedir;	
}


// image ID to path
function gg_img_id_to_path($img_src) {
	if(is_numeric($img_src)) {
		$wp_img_data = wp_get_attachment_metadata((int)$img_src);
		if($wp_img_data) {
			$upload_dirs = wp_upload_dir();
			$img_src = $upload_dirs['basedir'] . '/' . $wp_img_data['file'];
		}
	}
	
	return $img_src;
}


// thumbnail source switch between timthumb and ewpt
function gg_thumb_src($img_id, $width = false, $height = false, $quality = 80, $alignment = 'c', $resize = 1, $canvas_col = 'FFFFFF', $fx = array()) {
	if(!$img_id) {return false;}
	
	if(get_option('gg_use_timthumb')) {
		$thumb_url = GG_TT_URL.'?src='.gg_img_id_to_path($img_id).'&w='.$width.'&h='.$height.'&a='.$alignment.'&q='.$quality.'&zc='.$resize.'&cc='.$canvas_col;
	} else {
		$thumb_url = easy_wp_thumb($img_id, $width, $height, $quality, $alignment, $resize, $canvas_col , $fx);
	}	
	
	return $thumb_url;
}


// link field generator
function gg_link_field($src, $val = '') {
	if($src == 'page') {
		$code = '<select name="gg_item_link[]" class="gg_link_field">';
		
		foreach(get_pages() as $pag) {
			($val == $pag->ID) ? $selected = 'selected="selected"' : $selected = '';
			$code .= '<option value="'.$pag->ID.'" '.$selected.'>'.$pag->post_title.'</option>';
		}
		
		return $code . '</select>';
	}
	else if($src == 'custom') {
		return '<input type="text" name="gg_item_link[]" value="'.gg_sanitize_input($val).'" class="gg_link_field" />';
	}
	else {
		return '<input type="hidden" name="gg_item_link[]" value="" />';
	}
}


// giving a gallery ID returns the associated categories
function gg_gallery_cats($gid, $return = 'list') {
	$terms = wp_get_post_terms($gid, 'gg_gall_categories');	
	
	if(count($terms) == 0) {
		return ($return == 'list') ? '' : array();	
	}
	
	$to_return = array();
	foreach($terms as $term) {
		// WPML fix - get original ID
		if (function_exists('icl_object_id')) {
			global $sitepress;
			$term_id = icl_object_id($term->term_id, 'gg_gall_categories', true);
			$term = get_term($term_id, 'gg_gall_categories');
		}
		
		if($return == 'list') {$to_return[] = $term->name;}
		elseif($return == 'class_list') {$to_return[] = 'ggc_'.$term->term_id;}
		else {$to_return[] = $term->term_id;}	
	}
	
	if($return == 'list') {return implode(', ', $to_return);}
	elseif($return == 'class_list') {return implode(' ', $to_return);}
	else {return $to_return;}	
}


// get the gallery first image
function gg_get_gall_first_img($gid, $return = 'img') {
	$autopop = get_post_meta($gid, 'gg_autopop', true);
	$images = gg_gall_data_get($gid, $autopop);

	if(isset($images[0])) { 
		$type = get_post_meta($gid, 'gg_type', true);
		$img_src = gg_img_src_on_type($images[0]['img_src'], $type);

		if($return == 'img') {return $img_src;}
		else {
			$align = (isset($images[0]['thumb'])) ? $images[0]['thumb'] : 'c';
			
			return array(
				'src' => $img_src,
				'align' => $align
			);	
		}
	}
	else {return false;}
}


// giving a category, return the associated galleries
function gg_cat_galleries($cat) {
	if(!$cat) {return false;}
	
	$args = array(
		'posts_per_page'  => -1,
		'post_type'       => 'gg_galleries',
		'post_status'     => 'publish'
	);
	
	if($cat != 'all') {
		$term_data = get_term_by( 'id', $cat, 'gg_gall_categories');	
		$args['gg_gall_categories'] = $term_data->slug;		
	}	
	$raw_galleries = get_posts($args);
	
	$galleries = array();
	foreach($raw_galleries as $gallery) {
		$gid = $gallery->ID;
		$img = gg_get_gall_first_img($gid);
		
		if($img) { 
			$galleries[] = array(  
				'id' =>	$gid,
				'title' => $gallery->post_title,
				'img' => $img,
				'cats' => gg_gallery_cats($gid)
			);
		}
	}
	
	
	if(count($galleries) > 0) {  
		return $galleries;
	} else { 
		return false; 
	}
}


// get all the custom post types
function gg_get_cpt() {
	$args = array(
		'public'   => true,
		'publicly_queryable' => true,
		'_builtin' => false
	);
	$cpt_obj = get_post_types($args, 'objects');
	
	if(count($cpt_obj) == 0) { return false;}
	else {
		$cpt = array();
		foreach($cpt_obj as $id => $obj) {
			$cpt[$id] = $obj->labels->name;	
		}
		
		return $cpt;
	}	
}


// get affected post types for WP gall management
function gg_affected_wp_gall_ct() {
	$basic = array('post','page');	
	$cpt = get_option('gg_extend_wp_gall'); 

	if(is_array($cpt)) {
		$pt = array_merge((array)$basic, (array)$cpt);	
	}
	else {$pt = $basic;}

	return $pt;
}


// return the gallery categories by the chosen order
function gg_order_coll_cats($terms) {
	$ordered = array();
	
	foreach($terms as $term_id) {
		$ord = (int)get_option("gg_cat_".$term_id."_order");
		
		// check the final order
		while( isset($ordered[$ord]) ) {
			$ord++;	
		}
		
		$ordered[$ord] = $term_id;
	}
	
	ksort($ordered, SORT_NUMERIC);
	return $ordered;	
}


// return the collections filter code
function gg_coll_filter_code($terms, $return = 'html') {
	if(!$terms) { return false; }
	else {
		$terms = gg_order_coll_cats($terms);
		$terms_data = array();
		
		$a = 0;
		foreach($terms as $term) {
			$term_data = get_term_by('id', $term, 'gg_gall_categories');
			if(is_object($term_data)) {
				$terms_data[$a] = array('id' => $term, 'name' => $term_data->name, 'slug' => $term_data->slug); 		
				$a++;
			}
		}
		
		if($return == 'html') {
			$coll_terms_list = '<a class="gg_cats_selected ggf ggf_all" rel="*" href="javascript:void(0)">'.__('All', 'gg_ml').'</a>';
			$separator = (get_option('gg_use_old_filters')) ? '<span>/</span>' : '';
			
			foreach($terms_data as $term) {
				$coll_terms_list .= $separator.'<a class="ggf_id_'.$term['id'].' ggf" rel="'.$term['id'].'" href="javascript:void(0)">'.$term['name'].'</a>';	
			}
			
			return $coll_terms_list;
		}
		
		elseif($return == 'dropdown') {
			$code = '<select class="gg_mobile_filter_dd" autocomplete="off">';
			$code .= '<option value="*">'.__('All', 'gg_ml').'</option>';	

			foreach($terms_data as $term) {
				$code .= '<option value="'.$term['id'].'">'.$term['name'].'</option>';	
			}
				
			return $code . '</select>';	
		}
	}
}


// clean emoticons from instagram texts
function gg_clean_emoticons($text) {
    $clean_text = "";

    // Match Emoticons
    $regexEmoticons = '/[\x{1F600}-\x{1F64F}]/u';
    $clean_text = preg_replace($regexEmoticons, '', $text);

    // Match Miscellaneous Symbols and Pictographs
    $regexSymbols = '/[\x{1F300}-\x{1F5FF}]/u';
    $clean_text = preg_replace($regexSymbols, '', $clean_text);

    // Match Transport And Map Symbols
    $regexTransport = '/[\x{1F680}-\x{1F6FF}]/u';
    $clean_text = preg_replace($regexTransport, '', $clean_text);

    return $clean_text;
}


// get RGB color from hex
function gg_hex_to_rgb($hex, $alpha = false) {
	if($alpha) {$alpha = (int)$alpha / 100;}
	
	$hex = str_replace("#", "", $hex);
	if(strlen($hex) == 3) {
	  $r = hexdec(substr($hex,0,1).substr($hex,0,1));
	  $g = hexdec(substr($hex,1,1).substr($hex,1,1));
	  $b = hexdec(substr($hex,2,1).substr($hex,2,1));
	} else {
	  $r = hexdec(substr($hex,0,2));
	  $g = hexdec(substr($hex,2,2));
	  $b = hexdec(substr($hex,4,2));
	}
	
	$rgb = implode(', ', array($r, $g, $b));
	if($alpha) {$rgb .= ', '.$alpha;}
	
	return ($alpha) ? 'rgba('.$rgb.')' : 'rgb('.$rgb.')'; 
}


// preloader code
function gg_preloader() {
	return '
	<div class="gg_loader">
	  <div class="ggl_1"></div>
	  <div class="ggl_2"></div>
	  <div class="ggl_3"></div>
	  <div class="ggl_4"></div>
	</div>';	
}


// pagination layouts
function gg_pag_layouts($type = false) {
	$types = array(
		'standard' 	 => __('Commands + full text', 'gg_ml'),
		'only_num'  => __('Commands + page numbers', 'gg_ml'),
		'only_arr_mb'=> __('Only arrows', 'gg_ml'),
		'only_arr'	 => __('Only arrows - monoblock', 'gg_ml')
	);
	
	if($type === false) {return $types;}
	else {return $types[$type];}
}


// slider cropping methods
function gg_galleria_crop_methods($type = false) {
	$types = array(
		'true' 		=> __('Fit, center and crop', 'gg_ml'),
		'false' 	=> __('Scale down', 'gg_ml'),
		'height'	=> __('Scale to fill the height', 'gg_ml'),
		'width'		=> __('Scale to fill the width', 'gg_ml'),
		'landscape'	=> __('Fit images with landscape proportions', 'gg_ml'),
		'portrait' 	=> __('Fit images with portrait proportions', 'gg_ml')
	);
	
	if($type === false) {return $types;}
	else {return $types[$type];}
}


// slider effects
function gg_galleria_fx($type = false) {
	$types = array(
		'fadeslide' => __('Fade and slide', 'gg_ml'),
		'fade' 		=> __('Fade', 'gg_ml'),
		'flash'		=> __('Flash', 'gg_ml'),
		'pulse'		=> __('Pulse', 'gg_ml'),
		'slide'		=> __('Slide', 'gg_ml'),
		''			=> __('None', 'gg_ml')
	);
	
	if($type === false) {return $types;}
	else {return $types[$type];}
}


// slider thumbs visibility options
function gg_galleria_thumb_opts($type = false) {
	$types = array(
		'always'	=> __('Always', 'gg_ml'),
		'yes' 		=> __('Yes with toggle button', 'gg_ml'),
		'no' 		=> __('No with toggle button', 'gg_ml'),
		'never' 	=> __('Never', 'gg_ml'),
	);
	
	if($type === false) {return $types;}
	else {return $types[$type];}
}


// use cURL to get external url contents
function gg_curl_get_contents($url) {
	@ini_set( 'memory_limit', '256M');
	$ch = curl_init();

	//curl_setopt($ch, CURLOPT_AUTOREFERER, true);
    curl_setopt($ch, CURLOPT_HEADER, 0);
	curl_setopt($ch, CURLOPT_USERAGENT, true);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_URL, $url);

	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 2);
	curl_setopt($ch, CURLOPT_MAXREDIRS, 3);
	curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 5);
	
	// must use it for pinterest -> Feb 2014 
	if(strpos($url, 'pinterest.com') !== false) {
		curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true); 
	}
	
    $data = curl_exec($ch);
    curl_close($ch);
	
	return $data;
}


// check remote file existence
function gg_rm_file_exists($url) {
	$ch = curl_init();

	curl_setopt($ch,CURLOPT_USERAGENT,'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.8.1.13) Gecko/20080311 Firefox/2.0.0.13');
	curl_setopt($ch, CURLOPT_MAXREDIRS, 3);
	curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 2);
	curl_setopt($ch, CURLOPT_NOBODY, true);
	 curl_setopt($ch, CURLOPT_URL, $url);
	
	curl_exec($ch);
	$answer = curl_getinfo($ch, CURLINFO_HTTP_CODE);
	curl_close($ch);
	
	return ($answer != '200') ? false : true;
}


/////////////////////////////////////////////////////////////////////////////


// get imagesize with cURL
function gg_getimagesize($url) {
	@ini_set( 'memory_limit', '256M');
	$ext = gg_stringToExt($url);
	
	// ranges for img type
	switch($ext) {
		case '.jpg': case '.jpeg': $range = 32768; break;
		case '.png': $range = 24; break;
		case '.gif': $range = 10; break;
		default: $range = 9999999999; break;
	}
	
	
	// without curl or for local images
	if(!function_exists('curl_init') || !filter_var($url, FILTER_VALIDATE_URL)) {
		$data = @file_get_contents($url, 0, NULL, 0, $range);
	} else {
		$curlOpt = array(
			CURLOPT_RETURNTRANSFER => true, 
			CURLOPT_HEADER	 => false, 
			CURLOPT_FOLLOWLOCATION => false, // for php safemode
			CURLOPT_ENCODING => '', 
			CURLOPT_AUTOREFERER => true,
			CURLOPT_FAILONERROR	 => true,
			CURLOPT_CONNECTTIMEOUT => 2,
			CURLOPT_TIMEOUT => 2, 
			CURLOPT_MAXREDIRS => 3, 
			CURLOPT_SSL_VERIFYHOST => 0,
			CURLOPT_RANGE => '0-'.$range
		);
		
		$ch = curl_init($url);
		curl_setopt_array($ch, $curlOpt);
		$data = curl_exec($ch);
		curl_close($ch);
	}
	if(strlen($data) == 0) {return false;}

	//
	if($ext == '.png') {
		// avoid errors on tiny png
		if(strlen($data) < 24) {
			list($w, $h) = @getimagesize($url);
			return ($w && $h) ? array($w, $h) : false; 
		}
		
		// The identity for a PNG is 8Bytes (64bits)long
		$ident = unpack('Nupper/Nlower', $data);
		
		// Make sure we get PNG
		if($ident['upper'] !== 0x89504E47 || $ident['lower'] !== 0x0D0A1A0A) {
			return false;
		}

		// Grab the first chunk tag, should be IHDR
		$data = substr($data, 8);
		$chunk = unpack('Nlength/Ntype', $data);
		
		// IHDR must come first, if not we return false
		if($chunk['type'] === 0x49484452) {
			$data = substr($data, 8);
			$info = unpack('NX/NY', $data);
			
			$width = $info['X'];
			$height = $info['Y'];
		}
		else {return false;}
	}
	
	elseif($ext == '.gif') {
		// avoid errors on tiny png
		if(strlen($data) < 10) {
			list($w, $h) = @getimagesize($url);
			return ($w && $h) ? array($w, $h) : false; 
		}
		
		$ident = unpack('nupper/nmiddle/nlower', $data);
		
		// Make sure we get GIF 87a or 89a
		if($ident['upper'] !== 0x4749 || $ident['middle'] !== 0x4638 || ($ident['lower'] !== 0x3761 && $ident['lower'] !== 0x3961)) {
			return false;
		}
		
		$data = substr($data, 6);
		$info = unpack('vX/vY', $data);
		
		$width = $info['X'];
		$height = $info['Y'];
	}
	
	else {
		$im = @imagecreatefromstring($data); // use @ - is normal it returns warnings
		if(!$im) {return false;}
		
		$width = imagesx($im);
		$height = imagesy($im);		
		imagedestroy($im);
	}
			
	return ($width) ? array($width, $height) : false;	
}


/////////////////////////////////////////////////////////////////////////////

// gallery data compress and save
function gg_gall_data_save($gid, $data, $autopop = false, $wp_gall_hash = '') {
	$str = serialize($data);
	if(function_exists('gzcompress') && function_exists('gzuncompress')) {
		$str = gzcompress($str, 9);
	}
	$str = base64_encode($str);
	
	if($autopop){
		delete_post_meta($gid, 'gg_autopop_cache');
		add_post_meta($gid, 'gg_autopop_cache', $str, true); 
	} else {
		delete_post_meta($gid, 'gg_gallery'.$wp_gall_hash);
		add_post_meta($gid, 'gg_gallery'.$wp_gall_hash, $str, true); 
	}

	return true;
}

// gallery data uncompress and get 
function gg_gall_data_get($gid, $autopop = false, $wp_gall_hash = '') {
	if(!$autopop){ $data = get_post_meta($gid, 'gg_gallery'.$wp_gall_hash, true); }
	else 		 { $data = get_post_meta($gid, 'gg_autopop_cache', true) ;}
	
	if(!is_array($data) && !empty($data)) {
		$string = base64_decode($data);
		if(function_exists('gzcompress') && function_exists('gzuncompress') && !empty($string)) {
			$string = gzuncompress($string);
		}
		$data = (array)unserialize($string);
	}
	
	if(!is_array($data) || (count($data) == 1 && !$data[0])) {$data = false;}
	return $data;
}


// images array serialization and compress for pagination
function gg_img_serialize_compress($images_array) {
	$str = serialize($images_array);
	if(function_exists('gzcompress') && function_exists('gzuncompress')) {
		$str = gzcompress($str, 9);
	}
	return base64_encode($str);
}

// images array unserialization and decompress for pagination
function gg_img_unserialize_decompress($string) {
	$string = base64_decode($string);
	if(function_exists('gzcompress') && function_exists('gzuncompress')) {
		$string = gzuncompress($string);
	}
	return unserialize($string);
}

/////////////////////////////////////////////////////////////////////////////


// overlay manager 
function gg_overlay_manager($title = false, $type = false) {
	if(!$type) {$type = get_option('gg_overlay_type');}
	
	$primary = ($type == 'secondary') ? '' : '<div class="gg_main_overlay"><span class="gg_img_title">'.$title.'</span></div>';	
	$secondary = '<div class="gg_sec_overlay gg_'.get_option('gg_sec_overlay', 'tl').'_pos"><span></span></div>';
	
	if(!$type || $type == 'fx') {$final = '';}
	elseif($type == 'primary') 	{$final = $primary;}
	elseif($type == 'secondary'){$final = $secondary;}
	else 						{$final = $secondary . $primary;}
	
	// effects
	$fx = get_option('gg_thumb_fx');
	if ($fx == 'grayscale') {
		$final = $final . '<div class="gg_grayscale_fx gg_photo gg_fx_to_remove"></div>';	
	}
	elseif ($fx == 'blur') {
		$final = $final . '<div class="gg_blur_fx gg_photo gg_fx_to_remove"></div>';	
	}
	
	return $final;
}

/////////////////////////////


// gallery types
function gg_types($type = false) {
	$types = array(
		'wp' 		=> __('Wordpress Library', 'gg_ml'),
		'wp_cat' 	=> __('Wordpress Category', 'gg_ml'),
		'gg_album'	=> __('Global Gallery Album', 'gg_ml'),
		'flickr'	=> __('Flickr Set', 'gg_ml'),
		'instagram'	=> __('Instagram User', 'gg_ml'),
		'pinterest' => __('Pinterest Board', 'gg_ml'),
		'fb'		=> __('Facebook Page Album', 'gg_ml'),
		'picasa'	=> __('Google+ Album', 'gg_ml'),
		'dropbox'	=> __('Dropbox', 'gg_ml'),
		'tumblr'	=> __('Tumblr Blog', 'gg_ml'),
		'ngg'		=> __('nextGEN Gallery', 'gg_ml'),
		'500px'		=> __('500px User', 'gg_ml'),
		'rss'		=> __('RSS Feed', 'gg_ml')
	);
	
	if((float)substr(PHP_VERSION, 0, 3) >= 5.3) {
		$types['dropbox'] = __('Dropbox', 'gg_ml');
	}
	
	if($type === false) {return $types;}
	else {return $types[$type];}
}


// username field label depending on the type
function gg_username_label($type) {
	switch($type) {
		case 'flickr': 		return __('Set URL', 'gg_ml'); break; 
		case 'pinterest': 	return __('Board URL', 'gg_ml'); break;
		case 'fb':			return __('Page URL', 'gg_ml'); break;
		case 'dropbox':		return __('User Token', 'gg_ml'); break;
		case 'tumblr':		return __('Blog URL', 'gg_ml'); break;
		case '500px':		return __('User URL', 'gg_ml'); break;
		case 'rss':			return __('Feed URL', 'gg_ml'); break;
		default: 			return __('Username', 'gg_ml'); break;	
	}
}


// cache intervals
function gg_cache_intervals($time = false) {
	$times = array(
		'1' 	=> __('1 Hour', 'gg_ml'),
		'2' 	=> __('2 Hours', 'gg_ml'),
		'6'		=> __('6 Hours', 'gg_ml'),
		'12'	=> __('12 Hours', 'gg_ml'),
		'24'	=> __('1 Day', 'gg_ml'),
		'72'	=> __('3 Days', 'gg_ml'),
		'168'	=> __('One week', 'gg_ml'), 
		'none'	=> __('Never', 'gg_ml')
	);
	
	if($time === false) {return $times;}
	else {return $times[$time];}	
}


// collection thumb widths
function gg_coll_widths($width = false) {
	$widths = array(
		'1' 		=> '1 '. __('Column', 'gg_ml'),
		'0.5' 		=> '2 '. __('Columns', 'gg_ml'),
		'0.3333'	=> '3 '. __('Columns', 'gg_ml'),
		'0.25'		=> '4 '. __('Columns', 'gg_ml'),
		'0.2'		=> '5 '. __('Columns', 'gg_ml'),
		'0.1666' 	=> '6 '. __('Columns', 'gg_ml'),
	);
	
	if($width === false) {return $widths;}
	else {return $widths[$width];}	
}


// turns float widths into columns number
function gg_float_to_cols_num($float) {	
	$cols = array(
		'1' 		=> 1,
		'0.5' 		=> 2,
		'0.3333'	=> 3,
		'0.25'		=> 4,
		'0.2'		=> 5,
		'0.1666' 	=> 6,
	);	
	return $cols[(string)$float];			
}


// img url grab from a string
function gg_string_to_url($string) {
	preg_match_all('/img[^>]*src *= *["\']?([^"\']*)/i', $string, $output, PREG_PATTERN_ORDER);
	if(isset($output[0][0])) {
		$raw_url = $output[0][0];	
		$url = substr($raw_url, 9);
		
		return $url;
	}
	else {return '';}
}


// get the LCweb lightbox patterns list 
function gg_lcl_patterns_list() {
	$patterns = array();
	$patterns_list = scandir(GG_DIR."/js/lightboxes/lcweb.lightbox/img/patterns");
	
	foreach($patterns_list as $pattern_name) {
		if($pattern_name != '.' && $pattern_name != '..') {
			$patterns[$pattern_name] = substr($pattern_name, 0, -4);
		}
	}
	return $patterns;	
}


// retrieve the gallery option or the default gallery value
function gg_check_default_val($gid, $key, $pointer) {
	if((empty($pointer) || $pointer == 'default') && $pointer !== '0') {return get_option($key);}
	else {return get_post_meta($gid, $key, true);}	
}


// create the frontend css and js
function gg_create_frontend_css() {	
	ob_start();
	require(GG_DIR.'/frontend_css.php');
	
	$css = ob_get_clean();
	if(trim($css) != '') {
		if(!@file_put_contents(GG_DIR.'/css/custom.css', $css, LOCK_EX)) {$error = true;}
	}
	else {
		if(file_exists(GG_DIR.'/css/custom.css'))	{ unlink(GG_DIR.'/css/custom.css'); }
	}
	
	if(isset($error)) {return false;}
	else {return true;}
}


// zend connection for Picasa
function gg_picasa_connect($username, $password) {
	set_include_path(GG_DIR . '/classes/ZendGdata-1.12.3/library/');
	
	require_once('classes/ZendGdata-1.12.3/library/Zend/Loader.php');
	Zend_Loader::loadClass('Zend_Gdata_Photos');
	Zend_Loader::loadClass('Zend_Gdata_ClientLogin');
	Zend_Loader::loadClass('Zend_Gdata_AuthSub');
	
	try {
		$serviceName = Zend_Gdata_Photos::AUTH_SERVICE_NAME;
		$client = Zend_Gdata_ClientLogin::getHttpClient($username, $password, $serviceName);
		return $client;
	}
	catch(Zend_Gdata_App_AuthException $e) {
		return false;	
	}
}


// get Flickr set ID from url
function gg_flickr_set_id($url) {
	if(substr($url, -1) == '/') {$url = substr($url, 0, -1);}
	$url_arr = explode('/', $url);
	
	if(!in_array('sets', $url_arr)) {return false;}
	else {return end($url_arr);}	
}


// get pinterest username and board from url
function gg_pinterest_data($url) {
	if(substr($url, -1) == '/') {$url = substr($url, 0, -1);}
	$url_arr = explode('/', $url);
	$tot = count($url_arr);
	
	$pt_data = array();
	$pt_data['username'] = $url_arr[ ($tot - 2) ];
	$pt_data['board'] = $url_arr[ ($tot - 1) ];
	
	return $pt_data;	
}


// facebook - connect
function gg_fb_connect() {
	include_once(GG_DIR . '/classes/fb_integration.php');
}


// get instagram user ID 
function gg_instagram_user_id($username, $token) {
	$api_url = 'https://api.instagram.com/v1/users/search/?q='.urlencode($username).'&access_token='.urlencode( trim($token));
	$json = gg_curl_get_contents($api_url);

	if($json === false ) {die( __('Error connecting to Instagram', 'gg_ml') .' ..');}
	$data = json_decode($json, true);
	
	if($data['meta']['code'] == 400) {return false;}
	else {
		if(!isset($data['data'][0]['id'])) {die( __('Username not found', 'gg_ml') .' ..');}
		return $data['data'][0]['id'];
	}	
}


// picasa album - ID clean
function gg_picasa_album_id($raw_id) {
	$id_arr = explode('/', $raw_id);
	return end($id_arr);
}


// get 500px username
function gg_500px_username($url) {
	$url_arr = explode('/', $url);
	return end($url_arr);	
}


// dropbox img path to usable one
function gg_dropbox_img_path_man($path) {
	$arr = explode('/', substr($path, 1));
	
	$last = end($arr);
	unset($arr[0]);
	array_pop($arr);
	$arr[2] = rawurlencode($arr[2]);

	$name_clean = rawurlencode(gg_stringToFilename($last, true)) . strtolower(gg_stringToExt($last));
	return '/' . implode('/', $arr) . '/' . $name_clean;	
}


// get GG albums subfolders
function gg_get_albums() {
	$albums = glob( get_option('gg_albums_basepath', GGA_DIR).DIRECTORY_SEPARATOR.'*', GLOB_ONLYDIR);
	
	if(!is_array($albums)) {return array();}
	else {
		$new_albums = array();
		foreach($albums as $album) {
			$arr = explode(DIRECTORY_SEPARATOR, $album);
			$folder = end($arr);
			$new_albums[$folder] = ucwords( str_replace(array('_', '-'), array(' ', ' '), $folder) );
		}
		return $new_albums;
	}
}


// get nextGEN galleries
function gg_get_ngg_galleries($gid = false) {
	global $wpdb;
	$table_name = $wpdb->prefix . "ngg_gallery";	
	
	// check table existing
	if($wpdb->get_var("SHOW TABLES LIKE '". $table_name ."'") != $table_name) {
		die( __('nextGEN gallery plugin seems missing. No trace in the database', 'gg_ml') );	
	}
	
	// specific gallery path condition
	$search = ($gid) ? 'WHERE gid = '. (int)$gid : '';
	$query = $wpdb->get_results("SELECT gid, title, path FROM ". $table_name ." ".$search, ARRAY_A);

	if($gid) {
		// clean base to be usable with WP constants
		$base = $query[0]['path'];
		 
		if(substr($base, 0, 1) == DIRECTORY_SEPARATOR) {$base = substr($base, 1);}
		$base = explode(DIRECTORY_SEPARATOR, $base);
		unset($base[0]);
		
		return implode(DIRECTORY_SEPARATOR, $base);	
	} else {
		return $query;	
	}
}


// given the gallery type - return the image path ready to be used
function gg_img_src_on_type($raw_src, $type) {
	if($type == 'wp' || $type == 'wp_cat' || $type == 'wp_gall') {
		$img_full_src = gg_img_id_to_path($raw_src);	
	} 
	elseif($type == 'gg_album') {
		$img_full_src = get_option('gg_albums_basepath', GGA_DIR) .'/'. $raw_src;	
	}
	elseif($type == 'ngg') {
		$img_full_src = ABSPATH . $raw_src;	
	}
	else {$img_full_src = $raw_src;}	
	
	return str_replace(' ', '%20', $img_full_src);
}


// given the gallery type - return the image url ready to be used
function gg_img_url_on_type($raw_src, $type) {
	if($type == 'wp' || $type == 'wp_cat' || $type == 'wp_gall') {
		$img_url = $src = wp_get_attachment_image_src($raw_src, 'full');
		$img_url = $img_url[0];
	} 
	elseif($type == 'gg_album') {
		$img_url = get_option('gg_albums_baseurl', GGA_URL) .'/'. $raw_src;	
	}
	elseif($type == 'ngg') {
		$img_url = get_site_url() .'/'. $raw_src;	
	}
	else {$img_url = $raw_src;}	
	
	return str_replace(' ', '%20', $img_url);
}


// check for deleted images in a gallery
function gg_gallery_img_exists($images, $gall_type) {
	if(!is_array($images)) {return array();}
	
	$expired = array();
	foreach($images as $index => $val) {
		$img_src = gg_img_src_on_type($val['img_src'], $gall_type);
		
		if(!function_exists('curl_init') || !filter_var($img_src, FILTER_VALIDATE_URL)) {
			if(!@file_get_contents($img_src)) {$expired[] = $index;}
		}
		else {
			if(!gg_rm_file_exists($img_src)) {$expired[] = $index;}
		}
	}
	
	foreach($expired as $index) {
		unset($images[$index]);	
	}
	
	return $images;
}


// update auto-population cache
function gg_autopop_update_cache($gid) {
	$type = get_post_meta($gid, 'gg_type', true);
	$o_max_img = get_post_meta($gid, 'gg_max_images', true);
	$max_img = get_post_meta($gid, 'gg_max_images', true);
	$random = get_post_meta($gid, 'gg_auto_random', true);
	
	// extra data
	switch($type) {
		case 'wp_cat': 	$extra = get_post_meta($gid, 'gg_wp_cat', true); 	break;
		case 'gg_album':$extra = get_post_meta($gid, 'gg_album', true); 	break;
		case 'fb': 		$extra = get_post_meta($gid, 'gg_fb_album', true); 	break;
		case 'picasa': 	$extra = get_post_meta($gid, 'gg_picasa_album', true); break;
		case 'dropbox': $extra = get_post_meta($gid, 'gg_dropbox_album', true); break;
		case 'dropbox': $extra = get_post_meta($gid, 'gg_ngg_gallery', true); break;
		default: 		$extra = ''; break; 	
	}

	// retrieve images
	$img_data = gg_type_get_img_switch($gid, $type, 1, 9999, '', $extra);
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
	
	$to_save = array();
	foreach($to_display as $img) {
		if($type == 'wp' || $type == 'wp_cat') {$img_src = $img['id'];} 
		elseif($type == 'gg_album' || $type == 'ngg') {$img_src = $img['path'];}
		else {$img_src = $img['url'];}

		$exists = ($type != 'wp' && $type != 'wp_cat') ? gg_rm_file_exists($img['url']) : true;
		if($exists) {
			$to_save[] = array( 
				'img_src'	=> $img_src,
				'author'	=> $img['author'],
				'title'		=> $img['title'],
				'descr'		=> $img['descr']
			);	
		}
	}
	
	// if the maximum number is not reached, try to add the old images
	if(count($to_save) < $o_max_img) {
		$old_img = gg_gall_data_get($gid, true);
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
	
	// save the autopop cache
	gg_gall_data_save($gid, $to_save, true);

	// save the creation time
	delete_post_meta($gid, 'gg_autopop_time');
	add_post_meta($gid, 'gg_autopop_time', current_time('timestamp'), true);
	
	return $to_save;
}


// check autopop creation time - if outdated refetch - and return the images array
function gg_autopop_expiry_check($gid) {
	$last_update = (int)get_post_meta($gid, 'gg_autopop_time', true);
	$update_interval = (int)get_post_meta($gid, 'gg_cache_interval', true) * 60 * 60;
	$timestamp = (int)current_time('timestamp');
	
	if($update_interval && $update_interval != 'none' && ($timestamp - $last_update) >= $update_interval) {
		$images = gg_autopop_update_cache($gid);	
	}
	else {$images = gg_gall_data_get($gid, true);}
	
	return $images;
}


// get an existing page ID (for watermark lightbox)
function gg_a_page_id() {
	$args = array(
		'number' => 1,
		'post_status' => 'publish,draft'
	);
	$pages = get_pages();
	
	if(!is_array($pages)) {return 0;}
	else {return $pages[0]->ID;}
}


//////////////////////////////////////////

// switch for types specific options
function gg_type_opt_switch($type, $gid, $username, $psw) {
	switch($type) {
		case 'wp': 			return gg_wp_spec_opt(); break; 
		case 'wp_cat': 		return gg_wp_cat_spec_opt($gid); break;
		case 'gg_album': 	return gg_album_spec_opt($gid); break; 
		case 'flickr': 		return gg_flickr_spec_opt($gid, $username); break; 
		case 'instagram': 	return gg_instagram_spec_opt($gid, $username, $psw); break; 
		case 'pinterest': 	return gg_pinterest_spec_opt($gid, $username); break; 
		case 'fb': 			return gg_fb_spec_opt($gid, $username); break; 	
		case 'picasa': 		return gg_picasa_spec_opt($gid, $username, $psw); break;
		case 'dropbox': 	return gg_dropbox_spec_opt($gid, $username); break;
		case 'tumblr': 		return gg_tumblr_spec_opt($gid, $username); break; 
		case '500px': 		return gg_500px_spec_opt($gid, $username); break;
		case 'ngg': 		return gg_ngg_spec_opt($gid); break;
		case 'rss': 		return gg_rss_spec_opt($gid, $username); break;
		
		default: return false;	
	}
}


// wordpress global images - specific opt
function gg_wp_spec_opt() {
	$opt = '
	<table class="widefat lcwp_table lcwp_metabox_table" style="border: none;">
	  <tr id="gg_img_picker_area">
		<td class="lcwp_label_td" colspan="3">
		  <input type="button" value="'. __('Add to the Gallery', 'gg_ml') .'" id="gg_add_img" class="button-secondary" />
		  <h4>'. __('Choose images', 'gg_ml') .' <span id="gg_total_img_num"></span> <span class="gg_TB gg_upload_img add-new-h2">'. __('Manage Images', 'gg_ml') .'</span>
		  
			<span class="gg_img_search_btn" title="search"></span>
			<input type="text" placeholder="'. __('search', 'gg_ml') .' .." class="gg_img_search" autocomplete="off" />
			<input type="button" class="button-secondary gg_sel_all_btn" value="'. __('Select all', 'gg_ml') .'"/> 
		  </h4>

		  <div id="gg_img_picker"><script type="text/javascript"> gg_load_img_picker(1); </script></div>	
		</td>
	  </tr>
	</table>';	
	
	return $opt;
}


// wordpress category images - specific opt
function gg_wp_cat_spec_opt($gid) {
	$sel_cat = get_post_meta($gid, 'gg_wp_cat', true);
	
	$opt = '
	<h4>Images Source</h4>
	<table class="widefat lcwp_table lcwp_metabox_table" style="border: none;">
	<tr class="gg_imgpckr_cat_sel_wrap">
	  <td class="lcwp_label_td">Choose Gallery</td>
	  <td class="lcwp_field_td">
		<select data-placeholder="'. __('Select a category', 'gg_ml') .' .." name="gg_wp_cat" id="gg_wp_cat" class="lcweb-chosen" tabindex="2">';
			
			foreach( get_categories() as $cat ) {
				($cat->term_id == $sel_cat) ? $sel = 'selected="selected"' : $sel = '';
				$opt .= '<option value="'.$cat->term_id.'" '.$sel.'>'.$cat->name.'</option>'; 
			}

	$opt .= '	
		</select>
	  </td>     
	  <td><span class="info">'. __('Choose the WP gallery to use as image source', 'gg_ml') .'</span></td>
	</tr>
	<tr id="gg_img_picker_area">
	  <td class="lcwp_label_td" colspan="3">
	  	<input type="button" value="Add to the Gallery" id="gg_add_img" class="button-secondary" />
		<h4>
			'. __('Choose images', 'gg_ml') .' <span id="gg_total_img_num"></span>
			<input type="button" class="button-secondary gg_sel_all_btn" value="'. __('Select all', 'gg_ml') .'"/> 
		</h4>
        <div id="gg_img_picker"><script type="text/javascript"> gg_load_img_picker(1); </script></div>	
	  </td>
	</tr>
	</table>';	
	
	return $opt;
}


// GG album images - specific opt
function gg_album_spec_opt($gid) {
	$sel_album = get_post_meta($gid, 'gg_album', true);
	$albums = gg_get_albums();	
	
	if(!$albums || count($albums) == 0) {die('<strong>'. __('No albums found', 'gg_ml') .'</strong>');}
		
	$opt = '
	<h4>Images Source</h4>
	<table class="widefat lcwp_table lcwp_metabox_table" style="border: none;">
	<tr class="gg_imgpckr_cat_sel_wrap">
	  <td class="lcwp_label_td">'. __('Choose an album', 'gg_ml') .'</td>
	  <td class="lcwp_field_td">
		<select data-placeholder="'. __('Select an album', 'gg_ml') .' .." name="gg_album" id="gg_album" class="lcweb-chosen" tabindex="2">';

			foreach($albums as $folder => $name ) {
				($folder == $sel_album) ? $sel = 'selected="selected"' : $sel = '';
				$opt .= '<option value="'.$folder.'" '.$sel.'>'.$name.'</option>'; 
			}

	$opt .= '	
		</select>
	  </td>     
	  <td><span class="info">'. __('Choose the gallery to use as image source', 'gg_ml') .'</span></td>
	</tr>
	<tr id="gg_img_picker_area">
	  <td class="lcwp_label_td" colspan="3">
	  	<input type="button" value="'. __('Add to the Gallery', 'gg_ml') .'" id="gg_add_img" class="button-secondary" />
		<h4>
			'. __('Choose images', 'gg_ml') .' <span id="gg_total_img_num"></span>
			
			<span class="gg_img_search_btn" title="search"></span>
			<input type="text" placeholder="'. __('search', 'gg_ml') .' .." class="gg_img_search" autocomplete="off" />
			<input type="button" class="button-secondary gg_sel_all_btn" value="'. __('Select all', 'gg_ml') .'"/> 
		</h4>
        <div id="gg_img_picker"><script type="text/javascript"> gg_load_img_picker(1); </script></div>	
	  </td>
	</tr>
	</table>';	
	
	return $opt;
}


// Flickr images - specific opt
function gg_flickr_spec_opt($gid, $set_url) {
	$set_id = gg_flickr_set_id($set_url);
	
	if(!$set_id) {die('<strong>'. __('ID not found - please insert a valid set URL', 'gg_ml') .'</strong>');}
	else {
		delete_post_meta($gid, 'gg_username');
		add_post_meta($gid, 'gg_username', $set_url, true);
	}
	
	$opt = '
	<table class="widefat lcwp_table lcwp_metabox_table" style="border: none;">
	  <tr id="gg_img_picker_area">
		<td class="lcwp_label_td" colspan="3">
		  <input type="button" value="'. __('Add to the Gallery', 'gg_ml') .'" id="gg_add_img" class="button-secondary" />
		  <h4>
		  	'. __('Choose images', 'gg_ml') .' <span id="gg_total_img_num"></span>
			<input type="button" class="button-secondary gg_sel_all_btn" value="'. __('Select all', 'gg_ml') .'"/> 
		  </h4>
		  <div id="gg_img_picker"><script type="text/javascript"> gg_load_img_picker(1); </script></div>	
		</td>
	  </tr>
	</table>';	
	
	return $opt;
}


// instagram images - specific opt
function gg_instagram_spec_opt($gid, $username, $token) {

	// check the instagram connection
	$insta_auth = gg_instagram_user_id($username, $token);

	if(!$insta_auth) {die('<strong>'. __('Connection failed - Username or token are wrong', 'gg_ml') .'</strong>');}
	else {
		delete_post_meta($gid, 'gg_username');
		add_post_meta($gid, 'gg_username', $username, true);	
		delete_post_meta($gid, 'gg_psw');
		add_post_meta($gid, 'gg_psw', $token, true);
	}
	
	$opt = '
	<table class="widefat lcwp_table lcwp_metabox_table" style="border: none;">
	  <tr id="gg_img_picker_area">
		<td class="lcwp_label_td" colspan="3">
		  <input type="button" value="'. __('Add to the Gallery', 'gg_ml') .'" id="gg_add_img" class="button-secondary" />
		  <h4>
		  	'. __('Choose images', 'gg_ml') .' <span id="gg_total_img_num"></span>
			<input type="button" class="button-secondary gg_sel_all_btn" value="'. __('Select all', 'gg_ml') .'"/> 
		  </h4>
		  <div id="gg_img_picker"><script type="text/javascript"> gg_load_img_picker(1); </script></div>	
		</td>
	  </tr>
	</table>';	
	
	return $opt;
}


// Pinterest images - specific opt
function gg_pinterest_spec_opt($gid, $board_url) {
	$pos = strpos($board_url, 'pinterest.com/');
	if($pos === false) {die('<strong>'. __('Invalid URL - please insert a valid board URL', 'gg_ml') .'</strong>');}
	else {
		delete_post_meta($gid, 'gg_username');
		add_post_meta($gid, 'gg_username', $board_url, true);
	}
	
	$opt = '
	<table class="widefat lcwp_table lcwp_metabox_table" style="border: none;">
	  <tr id="gg_img_picker_area">
		<td class="lcwp_label_td" colspan="3">
		  <input type="button" value="'. __('Add to the Gallery', 'gg_ml') .'" id="gg_add_img" class="button-secondary" />
		  <h4>
		  	'. __('Choose images', 'gg_ml') .' <span id="gg_total_img_num"></span>
			<input type="button" class="button-secondary gg_sel_all_btn" value="'. __('Select all', 'gg_ml') .'"/> 
		  </h4>
		  <div id="gg_img_picker"><script type="text/javascript"> gg_load_img_picker(1); </script></div>	
		</td>
	  </tr>
	</table>';	
	
	return $opt;
}


// facebook album images - specific opt
function gg_fb_spec_opt($gid, $page_url) {
	$sel_album = get_post_meta($gid, 'gg_fb_album', true);
	
	$session = gg_fb_connect();
	$fb = new gg_fb_utilities;

	// retrieve the albums
	$albums = $fb->page_albums($page_url);
	
	/*$albums = $fb->api(array(
		'method'    => 'fql.query',
		'query'     => 'SELECT aid, name FROM album WHERE owner = "'.$page_id.'"'
	));*/

	$opt = '
	<h4>Images Source</h4>
	<table class="widefat lcwp_table lcwp_metabox_table" style="border: none;">
	<tr class="gg_imgpckr_cat_sel_wrap">
	  <td class="lcwp_label_td">'. __('Choose an Album', 'gg_ml') .'</td>
	  <td class="lcwp_field_td" colspan="2">
		<select data-placeholder="'. __('Select an album', 'gg_ml') .' .." name="gg_fb_album" id="gg_fb_album" class="lcweb-chosen" style="width: 100%; max-width: 500px;">';
			
			foreach($albums as $album) {
				($album['aid'] == $sel_album) ? $sel = 'selected="selected"' : $sel = '';
				$opt .= '<option value="'.$album['aid'].'" '.$sel.'>'.$album['name'].'</option>'; 
			}

	$opt .= '	
		  </select>
		</td>     
	  </tr>
	  <tr id="gg_img_picker_area">
		<td class="lcwp_label_td" colspan="3">
		  <input type="button" value="'. __('Add to the Gallery', 'gg_ml') .'" id="gg_add_img" class="button-secondary" />
		  <h4>
		  	'. __('Choose images', 'gg_ml') .' <span id="gg_total_img_num"></span>
			<input type="button" class="button-secondary gg_sel_all_btn" value="'. __('Select all', 'gg_ml') .'"/> 
		  </h4>
		  <div id="gg_img_picker"><script type="text/javascript"> gg_load_img_picker(1); </script></div>	
		</td>
	</tr>
	</table>';	
	
	return $opt;
}


// picasa images - specific opt
function gg_picasa_spec_opt($gid, $username, $psw) {
	$sel_album = get_post_meta($gid, 'gg_picasa_album', true);
	
	// check the picasa connection
	$google_auth = gg_picasa_connect($username, $psw);
	if(!$google_auth) {die('<strong>'. __('Connection failed - Username or password are wrong', 'gg_ml') .'</strong>');}
	else {
		delete_post_meta($gid, 'gg_username');
		add_post_meta($gid, 'gg_username', $username, true);	
		delete_post_meta($gid, 'gg_psw');
		add_post_meta($gid, 'gg_psw', $psw, true);
	}
	
	// retrieve albums
	$gp = new Zend_Gdata_Photos($google_auth, "Global Gallery");
	$userFeed = $gp->getUserFeed("default");
	
	$albums = array();
	foreach ($userFeed as $userEntry) {
		$raw_id = (string)$userEntry->ID->text;
        $album_id = gg_picasa_album_id($raw_id);
		
		$albums[$album_id] = $userEntry->title->text;
    }
	
	$opt = '
	<h4>Images Source</h4>
	<table class="widefat lcwp_table lcwp_metabox_table" style="border: none;">
	<tr class="gg_imgpckr_cat_sel_wrap">
	  <td class="lcwp_label_td">'. __('Choose an Album', 'gg_ml') .'</td>
	  <td class="lcwp_field_td">
		<select data-placeholder="'. __('Select an album', 'gg_ml') .' .." name="gg_picasa_album" id="gg_picasa_album" class="lcweb-chosen" tabindex="2">';
			
			foreach( $albums as $id => $name ) {
				($id == $sel_album) ? $sel = 'selected="selected"' : $sel = '';
				$opt .= '<option value="'.$id.'" '.$sel.'>'.$name.'</option>'; 
			}

	$opt .= '	
		</select>
	  </td>     
	  <td><span class="info">'. __('Choose the album to use as image source', 'gg_ml') .'</span></td>
	</tr>
	<tr id="gg_img_picker_area">
	  <td class="lcwp_label_td" colspan="3">
	  	<input type="button" value="'. __('Add to the Gallery', 'gg_ml') .'" id="gg_add_img" class="button-secondary" />
	  	<h4>
			'. __('Choose images', 'gg_ml') .' <span id="gg_total_img_num"></span>
			<input type="button" class="button-secondary gg_sel_all_btn" value="'. __('Select all', 'gg_ml') .'"/> 
		</h4>
        <div id="gg_img_picker"><script type="text/javascript"> gg_load_img_picker(1); </script></div>	
	  </td>
	</tr>
	</table>';	
	
	return $opt;
}


// dropbox images - specific opt
function gg_dropbox_spec_opt($gid, $token) {
	if(empty($token)) {die( __('Insert a valid token', 'gg_ml') );}
	
	$sel_album = get_post_meta($gid, 'gg_dropbox_album', true);
	$saved_token = get_post_meta($gid, 'gg_username', true);
	
	// if new token - refetch it
	if($saved_token != $token) {
		$access_token = gg_dropbox_access_token($gid, $token);	
	}
	else {$access_token = get_post_meta($gid, 'gg_dropbox_token', true);}
	
	delete_post_meta($gid, 'gg_username');
	add_post_meta($gid, 'gg_username', $token, true);	
	
	// retrieve albums
	$albums = gg_dropbox_list_albums($gid, $access_token);
	$opt = '
	<h4>Images Source</h4>
	<table class="widefat lcwp_table lcwp_metabox_table" style="border: none;">
	<tr class="gg_imgpckr_cat_sel_wrap">
	  <td class="lcwp_label_td">'. __('Choose an Album', 'gg_ml') .'</td>
	  <td class="lcwp_field_td">
		<select data-placeholder="'. __('Select an album', 'gg_ml') .' .." name="gg_dropbox_album" id="gg_dropbox_album" class="lcweb-chosen" tabindex="2">';
			
			foreach( $albums as $name ) {
				($name == $sel_album) ? $sel = 'selected="selected"' : $sel = '';
				$opt .= '<option value="'.$name.'" '.$sel.'>'.$name.'</option>'; 
			}

	$opt .= '	
		</select>
	  </td>     
	  <td><span class="info">'. __('Choose the album to use as image source', 'gg_ml') .'</span></td>
	</tr>
	<tr id="gg_img_picker_area">
	  <td class="lcwp_label_td" colspan="3">
	  	<input type="button" value="'. __('Add to the Gallery', 'gg_ml') .'" id="gg_add_img" class="button-secondary" />
	  	<h4>
			'. __('Choose images', 'gg_ml') .' <span id="gg_total_img_num"></span>
			<input type="button" class="button-secondary gg_sel_all_btn" value="'. __('Select all', 'gg_ml') .'"/> 
		</h4>
        <div id="gg_img_picker"><script type="text/javascript"> gg_load_img_picker(1); </script></div>	
	  </td>
	</tr>
	</table>';	
	
	return $opt;
}


// tumblr images - specific opt
function gg_tumblr_spec_opt($gid, $url) {
	if(!filter_var($url, FILTER_VALIDATE_URL)) {die('<strong>'. __('Invalid URL - please insert a valid blog URL', 'gg_ml') .'</strong>');}
	else {
		delete_post_meta($gid, 'gg_username');
		add_post_meta($gid, 'gg_username', $url, true);
	}
	
	$opt = '
	<table class="widefat lcwp_table lcwp_metabox_table" style="border: none;">
	  <tr id="gg_img_picker_area">
		<td class="lcwp_label_td" colspan="3">
		  <input type="button" value="'. __('Add to the Gallery', 'gg_ml') .'" id="gg_add_img" class="button-secondary" />
		  <h4>
		  	'. __('Choose images', 'gg_ml') .' <span id="gg_total_img_num"></span>
			<input type="button" class="button-secondary gg_sel_all_btn" value="'. __('Select all', 'gg_ml') .'"/> 
		  </h4>
		  <div id="gg_img_picker"><script type="text/javascript"> gg_load_img_picker(1); </script></div>	
		</td>
	  </tr>
	</table>';	
	
	return $opt;
}


// 500px images - specific opt
function gg_500px_spec_opt($gid, $user_url) {
	$username = gg_500px_username($user_url);
	if(trim($username) == '') {die('<strong>'. __('Invalid URL - please insert a valid user URL', 'gg_ml') .'</strong>');}
	else {
		delete_post_meta($gid, 'gg_username');
		add_post_meta($gid, 'gg_username', $user_url, true);
	}
	
	$opt = '
	<table class="widefat lcwp_table lcwp_metabox_table" style="border: none;">
	  <tr id="gg_img_picker_area">
		<td class="lcwp_label_td" colspan="3">
		  <input type="button" value="'. __('Add to the Gallery', 'gg_ml') .'" id="gg_add_img" class="button-secondary" />
		  <h4>
		  	'. __('Choose images', 'gg_ml') .' <span id="gg_total_img_num"></span>
			<input type="button" class="button-secondary gg_sel_all_btn" value="'. __('Select all', 'gg_ml') .'"/> 
		  </h4>
		  <div id="gg_img_picker"><script type="text/javascript"> gg_load_img_picker(1); </script></div>	
		</td>
	  </tr>
	</table>';	
	
	return $opt;
}


// nextGEN gallery images - specific options
function gg_ngg_spec_opt($gid) {
	$ngg_galls = gg_get_ngg_galleries();
	$sel_gall = get_post_meta($gid, 'gg_ngg_gallery', true);

	$opt = '
	<h4>Images Source</h4>
	<table class="widefat lcwp_table lcwp_metabox_table" style="border: none;">
	<tr class="gg_imgpckr_cat_sel_wrap">
	  <td class="lcwp_label_td">Choose Gallery</td>
	  <td class="lcwp_field_td">
		<select data-placeholder="'. __('Select a gallery', 'gg_ml') .' .." name="gg_ngg_gallery" id="gg_ngg_gallery" class="lcweb-chosen" tabindex="2">';
			
			foreach($ngg_galls as $gall) {
				($gall['gid'] == $sel_gall) ? $sel = 'selected="selected"' : $sel = '';
				$opt .= '<option value="'.$gall['gid'].'" '.$sel.'>'.$gall['title'].'</option>'; 
			}

	$opt .= '	
		</select>
	  </td>     
	  <td><span class="info">'. __('Choose the nextGEN gallery to use as image source', 'gg_ml') .'</span></td>
	</tr>
	<tr id="gg_img_picker_area">
	  <td class="lcwp_label_td" colspan="3">
	  	<input type="button" value="Add to the Gallery" id="gg_add_img" class="button-secondary" />
		<h4>
			'. __('Choose images', 'gg_ml') .' <span id="gg_total_img_num"></span>
			
			<span class="gg_img_search_btn" title="search"></span>
			<input type="text" placeholder="'. __('search', 'gg_ml') .' .." class="gg_img_search" autocomplete="off" />
			<input type="button" class="button-secondary gg_sel_all_btn" value="'. __('Select all', 'gg_ml') .'"/> 
		</h4>
        <div id="gg_img_picker"><script type="text/javascript"> gg_load_img_picker(1); </script></div>	
	  </td>
	</tr>
	</table>';	
	
	return $opt;
}


// rss feed images - specific opt
function gg_rss_spec_opt($gid, $feed_url) {
	if(!filter_var($feed_url, FILTER_VALIDATE_URL)) {die('<strong>'. __('Invalid URL - please insert a valid user feed URL', 'gg_ml') .'</strong>');}
	
	delete_post_meta($gid, 'gg_username');
	add_post_meta($gid, 'gg_username', $feed_url, true);
	
	$opt = '
	<table class="widefat lcwp_table lcwp_metabox_table" style="border: none;">
	  <tr id="gg_img_picker_area">
		<td class="lcwp_label_td" colspan="3">
		  <input type="button" value="'. __('Add to the Gallery', 'gg_ml') .'" id="gg_add_img" class="button-secondary" />
		  <h4>
		  	'. __('Choose images', 'gg_ml') .' <span id="gg_total_img_num"></span>
			<input type="button" class="button-secondary gg_sel_all_btn" value="'. __('Select all', 'gg_ml') .'"/> 
		  </h4>
		  <div id="gg_img_picker"><script type="text/javascript"> gg_load_img_picker(1); </script></div>	
		</td>
	  </tr>
	</table>';	
	
	return $opt;
}


//////////////////////////////////////////


// switch for images lists fetcher depending on the type
function gg_type_get_img_switch($gid, $type, $page = 1, $per_page = 15, $search = '', $extra = array()) {
	switch($type) {
		case 'wp'		: 
			$data = gg_wp_global_images($page, $per_page, $search); 
			$images = $data['images'];
			$img_num = $data['tot'];
			break; 
			
		case 'wp_cat'	: 
			$data = gg_wp_cat_images($page, $per_page, $extra);
			$images = $data['images'];
			$img_num = $data['tot']; 
			break;
			
		case 'gg_album'	: $images = gg_album_images($search, $extra); break; 
		case 'flickr'	: $images = gg_flickr_images($gid); break; 
		case 'instagram': $images = gg_instagram_images($gid); break; 
		case 'pinterest': $images = gg_pinterest_images($gid); break; 
		case 'fb'		: $images = gg_fb_images($extra); break; 	
		case 'picasa'	: $images = gg_picasa_images($gid, $extra); break; 
		case 'dropbox'	: $images = gg_dropbox_images($gid, $extra); break; 
		case 'tumblr'	: $images = gg_tumblr_images($gid); break;
		case '500px'	: $images = gg_500px_images($gid); break; 
		case 'ngg'		: 
			$data = gg_ngg_images($gid, $page, $per_page, $search, $extra); 
			$images = $data['images'];
			$img_num = $data['tot'];
			break; 
			
		case 'rss'		: $images = gg_rss_images($gid); break; 
		
		default: $images = array(); break;	
	}
	
	// global images number
	if(!isset($img_num)) {$img_num = count($images);}
	
	// calculate the total
	$tot_pag = ceil($img_num / $per_page);
	
	// can show more?
	$shown = $per_page * $page;
	$more = ($shown >= $img_num) ? false : true; 
	
	//images array offset
	if(!in_array($type, array('wp', 'wp_cat', 'ngg'))) {
		$to_show = array();
		$offset = $per_page * ($page - 1);
		for($a=$offset; $a <= ($offset + $per_page); $a++) {
			$index = $a -1;
			if(isset($images[$index])) { $to_show[] = $images[$index]; }	
		}
	}
	else {
		$to_show = $images;
	}
	
	return array('img' => $to_show, 'pag' => $page, 'tot_pag' =>$tot_pag, 'more' => $more, 'tot' => $img_num);
}


// Wordpress global images
function gg_wp_global_images($page, $per_page, $search) {
	$query_images_args = array(
		'post_type' => 'attachment', 'post_mime_type' =>'image', 'post_status' => 'inherit', 
		'offset' => (($page - 1) * $per_page),
		'posts_per_page' => $per_page, 
		's' => $search
	);
	
	$query_images = new WP_Query($query_images_args);
	$images = array();

	foreach($query_images->posts as $image) { 
		if(trim($image->guid) != '') {
			$images[] = array(
				'id'	=> $image->ID,
				'path'	=> gg_img_id_to_path($image->ID),
				'url' 	=> $image->guid,
				'author'=> '',  
				'title'	=> $image->post_title,
				'descr'	=> $image->post_content
			);
		}
	}
	return array('tot' => $query_images->found_posts, 'images' => $images);
}


// Wordpress category images
function gg_wp_cat_images($page, $per_page, $cat_id) {
	$query_images_args = array(
		'post_type' => 'post', 'post_status' => 'publish', 'meta_key' => '_thumbnail_id', 
		'offset' => (($page - 1) * $per_page),
		'posts_per_page' => $per_page,
		'cat' => $cat_id 
	);
	
	$query_images = new WP_Query($query_images_args);
	$images = array();
	
	foreach($query_images->posts as $post) {
		$img_id = (int)get_post_thumbnail_id( $post->ID );	
		if(is_int($img_id) && !isset($images[$img_id])) {  // avoid duplicates
			$image = get_post($img_id);
			
			if(isset($image->ID)) {
				$images[] = array(
					'id'	=> $image->ID,
					'path'	=> gg_img_id_to_path($img_id),
					'url' 	=> $image->guid,
					'author'=> '', 
					'title'	=> $image->post_title,
					'descr'	=> $image->post_content
				);
			}
		}
	}
	return array('tot' => $query_images->found_posts, 'images' => $images);
}


// GG album images
function gg_album_images($search, $folder) {
	$path = get_option('gg_albums_basepath', GGA_DIR) . '/'.$folder;
	if(!file_exists($path)) {return array();}
	
	$raw_images = scandir($path);
	unset($raw_images[0], $raw_images[1]);
	
	$images = array();
	foreach($raw_images as $img_url) {
		// select only images
		$ext = strtolower(gg_stringToExt($img_url));
		if(in_array($ext, array('.png', '.jpg', '.jpeg', '.gif')) !== false) {
			$title = gg_stringToFilename($img_url);
			
			if(empty($search) || strpos(strtolower($title), strtolower($search)) !== false) {
				
				// try to get IPTC image info
				@getimagesize($path.'/'.$img_url, $info);
				if(isset($info) && isset($info['APP13'])) {
					$iptc = iptcparse($info['APP13']);

					$title = (get_option('gga_img_title_src') == 'iptc' && isset($iptc['2#005']) && !empty($iptc['2#005'][0])) ? $iptc['2#005'][0] : $title;
					$descr = (isset($iptc['2#120']) && !empty($iptc['2#120'][0])) ? $iptc['2#120'][0] : '';
					
					$author = (isset($iptc['2#080']) && !empty($iptc['2#080'][0])) ? $iptc['2#080'][0] : '';
					if(empty($author)) {
						$author = (isset($iptc['2#116']) && !empty($iptc['2#116'][0])) ? $iptc['2#116'][0] : '';
					}
				}
				else {
					$descr = '';
					$author = '';	
				}

				$images[] = array(
					'path'	=> $folder.'/'.$img_url, 
					'url' 	=> get_option('gg_albums_baseurl', GGA_URL) . '/'.rawurlencode($folder).'/'.$img_url, 
					'author'=> $author,
					'title'	=> $title,
					'descr'	=> $descr
				);	
			}
		}
	}
	
	return $images;
}


// Flickr album images
function gg_flickr_images($gid) {
	$set_id = gg_flickr_set_id( get_post_meta($gid, 'gg_username', true) );
	
	$api_url = 'https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=98d15fe4ecf8fc21d95b4a7b5cac7227&photoset_id='.urlencode($set_id).'&extras=url_m%2C+url_h%2C+url_o&format=json&nojsoncallback=1';
	$json = gg_curl_get_contents($api_url);
	
	if($json === false ) {die( __('Error connecting to Flickr', 'gg_ml').' ..');}
	$data = json_decode($json, true);
	
	if(!is_array($data) || !$set_id) {die( __('Connection Error - check your set URL', 'gg_ml') );}
	if($data['stat'] != 'ok') {die( __('Invalid Set ID - check your set URL', 'gg_ml') );}
	
	$images = array();
	$owner = $data['photoset']['ownername']; 
	foreach ($data['photoset']['photo'] as $image) {
		if		(isset($image['url_o'])) {$img_url = $image['url_o'];}
		elseif	(isset($image['url_h'])) {$img_url = $image['url_h'];} 
		else 							 {$img_url = $image['url_m'];}

		$images[] = array(
			'url' 	=> $img_url, 
			'author'=> $owner,
			'title'	=> gg_clean_emoticons($image['title']),
			'descr'	=> ''
		);
	}
	
	return $images;
}


// Pinterest board images
function gg_pinterest_images($gid) {
	$pt_data = gg_pinterest_data( get_post_meta($gid, 'gg_username', true) );
	
	$feed_url = 'http://pinterest.com/'.urlencode($pt_data['username']).'/'.urlencode($pt_data['board']).'.rss';
	$feed = (string)gg_curl_get_contents($feed_url);
	
	$pos = strpos($feed, '<?xml version="1.0" encoding="utf-8"?>');
	if($pos === false) {die( __('Connection Error - check your board URL', 'gg_ml') );}
	if(!function_exists('simplexml_load_string')) {die( __("Your server doesn't support SimpleXML", 'gg_ml').'  ..');}
	
	$xml = simplexml_load_string($feed);
	
	$images = array();
	foreach ($xml->channel->item as $image) {
		$img_url = gg_string_to_url($image->description);
		$full_img_url = str_replace('/192x/', '/550x/', $img_url);
		
		$pos = strpos($full_img_url, '.pinterest.com');
		if($pos) {
			$new_url = 'http://media-cache-ec' . substr($full_img_url, $pos - 1);
		} else {
			$new_url = $full_img_url;	
		}
		
		$images[] = array(
			'url' 	=> $new_url, 
			'author'=> '',
			'title'	=> gg_clean_emoticons($image->title), 
			'descr'	=> gg_clean_emoticons(strip_tags($image->description))
		);
	}
	
	return $images;
}


// Facebook Page images
function gg_fb_images($album_id) {
	$session = gg_fb_connect();
	$fb = new gg_fb_utilities;
	$query = $fb->album_images($album_id);
	
	// featured images array
	$images = array();
	foreach($query as $image) {
		$images[] = array(
			'url' 	=> str_replace('v/t1.0-9/', '', $image['url']), 
			'author'=> '',
			'title'	=> '',
			'descr'	=> gg_clean_emoticons($image['caption'])
		);
	}
	return $images;
}


// Instagram images
function gg_instagram_images($gid) {
	$user_id = gg_instagram_user_id( get_post_meta($gid, 'gg_username', true), get_post_meta($gid, 'gg_psw', true) );
	$api_url = 'https://api.instagram.com/v1/users/'.$user_id.'/media/recent/?count=1000&access_token='.urlencode( get_post_meta($gid, 'gg_psw', true));

	$json = gg_curl_get_contents($api_url);
	if($json === false ) {die( __('Error connecting to Instagram', 'gg_ml').' ..');}
	
	$data = json_decode($json, true);
	if($data['meta']['code'] == 400) {die( __('Connection Error - Check your username or token', 'gg_ml') );}
	
	// retrieve images
	$images = array();
	foreach ($data['data'] as $image) {
		$descr = (isset($image['caption']['text'])) ? $image['caption']['text'] : '';
		$img_url = (is_array($image['images']['standard_resolution'])) ? $image['images']['standard_resolution']['url'] : $image['images']['standard_resolution'];

		$images[] = array(
			'url' 	=> (string)$img_url, 
			'author'=> $image['user']['full_name'],
			'title'	=> '',
			'descr'	=> gg_clean_emoticons($descr)
		);
	}
	
	return $images;
}


// Google+ album images
function gg_picasa_images($gid, $album_id) {
	$google_auth = gg_picasa_connect( get_post_meta($gid, 'gg_username', true), get_post_meta($gid, 'gg_psw', true) );
	
	// retrieve images
	$gp = new Zend_Gdata_Photos($google_auth, "Global Gallery");
	$query = $gp->newAlbumQuery();
	$query->setImgMax(999);
	$query->setAlbumID($album_id);

	$albumFeed = $gp->getAlbumFeed($query);

	$images = array();
	foreach($albumFeed as $albumEntry) {
		$img_url = $albumEntry->mediaGroup->content[0]->url;
		$big_img_url = str_replace('/s999/', '/s2000/', $img_url);
		
		$images[] = array(
			'url' 	=> $big_img_url, 
			'author'=> '',
			'title'	=> gg_stringToFilename(gg_clean_emoticons( (string)$albumEntry->getTitle()->getText()), true),
			'descr'	=> gg_clean_emoticons( (string)$albumEntry->GetSummary())
		);
	}
	
	if(count($images) != 0) {$images = array_reverse($images);}
	return $images;
}


// tumblr images
function gg_tumblr_images($gid) {
	// get clean domain
	$normalized = strtolower(untrailingslashit(get_post_meta($gid, 'gg_username', true)));
	$domain = str_replace(array('http://', 'https://', 'www.'), '', $normalized);
	
	$images = array();
	for($a=0; $a <= 2; $a++) {
	
	$api_url = 'http://api.tumblr.com/v2/blog/'.$domain.'/posts?api_key=pcCK9NCjhSoA0Yv9TGoXI0vH6YzLRiqKPul9iC6OQ6Pr69l2MV&offset='.($a * 20).'&limit=20';
	
	$json = gg_curl_get_contents($api_url);
	if($json === false ) {die( __('Error connecting to Tumblr', 'gg_ml').' ..');}
	
	$data = json_decode($json, true);
	if(isset($data['meta']['status']) && ($data['meta']['status'] == 401 || $data['meta']['status'] == 404)) {die( __('Connection Error - Check your blog URL', 'gg_ml') );}
	
	// retrieve images - loop to get also multi-image posts
	$author = (isset($data['response']['blog']['title'])) ? $data['response']['blog']['title'] : '';
	foreach ($data['response']['posts'] as $post) {
		if(isset($post['photos'])) {
			$main_descr = gg_clean_emoticons($post['caption']);

			foreach ($post['photos'] as $img) {
				$descr = (!empty($img['caption'])) ? gg_clean_emoticons($img['caption']) : $main_descr;
				$images[] = array(
					'url' 	=> $img['original_size']['url'], 
					'author'=> $author,
					'title'	=> '',
					'descr'	=> strip_tags($descr, '<a>')
				);	
			}
		}
	}
	}
	
	return $images;
}


// 500px images
function gg_500px_images($gid) {
	$username = gg_500px_username(get_post_meta($gid, 'gg_username', true));
	$api_url = 'https://api.500px.com/v1/photos?consumer_key=WfKdStAzpMvU5VLMXKJfboyCUJ0acvIgw60EeYTg&image_size=4&rpp=100&feature=user&username='.urlencode($username);
	
	$json = gg_curl_get_contents($api_url);
	if($json === false ) {die( __('Error connecting to 500px', 'gg_ml').' ..');}
	
	$data = json_decode($json, true);
	if(isset($data['status']) && $data['status'] == 400) {die( __('Connection Error - Check your User URL', 'gg_ml') );}
	
	// retrieve images
	$images = array();
	foreach ($data['photos'] as $image) {
		(isset($image['caption']['text'])) ? $descr = $image['caption']['text'] : $descr = '';
		$images[] = array(
			'url' 	=> $image['image_url'], 
			'author'=> $image['user']['fullname'],
			'title'	=> gg_clean_emoticons($image['name']),
			'descr'	=> gg_clean_emoticons($image['description'])
		);
	}
	
	return $images;
}


// nextGEN gallery images
function gg_ngg_images($gid, $page, $per_page, $search, $gallery) {
	global $wpdb;
	$table_name = $wpdb->prefix . "ngg_pictures";
	
	// get ngg gallery basepath
	$base = gg_get_ngg_galleries($gallery); 
	if(!$base) {die( __('Gallery does not exist. Check in nextGen Gallery panel', 'gg_ml') );}

	// search part
	$search_q = (empty($search)) ? '' : "AND alttext LIKE '%". addslashes($search) ."%'";
	
	//get total
	$wpdb->query($wpdb->prepare("SELECT pid FROM ". $table_name ." WHERE galleryid = %d ".$search_q, $gallery));
	$tot = $wpdb->num_rows;
	
	// get images
	$query = $wpdb->get_results("
		SELECT filename, description, alttext FROM ". $table_name ." 
		WHERE galleryid = '". (int)$gallery ."' ".$search_q."
		LIMIT ". (int)(($page - 1) * $per_page) .", ". (int)$per_page ."", 
		ARRAY_A);
	$images = array();
	
	if(is_array($query)) {
		foreach ($query as $img) {
			$images[] = array(
				'url' 	=> WP_CONTENT_URL .'/'. $base .'/'. $img['filename'], 
				'path' 	=> WP_CONTENT_DIR .'/'. $base .'/'. $img['filename'],
				'author'=> '',
				'title'	=> (isset($img['alttext'])) ? $img['alttext'] : '', 
				'descr'	=> (isset($img['description'])) ? $img['description'] : ''
			);
		}
	}
		
	return array('tot' => $tot, 'images' => $images);
}


// rss feed images
function gg_rss_images($gid) {
	if(!function_exists('simplexml_load_string')) {die( __("Your server doesn't support SimpleXML", 'gg_ml').'  ..');}
	
	$url = get_post_meta($gid, 'gg_username', true);
	$feed = gg_curl_get_contents($url, 'g_feed_api');
	if($feed === false ) {die( __('Error retrieving the feed', 'gg_ml').' ..');}
	
	// check to catch media:content easier
	if(strpos($feed, 'media:content') !== false) {
		$feed = str_replace('media:content', 'ggimage', $feed);	
	}
	
	$xml = simplexml_load_string($feed);
	$images = array();
	foreach ($xml->channel->item as $item) {
		if(isset($item->ggimage)) {
			$img_url = $item->ggimage->attributes()->url;
		} else {
			$img_url = gg_string_to_url($item->description);
		}
		
		if(!empty($img_url)) {
			$images[] = array(
				'url' 	=> $img_url, 
				'author'=> '',
				'title'	=> gg_clean_emoticons($item->title), 
				'descr'	=> substr(gg_clean_emoticons(strip_tags($item->description)), 0, 300) // only first 300 chars
			);
		}
	}
	
	return $images;
}

//////////

// Wordpress gallery images - get and cache
function gg_wp_gall_images($post_id, $img_list, $use_captions = false) {
	$gall_hash = '-'.md5($img_list); 
	$cached_list = get_post_meta($post_id, 'gg_wp_gall_img_list'.$gall_hash, true); 
	
	// if equal to the cached - do anything
	if($img_list == $cached_list) {return true;}
	
	// otherwise fetch everything and compose the gallery array
	else {
		$args = array(
			'post_type' => 'attachment', 
			'post_mime_type' =>'image', 
			'post_status' => 'inherit', 
			'posts_per_page' => -1,
			'orderby' => 'post__in',
			'post__in' => explode(',', $img_list)
		);
		$query = new WP_query($args);

		$images = array();
		foreach($query->posts as $image) {
			if(trim($image->guid) != '') {
				$images[] = array(
					'img_src'	=> $image->ID,
					'thumb' 	=> 'c',
					'author'	=> '',  
					'title'		=> $image->post_title,
					'descr'		=> $image->post_content,
					'link_opt'	=> '', 
					'link'		=> ''
				);
			}
		} 
	
		gg_gall_data_save($post_id, $images, $autopop = false, $gall_hash);
		
		delete_post_meta($post_id, 'gg_wp_gall_img_list'.'-'.md5($cached_list));
		delete_post_meta($post_id, 'gg_wp_gall_img_list'.$gall_hash);
		add_post_meta($post_id, 'gg_wp_gall_img_list'.$gall_hash, $img_list, true); 
	}
	
	return true;
}

///////////////////////////////////////////////////////////////////


// watermarker
function gg_watermark($img_url) {
	$cache_dir = GG_DIR.'/cache';
	$wm = get_option('gg_watermark_img');
	$pos = get_option('gg_watermark_pos');
	$opacity = get_option('gg_watermark_opacity');	
	
	$img_ext = substr(gg_stringToExt($img_url), 1);
	$img_name = gg_stringToFilename($img_url, true);	
	
	$encrypted_name = 'gg_watermarked_'.md5($img_name).'_'.$pos.'_'.$opacity.'.'.$img_ext;
	$destination = $cache_dir.'/'.$encrypted_name;
	
	// check for cached images
	if(file_exists($destination)) { return array(
		'path' => GG_DIR.'/cache/'.$encrypted_name, 
		'url' => GG_URL.'/cache/'.$encrypted_name
	);}
	else {
		include_once(GG_DIR . '/classes/PHPImageWorkshop/src/ImageWorkshop.php');
		@ini_set( 'memory_limit', '256M');

		if(!filter_var($img_url, FILTER_VALIDATE_URL)) {
			$imgLayer = ImageWorkshop::initFromPath($img_url);
		} else {
			$imgLayer = ImageWorkshop::initFromUrl($img_url);	
		}
				
		$watermarkLayer = ImageWorkshop::initFromUrl($wm);
		$watermarkLayer->opacity($opacity);
		
		$imgLayer->addLayer(1, $watermarkLayer, 12, 12, $pos);		 
		$new_image = $imgLayer->getResult();
		
		switch($img_ext) {
			case 'gif' : imagegif($new_image, $destination);
				break;
			case 'png' : imagepng($new_image, $destination, 2);
				break;
			case 'jpg' :
			case 'jpeg' : imagejpeg($new_image, $destination, 95);
				break;
			default : die('format not supported "'.$img_ext.'"'); break;
		}	
		imagedestroy($new_image);
			
		if(!file_exists($destination)) {die( __('error during the image creation', 'gg_ml') );}
		else {return array(
			'path' => GG_DIR.'/cache/'.$encrypted_name, 
			'url' => GG_URL.'/cache/'.$encrypted_name
		);}	
	}
}


///////////////////////////////////////////////////////////////////

// predefined styles 
function gg_predefined_styles($style = '') {
	$styles = array(
		// LIGHTS
		'Light - Standard' => array(
			'gg_standard_hor_margin' => 5,
			'gg_standard_ver_margin' => 5,
			'gg_masonry_margin' => 7,
			'gg_photostring_margin' => 7,
			
			'gg_img_border' => 4,
			'gg_img_radius' => 4,
			'gg_img_shadow' => 1,
			'gg_img_border_color' => '#FFFFFF',
			
			'gg_main_ol_color' => 'rgb(255,255,255)',
			'gg_main_ol_opacity' => 80,
			'gg_main_ol_txt_color' => '#222222',
			'gg_sec_ol_color' => '#555555',
			'gg_icons_col' => '#fcfcfc',
			'gg_txt_u_title_color' => '#444444',
			'gg_txt_u_descr_color' => '#555555',
			
			'preview' => 'light_standard.jpg'
		),
		
		'Light - No Border' => array(
			'gg_standard_hor_margin' => 5,
			'gg_standard_ver_margin' => 5,
			'gg_masonry_margin' => 5,
			'gg_photostring_margin' => 5,
			
			'gg_img_border' => 0,
			'gg_img_radius' => 2,
			'gg_img_shadow' => 1,
			'gg_img_border_color' => '#FFFFFF',
			
			'gg_main_ol_color' => 'rgb(255,255,255)',
			'gg_main_ol_opacity' => 80,
			'gg_main_ol_txt_color' => '#222222',
			'gg_sec_ol_color' => '#555555',
			'gg_icons_col' => '#fcfcfc',
			'gg_txt_u_title_color' => '#444444',
			'gg_txt_u_descr_color' => '#555555',
			
			'preview' => 'light_noborder.jpg'
		),
		
		'Light - Photo Wall' => array(
			'gg_standard_hor_margin' => 0,
			'gg_standard_ver_margin' => 0,
			'gg_masonry_margin' => 0,
			'gg_photostring_margin' => 0,
			
			'gg_img_border' => 0,
			'gg_img_radius' => 0,
			'gg_img_shadow' => 1,
			'gg_img_border_color' => '#CCCCCC',

			'gg_main_ol_color' => 'rgb(255,255,255)',
			'gg_main_ol_opacity' => 80,
			'gg_main_ol_txt_color' => '#222222',
			'gg_sec_ol_color' => '#555555',
			'gg_icons_col' => '#fcfcfc',
			'gg_txt_u_title_color' => '#444444',
			'gg_txt_u_descr_color' => '#555555',
			
			'preview' => 'light_photowall.jpg'
		),
	
		// DARKS
		'Dark - Standard' => array(
			'gg_standard_hor_margin' => 5,
			'gg_standard_ver_margin' => 5,
			'gg_masonry_margin' => 7,
			'gg_photostring_margin' => 7,
			
			'gg_img_border' => 4,
			'gg_img_radius' => 4,
			'gg_img_shadow' => 1,
			'gg_img_border_color' => '#888888',
			
			'gg_main_ol_color' => 'rgb(20,20,20)',
			'gg_main_ol_opacity' => 90,
			'gg_main_ol_txt_color' => '#ffffff',
			'gg_sec_ol_color' => '#bbbbbb',
			'gg_icons_col' => '#555555',
			'gg_txt_u_title_color' => '#fefefe',
			'gg_txt_u_descr_color' => '#f7f7f7',
			
			'preview' => 'dark_standard.jpg'
		),

		'Dark - No Border' => array(
			'gg_standard_hor_margin' => 5,
			'gg_standard_ver_margin' => 5,
			'gg_masonry_margin' => 5,
			'gg_photostring_margin' => 5,
			
			'gg_img_border' => 0,
			'gg_img_radius' => 2,
			'gg_img_shadow' => 1,
			'gg_img_border_color' => '#999999',
			
			'gg_main_ol_color' => 'rgb(20,20,20)',
			'gg_main_ol_opacity' => 90,
			'gg_main_ol_txt_color' => '#ffffff',
			'gg_sec_ol_color' => '#bbbbbb',
			'gg_icons_col' => '#555555',
			'gg_txt_u_title_color' => '#fefefe',
			'gg_txt_u_descr_color' => '#f7f7f7',
			
			'preview' => 'dark_noborder.jpg'
		),
		
		'Dark - Photo Wall' => array(
			'gg_standard_hor_margin' => 0,
			'gg_standard_ver_margin' => 0,
			'gg_masonry_margin' => 0,
			'gg_photostring_margin' => 0,
			
			'gg_img_border' => 0,
			'gg_img_radius' => 0,
			'gg_img_shadow' => 1,
			'gg_img_border_color' => '#999999',
			
			'gg_main_ol_color' => 'rgb(20,20,20)',
			'gg_main_ol_opacity' => 90,
			'gg_main_ol_txt_color' => '#ffffff',
			'gg_sec_ol_color' => '#bbbbbb',
			'gg_icons_col' => '#555555',
			'gg_txt_u_title_color' => '#fefefe',
			'gg_txt_u_descr_color' => '#f7f7f7',

			'preview' => 'dark_photowall.jpg'
		),
	);
		
		
	if($style == '') {return $styles;}
	else {return $styles[$style];}	
}
