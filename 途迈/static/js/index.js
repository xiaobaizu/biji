
$('.sec1 .swiper .swiper-slide .text .span').each(function (index, item) {
    var text = $(item).html();
    var textArray = text.split('');
    var html = '';
    for (var i in textArray) {
        html += '<span>' + textArray[i] + '</span>';
    }
    $(item).html(html);
})

function shuffle (arr) {
    var i = arr.length, t, j
    while (i) {
        j = Math.floor(Math.random() * i--)
        t = arr[i]
        arr[i] = arr[j]
        arr[j] = t
    }
}
function textRandom(){
    let length=$('.sec1 .swiper .swiper-slide .text .span').find('span').length;
    let delay = 0.03;
    let array=[];
    for(let i=0;i<length;i++){
        array.push(i);
    }
    shuffle(array);
    for(let i=0;i<length;i++){
        let time = i * delay + 0.5
        $('.sec1 .swiper .swiper-slide .text .span').find('span').eq(array[i]).css({
            'transition-delay': time + 's',
        })
    }
}

new Swiper(".sec1 .swiper",{
    navigation: {
        nextEl: '.next',
        prevEl: '.prev',
    },
    pagination: {
        el: ".section .swiper-pagination",
        clickable: true,
    },
    on: {
        init:function(){
            textRandom()
            swiperAnimateCache(this);
            swiperAnimate(this);
        },
        slideChangeTransitionStart:function(){
            textRandom()
        },
        slideChangeTransitionEnd:function () {
            swiperAnimate(this);
        }
    },
    effect: "fade",
})

var mySwiper = new Swiper ('.sec3 .swiper', {
    loop: true, // 循环模式选项
    speed: 1000,
    init: true,
    slidesPerView: 3,
    slidesPerColumn: 1,
    slidesPerColumnFill: 'row',
    spaceBetween: 20,
    autoplay: {
        delay: 1000,
    },
})

