var targetId;

function signUp()
{
	$('#validselUserId1').hide();
	$('#validselUserId2').hide();
	$('#validselUserId3').hide();
	$('#validselUserPwd1').hide();
	$('#validselUserPwd2').hide();
	$('#validselUserPwd3').hide();
	$('#validselUserPwd4').hide();
	$('#validselUserNm1').hide();
	$('#validselUserNm2').hide();
	$('#validselUserNm3').hide();
	$('#validselUserFind').hide();
	$('#validselUserEmail1').hide();
	$('#validselUserEmail2').hide();
	
	var userId = $('#selUserId').val();
	var userPwd = $('#selUserPwd').val();
	var userPwd2 = $('#selUserPwd2').val();
	var userName = $('#selUserNm').val();
	var userFind = $('#selUserFind').val();
	var userEmail = $('#selUserEmail').val();
	
	var isValid = true;
	
	if(userId == "" || !idCheck(userId))
	{
		isValid = false;
		
		if(userId == "")
		{
			$('#validselUserId1').show();
		}
		
		else if(!idCheck(userId))
		{
			$('#validselUserId2').show();
		}
		
	}
	if(userPwd =="" || !passwordCheck(userPwd))
	{
		isValid = false;
		
		if(userPwd == "")
		{
			$('#validselUserPwd1').show();
		}
		
		else if(!passwordCheck(userPwd))
		{
			$('#validselUserPwd2').show();
		}	

	}
	
	if(userPwd2 =="" || userPwd != userPwd2 )
	{
		isValid = false;
		
		if(userPwd2 == "")
		{
			$('#validselUserPwd4').show();
		}
		
		else 
		{
			$('#validselUserPwd3').show();
		}	

	}
	
	if ( userFind == "" || !findCheck(userFind)){
		isValid = false;
		$('#validselUserFind').show();
	}
	
	if(userName == "" || !nickNameCheck(userName))
	{
		isValid = false;
		
		if(userName == "")
		{
			$('#validselUserNm1').show();
		}
		
		else if(!nickNameCheck(userName))
		{
			$('#validselUserNm2').show();
		}
	
	}
	if(userEmail == "" || !emailCheck(userEmail))
	{
		isValid = false;
		$('#validselUserEmail2').show();
	}
	
	if(isValid)
	{
		
	var data ={
			userId : userId,
			userPwd : userPwd,
			userName : userName,
			userFind : userFind,
			userEmail : userEmail
	};
	
	console.log(data);
	
	$.ajax({
        url: 'signUp',
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json',
	    xhrFields: {
	        withCredentials: true
	    },
    	success: function(response) {
    		console.log(response);
    		if(response == 1)
    		{
    			$('#modalClose').click();
    			}
    		else if(response == 2)
    		{
    			$('#validselUserId3').show();
    			}
    		else if(response == 3){
    			$('#validselUserNm3').show();
    		}
    		else if(response == 5){
    			$('#validselUserId3').show();
    			$('#validselUserNm3').show();
    		}
    		else{
    			alert('에러가 발생했습니다.');
    		}
        },
        failure: function( response ) {
     	   alert('fail');
        }
	});
	}
}

function findPwd()
{
	$('#validfUserId1').hide();
	$('#validfUserId2').hide();
	$('#validfUserFind').hide();
	
	
	var userId = $('#fUserId').val();
	var userFind = $('#fUserFind').val();
	
	var isValid = true;
	
	if(userId == "" || !idCheck(userId))
	{
		isValid = false;
		
		if(userId == "")
		{
			$('#validfUserId1').show();
		}
		
		else if(!idCheck(userId))
		{
			$('#validfUserId2').show();
		}
		
	}
	
	if ( userFind == "" || !findCheck(userFind)){
		isValid = false;
		$('#validfUserFind').show();
	}
	
	if(isValid)
	{
		
	var data ={
			userId : userId,
			userFind : userFind
	};
	
	console.log(data);
	
	$.ajax({
        url: 'findPwd',
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json',
	    xhrFields: {
	        withCredentials: true
	    },
    	success: function(response) {
    		console.log(response);
    		if(response == 1)
    		{
    			alert("Password Query is not correct")
    			}
    		else if(response == 2)
    		{
    			alert("There is no such ID")
    			}
    		else{
    			alert("Enter the new Password");
    			targetId = userId
    			$('#findUserModal').modal('hide');
    			$('#changePwdModal').modal('show');
    		}
        },
        failure: function( response ) {
     	   alert('fail');
        }
	});
	}
}

function changePwd()
{
	$('#validselNewPwd1').hide();
	$('#validselNewPwd2').hide();
	$('#validselNewPwd3').hide();
	$('#validselNewPwd4').hide();
	
	var newPwd = $('#newPwd').val();
	var newPwd2 = $('#newPwd2').val();
	
	var isValid = true;
	
	if(newPwd =="" || !passwordCheck(newPwd))
	{
		isValid = false;
		
		if(newPwd == "")
		{
			$('#validselNewPwd1').show();
		}
		
		else if(!passwordCheck(newPwd))
		{
			$('#validselNewPwd2').show();
		}	

	}
	
	if(newPwd2 =="" || newPwd != newPwd2 )
	{
		isValid = false;
		
		if(newPwd2 == "")
		{
			$('#validselNewPwd4').show();
		}
		
		else 
		{
			$('#validselNewPwd3').show();
		}	

	}
	
	if(isValid)
	{
		
	var data ={
			userId : targetId,
			userPwd : newPwd
	};
	
	console.log(data);
	
	$.ajax({
        url: 'changePwd',
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json',
	    xhrFields: {
	        withCredentials: true
	    },
    	success: function(response) {
    		console.log(response);
    		alert('Password has been changed successfully.');
    		$('#changePwdModal').modal('hide');
        },
        failure: function( response ) {
     	   alert('fail');
        }
	});
	}
}



function signIn()
{
	$('#validinputEmail').hide();
	$('#validinputPassword').hide();
	
	var userId = $('#inputEmail').val();
	var userPwd = $('#inputPassword').val();
	
	
	if(userId == "" || userPwd == "")
	{
		if(userId == "")
		{
			$('#validinputEmail').show();
		}
		
		if(userPwd == "")
		{
			$('#validinputPassword').show();
		}
	}
	else
	{
		
	
	var data ={
			userId : userId,
			userPwd : userPwd,
	};
	
	console.log(data);
	
	$.ajax({
        url: 'signIn',
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json',
	    xhrFields: {
	        withCredentials: true
	    },
    	success: function(response) {
    		console.log(response);
    		if(response == 1)
    		{
    			getView('');
    			
    		}
    		else if(response == 2)
    		{
    			alert('Wrong Password');
    		}
    		else{
    			alert('There Is No ID');
    		}
    		
    		
        },
        failure: function( response ) {
     	   alert('fail');
        }
	});
	}

}
function idCheck(x)
{
        var reg = /^[a-z0-9]{6,14}$/;
        return reg.test(x);
}

function passwordCheck(x)
{
	var reg = /^[a-zA-Z0-9\{\}\[\]\/?.,;:|\)*~`!^\-+<>@\#$%&\\\=\(\'\"]{6,14}$/;
    return reg.test(x);
}

function nickNameCheck(x)
{
        var reg = /^[a-zA-Z0-9]{1,14}$/;
        return reg.test(x);
}

function findCheck(x)
{
        var reg = /^[0-9]{11,11}$/;
        return reg.test(x);
}

function emailCheck(email) {
    var reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return reg.test(email);
}

function clickEnter(){
	if(window.event.keyCode == 13){
		signIn();
	}
}