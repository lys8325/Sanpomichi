const nightViewKeyword = ['야경', '밤길', '보름달'];
const dateKeyword = ['데이트', '커플', '부부'];
const parkKeyword = ['공원', '산책', '호수'];
const riverKeyword = ['한강', '탄천', '중랑천'];
const hikingKeyword = ['등산', '하이킹', '둘레길'];

const nightViewTab = document.querySelector("#nightView");
const dateTab = document.querySelector("#date");
const parkTab = document.querySelector("#park");
const riverTab = document.querySelector("#river");
const hikingTab = document.querySelector("#hiking");

let nightViewArray = [];
let dateArray = [];
let parkArray = [];
let riverArray = [];
let hikingArray = [];

function sorting() {
	postLength = postList.length;
	
	for (let i = 0; i < postLength; i++) {
		arrayLength = postList[i].keyword.length;
		
		for (let j = 0; j < arrayLength; j++) {
			console.log(postList[i].keyword[j]);
			if (nightViewKeyword.includes(postList[i].keyword[j])) {
				nightViewArray.push(postList[i]);
			}
			if (dateKeyword.includes(postList[i].keyword[j])) {
				dateArray.push(postList[i]);
			}
			if (parkKeyword.includes(postList[i].keyword[j])) {
				parkArray.push(postList[i]);
			}
			if (riverKeyword.includes(postList[i].keyword[j])) {
				riverArray.push(postList[i]);
			}
			if (hikingKeyword.includes(postList[i].keyword[j])) {
				hikingArray.push(postList[i]);
			}
		}
	}
}

function print() {
	for (let i = 0; i < nightViewArray.length; i++) {
		let div = document.createElement('div');
		div.onclick = function() { toLoad_map(nightViewArray[i].route_id) };
		div.innerHTML = `<p>산책 루트 이름 : ${nightViewArray[i].name}</p><p>산책 루트 정보 : ${nightViewArray[i].information}</p>`;
		div.setAttribute('style', 'border: 1px black solid; margin: 5px 0; padding: 10px;')
	  	nightViewTab.append(div);
	}
	for (let i = 0; i < dateArray.length; i++) {
		let div = document.createElement('div');
		div.onclick = function() { toLoad_map(dateArray[i].route_id) };
		div.innerHTML = `<p>산책 루트 이름 : ${dateArray[i].name}</p><p>산책 루트 정보 : ${dateArray[i].information}</p>`;
		div.setAttribute('style', 'border: 1px black solid; margin: 5px 0; padding: 10px;')
	  	dateTab.append(div);
	}
	for (let i = 0; i < parkArray.length; i++) {
		let div = document.createElement('div');
		div.onclick = function() { toLoad_map(parkArray[i].route_id) };
		div.innerHTML = `<p>산책 루트 이름 : ${parkArray[i].name}</p><p>산책 루트 정보 : ${parkArray[i].information}</p>`;
		div.setAttribute('style', 'border: 1px black solid; margin: 5px 0; padding: 10px;')
	  	parkTab.append(div);
	}
	for (let i = 0; i < riverArray.length; i++) {
		let div = document.createElement('div');
		div.onclick = function() { toLoad_map(riverArray[i].route_id) };
		div.innerHTML = `<p>산책 루트 이름 : ${riverArray[i].name}</p><p>산책 루트 정보 : ${riverArray[i].information}</p>`;
		div.setAttribute('style', 'border: 1px black solid; margin: 5px 0; padding: 10px;')
	  	riverTab.append(div);
	}
	for (let i = 0; i < hikingArray.length; i++) {
		let div = document.createElement('div');
		div.onclick = function() { toLoad_map(hikingArray[i].route_id) };
		div.innerHTML = `<p>산책 루트 이름 : ${hikingArray[i].name}</p><p>산책 루트 정보 : ${hikingArray[i].information}</p>`;
		div.setAttribute('style', 'border: 1px black solid; margin: 5px 0; padding: 10px;')
	  	hikingTab.append(div);
	}
}

function init() {
	sorting();
	print();
}

window.addEventListener("load", init);