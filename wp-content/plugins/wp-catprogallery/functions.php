<?php
function cpr_get_def_settings()
{
	$cpr_settings = array('bannerWidth' => '700',
			'bannerHeight' => '650',
			'backgroundColor' => '#FFFFFF',
			'baseColor' => '000000',
			'fullscreen' => '1',
			'transitionTime' => '1.5',
			'autoSlideTimer' => '3',
			'thumbTextSize' => '13',
			'imageEffect' => '1',
			'imageEffectTime' => '1000',
			'imageClosingEffect' => 'default',
			'autoScale' => '1',
			'autoAlign' => '1',
			'gradientColor' => 'E8EBEA',
			'gradientColor1' => 'CCCCCC',
			'show_catdesc_always' => 'yes',
			'ActiveCat' => '1',
			'categoryStatus' => 'show',
			'CatsWidth' => '96',
			'catsHeight' => '72',
			'catsbackColor' => 'E2D289',
			'arrowsColor' => '666666',
			'CatsTitleBarColor' => '000000',
			'CatsTextColor' => 'FFFFFF',
			'catsTextSize' => '10',
			'ImageHeight' => '450',
			'category_id' => '0',
			'thumbListColor' => '000000',
			'thumbListAlpha' => '50',
			'thumbTextColor' => 'FFFFFF',
			'thumbButtonColor' => '515151',
			'thumbButtonOverColor' => '171717',
			'showdesc' => 'yes',
			'descriptionEffect' => '1',
			'descColorBack' => '000000',
			'descTextColor' => 'FFFFFF',
			'backTransperency' => '0',
			'show_price' => 'yes',
			'price_position' => 'TL',
			'price_textsize' => '22',
			'currency_basecolor1' => '#FFFFFF',
			'currency_basecolor1alpha' => '0.8',
			'currency_basecolor2' => '#CECECE',
			'currency_basecolor2alpha' => '0.8',
			'currency_color' => '#FF00CC',
			'currency_coloralpha' => '0.8',
			'currency' => '$',
			'price_basecolor' => '#FF00CC',
			'price_basecoloralpha' => '0.5',
			'price_color' => '#FFFFFF',
			'price_coloralpha' => '1',
			'target' => '_self',
			'wmode' => 'transparent'		
			);
	return $cpr_settings;
}
function __get_cpr_xml_settings($plugContId)
{
	//CPR_PLUGIN_URL.'/price_images/'.$ops['pricebtn_img']
	$ops = get_option('cpr_settings', array());

	$xml_settings = '
	<mobileSettings>
		<currencySymbol>'.$ops['currency'].'</currencySymbol>
		<width>'.$ops['bannerWidth'].'</width>
		<height>'.$ops['bannerHeight'].'</height>
		<containerid>'.$plugContId.'</containerid>
        <heightManual>'.$ops['heightManual'].'</heightManual>
        <mheight1>'.$ops['bannerHeight1'].'</mheight1>
        <mheight2>'.$ops['bannerHeight2'].'</mheight2>
        <mheight3>'.$ops['bannerHeight3'].'</mheight3>
        <mheight4>'.$ops['bannerHeight4'].'</mheight4>
	</mobileSettings>
	<baseDef fullscreen="'.$ops['fullscreen'].'" showCatDescriptionAlways="'.(($ops['show_catdesc_always'] == 'yes') ? 'true' : 'false').'" transitionTime="'.$ops['transitionTime'].'" autoSlideTimer="'.$ops['autoSlideTimer'].'" autoScale="'.$ops['autoScale'].'" autoAlign="'.$ops['autoAlign'].'" gradientColor="0x'.$ops['gradientColor'].'" gradientColor1="0x'.$ops['gradientColor1'].'" CatsWidth="'.$ops['CatsWidth'].'" catsHeight="'.$ops['catsHeight'].'"  catsbackColor="0x'.$ops['catsbackColor'].'" arrowsColor= "0x'.$ops['arrowsColor'].'" CatsTitleBarColor="0x'.$ops['CatsTitleBarColor'].'" CatsTextColor="0x'.$ops['CatsTextColor'].'" catsImagebackColor="0x'.$ops['catsImagebackColor'].'" catsTextSize="'.$ops['catsTextSize'].'" ImageHeight="'.$ops['ImageHeight'].'" thumbListColor="0x'.$ops['thumbListColor'].'" thumbListAlpha="'.$ops['thumbListAlpha'].'" thumbTextColor="0x'.$ops['thumbTextColor'].'" thumbButtonColor="0x'.$ops['thumbButtonColor'].'" thumbButtonOverColor="0x'.$ops['thumbButtonOverColor'].'" thumbTextSize="'.$ops['thumbTextSize'].'" descColorBack="0x'.$ops['descColorBack'].'" descTextColor="0x'.$ops['descTextColor'].'" backTransperency="'.$ops['backTransperency'].'" ActiveCat="'.$ops['ActiveCat'].'"
	categoryStatus="'.$ops['categoryStatus'].'"	
	/>
	<priceTag enabled="'.trim($ops['show_price']).'">
			<position>'.trim($ops['price_position']).'</position>
			<textSize>'.trim($ops['price_textsize']).'</textSize>
			
			<currency>
				<base>
					<color code="'.trim($ops['currency_basecolor1']).'" alpha="'.trim($ops['currency_basecolor1alpha']).'" />

					<color code="'.trim($ops['currency_basecolor2']).'" alpha="'.trim($ops['currency_basecolor2alpha']).'" />


				</base>

				<label color="'.trim($ops['currency_color']).'" alpha="'.trim($ops['currency_coloralpha']).'" />
				<symbol>'.trim($ops['currency']).'</symbol>
			</currency>

			<price>
				<base color="'.trim($ops['price_basecolor']).'" alpha="'.trim($ops['price_basecoloralpha']).'" />
				<label color="'.trim($ops['price_color']).'" alpha="'.trim($ops['price_coloralpha']).'" />
			</price>
	</priceTag>


		<imageEffect>
			<type>'.trim($ops['imageEffect']).'</type>
			<time>'.trim($ops['imageEffectTime']).'</time>
			<closingEffect>'.trim($ops['imageClosingEffect']).'</closingEffect>
		</imageEffect>

			<descriptionEffect>
			<type>'.trim($ops['descriptionEffect']).'</type>
		</descriptionEffect>
';
	return $xml_settings;
}
function cpr_get_album_dir($album_id)
{
	global $gcpr;
	$album_dir = CPR_PLUGIN_UPLOADS_DIR . "/{$album_id}_uploadfolder";
	return $album_dir;
}
/**
 * Get album url
 * @param $album_id
 * @return unknown_type
 */
function cpr_get_album_url($album_id)
{
	global $gcpr;
	$album_url = CPR_PLUGIN_UPLOADS_URL . "/{$album_id}_uploadfolder";
	return $album_url;
}
function cpr_get_table_actions(array $tasks)
{
	?>
	<div class="bulk_actions">
		<form action="" method="post" class="bulk_form">Bulk action
			<select name="task">
				<?php foreach($tasks as $t => $label): ?>
				<option value="<?php print $t; ?>"><?php print $label; ?></option>
				<?php endforeach; ?>
			</select>
			<button class="button-secondary do_bulk_actions" type="submit">Do</button>
		</form>
	</div>
	<?php 
}
function shortcode_display_cpr_gallery($atts)
{
	$vars = shortcode_atts( array(
									'cats' => '',
									'imgs' => '',
								), 
							$atts );
	//extract( $vars );
	
	$ret = display_cpr_gallery($vars);
	return $ret;
}
function display_cpr_gallery($vars)
{
	global $wpdb, $gcpr;
	$ops = get_option('cpr_settings', array());
	//print_r($ops);
	$albums = null;
	$images = null;
	$cids = trim($vars['cats']);
	if (strlen($cids) != strspn($cids, "0123456789,")) {
		$cids = '';
		$vars['cats'] = '';
	}
	$imgs = trim($vars['imgs']);
	if (strlen($imgs) != strspn($imgs, "0123456789,")) {
		$imgs = '';
		$vars['imgs'] = '';
	}
	$categories = '';
	$xml_filename = '';
	if( !empty($cids) && $cids{strlen($cids)-1} == ',')
	{
		$cids = substr($cids, 0, -1);
	}
	if( !empty($imgs) && $imgs{strlen($imgs)-1} == ',')
	{
		$imgs = substr($imgs, 0, -1);
	}
	//check for xml file
	if( !empty($vars['cats']) )
	{
		$xml_filename = "cat_".str_replace(',', '', $cids) . '.xml';	
	}
	elseif( !empty($vars['imgs']))
	{
		$xml_filename = "image_".str_replace(',', '', $imgs) . '.xml';
	}
	else
	{
		$xml_filename = "cpr_all.xml";
	}
	//die(CPR_PLUGIN_XML_DIR . '/' . $xml_filename);


	
	if( !empty($vars['cats']) )
	{
		$query = "SELECT * FROM {$wpdb->prefix}cpr_albums WHERE album_id IN($cids) AND status = 1 ORDER BY `order` ASC";
		//print $query;
		$albums = $wpdb->get_results($query, ARRAY_A);
		$categories .='<content>';
		foreach($albums as $key => $album)
		{
			$images = $gcpr->cpr_get_album_images($album['album_id']);
			$album_dir = cpr_get_album_url($album['album_id']);//CPR_PLUGIN_UPLOADS_URL . '/' . $album['album_id']."_".$album['name'];
			if ($images && !empty($images) && is_array($images)) {
				$categories .='
				
				<category>
					<title><![CDATA['.$album['name'].']]></title>
					<thumb>'.$album_dir."/thumb/".$album['thumb'].'</thumb>'; 

				foreach($images as $key => $img)
				{
					if($img['status'] == 0 ) continue;
					
					if ($ops['showdesc'] == 'yes') {
						$description = '<![CDATA['.strip_tags($img['description']).']]>';
					} else {
						$description =	'';
					}

					if ($ops['show_price'] == 'yes') {
					  if($img['price'] > 0 ){
							$price = $img['price'];
					  }else{
							$price = '';
					  }
					}else{
						$price = '';
					}

$categories .= '<item>
<label>'.$img['title'].'</label>
<thumb>'.$album_dir."/thumb/".$img['thumb'].'</thumb>
<main>'.$album_dir."/big/".$img['image'].'</main>
	<description>'.$description.'</description>
	<link window="'.$ops['target'].'">'.$img['link'].'</link><price><regular>'.$price.'</regular></price></item>';

					
		
				}
				$categories .= '</category>';
			}
		}
		$categories .='</content>';
		//$xml_filename = "cat_".str_replace(',', '', $cids) . '.xml';
	}
	elseif( !empty($vars['imgs']))
	{
		$query = "SELECT * FROM {$wpdb->prefix}cpr_images WHERE image_id IN($imgs) AND status = 1 ORDER BY `order` ASC";
		$images = $wpdb->get_results($query, ARRAY_A);
		$categories .='<content>';
		if ($images && !empty($images) && is_array($images)) {
			$categories .='
				
				<category>
					<title><![CDATA['.$album['name'].']]></title>
					<thumb>'.$album_dir."/thumb/".$album['thumb'].'</thumb>'; 

			foreach($images as $key => $img)
			{
				$album = $gcpr->cpr_get_album($img['category_id']);
				$album_dir = cpr_get_album_url($album['album_id']);//CPR_PLUGIN_UPLOADS_URL . '/' . $album['album_id']."_".$album['name'];
				if( $img['status'] == 0 ) continue;
				
				if ($ops['showdesc'] == 'yes') {
						$description = '<![CDATA['.strip_tags($img['description']).']]>';
					} else {
						$description =	'';
					}

					if ($ops['show_price'] == 'yes') {
					  if($img['price'] > 0 ){
							$price = $img['price'];
					  }else{
							$price = '';
					  }
					}else{
						$price = '';
					}

					$categories .= '<item>
					<label>'.$img['title'].'</label>
						<thumb>'.$album_dir."/thumb/".$img['thumb'].'</thumb>
<main>'.$album_dir."/big/".$img['image'].'</main>
	<description>'.$description.'</description>
	<link window="'.$ops['target'].'">'.$img['link'].'</link><price><regular>'.$price.'</regular></price></item>';
			}
			$categories .= '</category>';
		}
		$categories .='</content>';
	}
	//no values paremeters setted
	else//( empty($vars['cats']) && empty($vars['imgs']))
	{
		$query = "SELECT * FROM {$wpdb->prefix}cpr_albums WHERE status = 1 ORDER BY `order` ASC";
		$albums = $wpdb->get_results($query, ARRAY_A);
		$categories .='<content>';
		foreach($albums as $key => $album)
		{
			$images = $gcpr->cpr_get_album_images($album['album_id']);
			$album_dir = cpr_get_album_url($album['album_id']);//CPR_PLUGIN_UPLOADS_URL . '/' . $album['album_id']."_".$album['name'];
			if ($images && !empty($images) && is_array($images)) {
				$categories .='
				
				<category>
					<title><![CDATA['.$album['name'].']]></title>
					<thumb>'.$album_dir."/thumb/".$album['thumb'].'</thumb>'; 

				foreach($images as $key => $img)
				{
					if($img['status'] == 0 ) continue;
					
					if ($ops['showdesc'] == 'yes') {
						$description = '<![CDATA['.strip_tags($img['description']).']]>';
					} else {
						$description =	'';
					}

					if ($ops['show_price'] == 'yes') {
					  if($img['price'] > 0 ){
							$price = $img['price'];
					  }else{
							$price = '';
					  }
					}else{
						$price = '';
					}

$categories .= '<item>
<label>'.$img['title'].'</label>
	<thumb>'.$album_dir."/thumb/".$img['thumb'].'</thumb>
<main>'.$album_dir."/big/".$img['image'].'</main>
	<description>'.$description.'</description>
	<link window="'.$ops['target'].'">'.$img['link'].'</link><price><regular>'.$price.'</regular></price></item>';

					
		
				}
				$categories .= '</category>';
			}
		}
		$categories .='</content>';
		//$xml_filename = "cpr_all.xml";
	}
	
	$xml_tpl = __get_cpr_xml_template();
    $plugContId= 'gal'.time();
	$settings = __get_cpr_xml_settings($plugContId);
	$xml = str_replace(array('{settings}', '{categories}'), 
						array($settings, $categories), $xml_tpl);
	//write new xml file
	$fh = fopen(CPR_PLUGIN_XML_DIR . '/' . $xml_filename, 'w+');
	fwrite($fh, $xml);
	fclose($fh);
	//print "<h3>Generated filename: $xml_filename</h3>";
	//print $xml;
	if( file_exists(CPR_PLUGIN_XML_DIR . '/' . $xml_filename ) )
	{
		$fh = fopen(CPR_PLUGIN_XML_DIR . '/' . $xml_filename, 'r');
		$xml = fread($fh, filesize(CPR_PLUGIN_XML_DIR . '/' . $xml_filename));
		fclose($fh);
		//print "<h3>Getting xml file from cache: $xml_filename</h3>";
		$ret_str = "<div align='center' id='".$plugContId."'>
		<script language=\"javascript\">AC_FL_RunContent = 0;</script>
<script src=\"".CPR_PLUGIN_URL."/js/AC_RunActiveContent.js\" language=\"javascript\"></script>

		<script language=\"javascript\"> 
	if (AC_FL_RunContent == 0) {
		alert(\"This page requires AC_RunActiveContent.js.\");
	} else {
		AC_FL_RunContent(
			'codebase', 'http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0',
			'width', '".$ops['bannerWidth']."',
			'height', '".$ops['bannerHeight']."',
			'src', '".CPR_PLUGIN_URL."/js/wp_catpro',
			'quality', 'high',
			'pluginspage', 'http://www.macromedia.com/go/getflashplayer',
			'align', 'middle',
			'play', 'true',
			'loop', 'true',
			'scale', 'showall',
			'wmode', '".$ops['wmode']."',
			'devicefont', 'false',
			'id', 'xmlswf_vmcpr',
			'bgcolor', '".$ops['backgroundColor']."',
			'name', 'xmlswf_vmcpr',
			'menu', 'true',
			'allowFullScreen', 'true',
			'allowScriptAccess','sameDomain',
			'mobile', '".CPR_PLUGIN_URL."/xml/".$xml_filename."',
			'movie', '".CPR_PLUGIN_URL."/js/wp_catpro',
			'salign', '',
			'flashVars','xmlfileurl=".CPR_PLUGIN_URL."/xml/$xml_filename&baseColor=".$ops['baseColor']."'
			); //end AC code
	}
</script></div>
";
//echo CPR_PLUGIN_UPLOADS_URL."<hr>";
//		print $xml;
		return $ret_str;
	}
	return true;
}
function __get_cpr_xml_template()
{
	$xml_tpl = '<?xml version="1.0" encoding="UTF-8"?>

<slideshow >
{settings}
{categories}
</slideshow>';
	return $xml_tpl;
}
?>