$(document).ready(function(){
	
	/* default values start */
	var url = window.location.href; 
	var defaults= {
		OnlineMsg  : "Online",
		OfflineMsg : "Offilne",
		SendMsg    : "Hi, I have some questions about this page: "+url+"",
		effectIn   : "fadeInUp",
		effectOut  : "fadeOutRight"
	}
	/* default values end */
	
	/* whatsapp goLink start */
	var goLink="";
	$(".wsc-item").click(function(){
		if(!$(this).hasClass("disabled")){
			var phone   = $(this).attr("data-number");
			var SendMsg = $(this).attr("data-text") == null ? defaults.SendMsg:$(this).attr("data-text");
			if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
				goLink = "https://api.whatsapp.com/send?phone="+phone+"&text="+SendMsg;
			}else {
				goLink = "https://web.whatsapp.com/send?phone="+phone+"&text="+SendMsg;
			}
			window.open(goLink, "_blank").focus();
		}
	});

	$("#send").click(function(){
		var phone   = $(this).parent().parent().parent().attr("data-number");
		var SendMsg = $(this).parent().parent().find(":input").val();
		if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
			goLink = "https://api.whatsapp.com/send?phone="+phone+"&text="+SendMsg;
		}else {
			goLink = "https://web.whatsapp.com/send?phone="+phone+"&text="+SendMsg;
		}
		window.open(goLink, "_blank").focus();
	});
	/* whatsapp goLink end */	
	
	/* Available times start */
	var today=moment().format("dddd");
	var now= moment();
	$(".wsc-item").each(function(){
		var data_time=$(this).attr("data-time");
		if(data_time!=null){
			data_json=JSON.parse(data_time);
			if(match_times(data_json)==true){
				$(this).find(".wsc-stat").text("Online");
			}else {
				$(this).find(".wsc-stat").text(defaults.OfflineMsg).addClass("bg-warning");
				$(this).addClass("disabled");
			}
		}else {
			$(this).find(".wsc-stat").text(defaults.OfflineMsg).addClass("bg-warning");
			$(this).addClass("disabled");
		}
	});

	function match_times(data) {
		for(var i in data){
			if(today == moment().day(i).format("dddd")){
				var time_start = moment($.trim(data[i].split("-")[0]), "HH:mm"),
					time_end = moment($.trim(data[i].split("-")[1]), "HH:mm");
					if(now.isAfter(time_start) && now.isBefore(time_end)){
						return true;
					}
			}
			
		}
	}
	/* Available times end */
	
	/* Whelp animations Start */
	$(".wsc-circle").click(function(e){
		e.preventDefault();
		var test = $(this).next("#wsc-box");
		
		if(test.hasClass('show')) {
			testAnim(defaults.effectOut,"",test);
		}else{
			test.addClass('show');
			testAnim(defaults.effectIn,"goster",test);
		}
	});
	$(".wsc-close").click(function(){
		var test = $(this).parent('#wsc-box');
		testAnim(defaults.effectOut,"",test);
	});

	function testAnim(x,durum,temp) {
		$(temp).addClass(x + ' animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
			if(durum=="goster"){
				$(this).removeClass(x + ' animated');
			}else {
				$(this).removeClass(x + ' animated show');
			}
		});
		if(temp.find(".wsc-chat").length && durum=="goster"){
			temp.find(".wsc-chat").find(":input").focus();
		}
	};
	/* Whelp animations End */

})