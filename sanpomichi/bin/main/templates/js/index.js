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