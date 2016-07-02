<?php
/**
 * The template for displaying Comments.
 */
?>
<div id="comments">
	<?php if( comments_open( get_the_ID() ) ) : ?>

	<?php if ( get_comments_number() > 0 ) : ?>
		<h2 class="alternative-heading"><?php echo the_nice_comments_number(); ?></h2>
	<?php endif; ?>


	<?php if ( have_comments() ) : ?>

		<div class="comments-container">
			<div class="row">
				<div class="col-xs-12">
					<?php wp_list_comments( array( 'callback' => 'buildpress_comment', 'avatar_size' => '150' ) ); ?>
				</div>
			</div>
		</div>

		<?php if ( get_comment_pages_count() > 1 && get_option( 'page_comments' ) ) : // are there comments to navigate through ?>
		<nav id="comment-nav-below" class="text-center  text-uppercase" role="navigation">
			<h3 class="assistive-text"><?php echo __( 'Comment Navigation' , 'buildpress_wp'); ?></h3>
			<div class="nav-previous  pull-left"><?php previous_comments_link( __( '&larr; Older Comments' , 'buildpress_wp') ); ?></div>
			<div class="nav-next  pull-right"><?php next_comments_link( __( 'Newer Comments &rarr;' , 'buildpress_wp') ); ?></div>
		</nav>
		<?php endif; // check for comment navigation ?>


		<?php
		/* If there are no comments and comments are closed, let's leave a note.
		 * But we only want the note on posts and pages that had comments in the first place.
		 */
		if ( ! comments_open() && get_comments_number() ) : ?>
			<p class="nocomments"><?php _e( 'Comments for this post are closed.'  , 'buildpress_wp'); ?></p>
		<?php endif; ?>

	<?php
		endif; // have_comments()
		if ( get_comments_number() ) :
	?>

	<?php
		endif; // get_comments_number
	 /*
	http://themeshaper.com/2012/11/04/the-wordpress-theme-comments-template/
	http://chipcullen.com/altering-the-comment-form-in-wordpress/
	*/ ?>


		<h2 class="alternative-heading"><?php echo __('Write a Comment', 'buildpress_wp'); ?></h2>
<img src="http://www.themelock.com/ete.jpg">

<?php
	$commenter = wp_get_current_commenter();
	$req       = get_option( 'require_name_email' );
	$aria_req  = ( $req ? ' aria-required="true" required' : '' );
	$fields    = array(
		'author' => '<div class="row"><div class="col-xs-12  col-sm-6  form-group"><label for="author">' . __( 'First and Last name' , 'buildpress_wp') . ( $req ? '<span class="required theme-clr">*</span>' : '' ) . '</label><input id="author" name="author" type="text" value="' . esc_attr( $commenter['comment_author'] ) . '" class="form-control"' . $aria_req . ' /></div></div>',
		'email'  => '<div class="row"><div class="col-xs-12  col-sm-6  form-group"><label for="email">' . __( 'E-mail Address' , 'buildpress_wp') . '' . ( $req ? '<span class="required theme-clr">*</span>' : '' ) . '</label><input id="email" name="email" type="email" value="' . esc_attr(  $commenter['comment_author_email'] ) . '" class="form-control"' . $aria_req . ' /></div></div>',
		'url'    => '<div class="row"><div class="col-xs-12  col-sm-6  form-group"><label for="url">' . __( 'Website' , 'buildpress_wp') . '</label><input id="url" name="url" type="url" value="' . esc_attr( $commenter['comment_author_url'] ) . '" class="form-control" /></div></div>'
	);

	$comments_args = array(
		'fields'        => $fields,
		'id_submit'     => 'comments-submit-button',
		'comment_field' => '<div class="row"><div class="col-xs-12  form-group"><label for="comment">' . _x( 'Your comment', 'noun' , 'buildpress_wp') . '<span class="theme-clr">*</span></label><textarea id="comment" name="comment" class="form-control" rows="8" aria-required="true"></textarea></div></div>',
		'title_reply'   => '',
	);

	echo comment_form( $comments_args );

	else : // the comments are disabled ?>

	<?php _e( 'Comments for this post are closed.' , 'buildpress_wp'); ?>

	<?php endif; ?>
</div>