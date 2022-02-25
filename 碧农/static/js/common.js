AOS.init({
    easing: 'ease-out-back',
    duration: 2000
});
var Scrollbar = window.Scrollbar;
Scrollbar.init(document.querySelector('#my-scrollbar'),{ damping: 0.08 });
var scrollbar = Scrollbar.get(document.querySelector('#my-scrollbar'))
scrollbar.scrollTo(0, 0)
window.pageYOffset = scrollbar.scrollTop
scrollbar.addListener((status) => {


    AOS.refresh();
    window.pageYOffset = scrollbar.scrollTop
});
$(function(){
        var mySwiper = new Swiper ('.swiper-index', {
        autoplay: {
            delay: 2000,
            disableOnInteraction: false,
        },
        loop: true,
        parallax : true,
        speed:1000,
        pagination: {
            el: '.swiper-pagination',
        },
    })
})
$(function (){
    
})
// $(function(){
//     var mySwiper = new Swiper ('.swiper-line', {
//         loop: true,
//         speed:5000,//匀速时间
//         autoplay: {
//             delay: 0,
//             stopOnLastSlide: false,
//             disableOnInteraction: false,
//         },
//     })
// })