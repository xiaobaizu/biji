$('.sec1 img').css({
    "transform":"scale(1)"
})
$('.sec2-warp .item .item-top').click(function (){
    $(this).toggleClass('sel')
    $(this).parent().find('.item-top').removeClass('sel')
    $(this).parent().siblings().find('.item-bo').slideUp('slow')
    $(this).siblings().slideToggle('slow')
})


$('.foot .right .more a').click(function (){
    var scroll = $('section').eq($(this).index()+1).position().top-80
    scrollbar.scrollTo(0, scroll, 1200);
})
$('.tt').click(function (){
    $('.tt').removeClass('sel')
    $(this).addClass('sel')
    var scroll = $('section').eq($(this).index()+1).position().top-80
    scrollbar.scrollTo(0, scroll, 1200);
})
//
var mmm = window.location.hash
if(mmm!=undefined&&mmm!=''){
    var scroll = document.querySelector(mmm).offsetTop-80;
    scrollbar.scrollTo(0, scroll, 1200);
}




