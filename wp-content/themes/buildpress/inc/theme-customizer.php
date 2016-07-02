<?php
/**
 * Load the Customizer with some custom extended addons
 *
 * @package BuildPress
 * @link http://codex.wordpress.org/Theme_Customization_API
 */

/**
 * This funtion is only called when the user is actually on the customizer page
 * @param  WP_Customize_Manager $wp_customize
 */
if ( ! function_exists( 'pt_buildpress_customizer' ) ) {
	function pt_buildpress_customizer( $wp_customize ) {
		// add required files
		load_template( get_template_directory() . '/inc/customizer/class-pt-customize-base.php' );
		load_template( get_template_directory() . '/inc/customizer/class-pt-customize-setting-dynamic-css.php' );

		new PT_Customizer_Base( $wp_customize );
	}
	add_action( 'customize_register', 'pt_buildpress_customizer' );
}


/**
 * Takes care for the frontend output from the customizer and nothing else
 */
if ( ! function_exists( 'pt_buildpress_customizer_frontend' ) && ! class_exists( 'PT_Customize_Frontent' ) ) {
	function pt_buildpress_customizer_frontend() {
		load_template( get_template_directory() . '/inc/customizer/class-pt-customize-frontend.php' );
		new PT_Customize_Frontent();
	}
	add_action( 'init', 'pt_buildpress_customizer_frontend' );
}
