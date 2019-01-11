var pagenum=10;
var http="http://172.17.146.156:8082/locationword/";
var arr=location.search.slice(1).split(";");//加载页面传来的参数
//翻页按钮
$(function(){
	loadinfo(0,pagenum,true);

});


//加载表格数据
var loadinfo=function(a,b,flag){
	var u=http+"Manager/getGroups";
	console.log(arr);	
	$.ajax({
			url:u,
			type : "GET",
			//contentType:"application/x-www-form-urlencoded",	
			dataType:"json",
			data:{
				adminId:arr[1]
			},
			//dataType : "json",//返回的数据类型
			success : function(data) {
				var item;
				var item2;
				if(flag) init(Math.ceil(data.length/10));
				$.each(data,function(i,result){
					if(i>=a&&i<b){	//后台不做处理，做成默认头像	
//						if(result.GroupImage=="null"||result.GroupImage==""){
							item2="<img src='../img/logo.png' width='20px' heigh='20px'/></td><td>"+result.GroupMan+"</td><td>"+result.GroupManPhone+"</td><td>"+result.isBreak+"</td></tr>";	
//						}else{
//							item2="<img src='"+http+result.GroupImage+"' width='20px' heigh='20px'/></td><td>"+result.GroupMan+"</td><td>"+result.GroupManPhone+"</td><td>"+result.isBreak+"</td></tr>";
//						}
							
						item='<tr><td><input type="checkbox" class="one" onclick="check(this)" /></td><td class="groupID">'+result.GroupId+"</td><td>"+result.GroupName+"</td><td>"+result.GroupDisctribe+"</td><td class='groupImage'>";
//						$('tbody').append(item+item2);
						ReactDOM.render( <span>2333</span>,$('tbody'));
					}
				}); 
			},
			error : function() {
				alert("查询失败！");
			}
	});
}

//搜索按钮
$(function(){
	$(".btn-search").click(function(){
		if($(".search-name").val()!=""){
			$("tbody")[0].innerHTML= "";
			searchGroup();
		}
			
	})
	$(".search-name").keydown(function(event){
		if(event.keyCode == 13){
		if($(".search-name").val()!=""){
			$("tbody")[0].innerHTML= "";
			searchGroup();
		}
		}
	});
})
//搜索功能
var searchGroup=function(){	
	var u=http+"Manager/getGroups"
	var searchName=$(".search-name").val();
	$.ajax({
//			url : 'http://172.17.144.25:8082/locationword/Manager/getGroups',
			url:u,
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
				lastest=data.length;
				$.each(data,function(i,result){
					if(searchName==result.GroupName){						
						item='<tr style><td><input type="checkbox" class="one" /></td><td>'+result.GroupId+"</td><td>"+result.GroupName+"</td><td>"+result.GroupDisctribe+"</td><td>"+result.GroupImage+"</td><td>"+result.GroupMan;
						item2="</td><td>"+result.GroupManPhone+"</td><td>"+result.isBreak+"</td></tr>";
						$('tbody').append(item+item2);
						//alert("desfds");
					}
				}); 
			},
			error : function() {
				alert("查询失败！");
			}
	});
}
//封群
$(function(){
	$(".set-black").click(function(){
		var checkItems=$(".one");
		var checkUserID=$(".groupID");
		var itemArray=new Array();　
		var flag;
		for (var i=0;i<checkItems.length;i++){
			if(checkItems[i].checked){	
				itemArray.push(parseInt(checkUserID[i].innerText));
				flag=true;				
			}
		}
		if(flag){
			$(".promt-contain").val("确定加入黑名单群组?");
			$(".promt").show();
			$(".sure").click(function(){
				$(".promt").hide();
				setGroupBlack("["+itemArray+"]");
			});
			$(".cancle").click(function(){
				$(".promt").hide();
			});
			flag=false;
		}
			
		
	})
})
var setGroupBlack=function(items){
	var u=http+"Manager/addGroupBreak"
	$.ajax({
				url:u,
				type: 'post',
				contentType:"application/x-www-form-urlencoded",
				data: {
					GroupArray:items
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
				}

		});
}
//解封
$(function(){
	$(".cancle-black").click(function(){
		var checkItems=$(".one");
		var checkUserID=$(".groupID");
		var itemArray=new Array();　
		var flag;
		for (var i=0;i<checkItems.length;i++){
			if(checkItems[i].checked){	
				itemArray.push(parseInt(checkUserID[i].innerText));
				flag=true;
			}
		}
		if(flag){
			$(".promt-contain").val("确定解除黑名单群组?");
			$(".promt").show();
			$(".sure").click(function(){
				$(".promt").hide();
				cancleGroupBlack("["+itemArray+"]");
			});
			$(".cancle").click(function(){
				$(".promt-contain").remove();
				$(".promt").hide();
			});
			flag=false;
		}	
	})
})
var cancleGroupBlack=function(items){
	var u=http+"Manager/removeGroupBreak";
	$.ajax({
				url:u,
				type: 'post',
				contentType:"application/x-www-form-urlencoded",
				data: {
					GroupArray:items
				},
				success:function(data){
					if(data.message='修改成功'){
						alert("已成功加入解群");
						$("tbody")[0].innerHTML = "";
						loadinfo(0,10,true);
						$(".all").attr("checked",false);
					}else{
					}
				}, 
				error:function(data){
				}

		});
}
