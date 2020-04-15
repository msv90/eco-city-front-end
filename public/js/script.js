$(document).ready(function () {
	$('.menubutton').live('click',function() {
		if( $('.leftmenu').is(':visible') ) {
			$( '.leftmenu').hide();
			$( '.leftmenu_child').hide();
		}
		else {
			$( '.leftmenu').show();
			$( '.leftmenu_child').show();
		}
	});
});	
$(function() { 
	/*if ($(".forma_popup").length){
		$('.forma_popup').insertAfter('.wrapper');
	} */
	
 	/*$('.order_forma, .butt_consult, .call a').click(function() {
            
            var a;
            "alx_feedback_popup" === $(this).attr("class") && (a = $(this).attr("id").split("_")[2]);
 
            $('.forma_popup').show().fancybox(
                
                        {ajax: {type: "POST", data: "OPEN_POPUP_" + a + "=Y"},
                            titleShow: !1,
                            type: "ajax",
                            href: "",
                            afterShow: function() {
                                "undefined" !== typeof AltasibFeedbackOnload && AltasibFeedbackOnload()
                            },
                            overlayShow: 1,
                            autoDimensions: !1,
                            helpers: {}});
		return false;
    });*/

    
    //колорбокс для форм
	var cboxOptions = {
	  inline:true,
	  width: '95%',
	  maxWidth: '650px',
	  scrolling:false,
	  opacity:0.5
	}
	
	var cboxOptionsAjax = {
	  width: '95%',
	  maxWidth: '650px',
	  scrolling:false,
	  opacity:0.5
	}	

	$('.forma-link').colorbox(cboxOptions);
	$('.forma-link-ajax').colorbox(cboxOptionsAjax);

	$(window).resize(function(){
	  $.colorbox.resize({
	    width: window.innerWidth > parseInt(cboxOptions.maxWidth) ? cboxOptions.maxWidth : cboxOptions.width
	    //height: window.innerHeight > parseInt(cboxOptions.maxHeight) ? cboxOptions.maxHeight : cboxOptions.height
	  });
	});
	
	$(".youtube").colorbox({iframe:true, innerWidth:640, innerHeight:390});    
    
    //валидация
    $.validator.setDefaults({
	  success: "valid"
	});	    
    $("#credit_form").validate(); 
    $("#consult_form").validate();
    $("#zayavka_form").validate();
    $("#specialist_form").validate();
    $("#specialist_consult_form").validate();
    $("#payment_form").validate();
    $("#callback_form").validate();
    $("#dogovor_form").validate();
    $("#response_form").validate();
    $("#seminar_form").validate();
    $("#call_form").validate();
    $("#sendReview1").validate();
    $("#sendReview").validate();
    $("#sale").validate();
	jQuery.extend(jQuery.validator.messages, {
	    required: "Это поле обязательное для заполнения",
	    email: "Пожалуйста, введите правильный email"
	});
    
	//элементы форм
   	$('.radiobox, .check, select, .file, .alx_feed_back_form_file_input_add').styler({
   		filePlaceholder:'',
   		fileBrowse:"Прикрепить файл"
   	});
    
    $('a.print, ul.dopknopki li.print').click(function() {
    	window.print();
    	//$('.komplektacii').insertAfter('.lcoll');
    	return false;
    });
    
    //для всплывающей формы договора в как заказать дом
	$('#dogovor #PROJECT_NAME_FID51').attr('disabled','disabled');
	$('#dogovor .line_4 li:first-child .check').on('change', function () {
	  $('#dogovor #PROJECT_NAME_FID51').removeAttr('disabled');
	  return false;
	 });
	//для всплывающей формы договора в как заказать дом: перенести название выше к полю "типовой"
	$('#PROJECT_NAME_FID51').appendTo($('.line_4 ul.list li').has('#140'));
	$('#dogovor #PROJECT_NAME_FID51').css('width','45%!important').css('margin-left','20px');
	$('div.line_5').remove();
	 
	 //плейсхолдер для телефона в формах
	 $("#PHONE_FID11, #PHONE_FID21, #PHONE_FID31, #PHONE_FID41").attr("placeholder", "X (XXX) XXX-XX-XX");
	
    //для отзывов в построенных домах
	$('.scan').hide();
    $('.scan_link a').click(function() {
		$(this).parent().next().show().css('display','inline');
		$(this).parent().hide();
		$('.video_link').css('display','inline');
		return false;
    });	
    
    //страница отзывов в построенных домах
     $('.responses_list .more a').click(function() {
		$(this).hide();
		return false;
    });	
	$('.responses_list ul li:nth-child(2n)').addClass('greyLine');
   	
   	//для видео в отзывах
	$(".zoom").fancybox({
		maxWidth	: 800,
		maxHeight	: 600,
		fitToView	: false,
		width		: '70%',
		height		: '70%',
		autoSize	: false,
		closeClick	: false,
		openEffect	: 'none',
		closeEffect	: 'none'
	});	
    //title у инпутов type file в форме отзывов
    $('.add_document').find('.jq-file__browse').text('Загрузить фото документа или видео');
    $('.add_foto').find('.jq-file__browse').text('Загрузить фото свое или дома');
    
	$('p').each(function() {
	    var $this = $(this);
	    if($this.html().replace(/\s|&nbsp;/g, '').length == 0)
	        $this.remove();
	});
	//$("p, ul").css("text-align", "justify").addClass('text_justify').removeAttr('style');	
	
	if ($('p').css('text-align') === 'justify') {
    	$(this).addClass('text_justify').removeAttr('style');
	}
	if ($('ul').css('text-align') === 'justify') {
    	$(this).addClass('text_justify').removeAttr('style');
	}	
	
    //контейнеры для картинок на сайте
    $('img.img').each(function () {
    	$(this).wrapAll('<div class="image_container"></div>');
    });
    //картинки с разным расположением на сайте
    $('img.alignleft').removeClass('alignleft').parent().addClass('alignleft');
    $('img.alignright').removeClass('alignright').parent().addClass('alignright');
    $('img.aligncenter').removeClass('aligncenter').parent().addClass('aligncenter');    	
	
	//контакты
    if ($(".contacts_list").length){
	    var topLink = $('.contacts_list').offset().top;
	    $('.forma_popup.forma_call').css("top",topLink);
	    
		  //в контактах скрывающиеся блоки
		  var allPanels = $('.contacts_list > dd');
		  $('.contacts_list > dt > a').click(function() {
		    if ($(this).parent().hasClass('selected')) {
    			$(this).parent().next().slideUp();
   				$(this).parent().removeClass('selected');
   				return false;	   	
		    }
		    else {
		    
			    $('.contacts_list > dt').removeClass('selected');
			    allPanels.slideUp();
			    $(this).parent().addClass('selected');
			    $(this).parent().next().slideDown();
			    return false;
		    }
		  });    
	  }

    //для карт фокус
    $('.map_space').click(function() {
		$(this).children('.disabler').hide();
    });
	$('.map_space').mouseleave(function() {
		$(this).children('.disabler').show();
    });
    
    $('.house_line .show_next a, .house_line .show_next span, .filter_show a, .responses_list .more a').click(function() {
		$(this).parent().next().slideToggle();
		return false;
    });
    
    //404 страница
    if ($(".not_found").length){ 
	    $('.not_found').parent().find('.header').hide();
	    $('.content').css("float","none");
	    $('.content').css("position","relative");
	    
	    var win= $(window).width();
	    if (win > 900) {
		    var winHeight = $(window).height()-100;
		    $('.content').css("height",winHeight);
		    var height404 = $('.not_found').innerHeight();
		    //$('.not_found').css("margin-top", -height404/2);    
		    $('.not_found').css("margin", "20px auto");
	    }
	    else {
    		$('.not_found').css("margin", "20px auto");
    		$('.content').css("height","auto");
	    } 
	}
	
	$(".blocks_wrap.main").each(function() { 
		$(this).find('.bx_catalog_item_container').each(function(i) {
			$(this).addClass("item-" + (i+1));
		});
	 });	
	
	
	$( ".obshaya_info .obshaya_list dt strong:contains('+')" ).addClass('plus');
	
});

function equalHeight(group) {
    tallest = 0;
    group.each(function() {
        thisHeight = $(this).innerHeight();
        if(thisHeight > tallest) {
            tallest = thisHeight;
        }
    });
    group.innerHeight(tallest);
}
$(window).load(function(){

	//для главной страницы на разрешении мобильного
	$(".blocks_wrap.main .bx_catalog_item_container:eq(0), .blocks_wrap.main .bx_catalog_item_container:eq(1), .blocks_wrap.main .bx_catalog_item_container:eq(2)").addClass('alwayShow');
	$('.blocks_wrap.main .bx_catalog_item_container').not('.alwayShow').wrapAll("<div class='mobile_not_show'></div>" );	
	$('<p class="see_all"><a href="#">Смотреть еще</a></p>').insertBefore('.mobile_not_show');
	$('.main p.see_all a').click(function() {
		$(this).parent().hide();
		$(this).parent().next('.mobile_not_show').slideDown().css('display','inline');
		return false;
	});

	
	
	//дилеры
    equalHeight($(".dealers-bottom .step"));	
	var heightStep = $('.dealers-bottom .step').innerHeight();
	var afterHeight = heightStep - 77;
	$('.dealers-bottom .shema_2_line .after_line').height(afterHeight);
	var heightShema = $('.dealers-shema').innerHeight() - heightStep + 7;
	$('.dealers-shema .dealers-shema-left').height(heightShema); 
	
});



$(window).resize(function(){
	$('.dealers-bottom .step').height('auto');
     equalHeight($(".dealers-bottom .step"));
         
	var heightStep = 0;
	heightStep = $('.dealers-bottom .step').innerHeight();
	var afterHeight = heightStep - 77;
	$('.dealers-bottom .shema_2_line .after_line').height(afterHeight);
	var heightShema = 0;
	heightShema = $('.dealers-shema').innerHeight() - heightStep + 7;
	$('.dealers-shema .dealers-shema-left').height(heightShema); 		
	

    //404 страница
     var win= $(window).width(); 
     
    if ($(".not_found").length){ 
	    $('.not_found').parent().find('.header').hide();
	    $('.content').css("float","none");
	    $('.content').css("position","relative");
	    
	   
	    if (win > 900) {
		    var winHeight = $(window).height()-100;
		    $('.content').css("height",winHeight);
		    var height404 = $('.not_found').height();
		    $('.not_found').css("margin-top", -height404/2);    
	    }
	    else {
    		$('.not_found').css("margin", "20px auto");
    		$('.content').css("height","auto");
	    } 
	}
	
	if ( win < 600) {
		$('#wrap.proecty_block .top_nav').insertAfter('#wrap.proecty_block .smartfilter');
	}
	if ( win > 600) {
		$('#wrap.proecty_block .top_nav').insertBefore('#wrap.proecty_block .smartfilter');
	}	
	
	 	
}).resize();		