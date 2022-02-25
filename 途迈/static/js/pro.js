$('.big1').mouseover(function (){
    $(this).children('.color').css('height','100%')
    $(this).find('.cir').css('opacity','0.5')
}).mouseleave(function (){
    $(this).children('.color').css('height','3px')
    $(this).find('.cir').css('opacity','0')
})
$('.left1 .top').click(function (){
    $(this).siblings('.pro-a').slideToggle('slow')
    $(this).toggleClass('sel')
})
var swiper = new Swiper('.sec4-sw .swiper', {
    speed: 1000,
    slidesPerView: 4,
    navigation: {
        nextEl: '.sec4-sw .next',
        prevEl: '.sec4-sw .prev',
    },
});
