<?php
/**
 * Main page page
 *
 * Template Name: Default Template (for Page Builder)
 *
 * @package BuildPress
 */

get_header();

get_template_part( 'part-main-title' );
get_template_part( 'part-breadcrumbs' );

?>
<div class="master-container">
	<div <?php post_class( 'container' ); ?> role="main">

		<?php
			if ( have_posts() ) {
				while ( have_posts() ) {
					the_post();
					the_content();
				}
			}
		?>

	</div><!-- /container -->
</div>

<?php get_footer(); ?>