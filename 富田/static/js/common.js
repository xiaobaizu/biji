var countCXArr = [];
AOS.init({
    easing: 'ease-out-back',
    duration: 2000
});
var Scrollbar = window.Scrollbar;
Scrollbar.init(document.querySelector('#my-scrollbar'),{ damping: 0.08 });
var scrollbar = Scrollbar.get(document.querySelector('#my-scrollbar'))
scrollbar.scrollTo(0, 0);
window.pageYOffset = scrollbar.scrollTop
scrollbar.addListener((status) => {
    AOS.refresh();
    window.pageYOffset = scrollbar.scrollTop;
    var section = $('.section2').position().top;
    if (scrollbar.scrollTop >= section) {
        $('header').addClass('active');
    }else {
        $('header').removeClass('active');
    }
    if(scrollbar.scrollTop>700){
        $('.sec2-warp .sec2-bo .se2-bo1 .se2-bo-img').eq(0).css('height','65px')
        $('.sec2-warp .sec2-bo .se2-bo1 .se2-bo-img').eq(1).css('height','111px')
        $('.sec2-warp .sec2-bo .se2-bo1 .se2-bo-img').eq(2).css('height','176px')
        $('.sec2-warp .sec2-bo .se2-bo1 .se2-bo-img').eq(3).css('height','316px')
    }
    $('.clearfix').each(function(i, dom) {
        if (countCXArr[i] && countCXArr[i] === true) {
            return;
        }
        var sT;
        var ncTop;
        sT = scrollbar.scrollTop;
        ncTop = $(dom).offset().top;
        var id, decimals, startVal, endVal, duration;
        if (sT > ncTop - $(window).height() && sT < ncTop) {
            $(dom).find('.numCX').each(function() {
                id = $(this).attr('id');
                decimals = $(this).attr('data-decimals'),
                    startVal = $(this).attr('data-startVal'),
                    endVal = $(this).attr('data-endVal'+ ''),
                    console.log($(this).attr('data-endVal'));
                duration = $(this).attr('data-speed');
                new CountUp(id, startVal, endVal, decimals, duration, {
                    useEasing: true, //效果
                    separator: '' //数字分隔符
                })
                    .start(); // target：目标元素id, startVal：你想要开始的值, endVal：你想要到达的值, decimals：小数位数，默认值为0, duration：动画持续时间为秒，默认值为2, options：选项的可选对象
                countCXArr[i] = true;
            })
        }
    })
});
$(function (){
    $(".count-item").each(function (t, e) {
        let o = $(e),
            _from = o.data('from'),
            _to = o.data('to');
        new CountUp(o, _from, _to, 1, 2).start();
    })
})

$('a .par').each(function (index, item) {
    var text = $(item).html();
    var textArray = text.split('');
    var html = '';
    for (var i in textArray) {
        html += '<p>' + textArray[i] + '</p>';
    }
    $(item).html(html);
})
$('a .par').each(function (index,ele){
    $(this).find('p').each(function (index,ele){
        var index = index*0.05+0.1
        $(this).css({
            'transition-delay':index+'s',
        })
    })
})
if (window.addEventListener)//FF,火狐浏览器会识别该方法
    window.addEventListener('DOMMouseScroll', wheel, false);
window.onmousewheel = document.onmousewheel = wheel;//W3C
function wheel(event){
    var delta = 0;
    if (!event) event = window.event;
    if (event.wheelDelta) {
        delta = event.wheelDelta/120;
        if (window.opera) delta = -delta;
    } else if (event.detail) {
        delta = -event.detail/3;
    }
    if (delta)
        handle(delta);
}
function handle(delta) {
    if (delta <0){//向下滚动
        $('header').css({
            top: '-110px',
            olpacity: '0',
        })
    }else{//向上滚动
        $('header').css({
            top: '0',
            olpacity: '1',
        })
    }
}
$(function (){
    var mySwiper = new Swiper ('.right .swiper', {
        // 如果需要前进后退按钮
        navigation: {
            nextEl: '.san .next',
            prevEl: '.san .prev',
        },
    })
})
$('.section .ban').css('transform','scale(1)')


$('.section .span').each(function (index, item) {
    var text = $(item).html();
    var textArray = text.split('');
    var html = '';
    for (var i in textArray) {
        html += '<span>' + textArray[i] + '</span>';
    }
    $(item).html(html);
})
$(function () {
    $('.section .span span').each(function (index, ele) {
        var index = index * 0.1 + 0.1
        $(this).css({
            opacity: 1,
            'left': '0px',
            'transition-delay': index + 's',
            'filter': 'blur(0.1px)'
        })
    })
})
