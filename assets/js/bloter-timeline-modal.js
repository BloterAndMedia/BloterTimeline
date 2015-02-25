jQuery(document).ready(function(){	
	$ = jQuery;
	
	//아이템 필드를 추가할때 쓴다. 굳이 동적으로 만들 필요는 없다.
	$('#create-bloter-timeline-item').on('click', function(e){
		e.preventDefault();
		
		var $list_count = $('.bloter-timeline-item');
		$add_count = 1;
		if( $list_count.length > 0 ){
			$add_count = $list_count.length + 1; 
		}
		
		$html = '<li id="bloter-timeline-item-'+$add_count+'" class="bloter-timeline-item ui-state-default">'+
                    '<div class="bloter-timeline-item-box closed">'+
                        '<div class="bloter-timeline-item-handlediv" title="토글하려면 클릭하세요"><br></div>'+
                        '<h3 class="bloter-timeline-item-handle"><span title="아이템 삭제" class="bloter-timeline-item-remove glyphicon glyphicon-remove"></span><span class="bloter-timeline-display">새 타임라인 아이템</span></h3>'+
                        '<div class="bloter-timeline-item-inside">'+
                            '<div class="bloter-timeline-item-part">'+
                                '<label for="bloter-timeline-title">제목</label>'+
                                '<p><input class="bloter-timeline-title" name="bloter-timeline-title" type="text" /></p>'+
                            '</div>'+
                            '<div class="bloter-timeline-item-part">'+
                                '<label for="bloter-timeline-date">날짜</label>'+
                                '<p><input class="bloter-timeline-date" name="bloter-timeline-date" type="text" /></p>'+
                            '</div>'+
                            '<div class="bloter-timeline-item-part">'+
                                '<label for="bloter-timeline-image">이미지</label>'+
                                '<p><input class="bloter-timeline-image bloter-timeline-image-'+$add_count+'" name="bloter-timeline-image" type="text" /></p>'+
                                '<div id="bloter-timeline-image-controller-'+$add_count+'" data-controller="'+$add_count+'" class="bloter-timeline-image-controller"><span class="glyphicon glyphicon-camera"></span> 미디어 라이브러리</div>'+
                            '</div>'+
                            '<div class="bloter-timeline-item-part">'+
		                                '<label for="bloter-timeline-url">링크 URL</label>'+
		                                '<p><input class="bloter-timeline-url" name="bloter-timeline-url" type="text" /></p>'+
		                            '</div>'+
                            '<div class="bloter-timeline-item-part">'+
                                '<label for="bloter-timeline-content">내용</label>'+
                                '<textarea class="bloter-timeline-content" name="bloter-timeline-content" id="bloter-timeline-content" cols="30" rows="3" placeholder="내용을 입력하세요."></textarea>'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                '</li>';
                
		$('.bloter-timeline-sortable').append($html);
		
		//새로 추가한 아이템에 대해서 sortable을 refresh 한다.
		$('.bloter-timeline-sortable').sortable("refresh");
		
		$('.bloter-timeline-date').datepicker();
		$('.bloter-timeline-date').datepicker("option", "dateFormat", "yy-mm-dd");
		
		//역시 추가한 아이템에 대해 숨김기능또한 필요하다.
		$('.closed .bloter-timeline-item-inside').hide();
		/*
		$('.bloter-timeline-sortable').sortable({
			connectWith: ".bloter-timeline-sortable",
	      	handle: ".bloter-timeline-item-handle",
			placeholder: "ui-state-highlight",
			axis:"y",
		});
		*/
	});
	
	$('.bloter-timeline-date').datepicker();
	$('.bloter-timeline-date').datepicker("option", "dateFormat", "yy-mm-dd");
	
	//각 버튼에 대한 동적 이벤트
	//1. 숨김/보이기에 대한 동적 이벤트
	$(document).on('click', '.bloter-timeline-item-box .bloter-timeline-item-handlediv', function(e){
		e.preventDefault();
		
		var $parent;
		var showOrHide;
		
		$parent = $(this).parent();
		$inside_obj = $(this).siblings('.bloter-timeline-item-inside');
		
		if( $parent.hasClass("closed") ){
			$parent.removeClass("closed");
			showOrHide = false;
		}else{
			$parent.addClass("closed");
			showOrHide = true;
		}

		if ( showOrHide === true ) {
			$inside_obj.hide();
			showOrHide = false;
		} else if ( showOrHide === false ) {
  			$inside_obj.show();
  			showOrHide = true;
		}		
	});
	
	//2. 삭제 버튼에 대한 동적 이벤트
	$(document).on('click', '.bloter-timeline-item-box .bloter-timeline-item-remove', function(e){
		e.preventDefault();
		$parent_obj = $(this).parents('li.bloter-timeline-item');
		$parent_obj.remove();
	});
	
	//제목을 입력할 때 이것을 위 타이틀에 표시해주는 동적 이벤트
	$(document).on('keyup', '.bloter-timeline-item-inside .bloter-timeline-title', function(e){
		e.preventDefault();
		$parent_obj = $(this).parents('.bloter-timeline-item');
		$target_obj = $parent_obj.find('.bloter-timeline-display');
		
		$msg = $(this).val(); 
		if( $(this).val().trim() == '' ){
			$msg = "새 타임라인 아이템";
		}
		
		$target_obj.text($msg);
	});
	
	
	 
	$pre_item_list = ''; //현재 작성한 타임라인을 입력해 두기 위해 사용
	//타임라인 적용 버튼시 검증후 이를 적용하도록 하는 이벤트
	var $bloter_item_count = 1;
	$('#bloter-timeline-generate').on('click', function(e){
		$item_list = $('.bloter-timeline-item');
		if( $item_list.length < 1 ){
			alert('타임라인을 만들려면 1개 이상의 아이템이 존재해야 합니다.');
			return;
		}
		
		$bloter_timeline_subject = $('#bloter-timeline-subject').val();
		
		var $output = '';
		
		$output += '[bloter_timeline title="'+$bloter_timeline_subject+'" id="'+$bloter_item_count+'"]';
		$output += '[bloter_timeline]';
		
		$validate = true;
		$.each($item_list, function($index, $item){
			$title = $(this).find('.bloter-timeline-title').val();
			$date = $(this).find('.bloter-timeline-date').val();
			$url = $(this).find('.bloter-timeline-url').val();
			$image = $(this).find('.bloter-timeline-image').val();
			$content = $(this).find('.bloter-timeline-content').val();

			if( !$title || $title.trim() == '' ){ $validate = false; }
			if( !$date || $date.trim() == '' ){ $validate = false; }
			if( !$content || $content.trim() == '' ){ $validate = false; }
			
			$output += '[bloter_timeline_item title="'+$title+'" date="'+$date+'"';
			if( $image && $image.trim() != '' ){
				 $output +=' image="'+$image+'"';
			}
			
			if( $url && $url.trim() != '' ){
				 $output +=' url="'+$url+'"';
			}
			
			$output += ']';
			$output += $content;
			$output += '[/bloter_timeline_item]';
		});
		
		$output += '[/bloter_timeline]';
		
		if( !$validate ){
			alert('작성되지 않은 항목이 있습니다.\n제목, 날짜, 내용은 반드시 작성해야 하는 항목입니다.');
			return;
		}else{
			$pre_item_list = $item_list;
			$('.bloter-timeline-item-revert').addClass('exist-revert-item');			
			tinymce.activeEditor.execCommand('mceInsertContent', false, $output);
			$bloter_item_count++;
			$('#bloter-timeline-modal').modal('hide');
		}
	});		
	
	//방금 전 작성한 타임라인 불러오기
	$('.bloter-timeline-item-revert-excute').on('click', function(e){
		e.preventDefault();
		$('.bloter-timeline-sortable').empty(); //현재 창의 아이템을 모두 지운다.
		$('.bloter-timeline-sortable').append($pre_item_list); //이전의 객체를 넣는다.
		$('.bloter-timeline-sortable').sortable("refresh");
	});
	
	//미디어 라이브러리 창 구성
	// Uploading files
	var file_frame;
	
	$(document).on('click', '.bloter-timeline-image-controller', function(event){
		event.preventDefault();
		var $controller_number;
		var $target_obj;
			
		$controller_number = $(this).data('controller');
		console.log($controller_number);
		
		$target_obj = $('.bloter-timeline-image-'+$controller_number);
		console.log($target_obj);
		$target_obj.val('');
		
		

		/*
		// If the media frame already exists, reopen it.
		if (file_frame) {
			
			file_frame.on('select', function() {
				// We set multiple to false so only get one image from the uploader
				attachment = file_frame.state().get('selection').first().toJSON();
				// Do something with attachment.id and/or attachment.url here
				//console.log(attachment);
				$target_obj.val(attachment.url);
			});
	
			file_frame.on('insert', function() {
				console.log($controller_number);
				// We set multiple to false so only get one image from the uploader
				attachment = file_frame.state().get('selection').first().toJSON();
				// Do something with attachment.id and/or attachment.url here
				$('.bloter-timeline-image-'+$controller_number).val(attachment.url);
			});
			
			file_frame.open();
			return;
		}else{
			// Create the media frame.
			
		}
		*/
		
		file_frame = wp.media.frames.file_frame = wp.media({
			frame: 'post',
			title : '타임라인 삽입 미디어 라이브러리',
			button : {
				text : jQuery(this).data('uploader_button_text'),
			},
			library : { type : 'image'},
			multiple : false, // Set to true to allow multiple files to be selected
			state: 'insert'
		});

		// When an image is selected, run a callback.
		file_frame.on('select', function() {
			// We set multiple to false so only get one image from the uploader
			attachment = file_frame.state().get('selection').first().toJSON();
			// Do something with attachment.id and/or attachment.url here
			$target_obj.val(attachment.url);
		});
		
		file_frame.on('insert', function() {
			// We set multiple to false so only get one image from the uploader
			attachment = file_frame.state().get('selection').first().toJSON();
			// Do something with attachment.id and/or attachment.url here
			$target_obj.val(attachment.url);
		});

		// Finally, open the modal
		file_frame.open();
		
		file_frame.on('close', function(){
			$('body').addClass('modal-open');
		});
		
	});
	
	$('#bloter-timeline-modal').on('shown.bs.modal', function() {
    	$(document).off('focusin.modal');
	}); 	
});