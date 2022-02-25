$('.sec1 img').css({
    "transform":"scale(1)"
})

var mySwiper99 = new Swiper ('.sec4-warp .swiper', {
    speed: 1000,
    centeredSlides: true,
    navigation: {
        nextEl: '.sec4-warp .next',
        prevEl: '.sec4-warp .prev',
    },
    on:{
        slideChange: function(){
            $('.data1').removeClass('sel');
            $('.data1').eq(this.realIndex).addClass('sel');
        },
    },
})
$('.data1').click(function () {
    mySwiper99.slideToLoop($(this).index())
})

var mySwiper10 = new Swiper ('.sec5-warp .swiper', {
    loop:true,
    speed: 1000,
    initialSlide: 0,
    slidesPerView : 2,
    // initialSlide: 1,
    // centeredSlides : true,
    navigation: {
        nextEl: '.sec4 .next',
        prevEl: '.sec4 .prev',
    },
    navigation: {
        nextEl: '.sec5-warp .next',
        prevEl: '.sec5-warp .prev',
    },
    on:{
        slideChange: function(){
            $('.sec5-warp .left p').removeClass('sel');
            $('.sec5-warp .left p').eq(this.realIndex).addClass('sel');
        },
    },
})
$('.sec5-warp .left p').click(function () {

    mySwiper10.slideToLoop($(this).index())
})
var mySwiper = new Swiper ('.sec6-warp .swiper', {
    loop:true,
    speed: 1000,
    slidesPerView: 3,
    spaceBetween: 20,
    initialSlide: 0,
    effect : 'coverflow',
    navigation: {
        nextEl: '.sec6 .next',
        prevEl: '.sec6 .prev',
    },
})

var mySwiperv1 = new Swiper ('.sec7 .bo .swiper1', {
    loop: true,
    slidesPerView : 8,
    speed: 6000,//匀速时间
    autoplay: {
        delay: 0,
        stopOnLastSlide: false,
        disableOnInteraction: false,
    },
});
var mySwiperv2 = new Swiper ('.sec7 .bo .swiper2', {
    loop: true,
    slidesPerView : 8,
    speed: 6000,//匀速时间
    autoplay: {
        delay: 0,
        stopOnLastSlide: false,
        disableOnInteraction: false,
    },
});
$('.nav .right .tt').click(function (){
    var scroll = $('section').eq($(this).index()+1).position().top-80
    scrollbar.scrollTo(0, scroll, 1200);
})
$('.foot .right .more a').click(function (){
    var scroll = $('section').eq($(this).index()+1).position().top-80
    scrollbar.scrollTo(0, scroll, 1200);
})

var mmm = window.location.hash
if(mmm!=undefined&&mmm!=''){
    var scroll = document.querySelector(mmm).offsetTop-80;
    scrollbar.scrollTo(0, scroll, 1200);
}




