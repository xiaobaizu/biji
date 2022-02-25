var mySwiper = new Swiper ('.swiper', {
    direction: 'vertical', // 垂直切换选项
    // spaceBetween: 2000,
    // autoplay : {
    //     delay:3000
    // },
    speed : 1000,
})
$('.sec1 .left ul li').click(function (){
    mySwiper.slideTo($(this).index())
    $('.sec3 .sec3-warp').hide()
})
$('.sec1 .left ul li').click(function (){
    $('.sec1 .left ul li').removeClass('sel')
    $(this).addClass('sel')
})
$('.word a').click(function (){
    var class1 = $(this).attr('class');
    class1='.'+class1;
    console.log(class1)
    $('.sec3 .sec3-warp').hide()
    $('.sec3').find(class1).show();


    var top = $(".sec3").position();
    var scr = $("body,html").scrollTop();
    $("body,html").animate({
        scrollTop: top.top-300
    }, 100)
})
