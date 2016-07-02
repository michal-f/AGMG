<?php
global $wpdb, $gcpr;
$ops = get_option('cpr_settings', array());
//$ops = array_merge($cpr_settings, $ops);
?>
<div class="wrap">
	<h2><?php _e('Create XML File'); ?></h2>
	<form action="" method="post">
		<input type="hidden" name="task" value="save_cpr_settings" />
		<table>
		<tr>
			<td title="<?php _e('Width of object .'); ?>"><?php _e('Gallery Width (px)'); ?></td>
			<td><input type="text" name="settings[bannerWidth]"  value="<?php print @$ops['bannerWidth']; ?>" /></td>
		</tr>		
		<tr>
			<td title="<?php _e('Height of object '); ?>"><?php _e('Gallery Height (px)'); ?></td>
			<td><input type="text" name="settings[bannerHeight]"  value="<?php print @$ops['bannerHeight']; ?>" /></td>
		</tr>

        <tr>
            <td><?php _e('Apply banner height manually (for mobile)'); ?>
                <span style="font-size: 10px;color: #ccc;"><br/>Set banner height manually<br/>(yes=Recommended if different resolution images are shown,<br/> No=Automatically adjust gallery height and ignore below (4)heights)</span>
            </td>
            <td>
                <select name="settings[heightManual]">
                    <option value="no" <?php print (@$ops['heightManual'] == 'no') ? 'selected' : ''; ?>><?php _e('No'); ?></option>
                    <option value="yes" <?php print (@$ops['heightManual'] == 'yes') ? 'selected' : ''; ?>><?php _e('Yes'); ?></option>
                </select>
            </td>
        </tr>

        <tr>
            <td><?php _e('Height1 for width range[768-959](px)'); ?>
                <span style="font-size: 10px;color: #ccc;"><br/>Only tablet(portrait) and phone(landscape)</span>
            </td>
            <td><input type="text" name="settings[bannerHeight1]"   value="<?php print @$ops['bannerHeight1']; ?>" /></td>
        </tr>

        <tr>
            <td><?php _e('Height2 for width range[568-767](px)'); ?>
                <span style="font-size: 10px;color: #ccc;"><br/>Only tablet(landscape)</span>
            </td>
            <td><input type="text" name="settings[bannerHeight2]"   value="<?php print @$ops['bannerHeight2']; ?>" /></td>
        </tr>

        <tr>
            <td><?php _e('Height3 for width range[480-567](px)'); ?>
                <span style="font-size: 10px;color: #ccc;"><br/>Only phone(landscape)</span>
            </td>
            <td><input type="text" name="settings[bannerHeight3]"   value="<?php print @$ops['bannerHeight3']; ?>" /></td>
        </tr>

        <tr>
            <td><?php _e('Height4 for max-width[479](px)'); ?>
                <span style="font-size: 10px;color: #ccc;"><br/>Only phone(portrait)</span>
            </td>
            <td><input type="text" name="settings[bannerHeight4]"   value="<?php print @$ops['bannerHeight4']; ?>" /></td>
        </tr>

		<tr>
			<td title="<?php _e('Flash object background color. For example: #CCCCCC.'); ?>"><?php _e('Gallery Bgcolor'); ?></td>
			<td><input type="text" name="settings[backgroundColor]" class="color {hash:true,caps:false}" value="<?php print @$ops['backgroundColor']; ?>" /></td>
		</tr>		
		<tr>
			<td title="<?php _e('Pre-loader color. For example: 0x000000.'); ?>"><?php _e('Pre-loader color'); ?></td>
			<td><input type="text" name="settings[baseColor]" class="color {hash:false,caps:false}" value="<?php print @$ops['baseColor']; ?>" /></td>
		</tr>		
		<tr>
			<td title="<?php _e('Enable/Disable Full Screen'); ?>"><?php _e('Full Screen'); ?></td>
			<td>
				<input type="radio" name="settings[fullscreen]" value="1" <?php print (@$ops['fullscreen'] == '1') ? 'checked' : ''; ?>><span><?php _e('Enable'); ?></span>
				<input type="radio" name="settings[fullscreen]" value="0" <?php print (@$ops['fullscreen'] == '0') ? 'checked' : ''; ?>><span><?php _e('Disable'); ?></span>		
			</td>
		</tr>				
		<tr>
			<td title="<?php _e('Transition Time.'); ?>"><?php _e('Gallery Transition Time'); ?></td>
			<td><input type="text" name="settings[transitionTime]"  value="<?php print @$ops['transitionTime']; ?>" /></td>
		</tr>				
		<tr>
			<td title="<?php _e('Auto Slide Timer'); ?>"><?php _e('Auto Slide Timer'); ?></td>
			<td><input type="text" name="settings[autoSlideTimer]"  value="<?php print @$ops['autoSlideTimer']; ?>" /></td>
		</tr>		
		<tr>
			<td title="<?php _e('Thumb text size'); ?>"><?php _e('Default text size'); ?></td>
			<td><input type="text" name="settings[thumbTextSize]"  value="<?php print @$ops['thumbTextSize']; ?>" /></td>
		</tr>		
		<tr>
			<td title="<?php _e('Select image transition type'); ?>"><?php _e('Image Effect'); ?></td>
			<td>
				<select name="settings[imageEffect]">
					<option value="1" <?php print (@$ops['imageEffect'] == '1') ? 'selected' : ''; ?>><?php _e('Fade'); ?></option>
					<option value="2" <?php print (@$ops['imageEffect'] == '2') ? 'selected' : ''; ?>><?php _e('zooms out'); ?></option>
					<option value="3" <?php print (@$ops['imageEffect'] == '3') ? 'selected' : ''; ?>><?php _e('Elastic Zoom In'); ?></option>
					<option value="4" <?php print (@$ops['imageEffect'] == '4') ? 'selected' : ''; ?>><?php _e('Blur Zoom Out'); ?></option>
					<option value="5" <?php print (@$ops['imageEffect'] == '5') ? 'selected' : ''; ?>><?php _e('Elastic Slide'); ?></option>
					<option value="6" <?php print (@$ops['imageEffect'] == '6') ? 'selected' : ''; ?>><?php _e('Squares'); ?></option>
					<option value="7" <?php print (@$ops['imageEffect'] == '7') ? 'selected' : ''; ?>><?php _e('Triple Squares'); ?></option>
					<option value="8" <?php print (@$ops['imageEffect'] == '8') ? 'selected' : ''; ?>><?php _e('Horizontal Stripes'); ?></option>
					<option value="9" <?php print (@$ops['imageEffect'] == '9') ? 'selected' : ''; ?>><?php _e('Vertical Stripes'); ?></option>
					<option value="10" <?php print (@$ops['imageEffect'] == '10') ? 'selected' : ''; ?>><?php _e('Waves'); ?></option>
					<option value="11" <?php print (@$ops['imageEffect'] == '11') ? 'selected' : ''; ?>><?php _e('Scales Bars'); ?></option>
					<option value="12" <?php print (@$ops['imageEffect'] == '12') ? 'selected' : ''; ?>><?php _e('Bounce Slide'); ?></option>
					<option value="13" <?php print (@$ops['imageEffect'] == '13') ? 'selected' : ''; ?>><?php _e('Iris'); ?></option>
					<option value="14" <?php print (@$ops['imageEffect'] == '14') ? 'selected' : ''; ?>><?php _e('Alpha Mask'); ?></option>
					<option value="15" <?php print (@$ops['imageEffect'] == '15') ? 'selected' : ''; ?>><?php _e('Intersected Bars'); ?></option>			
				</select>
			</td>
		</tr>		
		<tr>
			<td title="<?php _e('Transition duration in milli seconds'); ?>"><?php _e('Image Transition time'); ?></td>
			<td><input type="text" name="settings[imageEffectTime]"  value="<?php print @$ops['imageEffectTime']; ?>" /></td>
		</tr>		
		<tr>
			<td title="<?php _e('Select image closing transition type. If you want image opening and closing effects same, please select default. If you just want to fade out the image and save some time, then select fade'); ?>"><?php _e('Image closing effect'); ?></td>
			<td>
				<input type="radio" name="settings[imageClosingEffect]" value="fade" <?php print (@$ops['imageClosingEffect'] == 'fade') ? 'checked' : ''; ?>><span><?php _e('Fade out'); ?></span>
				<input type="radio" name="settings[imageClosingEffect]" value="default" <?php print (@$ops['imageClosingEffect'] == 'default') ? 'checked' : ''; ?>><span><?php _e('Default'); ?></span>		
			</td>
		</tr>		
		<tr>
			<td title="<?php _e('Auto scale'); ?>"><?php _e('Auto scale'); ?></td>
			<td>
				<input type="radio" name="settings[autoScale]" value="1" <?php print (@$ops['autoScale'] == '1') ? 'checked' : ''; ?>><span><?php _e('Enable'); ?></span>
				<input type="radio" name="settings[autoScale]" value="0" <?php print (@$ops['autoScale'] == '0') ? 'checked' : ''; ?>><span><?php _e('Disable'); ?></span>		
			</td>
		</tr>		
		<tr>
			<td title="<?php _e('Auto align'); ?>"><?php _e('Auto align'); ?></td>
			<td>
				<input type="radio" name="settings[autoAlign]" value="1" <?php print (@$ops['autoAlign'] == '1') ? 'checked' : ''; ?>><span><?php _e('Enable'); ?></span>
				<input type="radio" name="settings[autoAlign]" value="0" <?php print (@$ops['autoAlign'] == '0') ? 'checked' : ''; ?>><span><?php _e('Disable'); ?></span>		
			</td>
		</tr>		
		<tr>
			<td title="<?php _e('Gradient color'); ?>"><?php _e('Gradient color'); ?></td>
			<td><input type="text" name="settings[gradientColor]" class="color {hash:false,caps:false}" value="<?php print @$ops['gradientColor']; ?>" /></td>
		</tr>				
		<tr>
			<td title="<?php _e('Gradient color 1'); ?>"><?php _e('Gradient color 1'); ?></td>
			<td><input type="text" name="settings[gradientColor1]" class="color {hash:false,caps:false}" value="<?php print @$ops['gradientColor1']; ?>" /></td>
		</tr>		
		<tr>
			<td title="<?php _e('Show Category Name'); ?>"><?php _e('Show Category Name'); ?></td>
			<td>
				<input type="radio" name="settings[show_catdesc_always]" value="yes" <?php print (@$ops['show_catdesc_always'] == 'yes') ? 'checked' : ''; ?>><span><?php _e('All Ways'); ?></span>
				<input type="radio" name="settings[show_catdesc_always]" value="no" <?php print (@$ops['show_catdesc_always'] == 'no') ? 'checked' : ''; ?>><span><?php _e('On Mouseover'); ?></span>		
			</td>
		</tr>		
		<tr>
			<td title="<?php _e('Enter category number which you want to load default. If there are 5 categories and you want to load first one, use 1, if you want to load last one use 5'); ?>"><?php _e('Default load category'); ?></td>
			<td><input type="text" name="settings[ActiveCat]"  value="<?php print @$ops['ActiveCat']; ?>" /></td>
		</tr>		
		<tr>
			<td title="<?php _e('Show or hide category images below the full image'); ?>"><?php _e('Category images'); ?></td>
			<td>
				<input type="radio" name="settings[categoryStatus]" value="show" <?php print (@$ops['categoryStatus'] == 'show') ? 'checked' : ''; ?>><span><?php _e('show'); ?></span>
				<input type="radio" name="settings[categoryStatus]" value="hide" <?php print (@$ops['categoryStatus'] == 'hide') ? 'checked' : ''; ?>><span><?php _e('hide'); ?></span>		
			</td>
		</tr>		
		<tr>
			<td title="<?php _e('Categories width'); ?>"><?php _e('Categories Thumb width'); ?></td>
			<td><input type="text" name="settings[CatsWidth]"  value="<?php print @$ops['CatsWidth']; ?>" /></td>
		</tr>				
		<tr>
			<td title="<?php _e('Categories height'); ?>"><?php _e('Categories Thumb height'); ?></td>
			<td><input type="text" name="settings[catsHeight]"  value="<?php print @$ops['catsHeight']; ?>" /></td>
		</tr>				
		<tr>
			<td title="<?php _e('Categories background color'); ?>"><?php _e('Categories back color'); ?></td>
			<td><input type="text" name="settings[catsbackColor]" class="color {hash:false,caps:false}" value="<?php print @$ops['catsbackColor']; ?>" /></td>
		</tr>				
		<tr>
			<td title="<?php _e('Arrows color'); ?>"><?php _e('Next/Prev Catedory Arrowcolor'); ?></td>
			<td><input type="text" name="settings[arrowsColor]" class="color {hash:false,caps:false}" value="<?php print @$ops['arrowsColor']; ?>" /></td>
		</tr>				
		<tr>
			<td title="<?php _e('Categories title Bgcolor'); ?>"><?php _e('Categories title Bgcolor'); ?></td>
			<td><input type="text" name="settings[CatsTitleBarColor]" class="color {hash:false,caps:false}" value="<?php print @$ops['CatsTitleBarColor']; ?>" /></td>
		</tr>				
		<tr>
			<td title="<?php _e('Categories text color'); ?>"><?php _e('Categories text color'); ?></td>
			<td><input type="text" name="settings[CatsTextColor]" class="color {hash:false,caps:false}" value="<?php print @$ops['CatsTextColor']; ?>" /></td>
		</tr>					
		<tr>
			<td title="<?php _e('Categories text size'); ?>"><?php _e('Categories text size'); ?></td>
			<td><input type="text" name="settings[catsTextSize]"  value="<?php print @$ops['catsTextSize']; ?>" /></td>
		</tr>		
		<tr>
			<td title="<?php _e('Image height'); ?>"><?php _e('Image height'); ?></td>
			<td><input type="text" name="settings[ImageHeight]"  value="<?php print @$ops['ImageHeight']; ?>" /></td>
		</tr>		
		<tr>
			<td title="<?php _e('Enter comma seperated Category Id-s if you would like to display products related to a perticular Categories or enter 0 for to show all categories'); ?>"><?php _e('Category Id'); ?></td>
			<td><input type="text" name="settings[category_id]"  value="<?php print @$ops['category_id']; ?>" /></td>
		</tr>		
		<tr>
			<td title="<?php _e('control bar background color'); ?>"><?php _e('Control Bar Color'); ?></td>
			<td><input type="text" name="settings[thumbListColor]" class="color {hash:false,caps:false}" value="<?php print @$ops['thumbListColor']; ?>" /></td>
		</tr>				
		<tr>
			<td title="<?php _e('Value can vary from 0 to 1. 1 is full transparent. 0 is no alpha.'); ?>"><?php _e('Control Bar Alpha'); ?></td>
			<td>
				<select name="settings[thumbListAlpha]">
					<option value="0" <?php print (@$ops['thumbListAlpha'] == '0') ? 'selected' : ''; ?>><?php _e('0'); ?></option>
					<option value="10" <?php print (@$ops['thumbListAlpha'] == '10') ? 'selected' : ''; ?>><?php _e('0.1'); ?></option>
					<option value="20" <?php print (@$ops['thumbListAlpha'] == '20') ? 'selected' : ''; ?>><?php _e('0.2'); ?></option>
					<option value="30" <?php print (@$ops['thumbListAlpha'] == '30') ? 'selected' : ''; ?>><?php _e('0.3'); ?></option>
					<option value="40" <?php print (@$ops['thumbListAlpha'] == '40') ? 'selected' : ''; ?>><?php _e('0.4'); ?></option>
					<option value="50" <?php print (@$ops['thumbListAlpha'] == '50') ? 'selected' : ''; ?>><?php _e('0.5'); ?></option>
					<option value="60" <?php print (@$ops['thumbListAlpha'] == '60') ? 'selected' : ''; ?>><?php _e('0.6'); ?></option>
					<option value="70" <?php print (@$ops['thumbListAlpha'] == '70') ? 'selected' : ''; ?>><?php _e('0.7'); ?></option>
					<option value="80" <?php print (@$ops['thumbListAlpha'] == '80') ? 'selected' : ''; ?>><?php _e('0.8'); ?></option>
					<option value="90" <?php print (@$ops['thumbListAlpha'] == '90') ? 'selected' : ''; ?>><?php _e('0.9'); ?></option>
					<option value="100" <?php print (@$ops['thumbListAlpha'] == '100') ? 'selected' : ''; ?>><?php _e('1'); ?></option>	
				</select>
			</td>
		</tr>				
		<tr>
			<td title="<?php _e('Thumb text color'); ?>"><?php _e('Navigation text color'); ?></td>
			<td><input type="text" name="settings[thumbTextColor]" class="color {hash:false,caps:false}" value="<?php print @$ops['thumbTextColor']; ?>" /></td>
		</tr>				
		<tr>
			<td title="<?php _e('Thumb button color'); ?>"><?php _e('Navigation button color'); ?></td>
			<td><input type="text" name="settings[thumbButtonColor]" class="color {hash:false,caps:false}" value="<?php print @$ops['thumbButtonColor']; ?>" /></td>
		</tr>				
		<tr>
			<td title="<?php _e('Navigation button over color'); ?>"><?php _e('Navigation button over color'); ?></td>
			<td><input type="text" name="settings[thumbButtonOverColor]" class="color {hash:false,caps:false}" value="<?php print @$ops['thumbButtonOverColor']; ?>" /></td>
		</tr>					
		<tr>
			<td title="<?php _e('Show/Hide Description.'); ?>"><?php _e('Show Description'); ?></td>
			<td>
				<input type="radio" name="settings[showdesc]" value="yes" <?php print (@$ops['showdesc'] == 'yes') ? 'checked' : ''; ?>><span><?php _e('Yes'); ?></span>
				<input type="radio" name="settings[showdesc]" value="no" <?php print (@$ops['showdesc'] == 'no') ? 'checked' : ''; ?>><span><?php _e('No'); ?></span>		
			</td>
		</tr>		
		<tr>
			<td title="<?php _e('Image description effect type'); ?>"><?php _e('Image description effect'); ?></td>
			<td>
				<select name="settings[descriptionEffect]">
					<option value="1" <?php print (@$ops['descriptionEffect'] == '1') ? 'selected' : ''; ?>><?php _e('No effect'); ?></option>
					<option value="2" <?php print (@$ops['descriptionEffect'] == '2') ? 'selected' : ''; ?>><?php _e('Linear Fade'); ?></option>
					<option value="3" <?php print (@$ops['descriptionEffect'] == '3') ? 'selected' : ''; ?>><?php _e('Linear Drop'); ?></option>
					<option value="4" <?php print (@$ops['descriptionEffect'] == '4') ? 'selected' : ''; ?>><?php _e('Linear Elastic Drop'); ?></option>
					<option value="5" <?php print (@$ops['descriptionEffect'] == '5') ? 'selected' : ''; ?>><?php _e('Linear Pop'); ?></option>
					<option value="6" <?php print (@$ops['descriptionEffect'] == '6') ? 'selected' : ''; ?>><?php _e('Linear Elastic Pop'); ?></option>
					<option value="7" <?php print (@$ops['descriptionEffect'] == '7') ? 'selected' : ''; ?>><?php _e('Random Elastic Drop'); ?></option>
					<option value="8" <?php print (@$ops['descriptionEffect'] == '8') ? 'selected' : ''; ?>><?php _e('Random Elastic Pop'); ?></option>		
				</select>
			</td>
		</tr>				
		<tr>
			<td title="<?php _e('Description background color'); ?>"><?php _e('Description Bgcolor'); ?></td>
			<td><input type="text" name="settings[descColorBack]" class="color {hash:false,caps:false}" value="<?php print @$ops['descColorBack']; ?>" /></td>
		</tr>				
		<tr>
			<td title="<?php _e('Description text color'); ?>"><?php _e('Description Color'); ?></td>
			<td><input type="text" name="settings[descTextColor]" class="color {hash:false,caps:false}" value="<?php print @$ops['descTextColor']; ?>" /></td>
		</tr>				
		<tr>
			<td title="<?php _e('Background transperancy'); ?>"><?php _e('BG transparency'); ?></td>
			<td>
				<input type="radio" name="settings[backTransperency]" value="1" <?php print (@$ops['backTransperency'] == '1') ? 'checked' : ''; ?>><span><?php _e('Yes'); ?></span>
				<input type="radio" name="settings[backTransperency]" value="0" <?php print (@$ops['backTransperency'] == '0') ? 'checked' : ''; ?>><span><?php _e('No'); ?></span>		
			</td>
		</tr>		
		<tr>
			<td title="<?php _e('Show/Hide Price'); ?>"><?php _e('Show Price'); ?></td>
			<td>
				<input type="radio" name="settings[show_price]" value="yes" <?php print (@$ops['show_price'] == 'yes') ? 'checked' : ''; ?>><span><?php _e('Yes'); ?></span>
				<input type="radio" name="settings[show_price]" value="no" <?php print (@$ops['show_price'] == 'no') ? 'checked' : ''; ?>><span><?php _e('No'); ?></span>		
			</td>
		</tr>		
		<tr>
			<td title="<?php _e('Price Display Position'); ?>"><?php _e('Price Display Position'); ?></td>
			<td>
				<select name="settings[price_position]">
					<option value="TL" <?php print (@$ops['price_position'] == 'TL') ? 'selected' : ''; ?>><?php _e('Top Left'); ?></option>
					<option value="TR" <?php print (@$ops['price_position'] == 'TR') ? 'selected' : ''; ?>><?php _e('Top Right'); ?></option>
					<option value="BL" <?php print (@$ops['price_position'] == 'BL') ? 'selected' : ''; ?>><?php _e('Bottom Left'); ?></option>
					<option value="BR" <?php print (@$ops['price_position'] == 'BR') ? 'selected' : ''; ?>><?php _e('Bottom Right'); ?></option>			
				</select>
			</td>
		</tr>		
		<tr>
			<td title="<?php _e('Price Text Size'); ?>"><?php _e('Price Size'); ?></td>
			<td><input type="text" name="settings[price_textsize]"  value="<?php print @$ops['price_textsize']; ?>" /></td>
		</tr>		
		<tr>
			<td title="<?php _e('Currency Basecolor1'); ?>"><?php _e('Currency Basecolor1'); ?></td>
			<td><input type="text" name="settings[currency_basecolor1]" class="color {hash:true,caps:false}" value="<?php print @$ops['currency_basecolor1']; ?>" /></td>
		</tr>		
		<tr>
			<td title="<?php _e('Currency Basecolor1 Alpha'); ?>"><?php _e('Currency Basecolor1 Alpha'); ?></td>
			<td>
				<select name="settings[currency_basecolor1alpha]">
					<option value="0" <?php print (@$ops['currency_basecolor1alpha'] == '0') ? 'selected' : ''; ?>><?php _e('0'); ?></option>
					<option value="0.1" <?php print (@$ops['currency_basecolor1alpha'] == '0.1') ? 'selected' : ''; ?>><?php _e('0.1'); ?></option>
					<option value="0.2" <?php print (@$ops['currency_basecolor1alpha'] == '0.2') ? 'selected' : ''; ?>><?php _e('0.2'); ?></option>
					<option value="0.3" <?php print (@$ops['currency_basecolor1alpha'] == '0.3') ? 'selected' : ''; ?>><?php _e('0.3'); ?></option>
					<option value="0.4" <?php print (@$ops['currency_basecolor1alpha'] == '0.4') ? 'selected' : ''; ?>><?php _e('0.4'); ?></option>
					<option value="0.5" <?php print (@$ops['currency_basecolor1alpha'] == '0.5') ? 'selected' : ''; ?>><?php _e('0.5'); ?></option>
					<option value="0.6" <?php print (@$ops['currency_basecolor1alpha'] == '0.6') ? 'selected' : ''; ?>><?php _e('0.6'); ?></option>
					<option value="0.7" <?php print (@$ops['currency_basecolor1alpha'] == '0.7') ? 'selected' : ''; ?>><?php _e('0.7'); ?></option>
					<option value="0.8" <?php print (@$ops['currency_basecolor1alpha'] == '0.8') ? 'selected' : ''; ?>><?php _e('0.8'); ?></option>
					<option value="0.9" <?php print (@$ops['currency_basecolor1alpha'] == '0.9') ? 'selected' : ''; ?>><?php _e('0.9'); ?></option>
					<option value="1" <?php print (@$ops['currency_basecolor1alpha'] == '1') ? 'selected' : ''; ?>><?php _e('1'); ?></option>			
				</select>
			</td>
		</tr>		
		<tr>
			<td title="<?php _e('Currency Basecolor2'); ?>"><?php _e('Currency Basecolor2'); ?></td>
			<td><input type="text" name="settings[currency_basecolor2]" class="color {hash:true,caps:false}" value="<?php print @$ops['currency_basecolor2']; ?>" /></td>
		</tr>		
		<tr>
			<td title="<?php _e('Currency Basecolor2 Alpha'); ?>"><?php _e('Currency Basecolor2 Alpha'); ?></td>
			<td>
				<select name="settings[currency_basecolor2alpha]">
					<option value="0" <?php print (@$ops['currency_basecolor2alpha'] == '0') ? 'selected' : ''; ?>><?php _e('0'); ?></option>
					<option value="0.1" <?php print (@$ops['currency_basecolor2alpha'] == '0.1') ? 'selected' : ''; ?>><?php _e('0.1'); ?></option>
					<option value="0.2" <?php print (@$ops['currency_basecolor2alpha'] == '0.2') ? 'selected' : ''; ?>><?php _e('0.2'); ?></option>
					<option value="0.3" <?php print (@$ops['currency_basecolor2alpha'] == '0.3') ? 'selected' : ''; ?>><?php _e('0.3'); ?></option>
					<option value="0.4" <?php print (@$ops['currency_basecolor2alpha'] == '0.4') ? 'selected' : ''; ?>><?php _e('0.4'); ?></option>
					<option value="0.5" <?php print (@$ops['currency_basecolor2alpha'] == '0.5') ? 'selected' : ''; ?>><?php _e('0.5'); ?></option>
					<option value="0.6" <?php print (@$ops['currency_basecolor2alpha'] == '0.6') ? 'selected' : ''; ?>><?php _e('0.6'); ?></option>
					<option value="0.7" <?php print (@$ops['currency_basecolor2alpha'] == '0.7') ? 'selected' : ''; ?>><?php _e('0.7'); ?></option>
					<option value="0.8" <?php print (@$ops['currency_basecolor2alpha'] == '0.8') ? 'selected' : ''; ?>><?php _e('0.8'); ?></option>
					<option value="0.9" <?php print (@$ops['currency_basecolor2alpha'] == '0.9') ? 'selected' : ''; ?>><?php _e('0.9'); ?></option>
					<option value="1" <?php print (@$ops['currency_basecolor2alpha'] == '1') ? 'selected' : ''; ?>><?php _e('1'); ?></option>			
				</select>
			</td>
		</tr>		
		<tr>
			<td title="<?php _e('Currency Color'); ?>"><?php _e('Currency Color'); ?></td>
			<td><input type="text" name="settings[currency_color]" class="color {hash:true,caps:false}" value="<?php print @$ops['currency_color']; ?>" /></td>
		</tr>		
		<tr>
			<td title="<?php _e('Currency Color Alpha'); ?>"><?php _e('Currency Color Alpha'); ?></td>
			<td>
				<select name="settings[currency_coloralpha]">
					<option value="0" <?php print (@$ops['currency_coloralpha'] == '0') ? 'selected' : ''; ?>><?php _e('0'); ?></option>
					<option value="0.1" <?php print (@$ops['currency_coloralpha'] == '0.1') ? 'selected' : ''; ?>><?php _e('0.1'); ?></option>
					<option value="0.2" <?php print (@$ops['currency_coloralpha'] == '0.2') ? 'selected' : ''; ?>><?php _e('0.2'); ?></option>
					<option value="0.3" <?php print (@$ops['currency_coloralpha'] == '0.3') ? 'selected' : ''; ?>><?php _e('0.3'); ?></option>
					<option value="0.4" <?php print (@$ops['currency_coloralpha'] == '0.4') ? 'selected' : ''; ?>><?php _e('0.4'); ?></option>
					<option value="0.5" <?php print (@$ops['currency_coloralpha'] == '0.5') ? 'selected' : ''; ?>><?php _e('0.5'); ?></option>
					<option value="0.6" <?php print (@$ops['currency_coloralpha'] == '0.6') ? 'selected' : ''; ?>><?php _e('0.6'); ?></option>
					<option value="0.7" <?php print (@$ops['currency_coloralpha'] == '0.7') ? 'selected' : ''; ?>><?php _e('0.7'); ?></option>
					<option value="0.8" <?php print (@$ops['currency_coloralpha'] == '0.8') ? 'selected' : ''; ?>><?php _e('0.8'); ?></option>
					<option value="0.9" <?php print (@$ops['currency_coloralpha'] == '0.9') ? 'selected' : ''; ?>><?php _e('0.9'); ?></option>
					<option value="1" <?php print (@$ops['currency_coloralpha'] == '1') ? 'selected' : ''; ?>><?php _e('1'); ?></option>			
				</select>
			</td>
		</tr>		
		<tr>
			<td title="<?php _e('Currency Symbol'); ?>"><?php _e('Currency'); ?></td>
			<td><input type="text" name="settings[currency]"  value="<?php print @$ops['currency']; ?>" /></td>
		</tr>		
		<tr>
			<td title="<?php _e('Price Basecolor'); ?>"><?php _e('Price Basecolor'); ?></td>
			<td><input type="text" name="settings[price_basecolor]" class="color {hash:true,caps:false}" value="<?php print @$ops['price_basecolor']; ?>" /></td>
		</tr>		
		<tr>
			<td title="<?php _e('Price Basecolor Alpha'); ?>"><?php _e('Price Basecolor Alpha'); ?></td>
			<td>
				<select name="settings[price_basecoloralpha]">
					<option value="0" <?php print (@$ops['price_basecoloralpha'] == '0') ? 'selected' : ''; ?>><?php _e('0'); ?></option>
					<option value="0.1" <?php print (@$ops['price_basecoloralpha'] == '0.1') ? 'selected' : ''; ?>><?php _e('0.1'); ?></option>
					<option value="0.2" <?php print (@$ops['price_basecoloralpha'] == '0.2') ? 'selected' : ''; ?>><?php _e('0.2'); ?></option>
					<option value="0.3" <?php print (@$ops['price_basecoloralpha'] == '0.3') ? 'selected' : ''; ?>><?php _e('0.3'); ?></option>
					<option value="0.4" <?php print (@$ops['price_basecoloralpha'] == '0.4') ? 'selected' : ''; ?>><?php _e('0.4'); ?></option>
					<option value="0.5" <?php print (@$ops['price_basecoloralpha'] == '0.5') ? 'selected' : ''; ?>><?php _e('0.5'); ?></option>
					<option value="0.6" <?php print (@$ops['price_basecoloralpha'] == '0.6') ? 'selected' : ''; ?>><?php _e('0.6'); ?></option>
					<option value="0.7" <?php print (@$ops['price_basecoloralpha'] == '0.7') ? 'selected' : ''; ?>><?php _e('0.7'); ?></option>
					<option value="0.8" <?php print (@$ops['price_basecoloralpha'] == '0.8') ? 'selected' : ''; ?>><?php _e('0.8'); ?></option>
					<option value="0.9" <?php print (@$ops['price_basecoloralpha'] == '0.9') ? 'selected' : ''; ?>><?php _e('0.9'); ?></option>
					<option value="1" <?php print (@$ops['price_basecoloralpha'] == '1') ? 'selected' : ''; ?>><?php _e('1'); ?></option>			
				</select>
			</td>
		</tr>		
		<tr>
			<td title="<?php _e('Price Color'); ?>"><?php _e('Price Color'); ?></td>
			<td><input type="text" name="settings[price_color]" class="color {hash:true,caps:false}" value="<?php print @$ops['price_color']; ?>" /></td>
		</tr>		
		<tr>
			<td title="<?php _e('Price Color Alpha'); ?>"><?php _e('Price Color Alpha'); ?></td>
			<td>
				<select name="settings[price_coloralpha]">
					<option value="0" <?php print (@$ops['price_coloralpha'] == '0') ? 'selected' : ''; ?>><?php _e('0'); ?></option>
					<option value="0.1" <?php print (@$ops['price_coloralpha'] == '0.1') ? 'selected' : ''; ?>><?php _e('0.1'); ?></option>
					<option value="0.2" <?php print (@$ops['price_coloralpha'] == '0.2') ? 'selected' : ''; ?>><?php _e('0.2'); ?></option>
					<option value="0.3" <?php print (@$ops['price_coloralpha'] == '0.3') ? 'selected' : ''; ?>><?php _e('0.3'); ?></option>
					<option value="0.4" <?php print (@$ops['price_coloralpha'] == '0.4') ? 'selected' : ''; ?>><?php _e('0.4'); ?></option>
					<option value="0.5" <?php print (@$ops['price_coloralpha'] == '0.5') ? 'selected' : ''; ?>><?php _e('0.5'); ?></option>
					<option value="0.6" <?php print (@$ops['price_coloralpha'] == '0.6') ? 'selected' : ''; ?>><?php _e('0.6'); ?></option>
					<option value="0.7" <?php print (@$ops['price_coloralpha'] == '0.7') ? 'selected' : ''; ?>><?php _e('0.7'); ?></option>
					<option value="0.8" <?php print (@$ops['price_coloralpha'] == '0.8') ? 'selected' : ''; ?>><?php _e('0.8'); ?></option>
					<option value="0.9" <?php print (@$ops['price_coloralpha'] == '0.9') ? 'selected' : ''; ?>><?php _e('0.9'); ?></option>
					<option value="1" <?php print (@$ops['price_coloralpha'] == '1') ? 'selected' : ''; ?>><?php _e('1'); ?></option>			
				</select>
			</td>
		</tr>
		<tr>
			<td title="<?php _e('Where do you load the target url when user clicks on the image'); ?>"><?php _e('Link Target'); ?></td>
			<td>
				<input type="radio" name="settings[target]" value="_self" <?php print (@$ops['target'] == '_self') ? 'checked' : ''; ?>><span><?php _e('Same Window'); ?></span>
				<input type="radio" name="settings[target]" value="_blank" <?php print (@$ops['target'] == '_blank') ? 'checked' : ''; ?>><span><?php _e('New WIndow'); ?></span>
			</td>
		</tr>
		<tr>
			<td title="<?php _e('Select the wmode of flash'); ?>"><?php _e('wmode'); ?></td>
			<td>
				<select name="settings[wmode]">
					<option value="opaque" <?php print (@$ops['wmode'] == 'opaque') ? 'selected' : ''; ?>><?php _e('opaque'); ?></option>
					<option value="transparent" <?php print (@$ops['wmode'] == 'transparent') ? 'selected' : ''; ?>><?php _e('transparent'); ?></option>
					<option value="window" <?php print (@$ops['wmode'] == 'window') ? 'selected' : ''; ?>><?php _e('window'); ?></option>
				</select>
			</td>
		</tr>
		</table>
	<p><button type="submit" class="button-primary"><?php _e('Save Config'); ?></button></p>
	</form>
</div>