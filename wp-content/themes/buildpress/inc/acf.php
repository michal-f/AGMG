<?php
/**
 * Filters and include calls for the ACF plugin, so it is available within the theme
 *
 * @see http://www.advancedcustomfields.com/resources/including-acf-in-a-plugin-theme/
 */

/**
 * Customize ACF path
 * @param  string $path
 * @return string new path
 */
function pt_acf_settings_path( $path ) {
	// update path
	$path = get_stylesheet_directory() . '/bower_components/acf/';

	return $path;
}
add_filter( 'acf/settings/path', 'pt_acf_settings_path' );

/**
 * Customize ACF dir
 * @param  string $dir
 * @return string
 */
function pt_acf_settings_dir( $dir ) {
	// update path
	$dir = get_template_directory_uri() . '/bower_components/acf/';

	return $dir;
}
add_filter( 'acf/settings/dir', 'pt_acf_settings_dir' );

if ( ! BUILDPRESS_DEVELOPMENT ) {
	// hide ACF field group menu item only if we are not in the dev mode
	define( 'ACF_LITE' , true );
}

// include ACF, magic! :)
locate_template( 'bower_components/acf/acf.php', true, true );

// load acf field groups from PHP file
if ( ! BUILDPRESS_DEVELOPMENT ) {
	locate_template( 'inc/acf-field-groups.php', true, true );
}