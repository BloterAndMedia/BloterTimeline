jQuery(document).ready(function($) {
	
	//에디터에 버튼을 구성하기 위해 tinymce.create 메서드를 사용한다.
	tinymce.create('tinymce.plugins.bloter_timeline', {
		init : function(ed, url) {
			ed.addCommand('bloter_insert_timeline', function() {
				jQuery('#bloter-timeline-modal').modal('show');
				jQuery('.bloter-timeline-sortable').empty();
				
				
				$html = '<li id="bloter-timeline-item-1" class="bloter-timeline-item ui-state-default">\
		                    <div class="bloter-timeline-item-box closed">\
		                        <div class="bloter-timeline-item-handlediv" title="토글하려면 클릭하세요"><br></div>\
		                        <h3 class="bloter-timeline-item-handle"><span title="아이템 삭제" class="bloter-timeline-item-remove glyphicon glyphicon-remove"></span><span class="bloter-timeline-display">새 타임라인 아이템</span></h3>\
		                        <div class="bloter-timeline-item-inside">\
		                            <div class="bloter-timeline-item-part">\
		                                <label for="bloter-timeline-title">제목</label>\
		                                <p><input class="bloter-timeline-title" name="bloter-timeline-title" type="text" /></p>\
		                            </div>\
		                            <div class="bloter-timeline-item-part">\
		                                <label for="bloter-timeline-date">날짜</label>\
		                                <p><input class="bloter-timeline-date" name="bloter-timeline-date" type="text" /></p>\
		                            </div>\
		                            <div class="bloter-timeline-item-part">\
		                                <label for="bloter-timeline-image">이미지</label>\
		                                <p><input class="bloter-timeline-image bloter-timeline-image-1" name="bloter-timeline-image" type="text" /></p>\
		                                <div id="bloter-timeline-image-controller-1" data-controller="1" class="bloter-timeline-image-controller"><span class="glyphicon glyphicon-camera"></span> 미디어 라이브러리</div>\
		                            </div>\
		                            <div class="bloter-timeline-item-part">\
		                                <label for="bloter-timeline-url">링크 URL</label>\
		                                <p><input class="bloter-timeline-url" name="bloter-timeline-url" type="text" /></p>\
		                            </div>\
		                            <div class="bloter-timeline-item-part">\
		                                <label for="bloter-timeline-content">내용</label>\
		                                <textarea class="bloter-timeline-content" name="bloter-timeline-content" id="bloter-timeline-content" cols="30" rows="3" placeholder="최대 300자까지 입력 가능합니다."></textarea>\
		                            </div>\
		                        </div>\
		                    </div>\
		                </li>';
		        
				jQuery('.bloter-timeline-sortable').append($html);
				
				jQuery('.bloter-timeline-sortable').sortable({
					connectWith: ".bloter-timeline-sortable",
			      	handle: ".bloter-timeline-item-handle",
					placeholder: "ui-state-highlight",
					axis:"y",
				});
				
				jQuery('.closed .bloter-timeline-item-inside').hide();
				
				jQuery('.bloter-timeline-date').datepicker();
				jQuery('.bloter-timeline-date').datepicker("option", "dateFormat", "yy-mm-dd");
				
			});

            
            ed.addButton('bloter_timeline_button', {title : '타임라인 삽입', cmd : 'bloter_insert_timeline', image: url + '/icon_bloter_admin.png' });
        },
		getInfo : function() {
			return {
				longname : '타임라인 삽입',
				author : 'Bloter MediaLab',
				authorurl : 'http://labs.bloter.net',
				infourl : 'http://labs.bloter.net',
				version : tinymce.majorVersion + "." + tinymce.minorVersion
			};
		}
    });
    tinymce.PluginManager.add('bloter_timeline', tinymce.plugins.bloter_timeline);
});