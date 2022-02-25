$('.sec4-warp1').click(function(){
    $('.sec4-warp1').removeClass('sel');
    $(this).addClass('sel')
    var idnex=$(this).index()
    $('.sec5-w').hide();
    $('.sec5-w').eq(idnex).show()
})