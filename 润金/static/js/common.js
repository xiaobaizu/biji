$('.cai').click(function (){
    $(this).toggleClass('close')
    $('.language').slideToggle()
})
$('.foot .foont-warp .t-b .item').mouseenter(function (){
    $(this).children('.erweima').slideDown()
    $(this).children('span').css('opacity','1')
}).mouseleave(function (){
    $(this).children('.erweima').slideUp()
    // $(this).children('span').css('opacity','0')
})

AOS.init({
    easing: 'ease-out-back',
    duration: 2000
});

var Scrollbar = window.Scrollbar;
Scrollbar.init(document.querySelector('#my-scrollbar'),{ damping: 0.08 });
var scrollbar = Scrollbar.get(document.querySelector('#my-scrollbar'))
scrollbar.scrollTo(0, 0)
var flag = true

window.pageYOffset = scrollbar.scrollTop
scrollbar.addListener((status) => {
    AOS.refresh();

    window.pageYOffset = scrollbar.scrollTop
    if (scrollbar.scrollTop > 931&&flag) {
        flag = false
        $(".count-item").each(function (t, e) {
            let o = $(e),
                _from = o.data('from'),
                _to = o.data('to');
            new CountUp(o, _from, _to, 1, 2).start();
        })
    }
});


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
