$('.sec1 img').css({
    "transform":"scale(1)"
})
var mySwiper = new Swiper ('.sec2 .swiper', {
    speed: 1000,
    slidesPerView: 1,
    pagination: {
        el: '.swiper-pagination',
        clickable :true,
    },
})