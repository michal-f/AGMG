<?php
// create and manage images overlay - with overlay manager add-on integration
class gg_overlay_manager {
	private $preview_mode = false;
	private $title_under = false;
	private $overlay;
	
	// image overlay 
	public $ol_txt_part = '<div class="gg_main_overlay"><span class="gg_img_title">%GG-TITLE-OL%</span></div>';
	public $ol_code = '';
	
	// title under
	public $tit_under_code = '<span>%GG-TITLE-OL%</span>';
	
	// secondary overlay position flag
	public $sec_ol_pos = 'tl';
	
	// txt visibility trick - classes
	public $txt_vis_class = false;
	
	
	// handle grid global vars
	function __construct($ol_to_use, $title_under, $preview_mode = false) {
		$this->preview_mode = $preview_mode;
		$this->title_under = ($title_under == 1) ? true : false;
		
		// get the add-on code
		if (!defined('GGOM_DIR') || $ol_to_use == 'default' || !filter_var($ol_to_use, FILTER_VALIDATE_INT)) {
			if(defined('GGOM_DIR')) {
				$global_ol = get_option('gg_default_overlay');
				$overlay = (empty($global_ol)) ? 'default' : (int)$global_ol;
			}
			else {$overlay = 'default';}
		} 
		else {
			$overlay = (!defined('GGOM_DIR')) ? 'default' : (int)$ol_to_use;	
		}
		$this->overlay = $overlay;
		
		if($overlay != 'default') {
			$this->tit_under_code = '<div class="mg_title_under">%GG-TITLE-OL%</div>';
			$this->get_om_code($overlay);
		}
	}
	
	
	// get the add-on overlay code
	private function get_om_code($overlay_id) {
			
		if(function_exists('ggom_ol_frontend_code')) {
			$code = ggom_ol_frontend_code($overlay_id, $this->title_under);	

			$this->ol_code = $code['graphic'];
			$this->img_fx_attr = $code['img_fx_elem'];
			$this->txt_vis_class = $code['txt_vis_class'];
			
			if($this->title_under) {
				$this->tit_under_code = $code['txt'];
			} else {
				$this->ol_txt_part = $code['txt'];	
			}
		} 
	}
	
	
	// get the image overlay code
	public function get_img_ol($item_id) {
		
		// if not txt under - execute the text code	
		if(!$this->title_under) {
			$title = ($this->preview_mode) ? 'Lorem ipsum' : get_the_title($item_id);
			$txt_part =	str_replace('%GG-TITLE-OL%', $title, $this->ol_txt_part);
			
			if(strpos($txt_part, '%GG-DESCR-OL%') !== false) {
				if($this->preview_mode) {
					$descr = 'dolor sit amet, consectetur adipisici elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquid ex ea commodi consequat. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.';
				} 
				else {
					$descr = do_shortcode( get_post_field('post_excerpt', $item_id));
					if(empty($descr)) {$descr = strip_shortcodes( strip_tags( get_post_field('post_content', $item_id), '<p><a><br>'));}
				}
				
				$txt_part = str_replace('%GG-DESCR-OL%', $descr, $txt_part);
			}
		} else {
			$txt_part = '';	
		}
		
		return $this->ol_code . $txt_part;
	}
	
	
	// get the image overlay code
	public function get_txt_under($item_id) {
		$txt_part =	str_replace('%GG-TITLE-OL%', get_the_title($item_id), $this->tit_under_code);
		
		if(strpos($txt_part, '%GG-DESCR-OL%') !== false) {
			$descr = do_shortcode( get_post_field('post_excerpt', $item_id));
			if(empty($descr)) {$descr = strip_shortcodes( strip_tags( get_post_field('post_content', $item_id)));}
			
			$txt_part = str_replace('%GG-DESCR-OL%', $descr, $txt_part);
		}

		return '<div class="gg_title_under">'. $txt_part .'</div>';
	}
}
?>