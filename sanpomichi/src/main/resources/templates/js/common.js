var HEALRO_REST_POST_URL = setRestUrl(); 

$( document ).ready(function() {
  
});

function setRestUrl(){
	var wholeUrl = window.location.href;
	var url = "https://"+wholeUrl.split("/")[2];
	return url;
}

function getView(func){
	location.href = HEALRO_REST_POST_URL+"/"+func;
	
}

function logout(){
    getView('logout');
}