<?php
// implement tinymce button

add_action('media_buttons_context', 'gg_editor_btn', 1);
add_action('admin_footer', 'gg_editor_btn_content');


//action to add a custom button to the content editor
function gg_editor_btn($context) {
	$img = GG_URL . '/img/gg_logo_small.png';
  
	//the id of the container I want to show in the popup
	$container_id = 'gg_popup_container';
  
	//our popup's title
	$title = 'Global Gallery';
  
	//append the icon
	$context .= '
	<a class="thickbox" id="gg_editor_btn" title="'.$title.'" style="cursor: pointer;" >
	  <img src="'.$img.'" />
	</a>';
  
	return $context;
}


function gg_editor_btn_content() {
	if(strpos($_SERVER['REQUEST_URI'], 'post.php') || strpos($_SERVER['REQUEST_URI'], 'post-new.php')) :
?>

    <div id="gg_popup_container" style="display:none;">
      <?php 
	  // get galleries
	  $args = array(
		  'post_type' => 'gg_galleries',
		  'numberposts' => -1,
		  'post_status' => 'publish'
	  );
	  $galleries = get_posts( $args );
	  
	  // get collections
	  $collections = get_terms('gg_collections', 'hide_empty=0');
	 
	  if(!is_array($galleries)) {echo '<span>' . __('No galleries found', 'gg_ml') . ' ..</span>';}
	  else {
	  ?>
      <div id="gg_sc_tabs">
      	<ul class="tabNavigation" id="gg_sc_tabs_wrap">
            <li><a href="#gg_sc_gall"><?php _e('Galleries', 'gg_ml') ?></a></li>
            <li><a href="#gg_sc_coll"><?php _e('Collections', 'gg_ml') ?></a></li>
            <li><a href="#gg_sc_slider"><?php _e('Slider', 'gg_ml') ?></a></li>
        </ul>    
      
      	<div id="gg_sc_gall">
            <table class="lcwp_form lcwp_table lcwp_tinymce_table" cellspacing="0">
              <tr>
                <td style="width: 35%;">Gallery</td>
                <td colspan="2">
                    <select id="gg_gallery_choose" data-placeholder="<?php _e('Select a gallery', 'gg_ml') ?> .." name="gg_gallery" class="lcweb-chosen" tabindex="2" style="width: 370px;">
                    <?php 
                    foreach ( $galleries as $gallery ) {
                        echo '<option value="'.$gallery->ID.'">'.$gallery->post_title.'</option>';
                    }
                    ?>
                  </select>
                </td>
              </tr>
              <tr>
                <td><?php _e('Random Display', 'gg_ml') ?></td>
                <td style="width: 30%;" class="lcwp_form">
                    <input type="checkbox" name="gg_random" value="1" class="gg_popup_ip" id="gg_random" />
                </td>
                <td><span class="info"><?php _e('Display images randomly', 'gg_ml') ?></span></td>
              </tr>
              <tr>
                <td><?php _e('Use Watermark', 'gg_ml') ?></td>
                <td style="width: 30%;" class="lcwp_form">
                    <input type="checkbox" name="gg_watermark" value="1" class="gg_popup_ip" id="gg_watermark" />
                </td>
                <td><span class="info"><?php _e('Apply watermark to images (if available)', 'gg_ml') ?></span></td>
              </tr>    
              <tr class="tbl_last">
                <td colspan="2">
                    <input type="button" value="Insert Gallery" name="gg_insert_gallery" id="gg_insert_gallery" class="button-primary" />
                </td>    
              </tr>
            </table>   
        </div>    

        <div id="gg_sc_coll">
            <table class="lcwp_form lcwp_table lcwp_tinymce_table" cellspacing="0">
              <tr>
                <td style="width: 35%;"><?php _e('Collection', 'gg_ml') ?></td>
                <td colspan="2">
                    <select id="gg_collection_choose" data-placeholder="<?php _e('Select a collection', 'gg_ml') ?> .." name="gg_collection" class="lcweb-chosen" tabindex="2" style="width: 370px;">
                    <?php 
                    foreach ( $collections as $collection ) {
                        echo '<option value="'.$collection->term_id.'">'.$collection->name.'</option>';
                    }
                    ?>
                  </select>
                </td>
              </tr>
              
              <tr>
                <td><?php _e('Allow Filter', 'gg_ml') ?></td>
                <td style="width: 30%;" class="lcwp_form">
                    <input type="checkbox" name="gg_coll_filter" value="1" class="gg_popup_ip" id="gg_coll_filter" />
                </td>
                <td><span class="info"><?php _e('Allow items filtering by category', 'gg_ml') ?></span></td>
              </tr>
              <tr>
                <td><?php _e('Random Display', 'gg_ml') ?></td>
                <td style="width: 30%;" class="lcwp_form">
                    <input type="checkbox" name="gg_coll_random" value="1" class="gg_popup_ip" id="gg_coll_random" />
                </td>
                <td><span class="info"><?php _e('Display galleries randomly', 'gg_ml') ?></span></td>
              </tr> 
                
              <tr class="tbl_last">
                <td colspan="2">
                    <input type="button" value="Insert Collection" name="gg_insert_collection" id="gg_insert_collection" class="button-primary" />
                </td>    
              </tr>
            </table> 
      	</div>
        
        <div id="gg_sc_slider">
        	<table class="lcwp_form lcwp_table lcwp_tinymce_table" cellspacing="0">
              <tr>
                <td style="width: 35%;"><?php _e('Images source', 'gg_ml') ?></td>
                <td colspan="2">
                    <select id="gg_slider_gallery" data-placeholder="<?php _e('Select a gallery', 'gg_ml') ?> .." name="gg_slider_gallery" class="lcweb-chosen" tabindex="2" style="width: 370px;">
                    <?php 
                    foreach ( $galleries as $gallery ) {
                        echo '<option value="'.$gallery->ID.'">'.$gallery->post_title.'</option>';
                    }
                    ?>
                  </select>
                </td>
              </tr> 
              <tr>
                <td><?php _e('Slider Width', 'gg_ml') ?></td>
                <td colspan="2" class="lcwp_form">
                    <input type="text" name="gg_slider_w" value="" id="gg_slider_w" style="width: 50px; text-align: center;" maxlength="4" />
                    <select name="gg_slider_w_type"  id="gg_slider_w_type" style="width: 50px; margin: -3px 0 0 -5px;">
                    	<option value="%">%</option>
                        <option value="px">px</option>
                    </select>
                </td>
              </tr>
              <tr>
                <td><?php _e('Slider Height', 'gg_ml') ?></td>
                <td class="lcwp_form">
                    <input type="text" name="gg_slider_h" value="" id="gg_slider_h" style="width: 50px; text-align: center;" maxlength="4" />
                    <select name="gg_slider_h_type"  id="gg_slider_h_type" style="width: 50px; margin: -3px 0 0 -5px;">
                    	<option value="%">%</option>
                        <option value="px">px</option>
                    </select>
                </td>
                <td id="gg_slider_h_type_note"><span class="info"><?php _e('Proportionally to the width', 'gg_ml') ?></span></td>
              </tr>
              <tr>
                <td><?php _e('Random Display', 'gg_ml') ?></td>
                <td style="width: 30%;" class="lcwp_form">
                    <input type="checkbox" name="gg_slider_random" value="1" class="gg_popup_ip" id="gg_slider_random" />
                </td>
                <td><span class="info"><?php _e('Display images randomly', 'gg_ml') ?></span></td>
              </tr>
              <tr>
                <td><?php _e('Use Watermark', 'gg_ml') ?></td>
                <td style="width: 30%;" class="lcwp_form">
                    <input type="checkbox" name="gg_slider_watermark" value="1" class="gg_popup_ip" id="gg_slider_watermark" />
                </td>
                <td><span class="info"><?php _e('Apply watermark to images (if available)', 'gg_ml') ?></span></td>
              </tr>
              <tr>
                <td style="width: 35%;"><?php _e('Autoplay slider?', 'gg_ml') ?></td>
                <td>
                  <select id="gg_slider_autop" data-placeholder="<?php _e('Select an option', 'gg_ml') ?> .." name="gg_slider_autop" class="lcweb-chosen" autocomplete="off" style="width: 125px;">
                      <option value="auto">(<?php _e('as default', 'gg_ml') ?>)</option>
                      <option value="1"><?php _e('Yes', 'gg_ml') ?></option>
                      <option value="0"><?php _e('No', 'gg_ml') ?></option>
                  </select>
                </td>
                <td><span class="info"><?php _e('Overrides global autoplay setting', 'gg_ml') ?></span></td>
              </tr>   
              <tr class="tbl_last">
                <td colspan="2">
                    <input type="button" value="<?php _e('Insert Slider', 'gg_ml') ?>" name="gg_insert_slider" id="gg_insert_slider" class="button-primary" />
                </td>    
              </tr>
            </table>   
        </div>      
      </div> <!-- tabs wrapper -->  
      <?php } ?>
    </div>
	
    <?php // SCRIPTS ?>
    <script src="<?php echo GG_URL; ?>/js/functions.js" type="text/javascript"></script>
    <script src="<?php echo GG_URL; ?>/js/chosen/chosen.jquery.min.js" type="text/javascript"></script>
    <script src="<?php echo GG_URL; ?>/js/iphone_checkbox/iphone-style-checkboxes.js" type="text/javascript"></script>
<?php
	endif;
	return true;
}

?>