<?php
	/**
	 * Ladda script
	 */
	
	if (!is_admin()) {
		function wp_load_script_catpro() {
				

				/**
				 * Deregister wordpress scripts
				 */
				wp_deregister_script('jquery');

				/**
				 * wp_register_script( $handle, $src, $deps, $ver, $in_footer );
				 */
				wp_register_script('libs', MOBILEURL . '/mobile/js/libs.js');
				wp_register_script('tpls', MOBILEURL . '/mobile/js/tpl.min.js');
				wp_register_script('app' , MOBILEURL . '/mobile/js/app.min.js');


				/**
				 * Laddar skripten vi registrerat ovan.
				 */
				wp_enqueue_script('libs');
				wp_enqueue_script('tpls');
				wp_enqueue_script('app');

				/**
				 * load stylesheet
				 */
				wp_enqueue_style( 'appcss'              , MOBILEURL . '/mobile/css/app.min.css' );
				wp_enqueue_style( 'royalslider'         , MOBILEURL . '/mobile/css/royalslider.min.css' );
				wp_enqueue_style( 'royalslider-default' , MOBILEURL . '/mobile/css/default/rs-default.min.css' );
			
		}

		add_action('init', 'wp_load_script_catpro');
	}
	
	
	
?>