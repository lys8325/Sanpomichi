var polyline;
var marker_;
var marker_cur;
var loc_ = [];

//start 클릭 체크용
var flag = 0;
/* 최초 맵 중심 */

var $window = $(window);
$(document).ready(function(){
	$('#showTable').dataTable( { "autoWidth": false ,
		searching: false,
		lengthChange: false,
		ordering : false,
		info:false
		} );
	
	
    var data_list = [];
    for(var i = 0, ii =x_list.length; i < ii; i++)
	{		
			var data = {
					y : y_list[i],
					x : x_list[i]
			};
			data_list.push(data);
			console.log(data);
	}
    
    var location = new naver.maps.LatLng(y_list[0],
    		x_list[0]);
    var end_location = new naver.maps.LatLng(y_list[y_list.length-1],
    		x_list[x_list.length-1]);
  
    
    var startMarkerOptions = new naver.maps.Circle({
        map: map,
        center: location,
        radius: 25,
        fillColor: 'red',
        fillOpacity: 1
    });
    
    var endMarkerOptions = new naver.maps.Circle({
        map: map,
        center: end_location,
        radius: 25,
        fillColor: 'black',
        fillOpacity: 1
    });
    var markerOptions = {
    		position: location,
    		map: map,
    		icon: {
    	        url: './img/pin_default.png',
    	        size: new naver.maps.Size(22, 35),
    	        origin: new naver.maps.Point(0, 0),
    	        anchor: new naver.maps.Point(11, 35)
    	    }
    };

    //marker_start = new naver.maps.Marker(startMarkerOptions);
    //marker_end = new naver.maps.Marker(endMarkerOptions);
    marker_cur = new naver.maps.Marker(markerOptions);
    map.setCenter(location); // 얻은 좌표를 지도의 중심으로 설정합니다.
    map.setZoom(17); // 지도의 줌 레벨을 변경합니다.
    
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
var map = new naver.maps.Map('map', {
	
    center: new naver.maps.LatLng(y_list[0], x_list[0]),
    zoom: 17,
    mapTypeId: naver.maps.MapTypeId.NORMAL
});


/*
naver.maps.Event.addListener(map, 'click', function(e){
	// 지도를 클릭하면 아래 내용이 실행됩니다.
	alert(e.coord.lat() + ', ' + e.coord.lng());
	// e 는 클릭시 넘어오는 이벤트 (네이밍은 원하는 대로 하셔도 됩니다)
	// e 에서 필요한 것을 꺼내서 쓰면 됩니다.
	// e.coord.lat() 는 위도 (Latitude)  보통 약어로 lat
	// e.coord.lng() 는 경도 (Longitude) 보퉁 약어로 lng
});
*/



// 현재 좌표 지정용 메소드
function onSuccessGeolocation_cur(position) {
	
	
    var location = new naver.maps.LatLng(position.coords.latitude,
                                         position.coords.longitude);
    var markerOptions = {
    		position: location,
            map: map,
            icon: {
    	        url: './img/pin_default.png',
    	        size: new naver.maps.Size(22, 35),
    	        origin: new naver.maps.Point(0, 0),
    	        anchor: new naver.maps.Point(11, 35)
    	    }
    	};
    
    marker_cur = new naver.maps.Marker(markerOptions);
    map.setCenter(location); // 얻은 좌표를 지도의 중심으로 설정합니다.
    map.setZoom(15); // 지도의 줌 레벨을 변경합니다.
    
}

function onErrorGeolocation_cur() {
    var center = map.getCenter();
}

/*
$(window).on("load", function() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(onSuccessGeolocation_cur, onErrorGeolocation_cur);
    } else {
        var center = map.getCenter();
        infowindow.setContent('<div style="padding:20px;"><h5 style="margin-bottom:5px;color:#f00;">Geolocation not supported</h5></div>');
        infowindow.open(map, center);
    }
});
*/


/**
 * 맵 클릭 시 좌표 추가 
 * 
 * **/

var markerList = [];
var menuLayer = $('<div style="position:absolute;z-index:10000;background-color:#fff;border:solid 1px #333;padding:10px;display:none;"></div>');


//5초마다 위치 갱신 트래킹 구현 
playCur = setInterval(function() {
	
	marker_cur.setMap(null);
	marker_cur = null;
	navigator.geolocation.getCurrentPosition(onSuccessGeolocation_cur, onErrorGeolocation_cur);
	
}, 3000);
  
$('#comment_button').on('click',function(){
	
	if(comment == null)
		{
			comment = new Array();
			comment.push($('#comment_input').val());
		}
	else
		{
		comment.push($('#comment_input').val());
		}
	
		var route = {
			id : id,
			x : x_list,
			y : y_list,
			comment : comment
		};
		
		$.ajax({
			 url: '/saveRoute',
			 traditional:true,
	        type: "POST",
	        xhrFields: {
	 	        withCredentials: true
	        },
	        data: JSON.stringify(route),
	        dataType : "text",
	        contentType: 'application/json',
	        success: function(data){
	        	$('#tbody').empty();
	        	$.each(comment, function(index, value){
	        		var html = "<tr>"+
	        				   "	<td style ='width : 800px'>" + value + "</td>" +
	        				   "</tr>";
	        		$('#tbody').append(html);
	        		
	        	});
	        	
	        },
	        error: function(request, error){
	       	 alert("fail");
	        }
		 });
		
	
})

    