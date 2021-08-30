$(document).ready(function(){
	
	$(".menu-toggler").click(function(){
		$(".main-wrapper").toggleClass("active");
	});
	
	$(".hamburger").click(function(){
		$(this).toggleClass("is-active");
		if($(this).hasClass("is-active")){
			$(".main-wrapper").addClass("active");
			$(".row.py-1.fixed-top").css("margin-left","0");
		}else {
			$(".main-wrapper").removeClass("active");
			$(".row.py-1.fixed-top").css("margin-left","220px");
		}
	})
	
	/* highlight js start */
	$("pre code").each(function(i,block){
		hljs.highlightBlock(block);
	})
	/* highlight js end */
	
	/* smoothScroll start */
	var scroll = new SmoothScroll('a[href*="#"]', {
			easing: 'linear',
			speed: 800,
			updateURL: false, 
			speedAsDuration: true,
			offset:50,
		});
	var logScrollEvent = function (event) {
		
	};
	document.addEventListener('scrollStart',logScrollEvent, false);
	/* smoothScroll end */
	
});

