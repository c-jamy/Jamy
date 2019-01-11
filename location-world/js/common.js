var num=location.search;
var nn=num.slice(1);
var arr=nn.split(";");
var http="http://172.17.146.156:8082/locationword/";
var urls=["../html/GMGT.html","../html/PMGT.html","../html/AuthorityMGT.html","../html/MessageMGT.html "];
var phone;
var time;
$(function(){
	loadinfo();
	$(".username").attr("value",arr[0]);
	$(".manages:first").css("background-color", "rgb(66,82,97)");
	$("#content-center").load("../html/GMGT.html");
	$(".manages").click(function() {
		t=$(this).index();
		resetColor();
		$(this).css("background-color", "rgb(66,82,97)");
		$.ajax({
			url : urls[$(this).index()],
			async : true,
			dataType : "html",
			success : function(html) {
				$("#content-center").html(html);
			}
		})
	});
});
function resetColor(){
	$(".manages").css("color","white");
	$(".manages").css("background-color", "rgb(45,62,78)");
}
$(function(){
	$(".sign-off").click(function(){
		window.location.href="../index.html";
	})
})

var loadinfo=function(){
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
				lastest=data.length;
				$.each(data,function(i,result){
					if(arr[1]==result.AdminId){	
						phone=result.AdminPhone;
						time=result.AdminTime;
						$(".phone").attr("value","    管理员电话:"+phone);
						$(".time").attr("value","    入职时间:"+time);
					}
				}); 
			},
			error : function() {

				alert("查询失败！");

			}
});
}	
//常用配置参数：

$(function(){
            $('.username').popover(
                {
//                  trigger:'hover', //触发方式
////                  template: 'left', //你自定义的模板
//                  title:"hello",//设置 弹出框 的标题
                    html: true, // 为true的话，data-content里就能放html代码了
                    content:"<button>0000000</button>",//这里可以直接写字符串，也可以 是一个函数，该函数返回一个字符串；
                })
                $('.username').hover(function(){
                	$('.username').popover("toggle");
                })
                
       })


