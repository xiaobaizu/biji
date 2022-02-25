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
$('.search').mouseover(function (){
    $('.search input').css('width','100px')
})
$('.search').mouseleave(function (){
    $('.search input').css('width','0px')
})


$('.header').mouseenter(function () {
    $('#bump path').addClass('active')
})