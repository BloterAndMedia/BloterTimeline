jQuery(document).ready(function(){	
	$ = jQuery;
	
	/* Thanks to CSS Tricks for pointing out this bit of jQuery
	http://css-tricks.com/equal-height-blocks-in-rows/
	It's been modified into a function called at page load and then each time the page is resized. One large modification was to remove the set height before each new calculation. */
	
	equalheight = function(container){
		var currentTallest = 0, currentRowStart = 0, rowDivs = new Array(), $el, topPosition = 0;
	 	$(container).each(function() {
	 		$el = $(this);
	 		$($el).height('auto')
	 		topPostion = $el.position().top;
	 		if (currentRowStart != topPostion) {
	 			for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
	 				rowDivs[currentDiv].height(currentTallest);
	 			}
	     		rowDivs.length = 0; // empty the array
	     		currentRowStart = topPostion;
	     		currentTallest = $el.height();
	     		rowDivs.push($el);
	   		} else {
	     		rowDivs.push($el);
	     		currentTallest = (currentTallest < $el.height()) ? ($el.height()) : (currentTallest);
	  		}
	   		for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
	     		rowDivs[currentDiv].height(currentTallest);
	   		}
	 	});
	}
	
	if( $('.bloter-timeline-item-wrapper').length > 0 ){	
		$.each($('.bloter-timeline-item-wrapper'), function(index, value){
			if( index % 2 != 0 ){
				$(value).addClass('right');
			}
		});
		
		$(window).resize(function(){
			equalheight('.bloter-timeline-container .bloter-timeline-item-wrapper');
			var $back_offset = $('.bloter-timeline-wrapper').offset();
			var $obj_offset = $('.bloter-timeline-item-wrapper').last().offset();	
			$('.bloter-timeline-liner').height( $obj_offset.top - $back_offset.top );
		});
		
		$(window).load(function() {
			if( $('.bloter-timeline-item-wrapper').length > 0 ){
				equalheight('.bloter-timeline-container .bloter-timeline-item-wrapper');
				var $back_offset = $('.bloter-timeline-wrapper').offset();
				var $obj_offset = $('.bloter-timeline-item-wrapper').last().offset();	
				$('.bloter-timeline-liner').height( $obj_offset.top - $back_offset.top );
			}
		});
	}
});