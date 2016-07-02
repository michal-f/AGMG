<?php
/**
 * BuildPress functions and definitions
 *
 * @author Primoz Ciger <primoz@proteusnet.com>
 * @author Marko Prelec <marko.prelec@proteusnet.com>
 */


/**
 * Define the version variable to assign it to all the assets (css and js)
 */
define( 'BUILDPRESS_WP_VERSION', wp_get_theme()->get( 'Version' ) );


/**
 * Define the development constant
 */
define( 'BUILDPRESS_DEVELOPMENT', false );


/**
 * Settings for the NavXT plugin
 */
define( 'BCN_SETTINGS_USE_LOCAL', true );


/**
 * Set the content width based on the theme's design and stylesheet.
 *
 * @see http://developer.wordpress.com/themes/content-width/Enqueue
 */
if ( ! isset( $content_width ) ) {
	$content_width = 1140; /* pixels */
}


/**
 * Advanced Custom Fields calls to require the plugin within the theme
 */
locate_template( 'inc/acf.php', true, true );



/**
 * Theme support and thumbnail sizes
 */
if( ! function_exists( 'pt_theme_setup' ) ) {
	function pt_theme_setup() {
		/*
		 * Make theme available for translation.
		 * Translations can be filed in the /languages/ directory.
		 * If you're building a theme based on BuildPress, use a find and replace
		 * to change 'buildpress_wp' to the name of your theme in all the template files
		 */
		load_theme_textdomain( 'buildpress_wp', get_template_directory() . '/languages' );

		// Add default posts and comments RSS feed links to head.
		add_theme_support( 'automatic-feed-links' );

		// WooCommerce basic support
		add_theme_support( 'woocommerce' );

		// Custom Backgrounds
		add_theme_support( 'custom-background', array(
			'default-color' => 'ffffff',
		) );

		/**
		 * Enable support for Post Thumbnails on posts and pages.
		 *
		 * @link http://codex.wordpress.org/Function_Reference/add_theme_support#Post_Thumbnails
		 */
		add_theme_support( 'post-thumbnails' );
		set_post_thumbnail_size( 848, 480, true );
		add_image_size( 'jumbotron-slider-l', 1920, 580, true );
		add_image_size( 'jumbotron-slider-m', 960, 290, true );
		add_image_size( 'jumbotron-slider-s', 480, 145, true );
		add_image_size( 'page-box', 360, 240, true );
		add_image_size( 'project-gallery', 555, 555 );

		// Menus
		add_theme_support( 'menus' );
		register_nav_menu( 'main-menu', _x( 'Main Menu', 'backend', 'buildpress_wp' ) );

		// register top bar menu only, if it is visible
		if ( 'no' !== get_theme_mod( 'top_bar_visibility', 'yes' ) ) {
			register_nav_menu( 'top-bar-menu', _x( 'Top Bar Menu', 'backend', 'buildpress_wp' ) );
		}

		register_nav_menu( 'footer-bottom-menu', _x( 'Footer Bottom Menu', 'backend', 'buildpress_wp' ) );

		// Add theme support for Semantic Markup
		add_theme_support( 'html5', array(
			'search-form',
			'comment-form',
			'comment-list',
			'gallery',
			'caption'
		) );

		// add excerpt support for pages
		add_post_type_support( 'page', 'excerpt' );

		// Add CSS for the TinyMCE editor
		add_editor_style();
	}
	add_action( 'after_setup_theme', 'pt_theme_setup' );
}



/**
 * Enqueue CSS stylesheets
 */
if( ! function_exists( 'pt_enqueue_styles' ) ) {
	function pt_enqueue_styles() {
		// google fonts CSS
		$charset = get_theme_mod( 'charset_setting', 'latin' );

		$fonts = array(
			"Source+Sans+Pro%3A400,700%3A{$charset}",
			"Montserrat%3A700%3A{$charset}"
		);
		$fonts     = implode( '%7C', $fonts);
		$protocol  = is_ssl() ? 'https' : 'http';
		$fonts_url = esc_url( "{$protocol}://fonts.googleapis.com/css?family={$fonts}" );

		wp_enqueue_style( 'buildpress-google-fonts', $fonts_url, array(), null );

		// main CSS
		wp_enqueue_style( 'buildpress-main', get_stylesheet_uri(), array( 'buildpress-google-fonts' ), BUILDPRESS_WP_VERSION );
	}
	add_action( 'wp_enqueue_scripts', 'pt_enqueue_styles' );
}



/**
 * Enqueue JS scripts
 */
if( ! function_exists( 'pt_enqueue_scripts' ) ) {
	function pt_enqueue_scripts() {
		// modernizr for the frontend feature detection
		wp_enqueue_script( 'buildpress-modernizr', get_template_directory_uri() . '/assets/js/modernizr.custom.24530.js', array(), null );

		// picturefill for the support of the <picture> element today
		// wp_enqueue_script( 'buildpress-picturefill', get_template_directory_uri() . '/bower_components/picturefill/dist/picturefill.min.js', array( 'buildpress-modernizr' ), '2.1.0' );

		// respimage for the support of the <picture> element today
		wp_enqueue_script( 'buildpress-respimage', get_template_directory_uri() . '/bower_components/respimage/respimage.min.js', array( 'buildpress-modernizr' ), '1.2.0' );

		// google maps
		wp_register_script( 'buildpress-gmaps', '//maps.google.com/maps/api/js?sensor=false', array(), null, true );

		// main JS file
		wp_enqueue_script( 'buildpress-main', get_template_directory_uri() . '/assets/js/main.min.js', array(
			'jquery',
			'underscore',
			'buildpress-gmaps',
		), BUILDPRESS_WP_VERSION, true );

		// Pass data to the main script
		wp_localize_script( 'buildpress-main', 'BuildPressVars', array(
			'pathToTheme'  => get_template_directory_uri(),
		) );

		// for nested comments
		if ( is_singular() && comments_open() ) {
			wp_enqueue_script( 'comment-reply' );
		}
	}
	add_action( 'wp_enqueue_scripts', 'pt_enqueue_scripts' );
}



/**
 * Register admin JS scripts
 */
if( ! function_exists( 'pt_admin_enqueue_scripts' ) ) {
	function pt_admin_enqueue_scripts() {
		// enqueue admin utils js
		wp_enqueue_script( 'buildpress-admin-utils', get_template_directory_uri() . '/assets/js/admin.js', array( 'jquery', 'underscore', 'backbone' ) );

		// provide the global variable to the `buildpress-admin-utils`
		wp_localize_script( 'buildpress-admin-utils', 'BuildPressAdminVars', array(
			'pathToTheme' => get_template_directory_uri(),
		) );

		// css for admin
		wp_enqueue_style( 'pt-admin', get_template_directory_uri() . '/assets/stylesheets/admin.css' );
	}
	add_action( 'admin_enqueue_scripts', 'pt_admin_enqueue_scripts' );
}



/**
 * Require the files in the folder /inc/
 */
$files_to_require = array(
	'helpers',
	'theme-widgets',
	'theme-sidebars',
	'filters',
	'compat',
	'shortcodes',
	'custom-comments',
	'theme-customizer',
	'woocommerce',
);

// Conditionally require the includes files, based if they exist in the child theme or not
foreach( $files_to_require as $file ) {
	locate_template ( "inc/{$file}.php", true, true );
}



/**
 * Require some files only when in admin
 */
if ( is_admin() ) {
	// other files
	$admin_files_to_require = array(
		// composer packages
		'vendor/tgm/plugin-activation/class-tgm-plugin-activation',
		// custom code
		'inc/tgm-plugin-activation',
		'inc/content-import',
		'inc/documentation-link',
		'inc/automatic-updates',
	);

	foreach( $admin_files_to_require as $file ) {
		locate_template ( $file . '.php' , true, true );
	}
}
