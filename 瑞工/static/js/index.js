
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
    // 如果需要分页器
    pagination: {
        el: '.sec1 .pagination',
        // clickable: true,
        renderBullet: function (index, className) {
            return '<span class="' + className + '">' +'0'+ (index + 1) + '</span>';
        },
    },
    // 如果需要前进后退按钮
    navigation: {
        nextEl: '.next',
        prevEl: '.prev',
    },
    on: {
        init:function(){
            textRandom()
            swiperAnimateCache(this); //隐藏动画元素
            swiperAnimate(this); //初始化完成开始动画
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


$('#fullPage').fullpage({
    scrollingSpeed: 1600,
    anchors: ['page1', 'page2', 'page3', 'page4', 'page5', 'page6'],
    // css3: false,
    easingcss3: 'cubic-bezier(0.42,0,0,0.99)',
    // navigation: true,
    navigationPosition: 'right',
    responsiveWidth: 900,
    responsiveSlides: true,
    menu: "#menu",
    onLeave: function (section, origin, destination, direction) {
        if (screen.width>769) {
            $('.aos-init').removeClass('aos-animate');
            $('.section').eq(origin.index).find('.aos-init').each(function(){
                $(this).addClass('aos-animate');
            })
        }
    },
});
var sec4=$('.right').position().top-$('.section2').position().top
var flag=true
$('.section2').scroll(function() {
    console.log(sec4)
    var scr=$('.section2')[0].scrollTop
    if($('.section2')[0].scrollTop==0){
        $('#fullPage').fullpage.setAllowScrolling(true)
    }else{
        $('#fullPage').fullpage.setAllowScrolling(false,'up');
        $('#fullPage').fullpage.setKeyboardScrolling(false, 'down, up');
    }
    if(scr>sec4&&flag){
        flag=false
        $(".count-item").each(function (t, e) {
            let o = $(e),
                _from = o.data('from'),
                _to = o.data('to');
            new CountUp(o, _from, _to, 1, 2).start();
        })
    }
});

var S1=new Swiper(".sec3 .left .swiper",{
    spaceBetween: 20,
})
var S2=new Swiper(".sec3 .right .swiper",{
    spaceBetween: 20,
    direction: 'vertical', // 垂直切换选项
})
$('.qx1').click(function (){
    $('.qx1').removeClass('sel')
    $(this).addClass('sel')
    var i=$(this).index();
    S1.slideToLoop(i, 1000, false);//切换到第一个slide，速度为1秒
    S2.slideToLoop(i, 1000, false);//切换到第一个slide，速度为1秒
})

AOS.init({
    easing: 'ease-out-back',
    duration: 2000
});

