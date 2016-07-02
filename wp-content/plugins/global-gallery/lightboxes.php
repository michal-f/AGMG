<?php
// LIGTBOXES SWITCH

///////////////////////////////////////////
// lightboxes styles
function gg_lightboxes_styles() {
	if(!is_admin()) {
		$lightbox = get_option('gg_lightbox');
		
		switch($lightbox) {
			case 'lcweb':
				wp_enqueue_style('gg-lightbox-css', GG_URL . '/js/lightboxes/lcweb.lightbox/lcweb.lightbox.css', 100);
				break;
				
			case 'tosrus':
				wp_enqueue_style('gg-lightbox-css', GG_URL . '/js/lightboxes/jQuery.TosRUs/src/css/jquery.tosrus.gg.min.css', 100);
				break;
				
			case 'lightgall':
				wp_enqueue_style('gg-lightbox-css', GG_URL . '/js/lightboxes/lightGallery/css/lightGallery.css', 100);
				break;
				
			case 'mag_popup':
				wp_enqueue_style('gg-lightbox-css', GG_URL . '/js/lightboxes/magnific-popup/magnific-popup.css', 100);
				break;
							
			case 'fancybox':
				wp_enqueue_style('gg-lightbox-css', GG_URL . '/js/lightboxes/fancybox-1.3.4/jquery.fancybox-1.3.4.css', 100);
				break;
						
			case 'colorbox':
				(!get_option('gg_lb_col_style')) ? $style = 1 : $style = get_option('gg_lb_col_style');
				wp_enqueue_style('gg-lightbox-css', GG_URL . '/js/lightboxes/colorbox-1.4.37/style_'.$style.'/colorbox.css', 100);
				break;
				
			default: // prettyphoto	
				wp_enqueue_style('gg-lightbox-css', GG_URL . '/js/lightboxes/prettyPhoto-3.1.5/css/prettyPhoto.css', 100);
				break;			
		}
	} 
}
add_action('init', 'gg_lightboxes_styles');



/////////////////////////////////////////////
// footer code and script enqueuing
function gg_lightboxes_footer() {
  	if(!is_admin()) {
	$lightbox = get_option('gg_lightbox');
	
	// LCWEB
	if($lightbox == 'lcweb') :
	?>
    
    <script src="<?php echo GG_URL ?>/js/lightboxes/lcweb.lightbox/TouchSwipe/jquery.touchSwipe.min.js" type="text/javascript"></script>  
    <script src="<?php echo GG_URL ?>/js/lightboxes/lcweb.lightbox/lcweb.lightbox.min.js" type="text/javascript"></script>  
	<script type="text/javascript">
	jQuery(document).ready(function() {
		jQuery('body').delegate('.gg_gallery_wrap div.gg_img:not(.gg_coll_img, .gg_linked_img)', 'click', function(e) {
			e.preventDefault();	
			
			var the_hook = jQuery(this).attr('rel');
		
			var clicked_url = jQuery(this).attr('gg-url');
			jQuery('.gg_gallery_wrap div.gg_img:not(.gg_coll_img)[rel='+the_hook+']').each(function(index, element) {
				if(clicked_url == jQuery(this).attr('gg-url')) { gg_img_index = index; }
			});

			gg_init_lclightbox('.gg_gallery_wrap div.gg_img:not(.gg_coll_img)', gg_img_index, the_hook);
		});
		
		// fix for HTML inside attribute
		var gg_ggl_html_fix = function(string) {
			var fix_str = string.replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
			return fix_str;	
		}
		
		// slider lightbox init
		gg_slider_lightbox = function(data, gg_img_index) {
			var rel = new Date().getTime();
			var obj = '';
			
			jQuery.each(data, function(i, v)  {
				obj += '<div gg-url="'+ v.big +'" gg-title="'+ gg_ggl_html_fix(v.title) +'" gg-descr="'+ gg_ggl_html_fix(v.description) +'" rel="'+ rel +'"></div>';
			});
			
			gg_init_lclightbox(obj, gg_img_index, rel);
		}
		
		// throw lightbox
		gg_init_lclightbox = function(obj, gg_img_index, the_hook) {			
			jQuery(obj).lcweb_lightbox({
				open: true,
				from_index: gg_img_index, 
				manual_hook: the_hook,
				
				url_src: 'gg-url',
				title_src: 'gg-title',
				author_src: 'gg-author',
				descr_src: 'gg-descr',

				thumbs_maker_url: '<?php echo (get_option('gg_use_timthumb')) ? GG_TT_URL : GG_EWPT_URL; echo '?src=%URL%&w=%W%&h=%H%&q=80'; ?>',
				animation_time: <?php echo (int)get_option('gg_lb_time', 400) ?>,
				slideshow_time: <?php echo (int)get_option('gg_lb_ss_time', 4000) ?>,
				autoplay: <?php echo (!get_option('gg_lb_slideshow')) ? 'false' : 'true'; ?>,
				ol_opacity: <?php echo ((int)get_option('gg_lb_opacity') / 100) ?>,
				ol_color: '<?php echo get_option('gg_lb_ol_color') ?>',
				ol_pattern: '<?php echo (!get_option('gg_lb_ol_pattern') || get_option('gg_lb_ol_pattern') == 'none') ? 'false' : get_option('gg_lb_ol_pattern') ; ?>',
				border_w: <?php echo (int)get_option('gg_lb_border_w') ?>,
				border_col: '<?php echo get_option('gg_lb_border_col') ?>', 
				padding: <?php echo (int)get_option('gg_lb_padding') ?>,
				radius: <?php echo (int)get_option('gg_lb_radius') ?>,
				style: '<?php echo get_option('gg_lb_lcl_style') ?>',
				data_position: '<?php echo (get_option('gg_lb_txt_pos') == 'standard') ? 'under' : 'over' ?>',
				fullscreen: <?php echo (!get_option('gg_lb_fullscreen')) ? 'false' : 'true'; ?>,
				fs_only: '<?php echo get_option('gg_lb_fs_only'); ?>',
				fs_img_behaviour: '<?php echo get_option('gg_lb_fs_method') ?>',
				max_width: '<?php echo get_option('gg_lb_max_w') ?>%',
				max_height: '<?php echo get_option('gg_lb_max_h') ?>%',
				thumb_nav: <?php echo (!get_option('gg_lb_thumbs')) ? 'false' : 'true'; ?>,
				socials: <?php echo (!get_option('gg_lb_socials')) ? 'false' : 'true'; ?>,
				fb_share_fix: '<?php echo GG_URL ?>/lcis_fb_img_fix.php'
			});
		}
	});
	</script>
	
    
    <?php 
	// TOS R US - min jQuery 1.7
	elseif($lightbox == 'tosrus') : 
	?>
	
    <script src="<?php echo GG_URL ?>/js/lightboxes/jQuery.TosRUs/lib/hammer.min.js" type="text/javascript"></script> 
    <script src="<?php echo GG_URL ?>/js/lightboxes/jQuery.TosRUs/lib/FlameViewportScale.js" type="text/javascript"></script>
	<script src="<?php echo GG_URL ?>/js/lightboxes/jQuery.TosRUs/src/js/jquery.tosrus.min.gg.js" type="text/javascript"></script>  
	<script type="text/javascript">
	jQuery(document).ready(function() {
		jQuery('body').delegate('.gg_gallery_wrap div.gg_img:not(.gg_coll_img, .gg_linked_img)', 'click', function(e) {
			e.preventDefault();	
			
			var gallery_id = jQuery(this).parents('.gg_gallery_wrap').attr('id');
			var clicked_url = jQuery(this).attr('gg-url');
			var links = jQuery(), link;
			
			jQuery('#'+gallery_id+' .gg_img').each(function(index, element) {
				 link = jQuery('<a/>', {
					href: jQuery(this).attr('gg-url'),
					title: jQuery(this).attr('gg-title').replace(/(<([^>]+)>)/ig,"")
				});
				links = links.add(link);
				
				if(clicked_url == jQuery(this).attr('gg-url')) { gg_img_index = index; }
            });
			gg_init_tosrus(links, gg_img_index);
		});
		
		// slider lightbox init
		gg_slider_lightbox = function(data, gg_img_index) {
			var links = jQuery(), link;
			
			jQuery.each(data, function(i, v)  {
				link = jQuery('<a/>', {
					href: v.big,
					title: v.title.replace(/(<([^>]+)>)/ig,"")
				});
				links = links.add(link);
			});
			gg_init_tosrus(links, gg_img_index);
		}
		
		// throw lightbox		
		gg_init_tosrus = function(links, gg_img_index) { 
			if( jQuery('#gg_tosrus_trick').size() > 0 ) {jQuery('#gg_tosrus_trick').empty();}
			else { jQuery('body').append('<div id="gg_tosrus_trick" style="display: none;"></div>'); }
			
			jQuery('#gg_tosrus_trick').append(links);
			if( jQuery('.gg_tosrus').size() > 0 ) {jQuery('.gg_tosrus').remove();}

			var IE8_class = (navigator.appVersion.indexOf("MSIE 8.") != -1) ? ' tosrus_ie8' : '';
			var tosrus = jQuery('#gg_tosrus_trick a').tosrus({
				show: true,
				infinite : true,
			   	effect: '<?php echo get_option('gg_lb_anim_behav', 'slide') ?>',
				wrapper : {
					classes : 'gg_tosrus' + IE8_class
				},
				pagination : {
					add	: true,
					type	: "<?php echo (get_option('gg_lb_thumbs')) ? 'thumbnails' : 'bullets'; ?>"
			   	},
				slides : {
					scale : "<?php echo (get_option('gg_lb_fullscreen')) ? 'fill' : 'fit'; ?>"
				},
			   	caption : {add	: true},
			   	buttons : {
					prev : true,
					next : true,
					close: true
			   	},
				keys: true
			});
			tosrus.trigger("open", [gg_img_index]);
		}
	});
	</script>
    
    
    <?php
    // LIGHTGALLERY - min jQuery 1.7
	elseif($lightbox == 'lightgall') :
	include_once(GG_DIR . '/functions.php');
	?>
    
    <script src="<?php echo GG_URL ?>/js/lightboxes/lightGallery/js/lightGallery.min.js" type="text/javascript"></script>  
	<script type="text/javascript">
	jQuery(document).ready(function() {
		// thumbs maker
		var gg_lb_thumb = function(src) {
			<?php if(get_option('gg_use_timthumb')) : ?>
				return '<?php echo GG_TT_URL ?>?src='+ src +'&w=100&h=100';
			<?php else : ?>
				return '<?php echo GG_URL.'/classes/easy_wp_thumbs.php' ?>?src='+ src +'&w=100&h=100';
			<?php endif; ?>	
		}
		
		jQuery('body').delegate('.gg_gallery_wrap div.gg_img:not(.gg_coll_img, .gg_linked_img)', 'click', function(e) {
			e.preventDefault();	
			
			var gallery_id = jQuery(this).parents('.gg_gallery_wrap').attr('id');
			var clicked_url = jQuery(this).attr('gg-url');
			
			var sel_img = jQuery.makeArray();
			jQuery('#'+gallery_id+' .gg_img').each(function(index, element) {
				var author = (jQuery.trim(jQuery(this).attr('gg-author')) != '') ? ' <small>by '+ jQuery(this).attr('gg-author') +'</small>' : '';
				var title = (jQuery.trim(jQuery(this).attr('gg-title')) != '') ? jQuery(this).attr('gg-title') + author : '';

				var obj = {
					"src"		: jQuery(this).attr('gg-url'),
					"thumb" 	: gg_lb_thumb(jQuery(this).attr('gg-url')),
					"caption"	: title,
					"desc"		: jQuery(this).attr('gg-descr'),
				};
                sel_img.push(obj);
				
				if(clicked_url == jQuery(this).attr('gg-url')) { gg_img_index = index; }
			});
			gg_init_lightgall(sel_img, gg_img_index);
		});
		
		// slider lightbox init
		gg_slider_lightbox = function(data, gg_img_index) {
			var sel_img = jQuery.makeArray();
			
			jQuery.each(data, function(i, v)  {
				var txt = gg_ggl_html_fix(v.title) + '&nbsp;<small>'+ gg_ggl_html_fix(v.description) +'</small>';
				
				var obj = {'src' : v.big, 'type' : 'image', 'title' : txt};
                sel_img.push(obj);
			});
			gg_init_lightgall(sel_img, gg_img_index);
		}
		
		// order elements
		function gg_lb_order_obj(obj, index) {
			var tot = obj.length;
			if(index == 0 || tot < 2) {return obj;}
			var new_obj = jQuery.makeArray();
			
			for(a=index; a<tot; a++) {new_obj.push(obj[a]);} // index + after
			for(a=0; a<index; a++) {new_obj.push(obj[a]);} // before index
			
			return new_obj;
		}
		
		// throw lightbox
		gg_init_lightgall = function(obj, gg_img_index) {			
			var gg_lg = jQuery('body').lightGallery({
				dynamic : true,
				dynamicEl : gg_lb_order_obj(obj, gg_img_index),
				mode: '<?php echo get_option('gg_lb_anim_behav', 'slide') ?>',
				easing: 'ease-in-out',
				loop: true,
				auto: <?php echo (!get_option('gg_lb_slideshow')) ? 'false' : 'true'; ?>,
				speed: <?php echo (int)get_option('gg_lb_time', 400) ?>,
				pause: <?php echo (int)get_option('gg_lb_ss_time', 4000) ?>,
				rel: false,
				lang: {allPhotos: "<?php _e('All photos', 'gg_ml') ?>"},
				exThumbImage: false,
				thumbnail: <?php echo (!get_option('gg_lb_thumbs')) ? 'false' : 'true'; ?>,
				caption: true,
				desc: true,
				onOpen: function () {
					var classes = (navigator.appVersion.indexOf("MSIE 8.") != -1) ? ' gg_lightgall lightgall_ie8' : ' gg_lightgall';
					jQuery('#lightGallery-outer').addClass(classes);	
				}
			});	
		}
	});
	</script>
    
    
    <?php 
	// MAGNIFIC POPUP - min jQuery 1.8
	elseif($lightbox == 'mag_popup') : 
	?>
	
    <script src="<?php echo GG_URL ?>/js/lightboxes/magnific-popup/magnific-popup.js" type="text/javascript"></script>  
	<script type="text/javascript">
	jQuery(document).ready(function() {
		// fix for HTML inside attribute
		var gg_ggl_html_fix = function(string) {
			var fix_str = string.replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
			return fix_str;	
		}
		
		jQuery('body').delegate('.gg_gallery_wrap div.gg_img:not(.gg_coll_img, .gg_linked_img)', 'click', function(e) {
			e.preventDefault();	
			
			var gallery_id = jQuery(this).parents('.gg_gallery_wrap').attr('id');
			var clicked_url = jQuery(this).attr('gg-url');
			
			var sel_img = jQuery.makeArray();
			jQuery('#'+gallery_id+' .gg_img').each(function(index, element) {
				var txt = jQuery(this).attr('gg-title') + '&nbsp;<small>'+ jQuery(this).attr('gg-descr') +'</small>';
				
				var obj = {'src' : jQuery(this).attr('gg-url'), 'type' : 'image', 'title' : txt};
                sel_img.push(obj);
				
				if(clicked_url == jQuery(this).attr('gg-url')) { gg_img_index = index; }
			});
			gg_init_mag_popup(sel_img, gg_img_index);
		});
		
		// slider lightbox init
		gg_slider_lightbox = function(data, gg_img_index) {
			var sel_img = jQuery.makeArray();
			
			jQuery.each(data, function(i, v)  {
				var txt = gg_ggl_html_fix(v.title) + '&nbsp;<small>'+ gg_ggl_html_fix(v.description) +'</small>';
				
				var obj = {'src' : v.big, 'type' : 'image', 'title' : txt};
                sel_img.push(obj);
			});
			gg_init_mag_popup(sel_img, gg_img_index);
		}
		
		// throw lightbox		
		gg_init_mag_popup = function(sel_img, gg_img_index) { 
			jQuery.magnificPopup.open({
				tLoading: '<span class="gg_mag_popup_loader"></span>',
				mainClass: 'gg_mp',
				removalDelay: 300,
				gallery: {
					enabled: true,
					navigateByImgClick: true,
					preload: [1,1]
				},
				callbacks: {
					beforeClose: function() {
					  jQuery('body').find('.mfp-figure').stop().fadeOut(300);
					},
					updateStatus: function(data) {
						jQuery('body').find('.mfp-figure').stop().fadeOut(300);
					},
					imageLoadComplete: function() {
						jQuery('body').find('.mfp-figure').stop().fadeIn(300);
						
						if(typeof(ggmp_size_check) != 'undefined' && ggmp_size_check) {clearTimeout(ggmp_size_check);}
						ggmp_size_check = setTimeout(function() {
							var lb_h = jQuery('body').find('.mfp-content').outerHeight();
							var win_h = jQuery(window).height();
							
							if(win_h < lb_h) {
								var diff = lb_h - win_h; 
								var img_h = jQuery('body').find('.mfp-img').height() - diff;	
								
								if(navigator.appVersion.indexOf("MSIE 8.") == -1) { jQuery('body').find('.mfp-img').clearQueue().animate({'maxHeight': img_h}, 350); }
								else { jQuery('body').find('.mfp-img').clearQueue().css('max-height', img_h); } 
							}
							
							ggmp_size_check = false
						}, 50);
					},
				},
			 	items: sel_img
			});
			
			var gg_magnificPopup = jQuery.magnificPopup.instance;
			gg_magnificPopup.goTo(gg_img_index);
		}
	});
	</script>
    
	
	<?php 
	// FANCYBOX
	elseif($lightbox == 'fancybox') : 
	?>
	
    <script src="<?php echo GG_URL ?>/js/lightboxes/fancybox-1.3.4/jquery.fancybox-1.3.4.pack.js" type="text/javascript"></script>  
	<script type="text/javascript">
	jQuery(document).ready(function() {
		jQuery('body').delegate('.gg_gallery_wrap div.gg_img:not(.gg_coll_img, .gg_linked_img)', 'click', function(e) {
			e.preventDefault();
			var gallery_id = jQuery(this).parents('.gg_gallery_wrap').attr('id');
			var clicked_url = jQuery(this).attr('gg-url');
			
			var sel_img = jQuery.makeArray();
			jQuery('#'+gallery_id+' .gg_img').each(function(index, element) {
				var obj = {'href' : jQuery(this).attr('gg-url'), 'title' : jQuery(this).attr('gg-title') };
                sel_img.push(obj);
				
				if(clicked_url == jQuery(this).attr('gg-url')) { gg_img_index = index; }
            });
			
			gg_init_fancybox(sel_img, gg_img_index);
		});
		
		// slider lightbox init
		gg_slider_lightbox = function(data, gg_img_index) {
			var sel_img = jQuery.makeArray();
			
			jQuery.each(data, function(i, v)  {
				var obj = {'href' : v.big, 'title' : v.title };
				sel_img.push(obj);
			});
			
			gg_init_fancybox(sel_img, gg_img_index);
		}
		
		// throw lightbox
		gg_init_fancybox = function(sel_img, gg_img_index) { 
		 	jQuery.fancybox(sel_img, {
				'titlePosition': '<?php echo (get_option('gg_lb_txt_pos') == 'standard') ? 'inside' : 'over' ?>',
				'type': 'image',
				'padding': <?php echo (int)get_option('gg_lb_padding') ?>,
				'changeSpeed': <?php echo (int)get_option('gg_lb_time') ?>,
				'overlayOpacity': <?php echo ((int)get_option('gg_lb_opacity') / 100) ?>,
				'overlayColor': '<?php echo get_option('gg_lb_ol_color') ?>',
				'centerOnScroll' : true,
				'cyclic': true,
				'index': gg_img_index,
				'titleFormat' : function(title, currentArray, currentIndex, currentOpts) {
					<?php if(get_option('gg_lb_txt_pos') == 'standard'): ?>
					return '<span id="fancybox-title-inside">' +  (currentIndex + 1) + '/' + currentArray.length + ' - '+title+'</span>';
					<?php else: ?>
		    		return '<span id="fancybox-title-over">' +  (currentIndex + 1) + '/' + currentArray.length + ' - '+title+'</span>';
					<?php endif; ?>
				}
			}); 			
		}
	});
	</script>
	
	
	<?php 
	// COLORBOX
	elseif($lightbox == 'colorbox') : 
	?>
	
    <script src="<?php echo GG_URL ?>/js/lightboxes/colorbox-1.4.37/jquery.colorbox-min.js" type="text/javascript"></script>  
	<script type="text/javascript">
	jQuery(document).ready(function() {
		jQuery('body').delegate('.gg_gallery_wrap div.gg_img:not(.gg_coll_img, .gg_linked_img)', 'click', function(e) {
			e.preventDefault();	
			
			var gallery_id = jQuery(this).parents('.gg_gallery_wrap').attr('id');
			var clicked_url = jQuery(this).attr('gg-url');
			var links = jQuery(), link;
			
			jQuery('#'+gallery_id+' .gg_img').each(function(index, element) {
				 link = jQuery('<a/>', {
					href: jQuery(this).attr('gg-url'),
					title: jQuery(this).attr('gg-title'),
					text: jQuery(this).attr('gg-descr'),
					class: 'group_' + gallery_id
				});
				links = links.add(link);
				
				if(clicked_url == jQuery(this).attr('gg-url')) { gg_img_index = index; }
            });
			
			
			gg_init_colorbox(links, gallery_id, gg_img_index);
		});
		
		// slider lightbox init
		gg_slider_lightbox = function(data, gg_img_index) {
			var gallery_id = new Date().getTime();
			var obj = '';
			var links = jQuery(), link;
			
			jQuery.each(data, function(i, v)  {
				link = jQuery('<a/>', {
					href: v.big,
					title: v.title,
					text: v.description,
					class: 'group_' + gallery_id
				});
				links = links.add(link);
			});
			
			gg_init_colorbox(links, gallery_id, gg_img_index);
		}
		
		// throw lightbox		
		gg_init_colorbox = function(links, gallery_id, gg_img_index) { 
			if( jQuery('#gg_colorbox_trick').size() > 0 ) {jQuery('#gg_colorbox_trick').empty();}
			else { jQuery('body').append('<div id="gg_colorbox_trick" style="display: none;"></div>'); }
			
			jQuery('#gg_colorbox_trick').append(links);
			
			links.colorbox({
				open: true,
				fromIndex: gg_img_index,
				rel: 'group_'+gallery_id,
				
				opacity: <?php echo ((int)get_option('gg_lb_opacity') / 100) ?>,
				speed: <?php echo (int)get_option('gg_lb_time') ?>,
				maxWidth: '<?php echo get_option('gg_lb_max_w') ?>%',
				maxHeight: '<?php echo get_option('gg_lb_max_h') ?>%',
				slideshow: true,
				slideshowSpeed:	<?php echo (int)get_option('gg_lb_ss_time') ?>,
				slideshowAuto: <?php echo (!get_option('gg_lb_slideshow')) ? 'false' : 'true'; ?>
			});
		}
	});
	</script>
	
	
	<?php 
	// PRETTYPHOTO
	else : 
	?>
	
    <script src="<?php echo GG_URL ?>/js/lightboxes/prettyPhoto-3.1.5/jquery.prettyPhoto.js" type="text/javascript"></script>  
	<script type="text/javascript">
	jQuery(document).ready(function() {
		jQuery('body').delegate('.gg_gallery_wrap div.gg_img:not(.gg_coll_img, .gg_linked_img)', 'click', function(e) {
			e.preventDefault();
			var gallery_id = jQuery(this).parents('.gg_gallery_wrap').attr('id');
			var clicked_url = jQuery(this).attr('gg-url');
			
			var api_img = jQuery.makeArray();
			var api_tit = jQuery.makeArray();
			var api_descr = jQuery.makeArray();
			
			jQuery('#'+gallery_id+' .gg_img').each(function(index, element) {
				api_img.push( jQuery(this).attr('gg-url') );
				api_tit.push( jQuery(this).attr('gg-title') );
				api_descr.push( jQuery(this).attr('gg-descr') );
				
				if(clicked_url == jQuery(this).attr('gg-url')) { gg_img_index = index; }
			});
			
			gg_init_prettyphoto(api_img, api_tit, api_descr, gg_img_index);
		});
		
		// slider lightbox init
		gg_slider_lightbox = function(data, gg_img_index) {
			var api_img = jQuery.makeArray();
			var api_tit = jQuery.makeArray();
			var api_descr = jQuery.makeArray();
			
			jQuery.each(data, function(i, v)  {
				api_img.push( v.big );
				api_tit.push( v.title  );
				api_descr.push( v.description );
			});
			
			gg_init_prettyphoto(api_img, api_tit, api_descr, gg_img_index);
		}
		
		// throw lightbox
		gg_init_prettyphoto = function(api_img, api_tit, api_descr, gg_img_index) { 
			jQuery.fn.prettyPhoto({
				opacity: <?php echo ((int)get_option('gg_lb_opacity') / 100) ?>,
				autoplay_slideshow: <?php echo (!get_option('gg_lb_slideshow')) ? 'false' : 'true'; ?>,
				animation_speed: <?php echo (int)get_option('gg_lb_time') ?>,
				slideshow: <?php echo (int)get_option('gg_lb_ss_time') ?>,
				allow_expand: false,
				deeplinking: false,
				horizontal_padding: 17,
				ie6_fallback: false
				<?php if(!get_option('gg_lb_socials')) : ?>
				,social_tools: ''
				<?php endif; ?>
			});
		
			jQuery.prettyPhoto.open(api_img, api_tit, api_descr);
			jQuery.prettyPhoto.changePage(gg_img_index);
		}
		
	});
	</script>
	
	<?php 
	endif; 
	}
}
add_action('wp_footer', 'gg_lightboxes_footer', 999);

?>