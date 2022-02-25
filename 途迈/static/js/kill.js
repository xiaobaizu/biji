var mySwiper = new Swiper ('.swiper', {
    speed: 1000,
    initialSlide: 0,
    slidesPerView : 2,
    centeredSlides : true,
    on: { // 事件
        slideChange: function() {
            $('.sec4-warp .left div p').removeClass('sel');
            $('.sec4-warp .left div p').eq(this.activeIndex).addClass('sel');
        },
    }
})
$('.sec4-warp .left div p').click(function () {
    mySwiper.slideTo($(this).index())
})
$('.sec4-warp .right').mouseover(function (){
    console.log(111)
    $('.cursor').css('opacity','1')
}).mouseleave(function (){
    $('.cursor').css('opacity','0')
})