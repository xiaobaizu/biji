var len=$('img').length
var load=0
var arr=new Array();
$('img').each(function (index,ele){
    arr.push($(this).attr('src'))
})
$('.back').each(function (index,ele){
})
for(var i in arr){
    var bimg=new Image();
    bimg.src = arr[i];

    bimg.onload = function () {
        load+=1;

        $('.after').css({
            width:load/len*100+'%',
        })
        $('.load-warp p').css({
            left:load/len*100+'%',
        }).html(Math.round(load/len*100)+'%')
        if(load==len){
            $('.load').css('opacity','0')
            setTimeout(function (){
                $('.load').hide()
            },2000)
            $('.logo-img').css('opacity','0')
            $('header').css('display','flex')
        }
        setTimeout(function (){
            $('.load').css('opacity','0')
            setTimeout(function (){
                $('.load').hide()
            },2000)
            $('.logo-img').css('opacity','0')
            $('header').css('display','flex')
        },3000)
    }
}
$(function (){
    var mySwiper = new Swiper ('.section .swiper-container', {
        speed:1000,
        // 如果需要分页器
        spaceBetween: 30,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
        effect: "fade",
        // pagination: {
        //     el: ".section .swiper-pagination",
        //     clickable: true,
        // },
        on: {
            slideChange: function () {
                if (this.realIndex > 0) {
                    this.params.autoplay.delay = 3000;
                }
            }
        }
    })
})




