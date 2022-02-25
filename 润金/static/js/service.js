$('.sec1 img').css({
    "transform":"scale(1)"
})
$('.item').click(function (){
    $(this).siblings().removeClass('active')
    $(this).toggleClass('active')
})
