<?php
/**
 * Loading the remote and local plugins when the theme is activated
 *
 * For reference see file vendor/tgm/plugin-activation/example.php
 *
 * @package TGM-Plugin-Activation
 */


/**
 * Register the required plugins for this theme.
 */
function pt_register_required_plugins() {

	/**
	 * Array of plugin arrays. Required keys are name and slug.
	 * If the source is NOT from the .org repo, then source is also required.
	 */
	$plugins = array(

		array(
			'name'               => 'ACF Repeater Field',
			'slug'               => 'acf-repeater',
			'source'             => get_template_directory() . '/bundled-plugins/acf-repeater.zip',
			'required'           => true,
			'version'            => '1.1.1',
			'force_activation'   => true,
			'force_deactivation' => true,
			'external_url'       => 'http://www.advancedcustomfields.com/add-ons/repeater-field/'
		),
		array(
			'name'               => 'Breadcrumb NavXT',
			'slug'               => 'breadcrumb-navxt',
			'required'           => true,
		),
		array(
			'name'               => 'Page Builder by SiteOrigin',
			'slug'               => 'siteorigin-panels',
			'required'           => true,
			'version'            => '2.0',
		),
		array(
			'name'               => 'Custom Sidebars',
			'slug'               => 'custom-sidebars',
			'required'           => true,
		),
		array(
			'name'               => 'Black Studio TinyMCE Widget',
			'slug'               => 'black-studio-tinymce-widget',
			'required'           => false,
		),
		array(
			'name'               => 'Contact Form 7',
			'slug'               => 'contact-form-7',
			'required'           => false,
		),
		array(
			'name'               => 'Portfolio Post Type',
			'slug'               => 'portfolio-post-type',
			'required'           => false,
		),
		array(
			'name'               => 'Essential Grid',
			'slug'               => 'essential-grid',
			'source'             => get_template_directory() . '/bundled-plugins/essential-grid.zip',
			'required'           => false,
			'version'            => '1.5.4',
			'external_url'       => 'http://codecanyon.net/item/essential-grid-wordpress-plugin/7563340?ref=ProteusThemes'
		),
		array(
			'name'               => 'WooCommerce - excelling eCommerce',
			'slug'               => 'woocommerce',
			'required'           => false
		),
	);

	// Array of configuration settings. See the source example.php file to add it if needed.

	// Let the magic happen!
	tgmpa( $plugins );
}
add_action( 'tgmpa_register', 'pt_register_required_plugins' );