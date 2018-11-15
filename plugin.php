<?php
/**
 * Plugin Name: CD Custom Plugins
 * Plugin URI: https://github.com/ashrock/wp-custom-plugins
 * Description: Includes CD Image Sprite Clipper, CD Customizable Block
 * Author: Ashrock West
 * Author URI: https://www.facebook.com/ashrockwest
 * Version: 0.0.1
 * License: GPL2+
 * License URI: https://www.gnu.org/licenses/gpl-2.0.txt
 *
 * @package CGB
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Block Initializer.
 */
require_once plugin_dir_path( __FILE__ ) . 'src/init.php';
