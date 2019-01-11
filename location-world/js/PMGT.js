var pagenum=10;
var http="http://172.17.146.156:8082/locationword/";
var arr=location.search.slice(1).split(";");//加载页面传来的参数
$(function(){
	loadinfo(0,pagenum,true);
});
//加载表格数据
var loadinfo=function(a,b,flag){
	var u=http+"Manager/getUsers"
	$.ajax({
			asasync:false,//异步设置
			url : u ,
			type : "GET",
			//contentType:"application/x-www-form-urlencoded",	
			dataType:"json",
			data:{
				adminId:arr[1]
			},
			success : function(data) {
				var item;
				var item2;
				var breaker;			
				if(flag) init(Math.ceil(data.length/10));
				$.each(data,function(i,result){
					if(result.IsBreak==0){
						breaker="普通用户";
					}else{
						breaker="黑名单用户";
					}
					if(i>=a&&i<b){		
						item='<tr><td><input type="checkbox" class="one" onclick="check(this)"/></td><td  class="userID">'+result.UserId+"</td><td>"+result.UserPhone+"</td><td>"+result.NickName+"</td><td>"+result.RealName+"</td><td>"+result.Password;
//						if(result.UserAvarl=="null"||result.UserAvarl==""){
							item2="</td><td><img src='../img/logo.png' width='20px' heigh='20px'/></td><td>"+breaker+"</td></tr>";
//						}else{
//							console.log(result.UserAvarl);
//							item2="</td><td><img src='"+http+result.UserAvarl+"' width='20px' heigh='20px'/></td><td>"+breaker+"</td></tr>";
//						}
						
						$('tbody').append(item+item2);
					}
				}); 
			},
			error : function() {
				alert("查询失败！");
			}
});
}

//搜索
$(function(){
	$(".btn-search").click(function(){
		if($(".search-name").val()!=""){
			$("tbody")[0].innerHTML= "";
			searchUser();
		}
			
	})
	$(".search-name").keydown(function(event){
		if(event.keyCode == 13){
		if($(".search-name").val()!=""){
			$("tbody")[0].innerHTML= "";
			searchUser();
		}
		}
	});
});
var searchUser=function(){	
	var u=http+"Manager/getUsers";
	var searchName=$(".search-name").val();
	var arr=location.search.slice(1).split(";");//加载页面传来的参数
	$.ajax({
			url : u,
			type : "GET",
			//contentType:"application/x-www-form-urlencoded",	
			dataType:"json",
			data:{
				adminId:arr[1]
			},
			//dataType : "json",//返回的数据类型
			success : function(data) {
				//console.log(data.length);
				var item;
				var item2;
				$.each(data,function(i,result){
					if(searchName==result.RealName){						
						item='<tr><td><input type="checkbox" class="one"/></td><td class="userID">'+result.UserId+"</td><td>"+result.UserPhone+"</td><td>"+result.NickName+"</td><td>"+result.RealName+"</td><td>"+result.Password;
						item2="</td><td>"+result.UserAvarl+"</td><td>"+result.IsBreak+"</td></tr>";
						$('tbody').append(item+item2);
					}
				}); 
			},
			error : function() {
				alert("查询失败！");
			}
});
}
//加入黑名单
$(function(){
	$(".set-black").click(function(){
		var checkItems=$(".one");
		var checkUserID=$(".userID");
		var itemArray=new Array();　
		for (var i=0;i<checkItems.length;i++){
			if(checkItems[i].checked){	
				itemArray.push(parseInt(checkUserID[i].innerText));
			}
		}
		if(itemArray.length>0){
			$(".promt-contain").val("确定设置该用户为黑名单?");
			$(".promt").show();
			$(".sure").click(function(){
				$(".promt").hide();
				setUserBlack("["+itemArray+"]");
			});
			$(".cancle").click(function(){
				$(".promt").hide();
			});
		
		}
		
		
	})
})
var setUserBlack=function(items){
	var u=http+"Manager/addUserBreak";
	$.ajax({
				url: u,
				type: 'post',
				contentType:"application/x-www-form-urlencoded",
				data: {
					userArray:items
				},
				success:function(data){
					if(data.message='修改成功'){
						$("tbody")[0].innerHTML = "";
						loadinfo(0,10,true);
						$(".all").attr("checked",false);
					}else{
					}
				}, 
				error:function(data){
					alert("查询失败！");
				}

		});
}
//解除黑名单
$(function(){
	$(".cancle-black").click(function(){
		var checkItems=$(".one");
		var checkUserID=$(".userID");
		var itemArray=new Array();　
		for (var i=0;i<checkItems.length;i++){
			if(checkItems[i].checked){	
				itemArray.push(parseInt(checkUserID[i].innerText));
			}
		}
		if(itemArray.length>0){
			$(".promt-contain").val("确定取消该用户黑名单?");
			$(".promt").show();
			$(".sure").click(function(){
				$(".promt").hide();
				cancleUserBlack("["+itemArray+"]");
			});
			$(".cancle").click(function(){
				$(".promt").hide();
			});
		
		}
		
		
	})
})
var cancleUserBlack=function(items){
	var u=http+"Manager/removeUserBreak";
	$.ajax({
				url: u,
				type: 'post',
				contentType:"application/x-www-form-urlencoded",
				data: {
					userArray:items
				},
				success:function(data){
					if(data.message='修改成功'){
						$("tbody")[0].innerHTML = "";
						loadinfo(0,10,true);
						$(".all").attr("checked",false);
					}else{
					}
				}, 
				error:function(data){
					alert("查询失败！");
				}

	});
}

