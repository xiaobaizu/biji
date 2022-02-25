var swiper = new Swiper('.sec4 .warp2 .swiper', {
    speed: 1000,
    navigation: {
        nextEl: '.sec4 .year .next',
        prevEl: '.sec4 .year .prev',
    },
    on:{
        slideChange: function(){
            var index=this.activeIndex;
            $('.year-s p').removeClass('bule')
            $('.year-s p').eq(index).addClass('bule')
        },
    },
});
$('.year-s p').click(function (){
    var index=$(this).index()
    swiper.slideTo(index, 2000, false);
})
var swiper2 = new Swiper('.sec4 .warp3 .swiper', {
    speed: 1000,
    slidesPerView: 3,
    slidesPerColumn: 1,
    navigation: {
        nextEl: '.sec4 .warp3 .next',
        prevEl: '.sec4 .warp3 .prev',
    },
});