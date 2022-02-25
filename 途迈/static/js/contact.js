$('.sec2 .sec2-warp .item2 .top').click(function (){
    $(this).find('.cir').toggleClass('sel')
    $(this).siblings('.neirong').slideToggle('slow')
})