var mySwiper = new Swiper ('.m1 .swiper', {

    loop:true,
    // 如果需要前进后退按钮
    navigation: {
        nextEl: '.m1 .next',
        prevEl: '.m1 .prev',
    },
})
var mySwiper = new Swiper ('.m2 .swiper', {
    loop:true,
    // 如果需要前进后退按钮
    navigation: {
        nextEl: '.m2 .next',
        prevEl: '.m2 .prev',
    },
})
var mySwiper = new Swiper ('.m3 .swiper', {
    loop:true,
    // 如果需要前进后退按钮
    navigation: {
        nextEl: '.m3 .next',
        prevEl: '.m3 .prev',
    },
})
var mySwiper = new Swiper ('.m4 .swiper', {
    loop:true,
    // 如果需要前进后退按钮
    navigation: {
        nextEl: '.m4 .next',
        prevEl: '.m4 .prev',
    },
})
var mySwiper = new Swiper ('.m5 .swiper', {
    loop:true,
    // 如果需要前进后退按钮
    navigation: {
        nextEl: '.m5 .next',
        prevEl: '.m5 .prev',
    },
})
$(function (){
    $('.fixed p').click(function (){
        let i=$(this).index()
        var scroll=$('.sec2-bo1').eq(i).position().top-300
        scrollbar.scrollTo(0, scroll,1200);
    })
})
scrollbar.addListener((status) => {
    var scroll1=$('.sec2-bo1').eq(0).position().top-500;
    var scroll2=$('.sec2-bo1').eq(1).position().top-350;
    var scroll3=$('.sec2-bo1').eq(2).position().top-350;
    if(scrollbar.scrollTop<scroll1){
        $('.fixed').css('opacity','0')
    }
    if(scrollbar.scrollTop>scroll1&&scrollbar.scrollTop<scroll2){
        $('.fixed').css('opacity','1')
        $('.fixed p').removeClass('dao')
        $('.fixed p').eq(0).addClass('dao')
    }
    if(scrollbar.scrollTop>scroll2&&scrollbar.scrollTop<scroll3){
        $('.fixed p').removeClass('dao')
        $('.fixed p').eq(1).addClass('dao')
    }
    if(scrollbar.scrollTop>scroll3){
        $('.fixed p').removeClass('dao')
        $('.fixed p').eq(2).addClass('dao')
    }
})