var dian=0;
var zhuang=0;
$('.text').click(function(){
    var index=$(this).index()
    console.log(index)
    $('svg g text').attr('fill',"#6C6C6C")
    $('svg g').eq(0).find('text').hide()
    $('svg g').each(function(){
        $(this).find('text').eq(index).attr('fill',"#FABE00").show();
    })
    $('.text span').removeClass('span-active')
    $('.text .cir-blue').removeClass('sle-active')
    $('.percentage').removeClass('show')
    $('.china-line1').addClass('china-line')
    $('.china-line2').addClass('china-line')
    $('.china-line3').addClass('china-line')

    if(index==0){
        $('#line').attr('x1','0')
        var x2=0;
        var interval=setInterval(function(){
            $('#line').attr('x2',x2+=8)
            if(x2==200){
                clearInterval(interval);
            }
        },40)
    }
    if(index==1){
        $('#line').attr('x1','200')
        var x2=200;
        var interval=setInterval(function(){
            $('#line').attr('x2',x2+=8)
            if(x2==240){
                clearInterval(interval);
            }
        },40)
        console.log($('.text').eq(1).find('span'))
        $('.cir-blue').eq(0).addClass('sle-active')
        $('.cir-blue').eq(0).siblings('span').addClass('span-active')
        $('.percentage').eq(0).addClass('show')
        setTimeout(function(){
            $('.china-line1').removeClass('china-line')
        },600)
        if(dian==0){
            zhuang+=60;
        }
        if(dian==2){
            zhuang+=330
        }
        if(dian==3){
            zhuang+=117
        }
        $('.china-svg').css({
            'transform': 'translate(-50%,-50%) rotate('+zhuang+'deg)',
        })
        dian=1;

    }
    if(index==2){
        $('#line').attr('x1','240')
        var x2=240;
        var interval=setInterval(function(){
            $('#line').attr('x2',x2+=8)
            if(x2==280){
                clearInterval(interval);
            }
        },40)
        $('.cir-blue').eq(1).addClass('sle-active')
        $('.cir-blue').eq(1).siblings('span').addClass('span-active')
        $('.percentage').eq(1).addClass('show')
        setTimeout(function(){
            $('.china-line3').removeClass('china-line')
        },600)

        if(dian==0){
            zhuang+=90;
        }
        if(dian==1){
            zhuang+=30
        }
        if(dian==3){
            console.log(zhuang)
            zhuang+=147
        }
        $('.china-svg').css({
            'transform': 'translate(-50%,-50%) rotate('+zhuang+'deg)',
        })
        dian=2;
    }
    if(index==3){
        $('#line').attr('x1','280')
        var x2=280;
        var interval=setInterval(function(){
            $('#line').attr('x2',x2+=8)
            if(x2>=402){
                clearInterval(interval);
            }
        },40)
        $('.cir-blue').eq(2).addClass('sle-active')
        $('.cir-blue').eq(2).siblings('span').addClass('span-active')
        $('.percentage').eq(2).addClass('show')

        setTimeout(function(){
            $('.china-line2').removeClass('china-line')
        },600)
        if(dian==0){
            zhuang+=303;
        }
        if(dian==1){
            zhuang+=243
        }
        if(dian==2){
            zhuang+=213
        }
        $('.china-svg').css({
            'transform': 'translate(-50%,-50%) rotate('+zhuang+'deg)',
        })
        dian=3;

    }
})



AOS.init({
    // easing: 'ease-out-back',
    duration: 2000
});
$('#fullPage').fullpage({
    scrollingSpeed: 1000,
    anchors: ['page1', 'page2', 'page3', 'page4', 'page5', 'page6'],
    // css3: false,
    easingcss3: 'cubic-bezier(0.42,0,0,0.99)',
    // navigation: true,
    navigationPosition: 'right',
    responsiveWidth: 900,
    responsiveSlides: true,
    menu: "#menu",
    onLeave: function (section, origin, destination, direction) {
        setTimeout(function () {
            $(".count-item").each(function (t, e) {
                let o = $(e),
                    _from = o.data('from'),
                    _to = o.data('to');

                new CountUp(o, _from, _to, 1, 2).start();
            })
        }, 500);
        $('.aos-init').removeClass('aos-animate');
        $('.section').eq(origin.index).find('.aos-init').each(function(){
            $(this).addClass('aos-animate');
        })
        if(origin.index==0){
            $(".head-left .line").css("background","white")
            $(".head .head-left .left-d span").css("color","white")
            $('.head .head-left .span span').css('background','white')
            $('.head-right .xl i').css('color','#FFFFFF')

        }
        if(origin.index==1){
            $(".head-left .line").css("background","rgba(0,0,0,.2)")
            $(".head .head-left .left-d span").css("color","#3E3E3E")
            $('.head .head-left .span span').css('background','#4F4F4F')
            $('.head-right .ss input').css({
                'color':'#B1B1B1',
                'backgrpund':'#F6F6F6',
            })
            $('.head-right .ss i').css('color','white')

            $('.head-right .CN').css('color','#444444')
            $('.head-right .search').css('color','#444444')
            $('.head-right .CN').css('.color','#444444')
            $('.language span').css('color','#444444')
            $('.head-right .line').css('background','rgba(0,0,0,.2)')
            $('.head-right .xl i').css('color','#444444')
            $('.head-right .ss i').css('color','#3F3F3F')
            console.log(1111)
            $('.zhi img').css('transform','scale(1)')
            $('.sec2-ri-bo').css('height','40%')
        }else{
            $('.zhi img').css('transform','scale(1.1)')
            $('.sec2-ri-bo').css('height','0%')
        }
        if(origin.index==2){
            $(".head-left .line").css("background","rgba(0,0,0,.2)")
            $(".head .head-left .left-d span").css("color","#3E3E3E")
            $('.head .head-left .span span').css('background','#4F4F4F')
            $('.head-right .ss i').css('color','#3F3F3F')
            $('.head-right .ss input').css({
                'color':'white',
                'backgrpund':'#B1B1B1',
            })
            $('.head-right .search').css('color','#444444')
            $('.head-right .CN').css('color','#444444')
            $('.language span').css('color','#444444')
            $('.head-right .line').css('background','rgba(0,0,0,.2)')
            $('.head-right .xl i').css('color','#444444')
            $('.zhi1 img').css('transform','scale(1)')
            $('.yellow').css('left','100%')
            $('.yellow1').css('left','100%')
        }else{
            $('.zhi1 img').css('transform','scale(1.1)')
            $('.yellow').css('left','0%')
            $('.yellow1').css('left','0%')
        }
        if(origin.index==3){
            if($('.text').find('.span-active').length==0){
                $('#line').attr('x1','0')
                var x2=0;
                var interval=setInterval(function(){
                    $('#line').attr('x2',x2+=8)
                    if(x2==200){
                        clearInterval(interval);
                    }
                },40)
            }


            $(".head-left .line").css("background","white")
            $(".head .head-left .left-d span").css("color","white")
            $('.head .head-left .span span').css('background','white')
            $('.head-right .xl i').css('color','#FFFFFF')

            $('.head-right .ss i').css('color','white')
            $('.head-right .CN').css('color','#FFFFFF')
            $('.head-right .search').css('color','#FFFFFF')
            $('.head-right .CN').css('.color','#FFFFFF')
            $('.language span').css('color','#FFFFFF')
            $('.head-right .line').css('background','rgba(255,255,255)')
            $('.head-right .xl i').css('color','#FFFFFF')

            $('.sec4 .sec4-warp img').css('transform','scale(1)')
            console.log(111)
        }else{
            $('.sec4 .sec4-warp img').css('transform','scale(1.1)')
        }
        if(origin.index==4){
            $(".head-left .line").css("background","rgba(0,0,0,.2)")
            $(".head .head-left .left-d span").css("color","#3E3E3E")
            $('.head .head-left .span span').css('background','#4F4F4F')
            $('.head-right .ss i').css('color','#3F3F3F')
            $('.head-right .ss input').css({
                'color':'white',
                'backgrpund':'#B1B1B1',
            })
            $('.head-right .search').css('color','#444444')
            $('.head-right .CN').css('color','#444444')
            $('.language span').css('color','#444444')
            $('.head-right .line').css('background','rgba(0,0,0,.2)')
            $('.head-right .xl i').css('color','#444444')
        }
        if(origin.index==5){
            $(".head-left .line").css("background","rgba(0,0,0,.2)")
            $(".head .head-left .left-d span").css("color","#3E3E3E")
            $('.head .head-left .span span').css('background','#4F4F4F')
            $('.head-right .ss i').css('color','#3F3F3F')
            $('.head-right .ss input').css({
                'color':'white',
                'backgrpund':'#B1B1B1',
            })
            $('.head-right .search').css('color','#444444')
            $('.head-right .CN').css('color','#444444')
            $('.language span').css('color','#444444')
            $('.head-right .line').css('background','rgba(0,0,0,.2)')
            $('.head-right .xl i').css('color','#444444')
        }
    },
});

var mySwiper = new Swiper ('.sec1 .swiper-container', {
    // // parallax : true,
    // speed:1000,
    navigation: {
        nextEl: '.swiper-button-prev',
        prevEl: '.swiper-button-next',
    },
    speed: 1200,
    spaceBetween: 30,
    autoplay: {
        delay: 3000,
        pauseOnMouseEnter: true,
        disableOnInteraction: false,
    },
    effect: "fade",
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
})
// var swiper1 = new Swiper('.text2', {
//     speed: 1000,
//     spaceBetween: 20,
//
// });
var swiper2 = new Swiper('.sec3-img', {
    speed: 1000,
    spaceBetween: 20,
});
$(".text1 span").click(function() {
    $(".text1 span").removeClass('text-active')
    $(this).addClass('text-active')
    console.log($(this).index())
    // swiper1.slideTo($(this).index())
})
$(".text1 span").click(function() {
    swiper2.slideTo($(this).index())
})

var swiper3 = new Swiper('.swiper-hangye', {
    speed: 1000,
    slidesPerView: 3,
    spaceBetween: 20,
    navigation: {
        nextEl: '.hangy-next',
        prevEl: '.hangy-prev',
    },
    initialSlide: 1,
    centeredSlides:true,
    pagination: {
        el: '.hangye-pagination',
        type: 'fraction',
        renderFraction: function (currentClass, totalClass) {
            return '<span class="' + currentClass + '"></span>' +
                '/' +
                '<span class="' + totalClass + '"></span>';
        },
        formatFractionCurrent:function (number) {
            return number<10?'0'+number:number;
        },
        formatFractionTotal: function (number) {
            return number<10?'0'+number:number;
        }
    },
});
var swiper3 = new Swiper('.swiper-qiye', {
    speed: 1000,
    slidesPerView: 3,
    spaceBetween: 20,
    navigation: {
        nextEl: '.qiye-prev',
        prevEl: '.qiye-next',
    },
    initialSlide: 1,
    centeredSlides:true,
    pagination: {
        el: '.qiye-pagination',
        type: 'fraction',
        renderFraction: function (currentClass, totalClass) {
            return '<span class="' + currentClass + '"></span>' +
                '/' +
                '<span class="' + totalClass + '"></span>';
        },
        formatFractionCurrent:function (number) {
            return number<10?'0'+number:number;
        },
        formatFractionTotal: function (number) {
            return number<10?'0'+number:number;
        }
    },
});

$('.qiye').click(function(){
    $('.swiper-qiye').hide()
    $('.qiye-pagination').hide()
    $('.qiye-prev').hide()
    $('.qiye-next').hide()

    $('.swiper-hangye').show()
    $('.hangye-pagination').show()
    $('.hangy-prev').show()
    $('.hangy-next').show()
    $(this).addClass('blue')
    $('.hanye').removeClass('blue')
})
$('.hanye').click(function(){
    $('.swiper-qiye').show()
    $('.qiye-pagination').show()
    $('.qiye-prev').show()
    $('.qiye-next').show()

    $('.swiper-hangye').hide()
    $('.hangye-pagination').hide()
    $('.hangy-prev').hide()
    $('.hangy-next').hide()
    $(this).addClass('blue')
    $('.qiye').removeClass('blue')
})

var map = new BMapGL.Map("allmap");
var point = new BMapGL.Point(121.854516,29.700208);
map.centerAndZoom(point, 20);
var myIcon = new BMapGL.Icon("static/images/tubiao.png", new BMapGL.Size(108, 67));
var marker1 = new BMapGL.Marker(new BMapGL.Point(121.854516,29.700300));
marker1.setIcon(myIcon);
// map.enableScrollWheelZoom(true); // 开启鼠标滚轮缩放
map.addOverlay(marker1);

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