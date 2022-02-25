$('.dh1 .sp').click(function (){
    $(this).parent().toggleClass('sel')
    $(this).parent().find('.dh2').slideToggle('slow')
})