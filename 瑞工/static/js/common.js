var countCXArr = [];
$('.sc img').css('transform','scale(1)')

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
