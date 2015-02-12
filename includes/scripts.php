<?php if ( !defined( 'ABSPATH' ) ) exit('No direct script access allowed');
function Bloter_Timeline_enque_scripts(){
    if( !is_admin()){
        wp_enqueue_script('jquery');
        
        if( !wp_script_is( 'bloter-timeline-view', 'registered' ) ) wp_register_script('bloter-timeline-view', BLOTERTIMELINE_PLUGIN_URL. 'assets/js/bloter-timeline-view.js', array(), null );
        if( !wp_script_is( 'bloter-timeline-view', 'enqueued' ) ) wp_enqueue_script('bloter-timeline-view');

        if( !wp_style_is( 'bloter-timeline-view', 'registered' ) ) wp_register_style('bloter-timeline-view', BLOTERTIMELINE_PLUGIN_URL. 'assets/css/bloter-timeline-view.css', array(), null );
        if( !wp_style_is( 'bloter-timeline-view', 'enqueued' ) ) wp_enqueue_style('bloter-timeline-view');
    }
}
add_action( 'wp_enqueue_scripts', 'Bloter_Timeline_enque_scripts' );


function Bloter_Timeline_admin_enque_scripts() {
    if( !wp_script_is( 'bloter-timeline-modal', 'registered' ) ) wp_register_script('bloter-timeline-modal', BLOTERTIMELINE_PLUGIN_URL. 'assets/js/bloter-timeline-modal.js', array(), null );
    if( !wp_script_is( 'bloter-timeline-modal', 'enqueued' ) ) wp_enqueue_script('bloter-timeline-modal');
    
    if( !wp_style_is( 'bloter-timeline-modal', 'registered' ) ) wp_register_style('bloter-timeline-modal', BLOTERTIMELINE_PLUGIN_URL. 'assets/css/bloter-timeline-modal.css', array(), null );
    if( !wp_style_is( 'bloter-timeline-modal', 'enqueued' ) ) wp_enqueue_style('bloter-timeline-modal');
    
    if( !wp_script_is( 'bootstrap', 'registered' ) ) wp_register_script('bootstrap', BLOTERTIMELINE_PLUGIN_URL. 'assets/js/bootstrap.js', array(), null );
    if( !wp_script_is( 'bootstrap', 'enqueued' ) ) wp_enqueue_script('bootstrap');
    
    if( !wp_style_is( 'bootstrap', 'registered' ) ) wp_register_style('bootstrap', BLOTERTIMELINE_PLUGIN_URL. 'assets/css/bootstrap.css', array(), null );
    if( !wp_style_is( 'bootstrap', 'enqueued' ) ) wp_enqueue_style('bootstrap');
        
    if( !wp_script_is( 'jquery-ui', 'registered' ) ) wp_register_script('jquery-ui', BLOTERTIMELINE_PLUGIN_URL. 'assets/js/jquery-ui.js', array(), null );
    if( !wp_script_is( 'jquery-ui', 'enqueued' ) ) wp_enqueue_script('jquery-ui');
    
    if( !wp_style_is( 'jquery-ui', 'registered' ) ) wp_register_style('jquery-ui', BLOTERTIMELINE_PLUGIN_URL. 'assets/css/jquery-ui.css', array(), null );
    if( !wp_style_is( 'jquery-ui', 'enqueued' ) ) wp_enqueue_style('jquery-ui');
    
}
add_action( 'admin_enqueue_scripts', 'Bloter_Timeline_admin_enque_scripts' );