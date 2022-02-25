AOS.init({
    easing: 'ease-out-back',
    duration: 2000
});


$('.tit_i1').mouseover(function (){
    $(this).find('.xian').show()
}).mouseleave(function (){
    $(this).find('.xian').hide()

})


var mySwiper1 = new Swiper ('.index .banner .swiper', {
    loop: true, // 循环模式选项
    // 如果需要分页器
    pagination: {
        el: '.index .banner .swiper-pagination',
        clickable :true,
    },
    autoplay:true,
    speed:2000,
    // 如果需要前进后退按钮
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
})
var mySwiper2 = new Swiper ('.index .sec5 .swiper', {
    loop: true, // 循环模式选项
    // 如果需要分页器
    pagination: {
        el: '.sec5 .swiper-pagination',
    },
    slidesPerView: 3,
    autoplay:true,
    speed:2000,
    // 如果需要前进后退按钮
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
})

window.onscroll = function () {
    var scroll = $(document).scrollTop();
    var sec1=$('.sec3').position().top-50;
    if(scroll>sec1){
        $('.index .sec4 .sec4-warp .sec4-ba .right .right-p .div').addClass('show')
    }
}
$('.fixed .chat').click(()=>{
    $('.fixed .chat .chat-1').slideToggle()
})