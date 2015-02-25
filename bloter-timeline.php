<?php if ( !defined( 'ABSPATH' ) ) exit('No direct script access allowed');
/*
Plugin Name: Bloter Timeline
Plugin URI: http://www.bloter.net
Description: 블로터 타임라인
Version: 0.1
Author: Bloter MediaLab
Author URI: http://lab.bloter.net/
*/

define('BLOTERTIMELINE_PLUGIN_URL', plugins_url( '/', __FILE__ ) );
include_once('includes/scripts.php');
include_once('includes/editor-button.php');

function Bloter_Timeline($atts, $contents = null){
    $attribute = shortcode_atts( array(
        'id' => 'id',
        'title'=>'title',
    ), $atts );

    $result_msg = '<div class="bloter-timeline-wrapper bloter-timeline-wrapper-'.$attribute['id'].'" data-timeline="'.$attribute['id'].'">';
    $result_msg .= '<div class="bloter-timeline-liner"></div>';
    $result_msg .= '<div class="bloter-timeline-subject"><h2>'.$atts['title'].'</h2></div>';
    $result_msg .= '<div class="bloter-timeline-container">';
    $result_msg .= do_shortcode($contents);
    $result_msg .= '</div>';
    $result_msg .= '</div>';
    
    return $result_msg;
}
add_shortcode( "bloter_timeline", 'Bloter_Timeline' );

function Bloter_Timeline_Item($atts, $contents = null){
    $attribute = shortcode_atts( array(
        'id' => 'id',
        'title' => 'title',
        'date' => 'date',
        'url' => 'url',
        'image' => 'image',
    ), $atts );

    ob_start();
    ?>
    <div class="bloter-timeline-item-wrapper" data-id="<?php echo $attribute['id']; ?>">
        <div class="bloter-timeline-item-container">
            <div class="bloter-timeline-item">
                
                <div class="bloter-timeline-item-date"><?php echo date('Y.n.j', strtotime($attribute['date'])); ?></div>
                <h3 class="bloter-timeline-item-title"><?php echo $attribute['title']; ?></h3>
                <?php if( $attribute['image'] != '' ){ ?>
                    <p class="bloter-timeline-item-image"><img src="<?php echo $attribute['image']; ?>" alt="" /></p>
                <?php } ?>
                
                <p><?php echo $contents; ?></p>
                <?php if( isset($atts['url']) && $atts['url'] != '' ){ ?>
                <a class="bloter-timeline-item-url" href="<?php echo $attribute['url']; ?>">READ MORE</a>
                <?php } ?>
            </div>
        </div>
    </div>
    <?php    
    return ob_get_clean();
}
add_shortcode( "bloter_timeline_item", 'Bloter_Timeline_Item' );

add_action('admin_footer', 'bloter_timeline_modal');
function bloter_timeline_modal() {
    ?>
    <div class="modal fade"  id="bloter-timeline-modal" tabindex="-1" role="dialog" aria-labelledby="bloter-timeline-modal-label" aria-hidden="true" data-backdroo="static">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                        ×
                    </button>
                    <h4 class="modal-title">타임라인 만들기</h4>
                    <div class="bloter-timeline-item-revert">
                        <span title="이전 타임라인 복원" class="bloter-timeline-item-revert-excute glyphicon glyphicon-repeat"></span>
                    </div>
                </div>
                <div class="modal-body">
                    <div class="bloter-timeline-subject">
                        <label for="bloter-timeline-subject">타임라인 주제</label>
                        <input id="bloter-timeline-subject" name="bloter-timeline-subject" type="text" />
                    </div>
                    <div id="create-bloter-timeline-item">
                        <span class="bloter-timeline-item-add glyphicon glyphicon-plus"></span> 필드 추가하기
                    </div>
                    <ul class="bloter-timeline-sortable">
                        
                    </ul>
                </div>
                <div class="modal-footer">
                    <div id="bloter-timeline-generate">
                        <span class="glyphicon glyphicon-ok"></span> 타임라인 적용
                    </div>
                </div>
            </div>
        </div>
    </div>
    <?php
}