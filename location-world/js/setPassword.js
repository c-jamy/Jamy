var time=60;
var Countdowm=function (){
	$(".send-captcha").on("click",function(){		
		var timeout=setInterval(function(){
			if(time>0){			
				time-=1;
				$(".send-captcha").val("倒数"+time+"秒");
			}else{
				clearInterval(timeout);
				$(".send-captcha").val("发送邮箱验证码");
				time=60;
			}
		},1000);
		if(time<=60){		
			$(".send-captcha").prop('disabled','disabled');
		}
//		var ajax=new Ajax();
//		var email=$(".email").val();
//		var url ="{:U('Public/email_code')}";
//		ajax.post(url,{email:email},function(data){
//          if(data!==false){
//              alert("发送成功"); 
//              $('#cf1').html('等待<s id="cf2">60</s>秒后可重发验证码!');
//          }else{
//              alert("发送失败");
//          }
//	});       
});
}

$(function(){
	$(".username").blur(function(){
		if($(".username").val().length==0){
			$(".warning").val("用户名不能为空！");
		}
		else{
			$(".warning").val("");
			$(".new-password1").blur(function(){
			var npl=$(".new-password1").val().length;
		//console.log(npl);
			if(npl<6||npl>12){			
				$(".warning").val("请输入6-12位的密码！");
			}
			else{
				$(".warning").val("");
				$(".new-password2").blur(function(){
					var np2=$(".new-password1").val();
					var np3=$(".new-password2").val();
					if(np3!=np2){
						$(".warning").val("两次密码不匹配!");
					}
					else{
						$(".warning").val("");
						$(".email").blur(function(){
							var email=$(".email").val();
							if(!email.match(/^[a-z0-9]+([._]*[a-z0-9]+)*@[a-z0-9]+([_.][a-z0-9]+)+$/gi)){
								$(".warning").val("请输入正确的邮箱！");
							}else{
								$(".warning").val("");
								$(".send-captcha").click(function(){
									check();
									Countdowm();
//									$(".captcha").blur(function(){
//										//console.log($(".captcha").val().length);
//										if($(".captcha").val().length!=0){
//											Countdowm();
//										}else{
//											$(".warning").val("请输入正确的验证码！");
//										}
//									})
								});
							}
						})
					}
				});
			}
		});
	}	
})	
});
//{"message":发送成功,"yzm":K12N}
var check=function(){
				var e=$(".email").val();
				$.ajax({
				url: 'http://172.17.146.156:8082/locationword/Login/sendEmailYzm' ,
				type: 'post',  
				contentType:"application/x-www-form-urlencoded",
				//async:false, 
				data: {
					email:e  
				},
				success:function(data){
					//var dataObj = JSON.parse(data);
					console.log(data);
					var m=jQuery.parseJSON(data);
					if(m.message=='发送成功'){
						$("#save-pw").click(function(){
							console.log(m.yzm.toLowerCase()+","+$(".captcha").val().toLowerCase());
							if(m.yzm.toLowerCase() ==$(".captcha").val().toLowerCase()){
								reset();
							}else{
								$(".warning").val("请输入正确的验证码！");
							}
						})
//						if(){	
//							
//							reset();
//						}
//						window.location.href="../html/common.html"
					}else if(m.message=="发送失败"){
						alert("发送失败");	
					}
				}, 
				error:function(data){
					alert("加载失败");
				}

		});
}

//修改密码
var reset=function(){
				var n=$(".username").val();
				var p=$(".password").val();
				$.ajax({
				url: 'http://172.17.146.156:8082/locationword/Login/MresetPassword',
				type: 'post',  
				contentType:"application/x-www-form-urlencoded",
				//async:false, 
				data: {
					username:n,
					newPassword:p  
				},
				success:function(data){
					console.log(data);
					var m=jQuery.parseJSON(data);
					if(m.message=='修改成功'){
						window.location.href="common.html?"+n+";"+m.userid;
					}else if(m.message=="账号不存在"){
						alert("账号不存在");	
					}
					//alert("ok");
				}, 
				error:function(data){
					alert("加载失败");
				}

		});
}

//取消返回登录页面
$(function(){
	$("#cancle-pw").click(function(){
		window.location.href="../index.html";
	})
})
	




