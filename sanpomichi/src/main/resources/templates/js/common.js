var HEALRO_REST_POST_URL = setRestUrl(); 

$( document ).ready(function() {
  
});

function setRestUrl(){
	var wholeUrl = window.location.href;
	var url = "http://"+wholeUrl.split("/")[2];
	return url;
}

function getView(func){
	location.href = HEALRO_REST_POST_URL+"/"+func;
	
}

function logout(){
    getView('logout');
}

$('#kw_search').on('click', function(){
	if($('#kw_list').val() == ""){
		alert("키워드를 입력해 주세요.");
		return;
	}
	var kwList = $('#kw_list').val().split(/[\#|,.;:!?\-\=\/~@ ]/);
	var kwCnt = 0;
	var keywordList = "";
	
	for(var i=0;i<kwList.length;++i){
		if(kwList[i] != ""){
			if(kwCnt == 0){
				keywordList += "\[\"";
			}else{
				keywordList += "\"";
			}
			keywordList += kwList[i];
			++kwCnt;
			if(kwCnt == 3 || kwCnt == kwList.length){
				keywordList += "\"\]";
				break;
			}else{
				keywordList += "\",";
			}
		}
	}
	
	console.log(keywordList);
	
	$.ajax({
		 url: '/kwSearch',
		 traditional:true,
        type: "POST",
        xhrFields: {
 	        withCredentials: true
        },
        data: JSON.stringify(keywordList),
        dataType : "text",
        contentType: 'application/json',
        success: function(data){
       	 	console.log(data);
        },
        error: function(request, error){
       	 alert("fail");
        }
	 });
});
