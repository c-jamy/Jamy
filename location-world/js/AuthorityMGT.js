var pagenum=10;
var http="http://172.17.146.156:8082/locationword/";
var arr=location.search.slice(1).split(";");//加载页面传来的参数
$(function(){
	loadinfo(0,pagenum,true);
});
//加载表格数据
var loadinfo=function(a,b,flag){
	var u=http+"Manager/getAdmins";
	var arr=location.search.slice(1).split(";");//加载页面传来的参数
	$.ajax({
			url : u ,
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
				if(flag) init(Math.ceil(data.length/10));
				$.each(data,function(i,result){
					if(i>=a&&i<b){						
						item='<tr><td><input type="checkbox" class="one" onclick="check(this)" /></td><td class="adminID">'+result.AdminId+"</td><td>"+result.AdminUsername+"</td><td>"+result.AdminUserPassword+"</td><td>"+result.AdminPhone;
						item2="</td><td>"+result.AdminTime+"</td></tr>";
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
			searchAdmin();
		}
			
	})
	$(".search-name").keydown(function(event){
		if(event.keyCode == 13){
		if($(".search-name").val()!=""){
			$("tbody")[0].innerHTML= "";
			searchAdmin();
		}
		}
	});
});
var searchAdmin=function(){	
	var u=http+"Manager/getAdmins";
	var searchName=$(".search-name").val();
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
					if(searchName==result.AdminUsername){						
						item='<tr><td><input type="checkbox" class="one" /></td><td class="adminID">'+result.AdminId+"</td><td>"+result.AdminImage+"</td><td>"+result.AdminUsername+"</td><td>"+result.AdminUserPassword+"</td><td>"+result.AdminPhone;
						item2="</td><td>"+result.AdminTime+"</td></tr>";
						$('tbody').append(item+item2);
					}
				}); 
			},
			error : function() {
				alert("查询失败！");
			}
	});
}
//添加管理员
$(function(){
	$(".add-admin").click(function(){
		$(".add-admin-div").show();
	});
		$(".new-admin-name").blur(function(){
			var n=$(".new-admin-name").val();
			if(n.length==0){
				$(".warning").val("用户名不能为空！");
			}
			else{
				$(".warning").val("");
				console.log(n.length);
				$(".new-admin-password").blur(function(){
					var p=$(".new-admin-password").val();
					if(p.length<6||p.length>12){			
						$(".warning").val("请输入6-12位的密码！");
					}
					else{
						$(".warning").val("");
						$(".new-admin-phone").blur(function(){
							var h=$(".new-admin-phone").val();
							var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
							if(!myreg.test(h)){
								$(".warning").val("输入有效的手机号码");
							}
							else{
								$(".warning").val("");
								$(".new-admin").click(function(){
									addAdmin();
									$(".add-admin-div").hide();
								});
							}
						});
					}
				});
			}
		});	
	
	$(".cancle-admin").click(function(){
		$(".add-admin-div").hide();
	});	
});
var addAdmin=function(){
	var u=http+"Manager/addAdmin";
				var n=$(".new-admin-name").val();
				var p=$(".new-admin-password").val();
				var h=$(".new-admin-phone").val();
				$.ajax({
				url: u,
				type: 'post',  
//				contentType:"application/x-www-form-urlencoded",
				//async:false, 
				dataType:"json",
				data: {
					AdminUsername:n,
					AdminPassword:p,
					AdminPhone:h
				},
				success:function(data){
					console.log(data);
					if(data.message='添加成功'){
						console.log(data.message);
						$("tbody")[0].innerHTML = "";
						loadinfo(0,10,true);
					}
				}, 
				error:function(data){
					alert("查询失败！");
				}

		});
}
//取消管理员
$(function(){
	$(".close-admin").click(function(){
		var checkItems=$(".one");
		var checkAdminID=$(".adminID");
		var itemArray=new Array();　
		for (var i=0;i<checkItems.length;i++){
			if(checkItems[i].checked){				
				itemArray.push(parseInt(checkAdminID[i].innerText));
			}
		}
		if(itemArray.length>0){
			$(".promt-contain").val("确定取消该管理员?");
			$(".promt").show();
			$(".sure").click(function(){
				$(".promt").hide();
				removeAdmin("["+itemArray+"]");
			});
			$(".cancle").click(function(){
				$(".promt").hide();
			});
		
		}
	})
})
var removeAdmin=function(items){
	var u=http+"Manager/removeAdmin";
	$.ajax({
				url: u,
				type: 'post',  
				contentType:"application/x-www-form-urlencoded",
				data: {
					AdminIdArray:items
				},
				success:function(data){
					console.log(data);
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

$(function(){
	$(".add-admin-div").blur(function(){
		$(".add-admin-div").hide();
	})
})

