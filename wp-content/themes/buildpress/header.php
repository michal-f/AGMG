<?php
/**
 * The Header for BuildPress Theme
 *
 * @package BuildPress
 */

?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
	<head>
		<meta charset="<?php bloginfo( 'charset' ); ?>" />
		<title><?php wp_title( '|', true, 'right' ); ?></title>
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>" />

		<!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
		<!--[if lt IE 9]>
			<script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
			<script src="https://oss.maxcdn.com/libs/respond.js/1.3.0/respond.min.js"></script>
		<![endif]-->

		<!-- W3TC-include-js-head -->
		<?php wp_head(); ?>
		<!-- W3TC-include-css -->
	</head>

	<body <?php body_class( pt_body_class() ); ?>>
	<div class="boxed-container">

<?php if ( 'no' !== get_theme_mod( 'top_bar_visibility', 'yes' ) ) : ?>
	<div class="top">
		<div class="container">
			<div class="row">
				<div class="col-xs-12 col-md-6">
					<div class="top__left">
						<?php echo get_bloginfo( 'description' ); ?>
					</div>
				</div>
				<div class="col-xs-12 col-md-6">
					<div class="top__right">
						<?php
							if ( has_nav_menu( 'top-bar-menu' ) ) {
								wp_nav_menu( array(
									'theme_location' => 'top-bar-menu',
									'container'      => false,
									'menu_class'     => 'navigation--top'
								) );
							}
						?>
					</div>
				</div>
			</div>
		</div>
	</div>
<?php endif; ?>
	<header class="header">
		<div class="container">
			<div class="logo">
				<a href="<?php echo esc_url( home_url() ); ?>">
					<?php
						$logo              = esc_url( get_theme_mod( 'logo_img', false ) );
						$logo2x            = esc_url( get_theme_mod( 'logo2x_img', false ) );
						$logo_width_height = wp_kses_post( get_theme_mod( 'logo_width_height', '' ) );

						if ( ! empty( $logo ) ) :
					?>
						<img src="<?php echo $logo; ?>" alt="<?php echo esc_attr( get_bloginfo( 'name' ) ); ?>" srcset="<?php echo $logo; ?><?php echo empty ( $logo2x ) ? '' : ', ' . $logo2x . ' 2x'; ?>" class="img-responsive" <?php echo $logo_width_height; ?> />
					<?php
						else :
					?>
						<h1><?php bloginfo( 'name' ); ?></h1>
					<?php
						endif;
					?>
				</a>
			</div>

			<div class="header-widgets  header-widgets-desktop">
				<?php dynamic_sidebar( 'header-widgets' ); ?>
			</div>

			<!-- Toggle Button for Mobile Navigation -->
			<button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#buildpress-navbar-collapse">
				<span class="navbar-toggle__text"><?php _e( 'MENU', 'buildpress_wp' ); ?></span>
				<span class="navbar-toggle__icon-bar">
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
				</span>
			</button>

		</div>
		<div class="sticky-offset  js-sticky-offset"></div>
		<div class="container">
			<div class="navigation">
				<div class="collapse  navbar-collapse" id="buildpress-navbar-collapse">
					<?php
						if ( has_nav_menu( 'main-menu' ) ) {
							wp_nav_menu( array(
								'theme_location' => 'main-menu',
								'container'      => false,
								'menu_class'     => 'navigation--main'
							) );
						}
					?>
				</div>
			</div>
		</div>
		<div class="container">
			<div class="header-widgets  hidden-md  hidden-lg">
				<?php dynamic_sidebar( 'header-widgets' ); ?>
			</div>
		</div>
	</header>