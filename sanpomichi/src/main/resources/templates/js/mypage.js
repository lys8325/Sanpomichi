var distance_array = [];
$(document).ready(function(){
	navigator.geolocation.getCurrentPosition(onSuccessGeolocation_cur, onErrorGeolocation_cur);

});



function onSuccessGeolocation_cur(position) {
    loop(position.coords.latitude, position.coords.longitude);
    
    var ans = [];
    $.each(distance_array, function(index1, value1){
    	$.each(postList,function(index2,value2){
    		if(routeList[distance_array[index1][0]].id == postList[index2].route_id)
    			{
    				ans.push(postList[index2]);
    				return false;
    			}
    	})
	});
    
    ans = ans.reverse();
    $('#tbody').empty();
	$.each(ans, function(index, value){
		var html = "<tr>"+
				   "	<td style ='width : 300px'>" + ans[index].route_id + "</td>" +
				   "	<td style ='width : 800px'>" + ans[index].name + "</td>" +
				   "	<td style ='width : 800px'>" + ans[index].heart + "</td>" +
				   "	<td><button class='btn btn-outline-secondary'  type='button' onclick='Go(" + ans[index].route_id + ")'>Go</button></td>" +
				   "</tr>";
		$('#tbody').append(html);
		
	});
}



function Go(idx)
{
	getView('load_map?route_id='+idx);
}


function onErrorGeolocation_cur() {
}

function loop(lat, lng) {
	var temp_array = [];
	distance_array = [];

	$.each(routeList, function(index,value){
		temp_array.push([value.x[0], value.y[0]]);
		var _lat = temp_array[index][0];
		var _lng = temp_array[index][1];
		distance_array.push([index, calcDistance(lat, lng, _lat, _lng)]);
	});
	
	distance_array.sort(function (a,b){ return a[1] - b[1] });

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