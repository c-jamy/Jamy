$(function(){
	history.go(1); 
	$(".captcha").focus(function(){
		$(".captcha").val("");
		$(".captcha").css("color","black");
	});
	
	$("#login-up").click(function(){
		validation();
	});
	
	$("#forget-pw").click(function(){
		//window.open("html/setPassword.html");
		window.location.href="html/setPassword.html";
	})
});
$(function(){
	$(".get-captcha").on("click",createCode);
	createCode();	
});
$(document).ready(function(){
	
});
var code;//定义一个全局验证码
var flag =true;
function createCode(){
	var selectChar = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9,'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z');//所有候选组成验证码的字符，也可以用中文的 
	code = '';
	var codeLength=5;
	var codeContent = $(".get-captcha");
	for(var i=0;i<codeLength;i++){
		var charIndex =Math.floor(Math.random()*selectChar.length);//随机数
		code +=selectChar[charIndex];//一张验证码有五个字符组成
		codeContent.html(code);//显示验证码
	}
}
function validation(){
	var Code = $(".captcha").val();
	if(Code.length <=0){
		$(".captcha").val("验证码为空!");
		$(".captcha").css("color","red");
	}else if(Code.toLowerCase()!=code.toLowerCase() && Code.length >0){
		//$(".captcha").val("");
		$(".captcha").css("color","red");
		$(".captcha").val("验证码有误!");
		createCode();//如果输入的验证码有误就刷新验证码 
	}
	else{
		check();
	}
}
		function check(){
				var n=$(".username").val();
				var p=$(".password").val();
				$.ajax({
				url: 'http://172.17.146.156:8082/locationword/Login/Mchecklogin',
				type: 'post',  
				contentType:"application/x-www-form-urlencoded",
				//async:false, 
				data: {
					username:n,
					password:p  
				},
				success:function(data){
					//var dataObj = JSON.parse(data);
					console.log(data);
					var m=jQuery.parseJSON(data);
					console.log(m.message);
					if(m.message=="登录成功"){
						window.location.href="html/common.html?"+n+";"+m.adminId;
					}else{
						$(".warning").val("");
						$(".warning").val("用户名或密码错误！");
					}
				}, 
				error:function(data){
					alert("查询失败！");
				}

		});
}
