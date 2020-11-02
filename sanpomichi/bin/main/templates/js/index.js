$(document).ready(function(){
	$('#showTable').dataTable( { "autoWidth": false ,
		searching: false,
		lengthChange: false,
		ordering : false,
		info:false
		} );
});

$('#plus_login').on('click',function(){
	getView('map')
})

function toLogin(){
	getView('login');
}

function toLoad_map(route_id){
	getView('load_map?route_id='+route_id);
}

const rank = document.querySelector("#rank-list");

function showRank() {
	let count = 1;
	route_array = [];
	
	$.each(postListAll, (index, value) => {
		route_array.push([index, value.heart]);
	});
	route_array.sort((a, b) => { return b[1] - a[1] });
	
	len = route_array.length > 10 ? 10 : route_array.length;
	
	for (let i = 0; i < len; i++) {
		let li = document.createElement('div');
		if (i === 0) {
			li.innerHTML = `🥇 ${postListAll[route_array[i][0]].information}`;
		} else if (i === 1) {
			li.innerHTML = `🥈 ${postListAll[route_array[i][0]].information}`;
		} else if (i === 2) {
			li.innerHTML = `🥉 ${postListAll[route_array[i][0]].information}`;
		} else {
			li.innerHTML = `${i + 1}위 ${postListAll[route_array[i][0]].information}`;
		}
		li.setAttribute('style', 'border: 1px black solid; margin: 3px 0; padding: 10px; margin-left: 35px;')
	  	rank.append(li);
		count++;
	}
}

function init() {
	showRank();
}

window.addEventListener("load", init);