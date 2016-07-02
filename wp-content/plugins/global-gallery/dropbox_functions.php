<?php
// Dropbox functions
// REQUIRES AT LEAST PHP 5.3!!

// dropbox - get access token
function gg_dropbox_access_token($gid, $authCode) {
	require_once(GG_DIR . '/classes/dropbox-php-sdk-1.1.3/lib/Dropbox/autoload.php');
	
	$appInfo = \Dropbox\AppInfo::loadFromJsonFile(GG_DIR . '/classes/dropbox-php-sdk-1.1.3/lcweb_config.json');
	$webAuth = new \Dropbox\WebAuthNoRedirect($appInfo, "GlobalGallery");
	
	//$authorizeUrl = $webAuth->start(); // url to use to get token
	list($accessToken, $dropboxUserId) = $webAuth->finish($authCode);
	
	if(isset($accessToken) && !empty($accessToken)) {
		delete_post_meta($gid, 'gg_dropbox_token');
		add_post_meta($gid, 'gg_dropbox_token', $accessToken, true);
		
		delete_post_meta($gid, 'gg_dropbox_userid');
		add_post_meta($gid, 'gg_dropbox_userid', $dropboxUserId, true);
		return $accessToken; 
	}
	else {die( __('User token incorrect or expired. Try with a new one', 'gg_ml') );}
}


// dropbox - get albums list and save base folder
function gg_dropbox_list_albums($gid, $accessToken, $reFetch_base = false) {
	require_once(GG_DIR . '/classes/dropbox-php-sdk-1.1.3/lib/Dropbox/autoload.php');
	$dbxClient = new \Dropbox\Client($accessToken, "GlobalGallery");
	
	// get public folder name
	if(!get_post_meta($gid, 'gg_dropbox_base_folder', true) || $reFetch_base) {
		
		$data = @$dbxClient->getMetadataWithChildren("/");
		if(!$data || !is_array($data) || !isset($data['contents'])) {die( __('Connection error. Try using a new token', 'gg_ml') );}
		
		$base = false;
		foreach($data['contents'] as $elem) {
			if($elem['icon'] == "folder_public") {
				$base = $elem['path'].'/globalgallery';
			}
		}
		if(!$base) {die( __('Public folder not found', 'gg_ml') );}
		
		delete_post_meta($gid, 'gg_dropbox_base_folder');
		add_post_meta($gid, 'gg_dropbox_base_folder', $base, true);	
	}
	else {$base = get_post_meta($gid, 'gg_dropbox_base_folder', true);}
	
	// get folders list
	$base_data = $dbxClient->getMetadataWithChildren($base);
	
	if($base_data === NULL) {gg_dropbox_list_albums($gid, $accessToken, true);}
	elseif(!is_array($base_data) || !isset($base_data['contents'])) {die( __('Connection error. Try using a new token', 'gg_ml') );}
	else {
		
		$albums = array();
		foreach($base_data['contents'] as $elem) {
			if($elem['icon'] == "folder") {	
				$arr = explode('/', $elem['path']);
				$albums[] = end($arr);
			}
		}
		
		return $albums;	
	}
}


// dropbox album images
function gg_dropbox_images($gid, $folder) {
	$base = get_post_meta($gid, 'gg_dropbox_base_folder', true);
	if(!$base) {return array();}
	
	$accessToken = get_post_meta($gid, 'gg_dropbox_token', true);
	$user_id = get_post_meta($gid, 'gg_dropbox_userid', true);
	
	// catch images
	require_once(GG_DIR . '/classes/dropbox-php-sdk-1.1.3/lib/Dropbox/autoload.php');
	$dbxClient = new \Dropbox\Client($accessToken, "GlobalGallery");
	
	$data = @$dbxClient->getMetadataWithChildren($base.'/'.$folder);
	if($data === NULL) {die( __('Connection error. Check folders name', 'gg_ml') );}
	elseif(!$data || !is_array($data) || !isset($data['contents'])) {die( __('Connection error. Try using a new token', 'gg_ml') );}
	else {
		$images = array();
		foreach($data['contents'] as $elem) {
			if(isset($elem['mime_type']) && ($elem['mime_type'] == "image/jpeg" || $elem['mime_type'] == "image/png" || $elem['mime_type'] == "image/gif")) {	
				$img_url = 'https://dl.dropboxusercontent.com/u/'.$user_id . gg_dropbox_img_path_man($elem['path']);

				$arr = explode('/', $img_url);
				$title = rawurldecode( gg_stringToFilename(end($arr)));
				
				// try to get IPTC image info
				@getimagesize($img_url, $info);
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
					'url' 	=> $img_url, 
					'author'=> $author,
					'title'	=> $title,
					'descr'	=> $descr
				);
			}
		}
		
		return $images;	
	}
}

?>