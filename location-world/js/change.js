//全选
$(function(){
   $(".all").click(function() {
   	//console.log($(".one").length);
     for (var i = 0; i < $(".one").length; i++) {
         var checkbox = $(".one")[i];
         checkbox.checked = this.checked;
     }
   }); 
});
//取消全选
var check=function(box){
	var flag=box.checked;
	if(!box.checked){
		$(".all").prop("checked",flag);
	}
}
