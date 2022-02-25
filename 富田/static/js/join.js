var mySwiper1 = new Swiper ('.sec3-bo .swiper', {
    spaceBetween: 20,
    initialSlide: 2,
})

var mySwiper2 = new Swiper ('.prog .swiper', {
    slidesPerView: 5,
    initialSlide: 2,
    centeredSlides: true,
    slideToClickedSlide: true,
})
mySwiper2.controller.control = mySwiper1;
mySwiper1.controller.control = mySwiper2;
$('.yr .sy').click(function (){
    $(this).addClass('yes')
    $('.yr .sr').removeClass('yes')
    $('.scir-yong').eq(0).addClass('true-yong')
    $('.scir-yong').eq(1).removeClass('true-yong')
})
$('.yr .sr').click(function (){
    $(this).addClass('yes')
    $('.yr .sy').removeClass('yes')
    $('.scir-yong').eq(1).addClass('true-yong')
    $('.scir-yong').eq(0).removeClass('true-yong')
})

var mySwiper5 = new Swiper ('.sec5-bo', {
    slidesPerView: 4,
    spaceBetween: 20,
    navigation: {
        nextEl: '.np .next',
        prevEl: '.np .prev',
    },
})
var mySwiper4 = new Swiper('.section6 .swiper', {
    initialSlide: 3,
    centeredSlides: true,
    slidesPerView: 3,
    effect: 'coverflow',
    coverflowEffect: {
        rotate: 0,
        stretch: 100,
        depth: 100,
        modifier: 2,
    },
    loop:true,
})
$('.mao').click(function (){
    var index=$(this).index();
    var scroll=$('.tiao').eq(index).position().top-110
    scrollbar.scrollTo(0, scroll,1200);
})
$('.foo-text1').eq(0).find('a').click(function (){
    var index=$(this).index();
    var scroll=$('.tiao').eq(index).position().top-110
    scrollbar.scrollTo(0, scroll,1200);
})
var mmm=window.location.hash
var scroll1=$(mmm).position().top-110
scrollbar.scrollTo(0, scroll1,1200);

