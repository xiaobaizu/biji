var map = new BMapGL.Map("allmap");
var point = new BMapGL.Point(121.854516,29.700208);
map.centerAndZoom(point, 20);
var myIcon = new BMapGL.Icon("static/images/tubiao.png", new BMapGL.Size(108, 67));
var marker1 = new BMapGL.Marker(new BMapGL.Point(121.854516,29.700300));
marker1.setIcon(myIcon);
map.enableScrollWheelZoom(true); // 开启鼠标滚轮缩放
map.addOverlay(marker1);