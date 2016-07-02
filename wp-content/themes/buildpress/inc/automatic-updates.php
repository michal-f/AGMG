<?php

/**
 * Trigger automatic theme updates notifications
 */
if ( ! function_exists( 'pt_check_for_updates' ) ) {
	function pt_check_for_updates() {
		$username = trim( get_theme_mod( 'tf_username', '' ) );
		$api_key  = trim( get_theme_mod( 'tf_api_key', '' ) );

		if ( ! empty( $username ) && ! empty( $api_key ) ) {
			load_template( get_template_directory() . '/vendor/primozcigler/envato-wordpress-theme-updater/envato-wp-theme-updater.php' );

			if ( class_exists( 'Envato_WP_Theme_Updater' ) ) {
				Envato_WP_Theme_Updater::init( $username, $api_key, 'ProteusThemes' );
			}
		}
	}
	add_action( 'after_setup_theme', 'pt_check_for_updates' );
}