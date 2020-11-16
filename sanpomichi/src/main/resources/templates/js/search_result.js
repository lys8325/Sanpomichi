$('#plus_login').on('click',function(){
	getView('map')
})

function toLogin(){
	getView('login');
}

function toLoad_map(route_id){
	getView('load_map?route_id='+route_id);
}

let result_list;
const resultTab = document.querySelector("#result");

function search(){
	
	let url = decodeURI(window.location.href);
	let strList = url.split('=');
	let str = strList[1];
	console.log(str);
	if(str == ""){
		let div = document.createElement('div');
 		div.innerHTML = `<p>키워드를 입력해주세요.</p>`;
 		div.setAttribute('style', 'border: 1px black solid; margin: 5px 0; padding: 10px;')
 	  	resultTab.append(div);
	}else{
		var kwList = str.split('+');
		var kwCnt = 0;
		var keywordList = [];
		
		for(var i=0;i<kwList.length;++i){
			if(kwList[i] != ""){
				keywordList.push(kwList[i]);
				++kwCnt;
				if(kwCnt == 3 || kwCnt == kwList.length){
					break;
				}
			}
		}
		
		console.log(keywordList);
		
		$.ajax({
			 url: '/kwSearch',
			 traditional:true,
	        type: "post",
	        xhrFields: {
	 	        withCredentials: true
	        },
	        data: JSON.stringify(keywordList),
	        dataType : "text",
	        contentType: 'application/json',
	        success: function(data){
	       	 	result_list = JSON.parse(data);
	       	 	console.log(result_list);
	       	 	
	       	 	if(result_list.length == 0){
			       	 	let div = document.createElement('div');
			     		div.innerHTML = `<p>검색 결과가 없습니다.</p>`;
			     		div.setAttribute('style', 'border: 1px black solid; margin: 5px 0; padding: 10px;')
			     	  	resultTab.append(div);
	       	 		return;
	       	 	}
		       	
		       	for (let i = 0; i < result_list.length; i++) {
		       		console.log(result_list[i].route_id);
		     		let div = document.createElement('div');
		     		div.innerHTML = `<p>산책 루트 이름 : ${result_list[i].name}</p> <p>소요 시간 : ${result_list[i].length}분</p> <p>산책 루트 정보 : ${result_list[i].information}</p>`;
		     		div.setAttribute('style', 'border: 1px black solid; margin: 5px 0; padding: 10px;')
		     	  	resultTab.append(div);
		     	}
		       	
	        },
	        error: function(request, error){
	       	 alert("fail");
	        }
		 });
	}
}

function init() {
	search();
}

window.addEventListener("load", init);