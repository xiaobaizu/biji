$('.sec1 img').css({
    "transform":"scale(1)"
})
$('.sec2 .top .img').click(function (){
    $('.sec2 .top .flx').slideToggle()
})


var mySwiper = new Swiper ('.sec2 .swiper', {
    // 如果需要前进后退按钮
    initialSlide: 1,
    centeredSlides: true,
    slidesPerView: 2,
    spaceBetween: 20,
    speed: 1000,
    on:{
        slideChange: function(){
            $('.sec2 .top .item').removeClass('sel');
            $('.sec2 .top .item').eq(this.realIndex).addClass('sel');
        },
    },
})
$('.sec2 .top .item').click(function () {
    mySwiper.slideToLoop($(this).index())
})