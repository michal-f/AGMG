<?php
/**
 * Helper functions
 *
 * @package BuildPress
 */



/**
 * comments_number() does not use _n function, here we are to fix that
 * @return void
 */
if ( ! function_exists( 'the_nice_comments_number' ) ) {
	function the_nice_comments_number() {
		global $post;
		printf(
			/* translators: %s represents a number */
			_n( '%s Comment', '%s Comments', get_comments_number(), 'buildpress_wp' ), number_format_i18n( get_comments_number() )
		);
	}
}



/**
 * Prepare the srcset attribute value.
 * @param  int $img_id ID of the image
 * @uses http://codex.wordpress.org/Function_Reference/wp_get_attachment_image_src
 * @return string
 */
if ( ! function_exists( 'pt_get_slide_sizes' ) ) {
	function pt_get_slide_sizes( $img_id ) {
		$srcset = array();

		$sizes = array( 'jumbotron-slider-s', 'jumbotron-slider-m', 'jumbotron-slider-l' );

		foreach ( $sizes as $size ) {
			$img = wp_get_attachment_image_src( $img_id, $size );
			$srcset[] = sprintf( '%s %sw', $img[0], $img[1] );
		}

		return implode( ', ' , $srcset );
	}
}



/**
 * Set some things when the theme is activated
 */
if ( ! function_exists( 'pt_theme_activated' ) ) {
	function pt_theme_activated() {
		// set thumbnail size in settings > media
		update_option( 'thumbnail_size_w', 100 );
		update_option( 'thumbnail_size_h', 75 );
	}
	add_action( 'after_switch_theme', 'pt_theme_activated' );
}



/**
 * Helper function to get terms (categories) for custom post types
 * @param  int $post_id
 * @param  string $taxonomy
 * @return array
 */
if ( ! function_exists( 'pt_get_custom_categories' ) ) {
	function pt_get_custom_categories( $post_id, $taxonomy ) {
		$out = array();
		$terms = get_the_terms( $post_id, $taxonomy );

		if ( ! is_array( $terms ) ) {
			return array();
		}

		foreach ( $terms as $term ) {
			$out[$term->slug] = $term->name;
		}

		return $out;
	}
}



/**
 * Check if WooCommerce is active
 * @return boolean
 */
if ( ! function_exists( 'is_woocommerce_active' ) ) {
	function is_woocommerce_active() {
		return class_exists( 'Woocommerce' );
	}
}



/**
 * Append right body classes to the
 * @return string
 */
if ( ! function_exists( 'pt_body_class' ) ) {
	function pt_body_class() {
		$out = array();

		if ( 'boxed' === get_theme_mod( 'layout_mode', 'wide' ) ) {
			$out[] = 'boxed';
		}

		if ( 'sticky' === get_theme_mod( 'main_navigation_sticky', 'static' ) ) {
			$out[] = 'fixed-navigation';
		}

		return implode( ' ', $out );
	}
}



/**
 * Create a style for the HTML attribute from the array of the CSS properties
 */
if ( ! function_exists( 'pt_create_style_attr' ) ) {
	function pt_create_style_attr( $attrs ) {
		$bg_style = '';

		if( ! empty( $attrs ) ) {
			$bg_style = ' style="';
			foreach ( $attrs as $key => $value ) {
				$trimmed_val = trim( $value );
				if ( ! empty( $trimmed_val ) ) {
					if( 'background-image' === $key ) {
						$bg_style .= $key . ': url(\'' . esc_url( $trimmed_val ) . '\'); ';
					}
					else {
						$bg_style .= $key . ': ' . $trimmed_val . '; ';
					}
				}
			}
			$bg_style .= '"';
		}

		return $bg_style;
	}
}