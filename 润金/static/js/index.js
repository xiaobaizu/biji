AOS.init({
    // easing: 'ease-out-back',
    duration: 2000
});

$('#fullPage').fullpage({
    scrollingSpeed: 1000,
    anchors: ['page1', 'page2', 'page3', 'page4', 'page5', 'page6'],
    // css3: false,
    easingcss3: 'cubic-bezier(0.42,0,0,0.99)',
    // navigation: true,
    navigationPosition: 'right',
    responsiveWidth: 900,
    responsiveSlides: true,
    menu: "#menu",
    onLeave: function (section, origin, destination, direction) {
        setTimeout(function () {
            $(".count-item").each(function (t, e) {
                let o = $(e),
                    _from = o.data('from'),
                    _to = o.data('to');

                new CountUp(o, _from, _to, 1, 2).start();
            })
        }, 500);
        if (screen.width>769) {
            $('.aos-init').removeClass('aos-animate');
            $('.section').eq(origin.index).find('.aos-init').each(function(){
                $(this).addClass('aos-animate');
            })
        }
    },
});

var swiper = new Swiper(".sec1 .swiper", {
    spaceBetween: 30,
    speed:1000,
    effect: "fade",
    navigation: {
        nextEl: ".next",
        prevEl: ".prev",
    },
    on:{
        init: function(){
            swiperAnimateCache(this); //隐藏动画元素
            swiperAnimate(this); //初始化完成开始动画
        },
        slideChangeTransitionEnd: function(){
            swiperAnimate(this); //每个slide切换结束时也运行当前slide动画
            //this.slides.eq(this.activeIndex).find('.ani').removeClass('ani'); 动画只展现一次，去除ani类名
        }
    }
});


var mySwiper = new Swiper ('.sec4-warp .swiper', {
    // loop:true,
    speed: 1000,
    slidesPerView: 4,
    spaceBetween: 20,
    initialSlide: 1,
    centeredSlides: true,
    navigation: {
        nextEl: '.sec4 .next',
        prevEl: '.sec4 .prev',
    },
})


var mySwiper3 = new Swiper ('.bo .swiper1', {
    loop: true,
    slidesPerView : 8,
    speed: 6000,//匀速时间
    autoplay: {
        delay: 0,
        stopOnLastSlide: false,
        disableOnInteraction: false,
    },
});
var mySwiper4 = new Swiper ('.bo .swiper2', {
    loop: true,
    slidesPerView : 8,
    speed: 6000,//匀速时间
    autoplay: {
        delay: 0,
        stopOnLastSlide: false,
        disableOnInteraction: false,
    },
});
// $('body').click(function (){
//     console.log($('.sele').css('display'))
//     if($('.sele').css('display')=='block'){
//         $('.sele').slideUp()
//     }
// })
$('.icon-sanjiaoxing').click(function (){
    $('.sele').slideToggle()
})
$('.sele').find('li').click(function () {
   var html=$(this).html()
    $('.know').val(html)
    $('.sele').slideUp()
})
$('.item .check .c1 .fang').click(function (){
    $(this).parent().toggleClass('sel')
})

