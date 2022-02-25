
var sc1=$('.img').position().top
scrollbar.addListener((status) => {
    window.pageYOffset = scrollbar.scrollTop
    if(scrollbar.scrollTop>sc1){
        $('.section3 .sec3-warp .img .img-right').css({
            width:'480px',
            opacity:'1',
        })
    }
})
var mySwiper = new Swiper ('.sec5-sw .swiper', {
    // 如果需要分页器
    slidesPerView: 3,
    pagination: {
        el: '.swiper-pagination',
        clickable :true,

    },
    initialSlide: 1,
    centeredSlides: true,
})
$('.tiao').each(function (index,elel){
    $(this).click(function (){
        $('.tt').each(function (i,ele){
            if(index==i){
                var scroll = $(this).position().top-100;
                scrollbar.scrollTo(0, scroll, 1200)
            }
        })
    })
})

