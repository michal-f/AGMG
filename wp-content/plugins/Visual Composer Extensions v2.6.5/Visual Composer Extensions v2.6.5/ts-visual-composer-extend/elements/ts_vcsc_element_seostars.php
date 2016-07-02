<?php
    if (function_exists('vc_map')) {
        vc_map( array(
            "name"                      => __( "TS Rating Scale", "ts_visual_composer_extend" ),
            "base"                      => "TS_VCSC_Star_Rating",
            "icon" 	                    => "icon-wpb-ts_vcsc_star_rating",
            "class"                     => "",
            "category"                  => __( "VC Extensions", "ts_visual_composer_extend" ),
            "description"               => __("Place a rating scale element", "ts_visual_composer_extend"),
            //"admin_enqueue_js"        => array(""),
            //"admin_enqueue_css"       => array(""),
            "params"                    => array(
                // Rating Settings
                array(
                    "type"              => "seperator",
                    "heading"           => __( "", "ts_visual_composer_extend" ),
                    "param_name"        => "seperator_1",
					"value"				=> "",
                    "seperator"         => "Rating Settings",
                    "description"       => __( "", "ts_visual_composer_extend" )
                ),
				array(
					"type"              => "dropdown",
					"heading"           => __( "Symbol", "ts_visual_composer_extend" ),
					"param_name"        => "rating_symbol",
					"value"             => array(
						__( "Other Icon", "ts_visual_composer_extend" )                 => "other",
						__( "Smileys", "ts_visual_composer_extend" )                    => "smile",
					),
					"admin_label"		=> true,
					"description"       => __( "Select how you want to display the rating.", "ts_visual_composer_extend" ),
					"dependency"        => ""
				),			
				array(
					"type"              => "ratingicon",
					"heading"           => __( "Rating Icon", "ts_visual_composer_extend" ),
					"param_name"        => "rating_icon",
					"value"             => "",
					"admin_label"       => true,
					"description"       => __( "Select which icon should be used to reflect the rating.", "ts_visual_composer_extend" ),
					"dependency"        => array( 'element' => "rating_symbol", 'value' => 'other' ),
				),				
				array(
					"type"				=> "switch",
					"heading"           => __( "Use Shortcode for Rating Value", "ts_visual_composer_extend" ),
					"param_name"        => "rating_shortcode",
					"value"             => "false",
					"on"				=> __( 'Yes', "ts_visual_composer_extend" ),
					"off"				=> __( 'No', "ts_visual_composer_extend" ),
					"style"				=> "select",
					"design"			=> "toggle-light",
					"description"       => __( "Switch the toggle if you want to use a shortcode to generate the rating value.", "ts_visual_composer_extend" ),
                    "dependency"        => "",
				),			
                array(
                    "type"              => "nouislider",
                    "heading"           => __( "Rating (out of 5.00)", "ts_visual_composer_extend" ),
                    "param_name"        => "rating_value",
                    "value"             => "0",
                    "min"               => "0",
                    "max"               => "5",
                    "step"              => "0.25",
					"decimals"			=> "2",
                    "unit"              => '',
                    "admin_label"		=> true,
					"dependency"        => array( 'element' => "rating_shortcode", 'value' => 'false' ),
                    "description"       => __( "Define the rating in stars; quarter increments possible.", "ts_visual_composer_extend" )
                ),				
				array(
					"type"              => "textarea_raw_html",
					"heading"           => __( "Rating (out of 5.00)", "ts_visual_composer_extend" ),
					"param_name"        => "rating_dynamic",
					"value"             => base64_encode(""),
					"description"       => __( "Enter the shortcode that will dynamically generate the rating value.", "ts_visual_composer_extend" ),
					"dependency"        => array( 'element' => "rating_shortcode", 'value' => 'true' ),
				),				
				array(
					"type"				=> "switch",
					"heading"           => __( "RTL Alignment", "ts_visual_composer_extend" ),
					"param_name"        => "rating_rtl",
					"value"             => "false",
					"on"				=> __( 'Yes', "ts_visual_composer_extend" ),
					"off"				=> __( 'No', "ts_visual_composer_extend" ),
					"style"				=> "select",
					"design"			=> "toggle-light",
					"description"       => __( "Switch the toggle if you want to show the rating in 'RTL' (Right-To-Left) alignment.", "ts_visual_composer_extend" ),
                    "dependency"        => "",
				),				
				array(
					"type"              => "textfield",
					"heading"           => __( "Title", "ts_visual_composer_extend" ),
					"param_name"        => "rating_title",
					"value"             => "",
					"description"       => __( "Enter an optional title for the rating.", "ts_visual_composer_extend" ),
					"admin_label"		=> true,
					"group" 			=> "",
				),
				// Style Settings
                array(
                    "type"              => "seperator",
                    "heading"           => __( "", "ts_visual_composer_extend" ),
                    "param_name"        => "seperator_2",
					"value"				=> "",
                    "seperator"         => "Style Settings",
                    "description"       => __( "", "ts_visual_composer_extend" )
                ),
				array(
					"type"              => "nouislider",
					"heading"           => __( "Max. Icon Size", "ts_visual_composer_extend" ),
					"param_name"        => "rating_size",
					"value"             => "25",
					"min"               => "12",
					"max"               => "512",
					"step"              => "1",
					"decimals"			=> "0",
					"unit"              => 'px',
					"admin_label"		=> true,
					"description"       => __( "Select the maximum individual rating icon size; site will scale to fit into column if necessary.", "ts_visual_composer_extend" ),
					"dependency"        => ""
				),
				array(
					"type"				=> "switch",
					"heading"           => __( "Auto-Size Adjust", "ts_visual_composer_extend" ),
					"param_name"        => "rating_auto",
					"value"             => "true",
					"on"				=> __( 'Yes', "ts_visual_composer_extend" ),
					"off"				=> __( 'No', "ts_visual_composer_extend" ),
					"style"				=> "select",
					"design"			=> "toggle-light",
					"admin_label"		=> true,
					"description"       => __( "Switch the toggle if you want the rating to automatically adjust the icon size in order to fit into columns.", "ts_visual_composer_extend" ),
                    "dependency"        => "",
				),				
				array(
					"type"              => "colorpicker",
					"heading"           => __( "Rated Icon Fill Color", "ts_visual_composer_extend" ),
					"param_name"        => "color_rated",
					"value"             => "#FFD800",
					"description"       => __( "Define the fill color for the rated icons.", "ts_visual_composer_extend" ),
					"dependency"        => ""
				),
				array(
					"type"              => "colorpicker",
					"heading"           => __( "Empty Icon Fill Color", "ts_visual_composer_extend" ),
					"param_name"        => "color_empty",
					"value"             => "#e3e3e3",
					"description"       => __( "Define the fill color for the empty icons.", "ts_visual_composer_extend" ),
					"dependency"        => ""
				),
				// Rating Caption
                array(
                    "type"              => "seperator",
                    "heading"           => __( "", "ts_visual_composer_extend" ),
                    "param_name"        => "seperator_3",
					"value"				=> "",
                    "seperator"         => "Caption Settings",
                    "description"       => __( "", "ts_visual_composer_extend" ),
					"group" 			=> "Caption Settings",
                ),
				array(
					"type"				=> "switch",
					"heading"           => __( "Show Rating Caption", "ts_visual_composer_extend" ),
					"param_name"        => "caption_show",
					"value"             => "true",
					"on"				=> __( 'Yes', "ts_visual_composer_extend" ),
					"off"				=> __( 'No', "ts_visual_composer_extend" ),
					"style"				=> "select",
					"design"			=> "toggle-light",
					"description"       => __( "Switch the toggle if you also want to show a caption with the rating as number.", "ts_visual_composer_extend" ),
                    "dependency"        => "",
					"group" 			=> "Caption Settings",
				),
				array(
					"type"              => "dropdown",
					"heading"           => __( "Position", "ts_visual_composer_extend" ),
					"param_name"        => "caption_position",
					"value"             => array(
						__( "Left", "ts_visual_composer_extend" )					=> "left",
						__( "Right", "ts_visual_composer_extend" )					=> "right",
					),
					"description"       => __( "Select where the numeric rating caption block should be placed.", "ts_visual_composer_extend" ),
					"dependency"        => array( 'element' => "caption_show", 'value' => 'true' ),
					"group" 			=> "Caption Settings",
				),
                array(
                    "type"              => "dropdown",
                    "heading"           => __( "Decimals Seperator", "ts_visual_composer_extend" ),
                    "param_name"        => "caption_digits",
                    "width"             => 150,
                    "value"             => array(
						__( 'Dot', "ts_visual_composer_extend" )          => ".",
                        __( 'Comma', "ts_visual_composer_extend" )        => ",",                        
                        __( 'Space', "ts_visual_composer_extend" )        => " ",
                    ),
                    "description"       => __( "Select a character to seperate decimals in the rating value.", "ts_visual_composer_extend" ),
                    "dependency"		=> array( 'element' => "caption_show", 'value' => 'true' ),
					"group" 			=> "Caption Settings",
                ),
				array(
					"type"              => "colorpicker",
					"heading"           => __( "Caption Background 0-1", "ts_visual_composer_extend" ),
					"param_name"        => "caption_danger",
					"value"             => "#d9534f",
					"description"       => __( "Define the caption background for rating values between 0 - 1.", "ts_visual_composer_extend" ),
					"dependency"        => array( 'element' => "caption_show", 'value' => 'true' ),
					"group" 			=> "Caption Settings",
				),
				array(
					"type"              => "colorpicker",
					"heading"           => __( "Caption Background 1-2", "ts_visual_composer_extend" ),
					"param_name"        => "caption_warning",
					"value"             => "#f0ad4e",
					"description"       => __( "Define the caption background for rating values between 1 - 2.", "ts_visual_composer_extend" ),
					"dependency"        => array( 'element' => "caption_show", 'value' => 'true' ),
					"group" 			=> "Caption Settings",
				),
				array(
					"type"              => "colorpicker",
					"heading"           => __( "Caption Background 2-3", "ts_visual_composer_extend" ),
					"param_name"        => "caption_info",
					"value"             => "#5bc0de",
					"description"       => __( "Define the caption background for rating values between 2 - 3.", "ts_visual_composer_extend" ),
					"dependency"        => array( 'element' => "caption_show", 'value' => 'true' ),
					"group" 			=> "Caption Settings",
				),
				array(
					"type"              => "colorpicker",
					"heading"           => __( "Caption Background 3-4", "ts_visual_composer_extend" ),
					"param_name"        => "caption_primary",
					"value"             => "#428bca",
					"description"       => __( "Define the caption background for rating values between 3 - 4.", "ts_visual_composer_extend" ),
					"dependency"        => array( 'element' => "caption_show", 'value' => 'true' ),
					"group" 			=> "Caption Settings",
				),
				array(
					"type"              => "colorpicker",
					"heading"           => __( "Caption Background 4-5", "ts_visual_composer_extend" ),
					"param_name"        => "caption_success",
					"value"             => "#5cb85c",
					"description"       => __( "Define the caption background for rating values between 4 - 5.", "ts_visual_composer_extend" ),
					"dependency"        => array( 'element' => "caption_show", 'value' => 'true' ),
					"group" 			=> "Caption Settings",
				),
				// Rating Tooltip
				array(
					"type"				=> "seperator",
					"heading"			=> __( "", "ts_visual_composer_extend" ),
					"param_name"		=> "seperator_4",
					"value"				=> "",
                    "seperator"         => "Tooltip Settings",
					"description"		=> __( "", "ts_visual_composer_extend" ),
					"group" 			=> "Tooltip Settings",
				),
				array(
					"type"				=> "switch",
					"heading"			=> __( "Use CSS3 Tooltip", "ts_visual_composer_extend" ),
					"param_name"		=> "tooltip_css",
					"value"				=> "false",
					"on"				=> __( 'Yes', "ts_visual_composer_extend" ),
					"off"				=> __( 'No', "ts_visual_composer_extend" ),
					"style"				=> "select",
					"design"			=> "toggle-light",
					"description"       => __( "Switch the toggle if you want to apply a CSS3 tooltip to the element.", "ts_visual_composer_extend" ),
                    "dependency"        => "",
					"group" 			=> "Tooltip Settings",
				),
				array(
					"type"				=> "textarea",
					"class"				=> "",
					"heading"			=> __( "Tooltip Content", "ts_visual_composer_extend" ),
					"param_name"		=> "tooltip_content",
					"value"				=> "",
					"description"		=> __( "Enter the tooltip content here (do not use quotation marks).", "ts_visual_composer_extend" ),
					"dependency"		=> "",
					"group" 			=> "Tooltip Settings",
				),
				array(
					"type"				=> "dropdown",
					"class"				=> "",
					"heading"			=> __( "Tooltip Position", "ts_visual_composer_extend" ),
					"param_name"		=> "tooltip_position",
					"value"					=> array(
						__( "Top", "ts_visual_composer_extend" )                            => "ts-simptip-position-top",
						__( "Bottom", "ts_visual_composer_extend" )                         => "ts-simptip-position-bottom",
					),
					"description"		=> __( "Select the tooltip position in relation to the element.", "ts_visual_composer_extend" ),
					"dependency"		=> array( 'element' => "tooltip_css", 'value' => 'true' ),
					"group" 			=> "Tooltip Settings",
				),
				array(
					"type"				=> "dropdown",
					"class"				=> "",
					"heading"			=> __( "Tooltip Style", "ts_visual_composer_extend" ),
					"param_name"		=> "tooltip_style",
					"value"             => array(
						__( "Black", "ts_visual_composer_extend" )                          => "",
						__( "Gray", "ts_visual_composer_extend" )                           => "ts-simptip-style-gray",
						__( "Green", "ts_visual_composer_extend" )                          => "ts-simptip-style-green",
						__( "Blue", "ts_visual_composer_extend" )                           => "ts-simptip-style-blue",
						__( "Red", "ts_visual_composer_extend" )                            => "ts-simptip-style-red",
						__( "Orange", "ts_visual_composer_extend" )                         => "ts-simptip-style-orange",
						__( "Yellow", "ts_visual_composer_extend" )                         => "ts-simptip-style-yellow",
						__( "Purple", "ts_visual_composer_extend" )                         => "ts-simptip-style-purple",
						__( "Pink", "ts_visual_composer_extend" )                           => "ts-simptip-style-pink",
						__( "White", "ts_visual_composer_extend" )                          => "ts-simptip-style-white"
					),
					"description"		=> __( "Select the tooltip style.", "ts_visual_composer_extend" ),
					"dependency"		=> array( 'element' => "tooltip_css", 'value' => 'true' ),
					"group" 			=> "Tooltip Settings",
				),
                // Other Rating Settings
                array(
                    "type"              => "seperator",
                    "heading"           => __( "", "ts_visual_composer_extend" ),
                    "param_name"        => "seperator_5",
					"value"				=> "",
                    "seperator"         => "Other Settings",
                    "description"       => __( "", "ts_visual_composer_extend" ),
					"group" 			=> "Other Settings",
                ),
                array(
                    "type"              => "nouislider",
                    "heading"           => __( "Margin: Top", "ts_visual_composer_extend" ),
                    "param_name"        => "margin_top",
                    "value"             => "20",
                    "min"               => "-50",
                    "max"               => "500",
                    "step"              => "1",
                    "unit"              => 'px',
                    "description"       => __( "Select the top margin for the element.", "ts_visual_composer_extend" ),
					"group" 			=> "Other Settings",
                ),
                array(
                    "type"              => "nouislider",
                    "heading"           => __( "Margin: Bottom", "ts_visual_composer_extend" ),
                    "param_name"        => "margin_bottom",
                    "value"             => "20",
                    "min"               => "-50",
                    "max"               => "500",
                    "step"              => "1",
                    "unit"              => 'px',
                    "description"       => __( "Select the bottom margin for the element.", "ts_visual_composer_extend" ),
					"group" 			=> "Other Settings",
                ),
                array(
                    "type"              => "textfield",
                    "heading"           => __( "Define ID Name", "ts_visual_composer_extend" ),
                    "param_name"        => "el_id",
                    "value"             => "",
                    "description"       => __( "Enter an unique ID for the element.", "ts_visual_composer_extend" ),
					"group" 			=> "Other Settings",
                ),
                array(
                    "type"              => "textfield",
                    "heading"           => __( "Extra Class Name", "ts_visual_composer_extend" ),
                    "param_name"        => "el_class",
                    "value"             => "",
                    "description"       => __( "Enter a class name for the element.", "ts_visual_composer_extend" ),
					"group" 			=> "Other Settings",
                ),
				// Load Custom CSS/JS File
				array(
					"type"              => "load_file",
					"heading"           => __( "", "ts_visual_composer_extend" ),
                    "param_name"        => "el_file1",
					"value"             => "",
					"file_type"         => "js",
					"file_id"			=> "ts-extend-element",
					"file_path"         => "js/ts-visual-composer-extend-element.min.js",
					"description"       => __( "", "ts_visual_composer_extend" )
				),
				array(
					"type"              => "load_file",
					"heading"           => __( "", "ts_visual_composer_extend" ),
                    "param_name"        => "el_file2",
					"value"             => "",
					"file_type"         => "css",
					"file_id"			=> "ts-font-ecommerce",
					"file_path"         => "css/ts-font-ecommerce.css",
					"description"       => __( "", "ts_visual_composer_extend" )
				),
            ))
        );
    }
?>