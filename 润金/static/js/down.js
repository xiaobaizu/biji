$('.sec1 img').css({
    "transform":"scale(1)"
})
$('.item-top .click').click(function (){
    $(this).parent().parent().siblings().find('.click').removeClass('active')
    $(this).toggleClass('active')
    $(this).parent().parent().siblings().find('.downing').slideUp()
    $(this).parent('.item-top').siblings('.downing').slideToggle()
})
