$(function (){
    $('.section img').css('transform','scale(1)')
})
// $('.section3-warp2-ri1').click(function(){
//     $('.section3-warp2-ri1').removeClass('color')
//     $(this).addClass('color')
//     var index=$(this).index()
//     $('.section3-warp .section3-warp2 .section3-warp2-le .le').removeClass('show')
//     $('.section3-warp .section3-warp2 .section3-warp2-le .le').eq(index).addClass('show')
// })
$('.section3-warp2-ri1').mouseover(function (){
    $(this).addClass('color')
}).mouseleave(function (){
    $(this).removeClass('color')
})
$('.section5 .section5-warp .cir .cir1 .quan').mouseover(function (){
    $('.section5 .section5-warp .cir .cir1').removeClass('white')
    $(this).parent().addClass('white')
})
var swiper2 = new Swiper('.section6-warp .swiper-container', {
    speed: 1000,
    slidesPerView: 7,
    // navigation: {
    //     nextEl: '.sec6-next',
    //     prevEl: '.sec6-prev',
    // },
    prevButton:'.sec6-prev',
    nextButton:'.sec6-next',
});
var swiper3 = new Swiper('.sec7-ry-warp .swiper-container', {
    // speed: 1000,
    // slidesPerView: 4,
    // navigation: {
    //     nextEl: '.next',
    //     prevEl: '.prev',
    // },
    loop : true,
    effect: 'coverflow',
    centeredSlides: true,
    slidesPerView: 'auto',
    observer:true,
    observeParents:true,
    coverflow: {
        rotate: 0,// 旋转的角度
        stretch: 11,// 拉伸   图片间左右的间距和密集度
        depth: 200,// 深度   切换图片间上下的间距和密集度
        modifier: 1,// 修正值 该值越大前面的效果越明显
        slideShadows : false// 页面阴影效果
    },
    prevButton:'.prev',
    nextButton:'.next',
});

$('.mao').click(function (){
    var index=$(this).index();
    var scroll=$('.tiao').eq(index).position().top
    scrollbar.scrollTo(0, scroll,1200);
})
$('.ul1').eq(0).find('li').click(function (){
    var index=$(this).index();
    var scroll=$('.tiao').eq(index).position().top
    scrollbar.scrollTo(0, scroll,1200);
})
$('.dhh1').eq(0).find('li').click(function (){
    var index=$(this).index();
    var scroll=$('.tiao').eq(index).position().top
    scrollbar.scrollTo(0, scroll,1200);
})
var mmm=window.location.hash
var scroll1=$(mmm).position().top
scrollbar.scrollTo(0, scroll1,1200);