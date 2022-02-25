$('.sec1 img').css({
    "transform":"scale(1)"
})


var map = new BMap.Map("allmap");
var point = new BMap.Point(121.557703,29.81519);
// var top_left_navigation = new BMap.NavigationControl();
// map.addControl(top_left_navigation);
map.centerAndZoom(point, 19);
var marker = new BMap.Marker(point);
map.addOverlay(marker);
// map.setMapStyle({style:'midnight'});
marker.setAnimation(BMAP_ANIMATION_BOUNCE);
map.enableScrollWheelZoom(true);