var pagenum=10;
var http="http://172.17.146.156:8082/locationword/";
var arr=location.search.slice(1).split(";");//加载页面传来的参数

$(function(){
	loadinfo(0,pagenum,true);
	$(".send-btn").click(function(){
		$(".send").show();
	})
});
$(function(){
	var mes=$(".message-info").val();
	$(".clean-message").click(function(){
		$(".message-info").val("");
	})
	$(".send-message").click(function(){
		if($(".message-info").val().length!=0){
			$("tbody")[0].innerHTML = "";
			sendMessage($(".message-info").val(),arr[1],arr[0]);
			$(".message-info").val("");
			$(".send").hide();
		}
	})
	$(".close").click(function(){
		$(".send").hide();
	})
})
//发送推送
var sendMessage=function(con,id,name){
	var u=http+"JPush/pushContent";
	$.ajax({
			url : u ,
			type : "POST",
			dataType:"json",
			data:{
				content:con,
				sendId:id,
				sendName:name
			},
			dataType : "json",//返回的数据类型
			success : function(data) {
				console.log(data);			
				loadinfo(0,pagenum,true);
				 
			},
			error : function() {
				alert("查询失败！");
			}
});
}	
//加载表格数据
var loadinfo=function(a,b,flag){
	var u=http+"JPush/getPushHistory"
	$.ajax({
			url : u ,
			type : "GET",
			//contentType:"application/x-www-form-urlencoded",	
			dataType:"json",
			data:{
				adminId:7
			},
			//dataType : "json",//返回的数据类型
			success : function(data) {
				//console.log(data.length);
				var item;
				if(flag) init(Math.ceil(data.length/10));
				$.each(data,function(i,result){
					if(i>=a&&i<b){	
						item='<tr><td>'+result.messageId+"</td><td>"+result.sendName+"</td><td>"+result.sedId+"</td><td>"+result.content+"</td><td>"+result.time+"</td></tr>";
						$('tbody').append(item);
					}
				}); 
			},
			error : function() {

				alert("查询失败！");

			}
});
}
