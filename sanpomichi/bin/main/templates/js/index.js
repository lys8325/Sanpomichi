$(document).ready(function(){
	$('#showTable').dataTable( { "autoWidth": false ,
		searching: false,
		lengthChange: false,
		ordering : false,
		info:false
		} );
});

$('#plus').on('click',function(){
	getView('map')
})