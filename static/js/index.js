$('.zhengwen ul li span').click(function (){
    $(this).toggleClass('sel')
    $(this).siblings('.nei').slideToggle('slow')
    $(this).parent().siblings().find('.nei').slideUp('slow')
    $(this).parent().siblings().find('span').removeClass('sel')
})