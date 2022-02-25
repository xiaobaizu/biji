$('.ss1').mouseover(function (){
    $('.ss1 input').css('width','150px')
    $('.ss1').css({
        'border-bottom':'1px solid rgba(0, 0, 0, .5)',
    })
    $('.ss1 input').focus()
    $('.ss1 input').blur(function (){
        $(this).css('width','0px')
        $('.ss1').css({
            'border-bottom':'1px solid rgba(0, 0, 0, 0)',
        })
    })
})
// $('.head .head-right .ss i').mouse(function(){
//     console.log(1)
//     $('.head .head-right .ss input').css({
//         width:'180px',
//         opacity:'1',
//     })
//     $('.ss .ou').css('opacity','1')
//     $('.ss .cha').css('opacity','1')
//     $('.head .head-right .ss input').focus()
//     // $('.head .head-right .ss input').blur(function(){
//     //     $('.head .head-right .ss input').css({
//     //         width:'0px',
//     //         opacity:'0',
//     //     })
//     // })
// })
// $('.head .head-right .search').click(function(){
//     $('.ss .ou').css('opacity','1')
//     $('.cha').css('opacity','1')
//     $('.head .head-right .ss input').css({
//         width:'180px',
//         opacity:'1',
//     })
//     $('.siput').css({
//         width:'180px',
//         opacity:'1',
//     })
//     $('.head .head-right .ss input').focus()
// })
// $('.cha').click(function (){
//     $('.head .head-right .ss input').css({
//         width:'0px',
//         opacity:'0',
//     })
//     $('.head .head-right .siput').css({
//         width:'0px',
//         opacity:'0',
//     })
//     $('.ou').css('opacity','0')
//     $('.cha').css('opacity','0')
// })

var countCXArr = [];
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
    window.pageYOffset = scrollbar.scrollTop;
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
var section = $('.section2').position().top;
console.log(section)
scrollbar.addListener((status) => {
    if (scrollbar.scrollTop >= section){
        $('.head').addClass('head_active')

    }else {
        $('.head').removeClass('head_active')
    }
});
$('.head .head-left .span').click(function (){
    $(this).toggleClass('x')
    $(this).parent().parent().siblings('.dhh').toggleClass('dhh_active')
    $(this).parent().parent().siblings('.block').toggle()
    $(this).parent().toggleClass('hui')
    $(this).toggleClass('dong')
})
$('.dhh1 .dhh2 i').click(function (){
    $(this).parent().parent().find('ul').slideToggle()
    $(this).toggleClass('shang')
})
$(function(){
    $('#fiexd').css('transform','scale(1)')
})





