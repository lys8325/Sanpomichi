var polyline;
var marker_;
var marker_cur;
var loc_ = [];
/* 최초 맵 중심 */



var map = new naver.maps.Map('map', {
	
    center: new naver.maps.LatLng(37.5666805, 126.9784147),
    zoom: 17,
    mapTypeId: naver.maps.MapTypeId.NORMAL
});

var $window = $(window);

function getMapSize() {
    var size = new naver.maps.Size($window.width() - 15, $window.height() - 15);

    return size;
};

$window.on('resize', function() {
    map.setSize(getMapSize());
});



// 좌표 수집용 메소드
function onSuccessGeolocation(position) {
	
	
    var location = new naver.maps.LatLng(position.coords.latitude,
                                         position.coords.longitude);
    
    loc_.push(location);
    /*
    marker_ = new naver.maps.Marker({
        position: location,
        map: map
    });
    */
}

function onErrorGeolocation() {
    var center = map.getCenter();
}


// 현재 좌표 지정용 메소드
function onSuccessGeolocation_cur(position) {
	
	
    var location = new naver.maps.LatLng(position.coords.latitude,
                                         position.coords.longitude);
    var markerOptions = {
    		position: location,
            map: map,
           
    	};
    
    marker_cur = new naver.maps.Marker(markerOptions);
    map.setCenter(location); // 얻은 좌표를 지도의 중심으로 설정합니다.
    map.setZoom(17); // 지도의 줌 레벨을 변경합니다.
    
}

function onErrorGeolocation_cur() {
    var center = map.getCenter();
}

$(window).on("load", function() {
    if (navigator.geolocation) {
        /**
         * navigator.geolocation 은 Chrome 50 버젼 이후로 HTTP 환경에서 사용이 Deprecate 되어 HTTPS 환경에서만 사용 가능 합니다.
         * http://localhost 에서는 사용이 가능하며, 테스트 목적으로, Chrome 의 바로가기를 만들어서 아래와 같이 설정하면 접속은 가능합니다.
         * chrome.exe --unsafely-treat-insecure-origin-as-secure="http://example.com"
         */
        navigator.geolocation.getCurrentPosition(onSuccessGeolocation_cur, onErrorGeolocation_cur);
    } else {
        var center = map.getCenter();
        infowindow.setContent('<div style="padding:20px;"><h5 style="margin-bottom:5px;color:#f00;">Geolocation not supported</h5></div>');
        infowindow.open(map, center);
    }
});



/**
 * 맵 클릭 시 좌표 추가 
 * 
 * **/
	var markerList = [];
    var menuLayer = $('<div style="position:absolute;z-index:10000;background-color:#fff;border:solid 1px #333;padding:10px;display:none;"></div>');

    map.getPanes().floatPane.appendChild(menuLayer[0]);
    naver.maps.Event.addListener(map, 'click', function(e) {
        var marker = new naver.maps.Marker({
            position: e.coord,
            map: map
        });
        alert(marker.position);
        markerList.push(marker);
        naver.maps.Event.addListener(marker, "click", function(e) {
        	 marker.setMap(null);
        	 path = [];
        		for (var i=0, ii=markerList.length; i<ii; i++) {
        		   var position = new naver.maps.LatLng(markerList[i].position);
        		   path.push(position);
        		}
        		
    	});
       
    });
    
    
//1초마다 위치 갱신 트래킹 구현 
playAlert = setInterval(function() {
	
	navigator.geolocation.getCurrentPosition(onSuccessGeolocation, onErrorGeolocation);
	
}, 60000);

//1초마다 위치 갱신 트래킹 구현 
playCur = setInterval(function() {
	
	marker_cur.setMap(null);
	marker_cur = null;
	navigator.geolocation.getCurrentPosition(onSuccessGeolocation_cur, onErrorGeolocation_cur);
	
}, 5000);
  
    
    
$('#complete').on('click',function(){
	
	 path = [];
  	for (var i=0, ii=markerList.length; i<ii; i++) {
  	   var position = new naver.maps.LatLng(markerList[i].position);
  	   path.push(position);
  	}
  	
  	var data_list = [];
  	for(var i = 0, ii =loc_.length; i < ii; i++)
  		{
  			var data = {
  					name : 'hi',
  					y : loc_[i].y,
  					x : loc_[i].x
  			};
  			data_list.push(data);
  		}
  	
  	console.log(data_list);
  	
  	 $.ajax({
         url: '/saveLocation',
		traditional:true,
         type: "POST",
         xhrFields: {
  	        withCredentials: true
  	    },
         data: JSON.stringify(data_list),
         dataType : "text",
         contentType: 'application/json',
         success: function(data){
         },
         error:function(request, error) {
 			alert("fail");
 		}
     });
  	
  	
  	clearInterval(playAlert);
  	clearInterval(playCur);
	
	polyline = new naver.maps.Polyline({
	    map: map,
	    path:data_list,
	    clickable: true,
	    strokeColor: '#5347AA',
	    strokeStyle: 'long',
	    strokeOpacity: 1,
	    strokeWeight: 5
	});

	
});