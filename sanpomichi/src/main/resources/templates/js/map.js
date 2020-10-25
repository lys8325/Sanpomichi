var polyline;
var marker_;
var marker_cur;
var loc_ = [];
var interval = 3000;
var r_id;
var r_len;
//start 클릭 체크용
var flag = 0;
/* 최초 맵 중심 */


$('#complete').hide();
$('[name=description_complete]').hide();

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
/*
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
*/  
    
//1초마다 위치 갱신 트래킹 구현 
playAlert = setInterval(function() {
	
	navigator.geolocation.getCurrentPosition(onSuccessGeolocation, onErrorGeolocation);
	
}, interval);

//1초마다 위치 갱신 트래킹 구현 
playCur = setInterval(function() {
	
	marker_cur.setMap(null);
	marker_cur = null;
	navigator.geolocation.getCurrentPosition(onSuccessGeolocation_cur, onErrorGeolocation_cur);
	
}, 5000);
  
$('#start').on('click',function()
{
	if(flag == 0)
	{
		flag = 1;
		loc_ = [];
		$('#start').hide();
		$('[name=description_start]').hide();
		$('#complete').show();
		$('[name=description_complete]').show();
	}
	else
	{
		alert("이미 진행중입니다.");
	}
	
});

    
$('#complete').on('click',function(){
	
	if(flag == 0)
	{
		alert("start 버튼을 클릭해주세요.");
	}
	else{
		flag = 0;
		$('#createRoute').modal('show');
		path = [];
	  	for (var i=0, ii=markerList.length; i<ii; i++) {
	  	   var position = new naver.maps.LatLng(markerList[i].position);
	  	   path.push(position);
	  	}
	  	
	  	var data_list = [];
	  	var x_list = [];
	  	var y_list = [];
	  	for(var i = 0, ii =loc_.length; i < ii; i++)
	  		{
	  			var data = {
	  					name : $('#routeName').val(),
	  					y : loc_[i].y,
	  					x : loc_[i].x
	  			};
	  			data_list.push(data);
	  			y_list.push(loc_[i].y);
	  			x_list.push(loc_[i].x);
	  		}
		var route = {
					y : y_list,
					x : x_list
		};
	  	
	  	console.log(data_list);
	  	r_len = (y_list.length * interval / 60000)+1|0;
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
	        	 r_id = data;
	         },
	         error:function(request, error) {
	 			alert("fail");
	 		}
	     });
	  	 
		 //clearInterval(playAlert);
		 //clearInterval(playCur);
		 
		 $('#start').show();
		 $('[name=description_start]').show();
		 $('#complete').hide();
		 $('[name=description_complete]').hide();
	}

});

function createRoute(){
	if($('#routeName').val() == "")
	{
		$('#validRouteName').show();
	}
	else
	{
		$('#validRouteName').hide();
		 
		var kwList = $('#routeKeyword').val().split(/[\#|,.;:!?\-\=\/~@ ]/);
		var kwCnt = 0;
		var keywordList = [];
		
		for(var i=0;i<kwList.length;++i){
			if(kwList[i] != ""){
				keywordList.push(kwList[i]);
				++kwCnt;
				if(kwCnt == 5){
					break;
				}
			}
		}
		
    	var post = {
    			name : $('#routeName').val(),
	  			route_id : r_id,
	  			keyword : keywordList,
	  			heart : 0,
	  			information : $('#routeInfo').val(),
	  			length : r_len,
	  			user_id : user_name
	  	 };
    	 console.log(post);
    	 $.ajax({
    		 url: '/savePost',
    		 traditional:true,
	         type: "POST",
	         xhrFields: {
	  	        withCredentials: true
	         },
	         data: JSON.stringify(post),
	         dataType : "text",
	         contentType: 'application/json',
	         success: function(data){
	        	 console.log(data);
	         },
	         error: function(request, error){
	        	 alert("fail");
	         }
    	 });
		         
		  	
	  	$('#createRoute').modal('hide');			
	}
}