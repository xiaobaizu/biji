$('.nei3 .nei3-2').click(function(){

    $(this).toggleClass('cc')
    $(this).parent().siblings().find('.nei3-2').removeClass('cc')
    $(this).parent().find('.nei3-3').slideToggle('700');
    $(this).parent().siblings().find('.nei3-3').hide('700')
})
$('.mao').click(function (){
    var index=$(this).index();
    var scroll=$('.tiao').eq(index).position().top
    scrollbar.scrollTo(0, scroll,1200);
})
$('.ul1').eq(4).find('li').click(function (){
    var index=$(this).index();
    var scroll=$('.tiao').eq(index).position().top
    scrollbar.scrollTo(0, scroll,1200);
})
$('.dhh1').eq(4).find('li').click(function (){
    var index=$(this).index();
    var scroll=$('.tiao').eq(index).position().top
    scrollbar.scrollTo(0, scroll,1200);
})
var mmm=window.location.hash
var scroll1=$(mmm).position().top
scrollbar.scrollTo(0, scroll1,1200);