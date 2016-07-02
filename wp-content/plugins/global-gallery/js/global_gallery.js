(function($) {
	gg_gallery_w = [];
	gg_img_margin = [];
	gg_img_margin_l = [];
	gg_img_border = [];
	gg_gallery_pag = [];
	
	gg_first_init = [];
	gg_new_images = [];
	gg_all_img_loaded = [];
	gg_is_paginating = [];
	gg_coll_gall_loading = [];
	
	gg_temp_w = [];
	gg_row_img = [];
	gg_row_img_w = [];
	gg_final_check = [];
	gg_gall_is_showing = [];
	
	// CSS3 loader code
	gg_loader = 
	'<div class="gg_loader">'+
		'<div class="ggl_1"></div><div class="ggl_2"></div><div class="ggl_3"></div><div class="ggl_4"></div>'+
	'</div>';
	
	
	jQuery(document).ready(function() {
		gg_galleries_init();
		gg_get_cg_deeplink();
		
		// if old IE, hide secondary overlay
		if(gg_is_old_IE()) {jQuery('.gg_sec_overlay').hide();}
	});
	
	
	// initialize the galleries
	gg_galleries_init = function(gid, after_resize) {
		// if need to initialize a specific gallery
		if(typeof(gid) != 'undefined' && gid) {
			if(typeof(after_resize) == 'undefined') {
				gg_first_init[gid] = 1;
				gg_new_images[gid] = 1;
				gg_is_paginating[gid] = 0;
				gg_coll_gall_loading[gid] = 0;
			}
			
			gg_gallery_process(gid);
		}
		
		// execute all the ones in the page
		else {
			jQuery('.gg_gallery_wrap').each(function() {
				var gg_gid = jQuery(this).attr('id');
				
				if(typeof(after_resize) == 'undefined') {
					gg_first_init[gg_gid] = 1;
					gg_new_images[gg_gid] = 1;
					gg_is_paginating[gg_gid] = 0;
					gg_coll_gall_loading[gg_gid] = 0;
				}
	
				gg_gallery_process(gg_gid);
			}); 
		}
	}
	
	
	// store galleries info 
	gg_gallery_info = function(gid) {
		// reset custom margin for centering and masonry
		var cont_padding = parseInt( jQuery('#'+gid+' .gg_container').css('padding-right')) + parseInt(jQuery('#'+gid+' .gg_container').css('padding-left'));
		gg_gallery_w[gid] = Math.floor(jQuery('#'+gid).outerWidth(true) - cont_padding);
		
		gg_img_border[gid] = parseInt( jQuery('#'+gid+' .gg_img').first().css('border-right-width'));
		gg_img_margin[gid] = parseInt( jQuery('#'+gid+' .gg_img').first().css('margin-right')); 
		gg_img_margin_l[gid] = parseInt( jQuery('#'+gid+' .gg_img').first().css('margin-left')); 
		
		// exceptions for isotope elements
		if(jQuery('#'+gid).hasClass('gg_masonry_gallery') || jQuery('#'+gid).hasClass('gg_collection_wrap')) {
			gg_img_border[gid] = parseInt( jQuery('#'+gid+' .gg_img_inner').first().css('border-right-width'));
			gg_img_margin[gid] = parseInt( jQuery('#'+gid+' .gg_img').first().css('padding-right')); 
			gg_img_margin_l[gid] = parseInt( jQuery('#'+gid+' .gg_img').first().css('padding-left')); 	
		}
	}
	
	// process a gallery
	gg_gallery_process = function(gid) {	
		gg_gallery_info(gid);
		gg_all_img_loaded[gid] = false;	
		
		if( jQuery('#'+gid).hasClass('gg_standard_gallery') ) {
			gg_man_standard_gallery(gid);	
		}
		else if( jQuery('#'+gid).hasClass('gg_masonry_gallery') ) {
			gg_man_masonry_gallery(gid);
		}
		else if( jQuery('#'+gid).hasClass('gg_string_gallery') ) {
			gg_man_string_gallery(gid);	
		}	
		else if( jQuery('#'+gid).hasClass('gg_collection_wrap') ) {
			gg_man_collection(gid);	
		}	

		return false;
	}
	
	
	/*** manage a standard gallery ***/
	gg_man_standard_gallery = function(gid) {
		var img_w = jQuery('#'+gid+' .gg_img').first().outerWidth(false) + gg_img_margin[gid];

		var img_per_row = Math.floor( gg_gallery_w[gid] / img_w );
		if(img_per_row == 0) {var img_per_row = 1;}
		
		var row_padding = parseInt( jQuery('#'+gid+' .gg_container').css('padding-left')) * 2;
		var row_w = (img_w * img_per_row) - gg_img_margin[gid] + row_padding;

		if(gg_new_images[gid] == 1) {
			jQuery('#'+gid+' .gg_img .gg_main_thumb').lcweb_lazyload({
				allLoaded: function(url_arr, width_arr, height_arr) {
					jQuery('#'+gid+' .gg_loader').fadeOut('fast');
					gg_img_fx_setup(gid, width_arr, height_arr);
					
					var b = 1;
					jQuery('#'+gid+' .gg_img').each(function(i) {
						var $img_obj = jQuery(this);
						jQuery(this).addClass(gid+'-'+i);
						
						if(b == img_per_row) { 
							jQuery('.'+gid+'-'+i).addClass('gg_lor'); 
							b = 1;
						} 
						else { 
							jQuery('.'+gid+'-'+i).removeClass('gg_lor');
							b++; 
						}
			
						////////////////////
						
						var $to_display = jQuery('#'+gid+' .gg_img').not('.gg_shown');
						if(i == 0) {gg_gallery_slideDown(gid, $to_display.size());}
						if(i == (url_arr.length - 1)) {$to_display.gg_display_images();}	
					});	
					
					gg_all_img_loaded[gid] = true;
				}
			});
		}
		else {
			var b = 1;
			jQuery('#'+gid+' .gg_img').each(function(i) {
				jQuery(this).addClass(gid+'-'+i);
				
				if(b == img_per_row) { 
					jQuery('.'+gid+'-'+i).addClass('gg_lor'); 
					b = 1;
				}
				else { 
					jQuery('.'+gid+'-'+i).removeClass('gg_lor');
					b++; 
				}	
			});
		}
		
		
		if(typeof(gg_final_check[gid]) != 'undefined' && gg_final_check[gid]) {clearTimeout(gg_final_check[gid]);}
		gg_final_check[gid] = setTimeout(function() { // little delay to let elements aligning automatically
			var w_diff = Math.floor( (gg_gallery_w[gid] - row_w) / 2 ); 
			jQuery('#'+gid+' .gg_container').css('width', (row_w + 1)).css('margin-left', w_diff);
		}, 70);
		
		gg_check_primary_ol(gid);	
	}
	

	/*** manage a masonry gallery ***/
	gg_man_masonry_gallery = function(gid) {
		var cols = parseInt(jQuery('#'+gid).attr('col-num')); 
		var add_space = gg_img_margin[gid] + gg_img_margin_l[gid];
		var max_w = Math.floor( (gg_masonry_max_w - (add_space * cols)) / cols);
		var min_w = parseInt(jQuery('#'+gid).attr('gg-minw')); 
		
		// reset container's width and margin
		jQuery('#'+gid+' .gg_container').css('margin-left', 0).css('width', 'auto');
		
		// get true columns related to screen size
		var true_cols = gg_isotope_col_count(cols, gg_gallery_w[gid], add_space, min_w)
		var perc_width = gg_cols_to_perc(true_cols);
		jQuery('#'+gid+' .gg_img').css('width', perc_width).css('max-width', max_w);
		
		// check to avoid 0.5px overflow if not single column
		if(true_cols > 1 && (jQuery('#'+gid+' .gg_img').first().outerWidth() * true_cols) > gg_gallery_w[gid]) {
			jQuery('#'+gid+' .gg_img').css('width', (jQuery('#'+gid+' .gg_img').first().outerWidth() - 1));
		}
		 
		jQuery('#'+gid+' .gg_img .gg_main_thumb').lcweb_lazyload({
			allLoaded: function(url_arr, width_arr, height_arr) {
				jQuery('#'+gid+' .gg_loader').fadeOut('fast');
				gg_img_fx_setup(gid, width_arr, height_arr);
				var img_num = jQuery('#'+gid+' .gg_img').size();
			
				jQuery('#'+gid+' .gg_img').each(function(i) {
					var img_class = gid+'-'+i;
					jQuery(this).addClass(img_class);
					
					if(i == (img_num - 1)) {
						setTimeout(function() {
							var true_w = Math.round( (parseInt(perc_width) / 100) * gg_gallery_w[gid]);
							if(true_w > max_w) {true_w = max_w;}
							
							gg_masonry_center(gid, true_w, true_cols);
						}, 100);	
					}
				});	
								
				if(gg_new_images[gid]) {
					jQuery('#'+gid+' .gg_container').isotope({
						masonry: {
						  columnWidth: 1
						},
						containerClass: 'gg_isotope',	
						itemClass : 'gg_isotope-item',
						itemSelector: '.gg_img',
						transitionDuration: '0.7s'
					});	
					
					setTimeout(function() { // litle delay to allow masonry placement
						var $to_display = jQuery('#'+gid+' .gg_img').not('.gg_shown');
						gg_gallery_slideDown(gid, $to_display.size());
						$to_display.gg_display_images();	
					}, 300);
				}
				
				gg_all_img_loaded[gid] = true;
				gg_check_primary_ol(gid);
			}
		});
	}
	
	
	/*** manage a photostring gallery ***/
	gg_man_string_gallery = function(gid) {
		gg_temp_w[gid] = 0;
		gg_row_img[gid] = jQuery.makeArray();
		gg_row_img_w[gid] = jQuery.makeArray();
		
		var horiz_borders = parseInt(jQuery('#'+gid+' .gg_img').first().css('border-top-width')) + parseInt(jQuery('#'+gid+' .gg_img').first().css('border-bottom-width'));
		var vert_borders = parseInt(jQuery('#'+gid+' .gg_img').first().css('border-left-width')) + parseInt(jQuery('#'+gid+' .gg_img').first().css('border-right-width'));
		var img_true_h = jQuery('#'+gid+' .gg_img').first().height();

		// reset 
		jQuery('#'+gid+' .gg_img').removeClass('gg_ps_forced');
		jQuery('#'+gid+' .gg_photo').css('margin-left', 0);

		jQuery('#'+gid+' .gg_img .gg_main_thumb').lcweb_lazyload({
			allLoaded: function(url_arr, width_arr, height_arr) {
				jQuery('#'+gid+' .gg_loader').fadeOut('fast');
				
				// manage image sizes in relation to gg_img borders - if any
				if(horiz_borders > 0) {
					jQuery.each(width_arr, function(i, v) {
						width_arr[i] = Math.floor( (img_true_h * width_arr[i]) / height_arr[i]);
						height_arr[i] = img_true_h;
					});
				}
				gg_img_fx_setup(gid, width_arr, height_arr);
				
				// elaborate and size
				jQuery('#'+gid+' .gg_img').each(function(i) {
					var $img_obj = jQuery(this);
					var img_class = gid+'-'+i;
					
					// manage again images width adding vertical borders
					var img_tot_w = width_arr[i] + vert_borders;
					$img_obj.css('width', img_tot_w).css('max-width', img_tot_w).addClass(img_class);

					// calculate row width with this image
					gg_temp_w[gid] = gg_temp_w[gid] + img_tot_w + gg_img_margin[gid]; 
					
					gg_row_img[gid].push(img_class);
					gg_row_img_w[gid].push(width_arr[i]);
					
					if( (gg_temp_w[gid] - gg_img_margin[gid]) == gg_gallery_w[gid]) {
						$img_obj.addClass('gg_lor');
						
						gg_temp_w[gid] = 0;
						gg_row_img[gid] = [];
						gg_row_img_w[gid] = [];
					}
					else if( (gg_temp_w[gid] - gg_img_margin[gid]) > gg_gallery_w[gid]) {
						$img_obj.addClass('gg_lor');
						var diff = (gg_temp_w[gid] - gg_img_margin[gid]) - gg_gallery_w[gid]; 

						gg_photostring_img_width(gid, gg_row_img[gid], gg_row_img_w[gid], diff, vert_borders);
						
						gg_temp_w[gid] = 0;
						gg_row_img[gid] = [];
						gg_row_img_w[gid] = [];
					}
					else { 
						$img_obj.removeClass('gg_lor');
					}
					
					////////////////////
					
					// security - reset row parameters
					if(i == (url_arr.length - 1)) {
						gg_temp_w[gid] = 0;
						gg_row_img[gid] = [];
						gg_row_img_w[gid] = [];
					}	
					
					if(gg_new_images[gid] == 1) {
						var $to_display = jQuery('#'+gid+' .gg_img').not('.gg_shown');
						if(i == 0) {gg_gallery_slideDown(gid, $to_display.size());}
						if(i == (url_arr.length - 1)) {$to_display.gg_display_images();}	
					}
				});
				
				// final check after CSS sizing
				if(typeof(gg_final_check[gid]) != 'undefined' && gg_final_check[gid]) {clearTimeout(gg_final_check[gid]);}
				gg_final_check[gid] = setTimeout(function() {
					var tot_w = 0;
					jQuery('#'+gid+' .gg_img').each(function(k, v) {
						tot_w = tot_w + jQuery(this).outerWidth(true);
						
						if(jQuery(this).hasClass('gg_lor')) {
							var diff = Math.ceil(tot_w) - (Math.floor(gg_gallery_w[gid]) - 1); // reduce by 1 to be safer
							if(diff != 0) {
								jQuery(this).addClass('gg_ps_forced');	
								var final_w = jQuery(this).outerWidth() - diff;
								jQuery(this).css('width', final_w).css('max-width', final_w);	
								
								var new_img_margin = parseInt(jQuery(this).find('.gg_photo').css('margin-left')) + Math.floor(diff/2) + 1;
								if(new_img_margin > 0) {new_img_margin = 0;}
								jQuery(this).find('.gg_photo').css('margin-left', new_img_margin);
							}	
							
							tot_w = 0;
						}
					});
				}, 210);
				
				gg_all_img_loaded[gid] = true;
				gg_check_primary_ol(gid, true);
			}
		});
	}
	
	// adjust the photostring images width
	var gg_photostring_img_width = function(gid, img_array, img_array_w, overflow, vert_borders) {
		var min_w = parseInt( jQuery('#'+gid).attr('gg-minw') );
		var to_reduce_arr = jQuery.makeArray();
		var to_reduce_arr_w = jQuery.makeArray();
		var temp_reduce = Math.ceil( overflow / img_array.length ); 
		var new_overflow = overflow;
		
		// check which can be reduced
		jQuery.each(img_array, function(k, v) {
			var $subj = jQuery('.'+v);
			var img_tot_w = Math.floor(img_array_w[k] + vert_borders);

			if( (img_tot_w - temp_reduce) > min_w && min_w < img_tot_w) { // check also images smaller than min width 
				to_reduce_arr.push(v); 
				to_reduce_arr_w.push( img_array_w[k] );
			}
			else {
				var img_diff = img_tot_w - min_w;
				
				if(img_diff > 0) {
					new_overflow = new_overflow - img_diff;	
					$subj.css('width', min_w).css('max-width', min_w);
					
					var img_offset = Math.floor((img_array_w[k] - (min_w - vert_borders)) / 2);
					img_offset = (img_offset <= 0) ? 0 : (img_offset * -1);
					 
					$subj.find('.gg_photo').css('margin-left', img_offset);
				}
			}
		});

		var to_reduce = Math.ceil( new_overflow / to_reduce_arr.length );
		
		jQuery.each(to_reduce_arr, function(k, v) {
			var $subj = jQuery('.'+v);
			var new_w = Math.floor(to_reduce_arr_w[k] + vert_borders - to_reduce);
			$subj.css('width', new_w).css('max-width', new_w);
			
			var img_offset = Math.floor((to_reduce_arr_w[k] - (new_w - vert_borders)) / 2);
			img_offset = (img_offset <= 0) ? 0 : (img_offset * -1);
			
			$subj.find('.gg_photo').css('margin-left', img_offset);
		});
	}
	
	
	/*** manage a collection ***/
	gg_man_collection = function(cid) {
		var cols = parseInt(jQuery('#'+cid).attr('col-num')); 
		var add_space = gg_img_margin[cid] + gg_img_margin_l[cid];
		var max_w = Math.floor( (gg_masonry_max_w - (add_space * cols)) / cols);
		var min_w = parseInt(jQuery('#'+cid).attr('gg-minw')); 
		
		// reset container max-width
		jQuery('#'+cid+' .gg_coll_container').css('margin-left', 0).css('width', '100%');

		// get true columns related to screen size
		var true_cols = gg_isotope_col_count(cols, gg_gallery_w[cid], add_space, min_w)
		var perc_width = gg_cols_to_perc(true_cols);
		jQuery('#'+cid+' .gg_coll_img').css('width', perc_width).css('max-width', max_w);
		
		// check to avoid 0.5px overflow if not single column
		if(true_cols > 1 && (jQuery('#'+cid+' .gg_coll_img').first().outerWidth() * true_cols) > gg_gallery_w[cid]) {
			jQuery('#'+cid+' .gg_coll_img').css('width', (jQuery('#'+cid+' .gg_coll_img').first().outerWidth() - 1));
		}
		
		//////
		
		// on collection first load
		if(gg_new_images[cid] == 1) {
			jQuery('#'+cid+' .gg_coll_container .gg_img .gg_main_thumb').lcweb_lazyload({
				allLoaded: function(url_arr, width_arr, height_arr) {
					jQuery('#'+cid+' .gg_loader').fadeOut('fast');
					gg_img_fx_setup(cid, width_arr, height_arr);
	
					jQuery('#'+cid+' .gg_coll_container .gg_img').each(function(i) {
						var $img_obj = jQuery(this);
						
						var img_class = cid+'-'+i;
						jQuery(this).addClass(img_class);

						gg_coll_center_img(cid);
						gg_coll_title_under(cid, img_class);
						
						if(i == (jQuery('#'+cid+' .gg_coll_container .gg_img').size() - 1)) {
							setTimeout(function() {
								var true_w = Math.round( (parseInt(perc_width) / 100) * gg_gallery_w[cid]);
								if(true_w > max_w) {true_w = max_w;}
								
								gg_masonry_center(cid, true_w, true_cols, true);
							}, 100);	
						}
					});
					
					jQuery('#'+cid+' .gg_coll_container').isotope({
						layoutMode : 'fitRows',
						containerClass: 'gg_isotope',	
						itemClass : 'gg_isotope-item',
						itemSelector: '.gg_coll_img',
						transitionDuration: '0.7s'
					});	
						
					// category filter deeplink
					gg_get_cf_deeplink();

					setTimeout(function() { // litle delay to allow masonry placement
						var $to_display = jQuery('#'+cid+' .gg_coll_container .gg_img').not('.gg_shown');
						gg_gallery_slideDown(cid, $to_display.size(), true);
						$to_display.gg_display_images();	
					}, 300);
				}
			});
		}
					
		// else control centering and text under
		else {
			jQuery('#'+cid+' .gg_coll_container .gg_img').each(function(i) {
				var img_class = cid+'-'+i;
				gg_coll_title_under(cid, img_class);
				
				if(i == (jQuery('#'+cid+' .gg_coll_container .gg_img').size() - 1)) {
					var img_w = jQuery(this).outerWidth();
					setTimeout(function() {
						gg_masonry_center(cid, img_w, true_cols, true);
					}, 100);	
				}
			});
			
			gg_coll_center_img(cid);
		}
	
		gg_all_img_loaded[cid] = true;	
		gg_new_images[cid] = false;
		gg_check_primary_ol(cid);	
	}
	
	// horizontally center images
	var gg_coll_center_img = function(cid) {
		var img_w = jQuery('#'+cid+' .gg_coll_img .gg_main_thumb').first().width();
		var img_w_diff = Math.floor( (img_w - jQuery('#'+cid+' .gg_coll_img_inner').width()) / 2 ) * -1;
		
		if(img_w_diff > 0) {img_w_diff = 0;}
		jQuery('#'+cid+' .gg_coll_img .gg_photo').css('margin-left', img_w_diff);
	}
	
	// manage the title under the images
	var gg_coll_title_under = function(cid, gid) {
		if( jQuery('#'+cid+' .gg_main_overlay_under').size() > 0) {
			var gg_title_h = jQuery('.'+gid+' .gg_main_overlay_under').outerHeight(false);
			jQuery('.'+gid).css('margin-bottom', (gg_title_h + 8));
		}
	}
	
	////////////////////////////////////////////////////
	
	// dynamic columns count for isotope-based galleries
	var gg_isotope_col_count = function(orig_cols, wrapper_w, add_space, min_w, forced_cols) {
		var cols = (typeof(forced_cols) == 'undefined') ? orig_cols : forced_cols;
		if(cols <= 1) {return 1;}
		
		var col_w = Math.ceil((wrapper_w - (cols * add_space)) / cols);
		if(col_w < min_w) {
			var to_force = cols - 1;
			return gg_isotope_col_count(orig_cols, wrapper_w, add_space, min_w, to_force);	
		} 
		else {
			return cols;	
		}
	}


	// columns to percentage width
	var gg_cols_to_perc = function(cols) {
		var part = 100/ cols;
		
		if(part % 1 === 0) {
			return part + '%';
		} else {
			return part.toFixed(1) + '%';	
		}	
	}
	
	
	// center masonry gallery / collection
	var gg_masonry_center = function(gid, img_w, cols, is_collection) {
		var cont_w = cols * img_w;
		var diff = gg_gallery_w[gid] - cont_w;
		var selector = (typeof(is_collection) == 'undefined') ? ' .gg_container' : ' .gg_coll_container';
		
		if(diff > 1) {
			var cont_margin = Math.floor( diff / 2 );	
			var cont_padding = parseInt( jQuery('#'+gid+selector).css('padding-right')) + parseInt( jQuery('#'+gid+selector).css('padding-left'));
			
			jQuery('#'+gid+selector).css('margin-left', cont_margin).css('width', (cont_w + cont_padding));	;	
		}
	}
	
	////////////////////////////////////////////////////////////////
	
	// load a collection gallery - click trigger
	jQuery(document).ready(function() {
		jQuery('body').delegate('.gg_coll_img:not(.gg_linked_img)', 'click', function() {
			var cid = jQuery(this).parents('.gg_collection_wrap').attr('id');
			var gdata = jQuery(this).attr('gall-data');
			var gid = jQuery(this).attr('rel');
			
			if(!gg_coll_gall_loading[cid]) {
				gg_set_deeplink('coll-gall', gid);
				gg_load_coll_gallery(cid, gdata);
			}
		});
	});
	
	// load a collection gallery - function
	gg_load_coll_gallery = function(cid, gdata) {
		var curr_url = jQuery(location).attr('href');
		
		if( jQuery('#'+cid+' .gg_coll_gallery_container .gg_gallery_wrap').size() > 0) {
			jQuery('#'+cid+' .gg_coll_gallery_container .gg_gallery_wrap').remove();	
			jQuery('#'+cid+' .gg_coll_gallery_container').append('<div class="gg_gallery_wrap">'+ gg_loader +'</div>');
		}
		jQuery('#'+cid+' .gg_coll_gallery_container .gg_gallery_wrap').addClass('gg_coll_ajax_wait');
	
		jQuery('#'+cid+' > table').animate({'left' : '-100%'}, 700, function() {
			jQuery('#'+cid+' .gg_coll_table_first_cell').css('opacity', 0);	
		});
		
		// scroll to the top of the collection - if is lower of the gallery top
		var coll_top_pos = jQuery('#'+cid).offset().top
		if( jQuery(window).scrollTop() > coll_top_pos ) {
			jQuery('html, body').animate({'scrollTop': coll_top_pos - 15}, 600);
		}
		
		gg_coll_gall_loading[cid] = 1;
		var data = {
			gg_type: 'gg_load_coll_gallery',
			cid: cid,
			gdata: gdata
		};
		
		jQuery.post(curr_url, data, function(response) {
			jQuery('#'+cid+' .gg_coll_gallery_container .gg_gallery_wrap').remove();
			jQuery('#'+cid+' .gg_coll_gallery_container').removeClass('gg_main_loader').append(response);
			jQuery('#'+cid+' .gg_coll_gall_title').not(':first').remove();
			gg_coll_gall_title_layout();
			gg_coll_gall_loading[cid] = 0;
			
			var gid = jQuery('#'+cid+' .gg_coll_gallery_container').find('.gg_gallery_wrap').attr('id');
			gg_galleries_init(gid);
		});	
	}
	
	
	// collections title - mobile check
	gg_coll_gall_title_layout = function() {
		jQuery('.gg_coll_gall_title').each(function() {
            var wrap_w = jQuery(this).parents('.gg_coll_table_cell').width();
			var elem_w = jQuery(this).parent().find('.gg_coll_go_back').outerWidth(true) + jQuery(this).outerWidth();
			
			if(elem_w > wrap_w) {jQuery(this).addClass('gg_narrow_coll');}
			else {jQuery(this).removeClass('gg_narrow_coll');}
        });	
	}
	
	
	// back to the collection
	jQuery(document).ready(function() {
		jQuery('body').delegate('.gg_coll_go_back', 'click', function() {
			var cid = jQuery(this).parents('.gg_collection_wrap').attr('id');
			if(gg_coll_gall_loading[cid] == 0) {
				jQuery('#'+cid+' .gg_coll_table_first_cell').css('opacity', 1);	
			
				jQuery('#'+cid+' > table').animate({'left' : 0}, 700, function() {	
					jQuery('#'+cid+' .gg_coll_gallery_container *').not('.gg_coll_go_back').fadeOut(300, function() {
						jQuery(this).remove();
						jQuery('#'+cid+' .gg_coll_gallery_container .gg_gallery_wrap, #'+cid+' .gg_coll_gallery_container .gg_coll_gall_title').remove();
						jQuery('#'+cid+' .gg_coll_gallery_container').append('<div class="gg_gallery_wrap"></div>');
					});
				});
				
				gg_clear_deeplink();	
			}
		});
	});
	
	
	// manual collections filter - handlers
	jQuery(document).ready(function() {
		jQuery('body').delegate('.gg_filter a', 'click', function(e) {
			e.preventDefault();
			
			var cid = jQuery(this).parents('.gg_filter').attr('id').substr(4);
			var sel = jQuery(this).attr('rel');
			var cont_id = '#' + jQuery(this).parents('.gg_collection_wrap').attr('id');
	
			jQuery('#ggf_'+cid+' a').removeClass('gg_cats_selected');
			jQuery(this).addClass('gg_cats_selected');	
	
			gg_coll_manual_filter(cid, sel, cont_id);
			
			// if is there a dropdown filter - select option 
			if( jQuery('#ggmf_'+cid).size() > 0 ) {
				jQuery('#ggmf_'+cid+' option').removeAttr('selected');
				
				if(jQuery(this).attr('rel') !== '*') {
					jQuery('#ggmf_'+cid+' option[value='+ jQuery(this).attr('rel') +']').attr('selected', 'selected');
				}
			}
		});
		
		jQuery('body').delegate('.gg_mobile_filter_dd', 'change', function(e) {
			var cid = jQuery(this).parents('.gg_mobile_filter').attr('id').substr(5);
			var sel = jQuery(this).val();
			var cont_id = '#' + jQuery(this).parents('.gg_collection_wrap').attr('id');
			
			gg_coll_manual_filter(cid, sel, cont_id);
			
			// select related desktop filter's button
			var btn_to_sel = (jQuery(this).val() == '*') ? '.ggf_all' : '.ggf_id_'+sel
			jQuery('#ggf_'+cid+' a').removeClass('gg_cats_selected');
			jQuery('#ggf_'+cid+' '+btn_to_sel).addClass('gg_cats_selected');
		});
	});
	
	
	// manual collections filter - perform
	var gg_coll_manual_filter = function(cid, sel, cont_id) {
		
		// set deeplink
		if ( sel !== '*' ) { gg_set_deeplink('cat', sel); }
		else { gg_clear_deeplink(); }

		if ( sel !== '*' ) { sel = '.ggc_' + sel;}
		jQuery(cont_id + ' .gg_coll_container').isotope({ filter: sel });
	};
	
	
	/////////////////////////////////////////////////
	// show gallery/collection images
	jQuery.fn.gg_display_images = function(index) {
		this.each(function(i, v) {
			var $subj = jQuery(this);
			var delay = (gg_delayed_fx) ? 170 : 0;
			var true_index = (typeof(index) == 'undefined') ? i : index;
			
			setTimeout(function() {
				if( navigator.appVersion.indexOf("MSIE 8.") != -1 || navigator.appVersion.indexOf("MSIE 9.") != -1 ) {
					$subj.fadeTo(450, 1);	
				}
				$subj.addClass('gg_shown');
			}, (delay * true_index));
		});
	};
	
	
	// remove loaders and slide down the gallery
	gg_gallery_slideDown = function(gid, img_num, is_collection) {
		if(typeof(gg_gall_is_showing[gid]) == 'undefined' || !gg_gall_is_showing[gid]) {
			var fx_time = img_num * 200;
			var $subj = (typeof(is_collection) == 'undefined') ? jQuery('#'+gid+' .gg_container') : jQuery('#'+gid+' .gg_coll_container');
	
			$subj.animate({"min-height": 80}, 300, 'linear').animate({"max-height": 9999}, 6500, 'linear');		
			gg_gall_is_showing[gid] = setTimeout(function() {
				if( // fix for old safari
					navigator.appVersion.indexOf("Safari") == -1 || 
					(navigator.appVersion.indexOf("Safari") != -1 && navigator.appVersion.indexOf("Version/5.") == -1 && navigator.appVersion.indexOf("Version/4.") == -1)
				) {
					$subj.css('min-height', 'none');
				}
				
				$subj.stop().css('max-height', 'none');
				gg_gall_is_showing[gid] = false;
			}, fx_time);
				
			
			if(gg_new_images[gid] == 1) {
				setTimeout(function() {
					gg_new_images[gid] = 0;
					jQuery('#'+gid+' .gg_paginate > div').fadeTo(150, 1);
				}, 500);	
			}
		}
	};
	

	/////////////////////////////////////
	// collections deeplinking
	
	// get collection filters dl
	function gg_get_cf_deeplink(browser_history) {
		var hash = location.hash;
		if(hash == '' || hash == '#gg') {return false;}
			
		if( jQuery('.gg_filter').size() > 0) {
			jQuery('.gg_gallery_wrap').each(function() {
				var cid = jQuery(this).attr('id');
				var val = hash.substring(hash.indexOf('#gg_cf')+7, hash.length)

				// check the cat existence
				if(hash.indexOf('#gg_cf') !== -1) {
					if( jQuery('#'+cid+' .gg_filter a[rel=' + val + ']').size() > 0 ) {
						var sel = '.ggc_' + jQuery('#'+cid+' .gg_filter a[rel=' + val + ']').attr('rel');
		
						// filter
						jQuery('#'+cid+' .gg_coll_container').isotope({ filter: sel });
						
						// set the selected
						jQuery('#'+cid+' .gg_filter a').removeClass('gg_cats_selected');
						jQuery('#'+cid+' .gg_filter a[rel=' + val + ']').addClass('gg_cats_selected');	
					}
				}
			});
		}
	}
	
	
	// get collection galleries - deeplink
	function gg_get_cg_deeplink(browser_history) { // coll selection
		var hash = location.hash;
		if(hash == '' || hash == '#gg') {return false;}
		
		if(hash.indexOf('#gg_cg') !== -1) {
			var gid = hash.substring(hash.indexOf('#gg_cg')+7, hash.length)
			
			// check the item existence
			if( jQuery('.gg_coll_img[rel=' + gid + ']').size() > 0 ) {
				var cid = jQuery('.gg_coll_img[rel=' + gid + ']').first().parents('.gg_gallery_wrap').attr('id');
				var gdata = jQuery('.gg_coll_img[rel=' + gid + ']').first().attr('gall-data');
				
				gg_load_coll_gallery(cid, gdata);
			}
		}
	}
	
	
	function gg_set_deeplink(subj, val) {
		if( gg_use_deeplink ) {
			gg_clear_deeplink();
	
			var gg_hash = (subj == 'cat') ? 'gg_cf' : 'gg_cg';  
			location.hash = gg_hash + '_' + val;
		}
	}
	
	
	function gg_clear_deeplink() {
		if( gg_use_deeplink ) {
			var curr_hash = location.hash;

			// find if a mg hash exists
			if(curr_hash.indexOf('#gg_cg') !== false || curr_hash.indexOf('#gg_cf') !== false) {
				location.hash = 'gg';
			}
		}
	}

	
	// browser history - disabled to avoid interferences in case of multiple collections
	/*jQuery(window).bind('hashchange', function() {
		gg_get_cg_deeplink();
		gg_get_cf_deeplink(true);
	});*/

	
	//////////////////////////////////////
	// pagination
	
	jQuery(document).ready(function() {
		// standard pagination - next
		jQuery('body').delegate('.gg_next_page', 'click', function() {
			var gid = jQuery(this).parents('.gg_gallery_wrap').attr('id');
			
			if( !jQuery(this).hasClass('gg_pag_disabled') && gg_is_paginating[gid] == 0 ){
				var curr_page = parseInt( jQuery(this).parents('.gg_standard_pag').find('span').text() );
				gg_standard_pagination(gid, curr_page, 'next');
			}
		});
		
		// standard pagination - prev
		jQuery('body').delegate('.gg_prev_page', 'click', function() {
			var gid = jQuery(this).parents('.gg_gallery_wrap').attr('id');
			
			if( !jQuery(this).hasClass('gg_pag_disabled') && gg_is_paginating[gid] == 0 ){
				var curr_page = parseInt( jQuery(this).parents('.gg_standard_pag').find('span').text() );
				gg_standard_pagination(gid, curr_page, 'prev');
			}
		});	
	});
	
	// standard pagination - do pagination
	gg_standard_pagination = function(gid, curr_page, action) {
		if(gg_is_paginating[gid] == 0) {
			gg_is_paginating[gid] = 1;
			gg_all_img_loaded[gid] = false;	
			
			var curr_url = jQuery(location).attr('href');
			var images = gg_temp_data[gid];
			
			var next_pag = (action == 'next') ?  curr_page + 1 : curr_page - 1;
			if(next_pag < 1) {next_pag = 1;}
			jQuery('#'+gid+' .gg_paginate').find('span').text(next_pag);
			
			// smooth change effect
			var curr_h = jQuery('#'+gid+' .gg_container').height();
			var smooth_timing = Math.round( (curr_h / 30) * 25);
			if(smooth_timing < 220) {smooth_timing = 220;}

			if(typeof(gg_gall_is_showing[gid]) != 'undefined') {
				clearTimeout(gg_gall_is_showing[gid]);
				gg_gall_is_showing[gid] = false;
			}
			
			jQuery('#'+gid+' .gg_container').css('max-height', curr_h).stop().animate({"max-height": 150}, smooth_timing);
			var is_closing = true
			setTimeout(function() {	is_closing = false; }, smooth_timing);
			
			// hide images
			jQuery('#'+gid+' .gg_img').addClass('gg_old_page');
			if( navigator.appVersion.indexOf("MSIE 8.") != -1 || navigator.appVersion.indexOf("MSIE 9.") != -1 ) {
				jQuery('#'+gid+' .gg_img').fadeTo(200, 0);
			}
			
			// show loader
			setTimeout(function() {	
				jQuery('#'+gid+' .gg_loader').fadeIn('fast');
			}, 200);
			
			
			// destroy the old isotope layout
			setTimeout(function() {	
				if( jQuery('#'+gid).hasClass('gg_masonry_gallery')) { 
					jQuery('#'+gid+' .gg_container').isotope('destroy'); 
				}
			}, (smooth_timing - 10));

			// scroll to the top of the gallery
			if($(window).scrollTop() > (jQuery("#"+gid).offset().top - 20)) {
				jQuery('html,body').animate({scrollTop: (jQuery("#"+gid).offset().top - 20)}, smooth_timing);
			}
		
			// get new data
			var data = {
				gg_type: 'gg_pagination',
				gg_shown: jQuery('#'+gid+' .gg_main_thumb').first().attr('id'),
				gg_page: next_pag,
				gg_images: images
			};

			jQuery.post(curr_url, data, function(response) {
				var wait = setInterval(function() {
					if(!is_closing) {
						clearInterval(wait);
						
						jQuery('#'+gid+' .gg_paginate .gg_loader').remove();
						jQuery('#'+gid+' .gg_standard_pag').fadeTo(200, 1);
						
						resp = jQuery.parseJSON(response);
						jQuery('#'+gid+' .gg_container').html(resp.html);
						
						// if old IE, hide secondary overlay
						if(gg_is_old_IE()) {jQuery('.gg_sec_overlay').hide();}
						
						gg_new_images[gid] = 1;
						gg_gallery_process(gid);
						gg_is_paginating[gid] = 0;
						
						if(resp.more != '1') { jQuery('#'+gid+' .gg_paginate').find('.gg_next_page').addClass('gg_pag_disabled'); }
						else { jQuery('#'+gid+' .gg_paginate').find('.gg_next_page').removeClass('gg_pag_disabled'); }
						
						if(next_pag == 1) { jQuery('#'+gid+' .gg_paginate').find('.gg_prev_page').addClass('gg_pag_disabled'); }
						else { jQuery('#'+gid+' .gg_paginate').find('.gg_prev_page').removeClass('gg_pag_disabled'); }
					}
				}, 10);
			});
		}
	}
	
	
	// infinite scroll
	jQuery(document).ready(function() {
		jQuery('body').delegate('.gg_infinite_scroll', 'click', function() {
			var gid = jQuery(this).parents('.gg_gallery_wrap').attr('id');
			var curr_url = jQuery(location).attr('href');
			
			var shown = jQuery.makeArray();
			var images = gg_temp_data[gid];
			
			gg_all_img_loaded[gid] = false;	
			jQuery('#'+gid+' .gg_container').css('max-height', jQuery('#'+gid+' .gg_container').height());
			
			// hide nav and append loader
			if( jQuery('#'+gid+' .gg_paginate .gg_loader').size() != 0 ) {jQuery('#'+gid+' .gg_paginate .gg_loader').remove();}
			jQuery('#'+gid+' .gg_infinite_scroll').fadeTo(200, 0);
			setTimeout(function() {	
				jQuery('#'+gid+' .gg_paginate').prepend(gg_loader);
			}, 200);

			// set the page to show
			if(typeof(gg_gallery_pag[gid]) == 'undefined') { 
				var next_pag = 2;
				gg_gallery_pag[gid] = next_pag; 
			} else {
				var next_pag = gg_gallery_pag[gid] + 1;
				gg_gallery_pag[gid] = next_pag; 	
			}

			var data = {
				gg_type: 'gg_pagination',
				gg_shown: jQuery('#'+gid+' .gg_main_thumb').first().attr('id'),
				gg_page: next_pag,
				gg_images: images
			};
			jQuery.post(curr_url, data, function(response) {
				resp = jQuery.parseJSON(response);
				
				if( jQuery('#'+gid).hasClass('gg_string_gallery') ) {
					jQuery('#'+gid+' .gg_container .gg_string_clear_both').remove();
					jQuery('#'+gid+' .gg_container').append(resp.html);
					jQuery('#'+gid+' .gg_container').append('<div class="gg_string_clear_both" style="clear: both;"></div>');
				}
				else {
					jQuery('#'+gid+' .gg_container').append(resp.html);	
				}
				
				if( jQuery('#'+gid).hasClass('gg_masonry_gallery')) {
					jQuery('#'+gid+' .gg_container').isotope('reloadItems');
				}
				
				// if old IE, hide secondary overlay
				if(gg_is_old_IE()) {jQuery('.gg_sec_overlay').hide();}
	
				gg_new_images[gid] = 1;
				gg_gallery_process(gid);
				
				if(resp.more != '1') { jQuery('#'+gid+' .gg_paginate').remove(); }
				else {
					jQuery('#'+gid+' .gg_paginate .gg_loader').remove();
					jQuery('#'+gid+' .gg_infinite_scroll').fadeTo(200, 1);	
				}
			});
		});
	});
	
	
	//  primary overlay check - if no title or too small, hide
	gg_check_primary_ol = function(gid, respect_delay) {
		var check_delay = (typeof(respect_delay) == 'undefined') ? 0 : 150;
				
		jQuery('#'+gid+' .gg_img').each(function(i, e) {
			var $ol_subj = jQuery(this);
			
			setTimeout(function() {
				var ol_title = $ol_subj.find('.gg_img_title').html();
				
				if( $ol_subj.width() < 100 || jQuery.trim(ol_title) == '') { 
					$ol_subj.find('.gg_main_overlay').hide(); 
				}
				else { $ol_subj.find('.gg_main_overlay').show();  }
			}, (check_delay * (i + 1)) ); 
		});	
	}
	
	
	// images effects
	gg_img_fx_setup = function(gid, width_arr, height_arr) {
		if( jQuery('#'+gid+' .gg_grayscale_fx').size() > 0 ) {
			
			// create and append grayscale image
			jQuery('#'+gid+' .gg_main_thumb').each(function(i, v) {
				if( jQuery(this).parents('.gg_img').find('.gg_fx_canvas').size() == 0 ) {
					var img = new Image();
					img.onload = function(e) {
						Pixastic.process(img, "desaturate", {average : false});
					}
					
					jQuery(img).addClass('gg_photo gg_grayscale_fx gg_fx_canvas');
					jQuery(this).parents('.gg_img').find('.gg_overlays').prepend(img);
					jQuery(this).parents('.gg_img').find('.gg_fx_to_remove').remove();
					
					if(navigator.appVersion.indexOf("MSIE 9.") != -1 || navigator.appVersion.indexOf("MSIE 10.") != -1) {	
						jQuery(this).parents('.gg_img').find('.gg_fx_canvas').css('max-width', width_arr[i]).css('max-height', height_arr[i]);
						if( jQuery(this).parents('.gg_gallery_wrap').hasClass('gg_collection_wrap') ) {
							jQuery(this).parents('.gg_img').find('.gg_fx_canvas').css('min-width', width_arr[i]).css('min-height', height_arr[i]);	
						}
					}
					
					img.src = jQuery(this).attr('src');			
				}
			});
			
			// mouse hover opacity
			jQuery('#'+gid).delegate('.gg_img','mouseenter touchstart', function(e) {
				if(!gg_is_old_IE()) {
					jQuery(this).find('.gg_grayscale_fx').stop().animate({opacity: 0}, 300);
				} else {
					jQuery(this).find('.gg_grayscale_fx').stop().fadeOut(300);	
				}
			}).
			delegate('.gg_img','mouseleave touchend', function(e) {
				if(!gg_is_old_IE()) {
					jQuery(this).find('.gg_grayscale_fx').stop().animate({opacity: 1}, 300);
				} else {
					jQuery(this).find('.gg_grayscale_fx').stop().fadeIn(300);	
				}
			});
		}
		
		if( jQuery('#'+gid+' .gg_blur_fx').size() > 0 ) {
			
			// create and append blurred image
			jQuery('#'+gid+' .gg_main_thumb').each(function(i, v) {
				if( jQuery(this).parents('.gg_img').find('.gg_fx_canvas').size() == 0 ) {
					var img = new Image();
					img.onload = function() {
						Pixastic.process(img, "blurfast", {amount:0.2});
					}
	
					jQuery(img).addClass('gg_photo gg_blur_fx gg_fx_canvas').attr('style', 'opacity: 0; filter: alpha(opacity=0);');
					jQuery(this).parents('.gg_img').find('.gg_overlays').prepend(img);
					jQuery(this).parents('.gg_img').find('.gg_fx_to_remove').remove();
					
					if(navigator.appVersion.indexOf("MSIE 9.") != -1 || navigator.appVersion.indexOf("MSIE 10.") != -1) {	
						jQuery(this).parents('.gg_img').find('.gg_fx_canvas').css('max-width', width_arr[i]).css('max-height', height_arr[i]);
						if( jQuery(this).parents('.gg_gallery_wrap').hasClass('gg_collection_wrap') ) {
							jQuery(this).parents('.gg_img').find('.gg_fx_canvas').css('min-width', width_arr[i]).css('min-height', height_arr[i]);	
						}
					}
					
					img.src = jQuery(this).attr('src');
				}
			});
			
			// mouse hover opacity
			jQuery('#'+gid).delegate('.gg_img','mouseenter touchstart', function(e) {
				if(!gg_is_old_IE()) {
					jQuery(this).find('.gg_blur_fx').stop().animate({opacity: 1}, 300);
				} else {
					jQuery(this).find('.gg_blur_fx').stop().fadeIn(300);	
				}
			}).
			delegate('.gg_img','mouseleave touchend', function(e) {
				if(!gg_is_old_IE()) {
					jQuery(this).find('.gg_blur_fx').stop().animate({opacity: 0}, 300);
				} else {
					jQuery(this).find('.gg_blur_fx').stop().fadeOut(300);	
				}
			});	
		}
	}

	
	// touch devices hover effects
	if( gg_is_touch_device() ) {
		jQuery('.gg_img').bind('touchstart', function() { jQuery(this).addClass('gg_touch_on'); });
		jQuery('.gg_img').bind('touchend', function() { jQuery(this).removeClass('gg_touch_on'); });
	}
	
	// check for touch device
	function gg_is_touch_device() {
		return !!('ontouchstart' in window);
	}
	
	
	/////////////////////////////////////
	// galleria slider functions
	
	// manage the slider initial appearance
	gg_galleria_show = function(sid) {
		setTimeout(function() {
			if( jQuery(sid+' .galleria-stage').size() > 0) {
				jQuery(sid).removeClass('gg_show_loader');
				jQuery(sid+' .galleria-container').fadeTo(200, 1);	
			} else {
				gg_galleria_show(sid);	
			}
		}, 50);
	}
	
	
	// manage the slider proportions on resize
	gg_galleria_height = function(sid) {
		if( jQuery(sid).hasClass('gg_galleria_responsive')) {
			return parseFloat( jQuery(sid).attr('asp-ratio') );
		} else {
			return jQuery(sid).height();	
		}
	}
	
	
	// Initialize Galleria
	gg_galleria_init = function(sid) {
		// autoplay flag
		var spec_autop = jQuery(sid).attr('gg-autoplay');
		var sl_autoplay = ((gg_galleria_autoplay && spec_autop != '0') || (spec_autop == '1')) ? true : false;

		// init
		Galleria.run(sid, {
			theme: 'ggallery', 
			height: gg_galleria_height(sid),
			extend: function() {
				var gg_slider_gall = this;
				jQuery(sid+' .galleria-loader').append(gg_loader);
				
				if(sl_autoplay) {
					jQuery(sid+' .galleria-gg-play').addClass('galleria-gg-pause')
					gg_slider_gall.play(gg_galleria_interval);	
				}
				
				// play-pause
				jQuery(sid+' .galleria-gg-play').click(function() {
					jQuery(this).toggleClass('galleria-gg-pause');
					gg_slider_gall.playToggle(gg_galleria_interval);
				});
				
				// pause slider on lightbox click
				jQuery(sid+' .galleria-gg-lightbox').click(function() {
					// get the slider offset
					jQuery(sid+' .galleria-thumbnails > div').each(function(k, v) {
                       if( jQuery(this).hasClass('active') ) {gg_active_index = k;} 
                    });
					
					jQuery(sid+' .galleria-gg-play').removeClass('galleria-gg-pause');
					gg_slider_gall.pause();
				});
				
				// thumbs navigator toggle
				jQuery(sid+' .galleria-gg-toggle-thumb').click(function() {
					var $gg_slider_wrap = jQuery(this).parents('.gg_galleria_slider_wrap');
					var thumb_h = jQuery(this).parents('.gg_galleria_slider_wrap').find('.galleria-thumbnails-container').height();
					
					if( $gg_slider_wrap.hasClass('galleria-gg-show-thumbs') || $gg_slider_wrap.hasClass('gg_galleria_slider_show_thumbs') ) {
						$gg_slider_wrap.stop().animate({'padding-bottom' : '15px'}, 400);
						$gg_slider_wrap.find('.galleria-thumbnails-container').stop().animate({'bottom' : '20px', 'opacity' : 0}, 400);
						
						$gg_slider_wrap.removeClass('galleria-gg-show-thumbs');
						if( $gg_slider_wrap.hasClass('gg_galleria_slider_show_thumbs') ) {
							$gg_slider_wrap.removeClass('gg_galleria_slider_show_thumbs')
						}
					} 
					else {
						$gg_slider_wrap.stop().animate({'padding-bottom' : (thumb_h + 2 + 12)}, 400);
						$gg_slider_wrap.find('.galleria-thumbnails-container').stop().animate({'bottom' : '-'+ (thumb_h + 2 + 10) +'px', 'opacity' : 1}, 400);	
						
						$gg_slider_wrap.addClass('galleria-gg-show-thumbs');
					}
				});
			}
		});
	}
	
	
	/////////////////////////////////////
	// debounce resize to trigger only once
	gg_debouncer = function($,cf,of, interval){
		var debounce = function (func, threshold, execAsap) {
			var timeout;
			
			return function debounced () {
				var obj = this, args = arguments;
				function delayed () {
					if (!execAsap) {func.apply(obj, args);}
					timeout = null;
				}
			
				if (timeout) {clearTimeout(timeout);}
				else if (execAsap) {func.apply(obj, args);}
				
				timeout = setTimeout(delayed, threshold || interval);
			};
		};
		jQuery.fn[cf] = function(fn){ return fn ? this.bind(of, debounce(fn)) : this.trigger(cf); };
	};
	gg_debouncer(jQuery,'gg_smartresize', 'resize', 49);
	
	jQuery(window).gg_smartresize(function() {
		// rebuilt galleries on resize
		gg_galleries_init(false, 1);
		
		// resize galleria slider
		jQuery('.gg_galleria_responsive').each(function() {	
			var slider_w = jQuery(this).width();
			var gg_asp_ratio = parseFloat(jQuery(this).attr('asp-ratio'));
			var new_h = Math.ceil( slider_w * gg_asp_ratio );
			jQuery(this).css('height', new_h);
		});
		
		// collection galleries title check
		gg_coll_gall_title_layout();
	});
	
	
	/////////////////////////////////////////////////////
	// check if the browser is IE8 or older
	function gg_is_old_IE() {
		if( navigator.appVersion.indexOf("MSIE 7.") != -1 || navigator.appVersion.indexOf("MSIE 8.") != -1 ) {return true;}
		else {return false;}	
	}
})(jQuery);


/////////////////////////////////////
// Image preloader v1.01
(function($) {	
	$.fn.lcweb_lazyload = function(lzl_callbacks) {
		lzl_callbacks = jQuery.extend({
			oneLoaded: function() {},
			allLoaded: function() {}
		}, lzl_callbacks);

		var lzl_loaded = 0, 
			lzl_url_array = [], 
			lzl_width_array = [], 
			lzl_height_array = [], 
			lzl_img_obj = this;
		
		var check_complete = function() {
			if(lzl_url_array.length == lzl_loaded) {
				lzl_callbacks.allLoaded.call(this, lzl_url_array, lzl_width_array, lzl_height_array); 
			}
		}

		var lzl_load = function() {
			jQuery.map(lzl_img_obj, function(n, i){
                lzl_url_array.push( $(n).attr('src') );
            });
			
			jQuery.each(lzl_url_array, function(i, v) {
				if( jQuery.trim(v) == '' ) {console.log('empty img url - ' + (i+1) );}
				
				$('<img />').bind("load.lcweb_lazyload",function(){ 
					if(this.width == 0 || this.height == 0) {
						setTimeout(function() {
							lzl_width_array[i] = this.width;
							lzl_height_array[i] = this.height;
							
							lzl_loaded++;
							check_complete();
						}, 70);
					}
					else {
						lzl_width_array[i] = this.width;
						lzl_height_array[i] = this.height;
						
						lzl_loaded++;
						check_complete();
					}
				}).attr('src',  v);
			});
		}
		
		return lzl_load();
	}; 
	
})(jQuery);