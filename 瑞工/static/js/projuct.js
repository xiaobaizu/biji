
var mySwiper = new Swiper ('.section3 .swiper', {
    loop: true, // 循环模式选项
    // 如果需要前进后退按钮
    navigation: {
        nextEl: '.next',
        prevEl: '.prev',
    },
    initialSlide: 1,
    centeredSlides: true,
    slidesPerView: 2,
    spaceBetween: 20,
    speed: 1000,
})