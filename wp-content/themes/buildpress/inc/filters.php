<?php
/**
 * Filters for BuildPress WP theme
 *
 * @package BuildPress
 */



/**
 * Create a nicely formatted and more specific title element text for output
 * in head of document, based on current view.
 *
 * @param string $title Default title text for current view.
 * @param string $sep Optional separator.
 * @return string The filtered title.
 */
if ( ! function_exists( 'pt_wp_title' ) ) {
	function pt_wp_title( $title, $sep ) {
		global $paged, $page;

		if ( is_feed() ) {
			return $title;
		}

		// Add the site name.
		$title .= get_bloginfo( 'name' );

		// Add the site description for the home/front page.
		$site_description = get_bloginfo( 'description', 'display' );
		if ( $site_description && ( is_home() || is_front_page() ) ) {
			$title = "$title $sep $site_description";
		}

		// Add a page number if necessary.
		if ( $paged >= 2 || $page >= 2 ) {
			$title = "$title $sep " . sprintf( __( 'Page %s', 'buildpress_wp'), max( $paged, $page ) );
		}

		return $title;
	}
	add_filter( 'wp_title', 'pt_wp_title', 10, 2 );
}



/**
 * Add shortcodes in widgets
 */
add_filter( 'widget_text', 'do_shortcode' );



if ( ! function_exists( 'add_disabled_editor_buttons' ) ) {
	function add_disabled_editor_buttons($buttons) {
		/**
		 * Add a core button that's disabled by default
		 */
		$buttons[] = 'hr';

		return $buttons;
	}
	add_filter('mce_buttons', 'add_disabled_editor_buttons');
}



/**
 * Custom tag font size
 */
if ( ! function_exists( 'set_tag_cloud_sizes' ) ) {
	function set_tag_cloud_sizes($args) {
		$args['smallest'] = 8;
		$args['largest']  = 12;
		return $args;
	}
	add_filter( 'widget_tag_cloud_args', 'set_tag_cloud_sizes' );
}



/**
 * Custom text after excerpt
 */
if ( ! function_exists( 'pt_excerpt_more' ) ) {
	function pt_excerpt_more( $more ) {
		return _x( ' &hellip;', 'custom read more text after the post excerpts' , 'buildpress_wp');
	}
	add_filter( 'excerpt_more', 'pt_excerpt_more' );
}



/**
 * Add Formats Dropdown Menu To TinyMCE
 */
if ( ! function_exists( 'pt_style_select' ) ) {
	function pt_style_select( $buttons ) {
		array_push( $buttons, 'styleselect' );
		return $buttons;
	}
}
add_filter( 'mce_buttons', 'pt_style_select' );



/**
 * Add new styles to the TinyMCE "formats" menu dropdown
 */
if ( ! function_exists( 'pt_styles_dropdown' ) ) {
	function pt_styles_dropdown( $settings ) {

		$items = array();
		for ($i=1; $i <= 6; $i++) {
			$items[] = array(
				'title'   => _x( 'Heading', 'backend', 'buildpress_wp' ) . " {$i}",
				'block'   => "h{$i}",
				'classes' => 'alternative-heading'
			);
		}

		// Create array of new styles
		$new_styles = array(
			array(
				'title' => _x( 'ProteusThemes', 'backend','buildpress_wp' ),
				'items' => $items
			),
		);

		// Merge old & new styles
		$settings['style_formats_merge'] = true;

		// Add new styles
		$settings['style_formats'] = json_encode( $new_styles );

		// Return New Settings
		return $settings;

	}
}
add_filter( 'tiny_mce_before_init', 'pt_styles_dropdown' );