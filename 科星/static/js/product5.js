var swiper3 = new Swiper('.section3 .swiper-container', {
    speed: 1000,
    slidesPerView: 5,
    navigation: {
        nextEl: '.sec3-warp-ri .next',
        prevEl: '.sec3-warp-ri .prev',
    },
});
// var swiper4 = new Swiper('.section4 .swiper-container', {
//     speed: 1000,
//     slidesPerView: 3,
//     spaceBetween: 59,
//     initialSlide: 1,
//     slideToClickedSlide: true,
//     navigation: {
//         nextEl: '.sec4-warp-ri .next',
//         prevEl: '.sec4-warp-ri .prev',
//     },
// });

var swiper4 = new Swiper ('.sec4-warp3 .swiper-container', {
    loop:true,
    speed: 1000,
    navigation: {
        nextEl: '.sec4-warp-ri .next',
        prevEl: '.sec4-warp-ri .prev',
    },
    slidesPerView : 3,
    spaceBetween: 48,
    initialSlide: 1,
    centeredSlides: true,
})