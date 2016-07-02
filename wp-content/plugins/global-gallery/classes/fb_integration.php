<?php
// facebook SDK initializer 
if (!session_id()) {
	ob_start();
	ob_clean();
	session_start();
}
 
if (version_compare(PHP_VERSION, '5.4.0', '<')) {
  throw new Exception('The Facebook SDK v4 requires PHP version 5.4 or higher.');
}
 


// include required files form Facebook SDK
include_once( 'facebook_sdk-4.0/Facebook/HttpClients/FacebookHttpable.php' );
include_once( 'facebook_sdk-4.0/Facebook/HttpClients/FacebookCurl.php' );
include_once( 'facebook_sdk-4.0/Facebook/HttpClients/FacebookCurlHttpClient.php' );
include_once( 'facebook_sdk-4.0/Facebook/Entities/AccessToken.php' );

include_once( 'facebook_sdk-4.0/Facebook/FacebookSession.php' );
include_once( 'facebook_sdk-4.0/Facebook/FacebookRedirectLoginHelper.php' );
include_once( 'facebook_sdk-4.0/Facebook/FacebookRequest.php' );
include_once( 'facebook_sdk-4.0/Facebook/FacebookResponse.php' );
include_once( 'facebook_sdk-4.0/Facebook/FacebookSDKException.php' );
include_once( 'facebook_sdk-4.0/Facebook/FacebookRequestException.php' );
include_once( 'facebook_sdk-4.0/Facebook/FacebookOtherException.php' );
include_once( 'facebook_sdk-4.0/Facebook/FacebookAuthorizationException.php' );
include_once( 'facebook_sdk-4.0/Facebook/GraphObject.php' );
include_once( 'facebook_sdk-4.0/Facebook/GraphSessionInfo.php' );

use Facebook\FacebookHttpable;
use Facebook\FacebookCurl;
use Facebook\FacebookCurlHttpClient;
use Facebook\AccessToken;

use Facebook\FacebookSession;
use Facebook\FacebookRedirectLoginHelper;
use Facebook\FacebookRequest;
use Facebook\FacebookResponse;
use Facebook\FacebookSDKException;
use Facebook\FacebookRequestException;
use Facebook\FacebookOtherException;
use Facebook\FacebookAuthorizationException;
use Facebook\GraphObject;
use Facebook\GraphSessionInfo;


class gg_fb_utilities {
	public $token;
	
	// setup token
	function __construct() {
		FacebookSession::setDefaultApplication('328245323937836', 'fc667c61baec6c55e2354a21006aef94');
		$this->token = FacebookSession::newAppSession();	
	}
	
	
	// get page ID from username
	function page_url_to_id($url) {
		$pos = strpos($url, '?'); 
		if(strpos($url, '?')) {$url = substr($url, 0, $pos);}
		$url_arr = explode('/', $url);
		
		if(strpos($url, 'pages/')) { return end($url_arr); }
		else {
			$page_username = end($url_arr);

			$request = new FacebookRequest(
				$this->token,
				'GET',
				'/'.$page_username
			);
			$response = $request->execute();
			$graphObject = $response->getGraphObject();
			return $graphObject->getProperty('id');
		}
	}
	
	
	// get page albums
	function page_albums($page_url) {
		$page_id = $this->page_url_to_id($page_url);
		if(!$page_id || !is_numeric($page_id)) {die( __('Connection Error - check the Facebook page URL', 'gg_ml') );}
		
		$request = new FacebookRequest(
			$this->token,
			'GET',
			'/'.$page_id.'/albums?fields=id,name&limit=100' // oct 2014 - limit results to avoid FB limits
		);
		$response = $request->execute();
		$graphObject = $response->getGraphObject()->asArray();	
		
		$data = $graphObject['data'];
		$albums = array();
		if(!is_array($data)) {return $albums;}
		
		foreach($data as $album) {
			$albums[] = array(
				'aid'	=> $album->id,
				'name' 	=> $album->name
			);	
		}
		return $albums;
	}
	
	
	public function album_images($album_id) {
		$data = array();
		
		// cycle 10 times to get 1000 images max
		for($a=0; $a<10; $a++) {
			$offset = 100 * $a;
			$request = new FacebookRequest(
				$this->token,
				'GET',
				'/'.$album_id.'/photos?fields=name,images&limit=100&offset='.$offset // limit to 1000 - could be reduced by FB
			);
			$response = $request->execute();
			$graphObject = $response->getGraphObject()->asArray();	

			if(!isset($graphObject['data']) || !is_array($graphObject['data']) || count($graphObject['data']) == 0) {break;}
			else {$data = array_merge($data, $graphObject['data']);}
		}
		
		$images = array();
		foreach($data as $img) {
			$img_arr = $img->images;
			$name = (isset($img->name)) ? $img->name : '';
			
			$images[] = array(
				'caption' => $name,
				'url' => $img->images[0]->source
			);
		}
		
		return $images;
	}
}

