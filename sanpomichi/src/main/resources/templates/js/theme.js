const test = document.querySelector("#test");

function hello() {
	var temp_array = [];
	var distance_array = [];

	$.each(postList, function(index,value){
		temp_array.push([value.name, value.information]);
/*		var hos_lat = temp_array[index][0];
		var hos_lng = temp_array[index][1];
		distance_array.push([index, calcDistance(lat, lng, hos_lat, hos_lng)]);*/
	});
	
	/*distance_array.sort(function (a,b){ return a[1] - b[1] });*/

	temp_array.forEach(element => {
		console.log(element);
	})
	write1(hospList[distance_array[0][0]]);/*
	write2(hospList[distance_array[1][0]]);
	write3(hospList[distance_array[2][0]]);*/
}

function init() {
	hello();
	test.innerHTML = "Hello World!";
}

window.addEventListener("load", init);
/*
const hos1 = document.querySelector(".card1"),
    hos1_name = hos1.querySelector(".card-title1"),
    hos1_addr = hos1.querySelector(".card-addr1"),
    hos1_img = hos1.querySelector(".img1"),
    hos1_web = hos1.querySelector(".web1"),
    hos1_phone = hos1.querySelector(".phone1");

const hos2 = document.querySelector(".card2"),
    hos2_name = hos2.querySelector(".card-title2"),
    hos2_addr = hos2.querySelector(".card-addr2"),
    hos2_img = hos2.querySelector(".img2"),
    hos2_web = hos2.querySelector(".web2"),
    hos2_phone = hos2.querySelector(".phone2");

const hos3 = document.querySelector(".card3"),
    hos3_name = hos3.querySelector(".card-title3"),
    hos3_addr = hos3.querySelector(".card-addr3"),
    hos3_img = hos3.querySelector(".img3"),
    hos3_web = hos3.querySelector(".web3"),
    hos3_phone = hos3.querySelector(".phone3");

function init()
{
    window.navigator.geolocation.getCurrentPosition(current_position);
}
 
function current_position(position)
{
    user_lat = position.coords.latitude;
    user_lng = position.coords.longitude;
    
    loop(user_lat, user_lng);
}
 
function write1(obj) {
    hos1_name.innerText = obj.hospitalName;
    hos1_addr.innerText = obj.hospitalAddr;
    if (obj.hospitalImg === 'http://www.hospitalmaps.or.kr/hm/images/images_kor/img_nophoto_s.gif') {
        hos1_img.src = '../img/health.png';
    } else {
        hos1_img.src = obj.hospitalImg;
    }
    if (obj.hospitalWeb === '-') {
    	hos1_web.innerText = obj.hospitalWeb;
    } else {
    	hos1_web.innerText = obj.hospitalWeb;
        hos1_web.href = obj.hospitalWeb;
    }
    hos1_phone.innerText = obj.hospitalPhone;
}

function write2(obj) {
    hos2_name.innerText = obj.hospitalName;
    hos2_addr.innerText = obj.hospitalAddr;
    if (obj.hospitalImg === 'http://www.hospitalmaps.or.kr/hm/images/images_kor/img_nophoto_s.gif') {
        hos2_img.src = '../img/health.png';
    } else {
        hos2_img.src = obj.hospitalImg;
    }
    if (obj.hospitalWeb === '-') {
    	hos2_web.innerText = obj.hospitalWeb;
    } else {
    	hos2_web.innerText = obj.hospitalWeb;
        hos2_web.href = obj.hospitalWeb;
    }
    hos2_phone.innerText = obj.hospitalPhone;
}

function write3(obj) {
    hos3_name.innerText = obj.hospitalName;
    hos3_addr.innerText = obj.hospitalAddr;
    if (obj.hospitalImg === 'http://www.hospitalmaps.or.kr/hm/images/images_kor/img_nophoto_s.gif') {
        hos3_img.src = '../img/health.png';
    } else {
        hos3_img.src = obj.hospitalImg;
    }
    if (obj.hospitalWeb === '-') {
    	hos3_web.innerText = obj.hospitalWeb;
    } else {
    	hos3_web.innerText = obj.hospitalWeb;
        hos3_web.href = obj.hospitalWeb;
    }
    hos3_phone.innerText = obj.hospitalPhone;
}

function loop(lat, lng) {
	var temp_array = [];
	var distance_array = [];

	$.each(hospList, function(index,value){
		temp_array.push([value.hospitalLatitude, value.hospitalLongitude]);
		var hos_lat = temp_array[index][0];
		var hos_lng = temp_array[index][1];
		distance_array.push([index, calcDistance(lat, lng, hos_lat, hos_lng)]);
	});
	
	distance_array.sort(function (a,b){ return a[1] - b[1] });

	write1(hospList[distance_array[0][0]]);
	write2(hospList[distance_array[1][0]]);
	write3(hospList[distance_array[2][0]]);
}

function calcDistance(lat1, lng1, lat2, lng2)
{
  var theta = lng1 - lng2;
  dist = Math.sin(deg2rad(lat1)) * Math.sin(deg2rad(lat2)) + Math.cos(deg2rad(lat1))
        * Math.cos(deg2rad(lat2)) * Math.cos(deg2rad(theta));
  dist = Math.acos(dist);
  dist = rad2deg(dist);
  dist = dist * 60 * 1.1515;
  dist = dist * 1.609344;
  return Number(dist*1000).toFixed(2);
}

function deg2rad(deg) {
  return (deg * Math.PI / 180);
}
function rad2deg(rad) {
  return (rad * 180 / Math.PI);
}


window.addEventListener("load", init);*/