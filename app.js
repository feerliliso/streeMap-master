var map; //创建一个变量
var marker; //创建一个变量存储marker
var markers = []; //创建一个数组用来存放marker
var htmlContent = '';

function initMap() { //初始化地图
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 39.917694,
            lng: 116.398504
        }, //给出中心坐标
        zoom: 13 //给出精度
    });
    renderMarker(); //地图渲染
}

function select(places) { //筛选地点并生成需要现实的地点数组
    hideListings();
    locations = [];
    for(var i = 0; i < AllLocations.length; i++) {
        if(AllLocations[i].kind == places) {
            locations.push(AllLocations[i]);
        }
    }
    renderMarker();
    //showListings();
}

function renderMarker() { //渲染地图函数
    //select();
    var largeinfowindow = new google.maps.InfoWindow(); //设置信息窗口
    var bounds = new google.maps.LatLngBounds();
    for(var i = 0; i < locations.length; i++) {

        let position = locations[i].location;
        let title = locations[i].title;
        var marker = new google.maps.Marker({
            map: map,
            position: position,
            title: title,
            animation: google.maps.Animation.DROP,
            id: i
        });
        markers.push(marker);
        bounds.extend(marker.position);

        marker.addListener('click', function() {
          var self=this;
            $.ajax({
                    url: `http://api.map.baidu.com/geocoder/v2/?callback=renderReverse&location=${position.lat},${position.lng}&output=json&pois=1&ak=beFuxVorB63lhdLrdU5QzbgjNaKieLVl`,
                    dataType: "jsonp"
                })
                .done(function(data) {
                    add(data);
                    populateInfoWindow(self, largeinfowindow);

                })
                .fail(function(error) {
                    requestError();
                });



            // const img = `http://api.map.baidu.com/panorama/v2?ak=beFuxVorB63lhdLrdU5QzbgjNaKieLVl&location=${position.lng},${position.lat}`;
            // htmlContent = `<img src="${img}" alt="map">`;

            /*fetch(`http://api.map.baidu.com/geocoder/v2/?callback=renderReverse&location=${position.lat,position.lng}&output=json&pois=1&ak=beFuxVorB63lhdLrdU5QzbgjNaKieLVl&callback=showLocation`)
            .then(response => response.json())//异步部分，把取回的值转化成JSON.
            .then(add)
            .catch(err=>requestError());//错误处理*/
        });
    }
    map.fitBounds(bounds);
}

function populateInfoWindow(marker, infowindow) { //信息窗口函数

    if(infowindow.marker != marker) {
        infowindow.marker = marker;
        infowindow.setContent('<div>' + marker.title + '</div>' + '<div>' + htmlContent + '</div>');
        infowindow.open(map, marker);;
        marker.setAnimation(google.maps.Animation.BOUNCE);
        infowindow.addListener('closeclick', function() {
            infowindow.setMarker = null;
            this.marker.setAnimation(google.maps.Animation.DROP);
        });
    }
}

function hideListings() { //隐藏marker函数
    for(var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
    }
}


function add(data) {
   if(data) {
      htmlContent = `'<div>'${data.result.formatted_address}'</div>'`
    } else {
      htmlContent = '<div>具体地址</div>';
    }
}

function requestError() { //异步失败
    htmlContent = '<div>异步调试失败</div>';

}

function Error() {
  alert("谷歌地图调用失败");
}
