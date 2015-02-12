<?php if ( !defined( 'ABSPATH' ) ) exit('No direct script access allowed');

function bloter_timeline_register_tinymce_plugin($plugin_array) {
    $plugin_array['bloter_timeline'] = BLOTERTIMELINE_PLUGIN_URL. 'assets/js/bloter-timeline-button.js';
    return $plugin_array;
}
add_filter('mce_external_plugins', 'bloter_timeline_register_tinymce_plugin');

function bloter_timeline_add_tinymce_button($buttons) {
    array_push( $buttons, "|", "bloter_timeline_button" );
    return $buttons;
}
add_filter('mce_buttons', 'bloter_timeline_add_tinymce_button');