$(function(){
	
	function loadRenren(searchText,order){
			$.ajax({
			type:"post",
			url:"/renren/renrenList",
			async:true,
			data:{
				searchText:searchText,
				order:order
			},
			dataType:"json"
		}).done(function(res){
			console.log(res)
			
			var str="";
			$.each(res,function(index,ele){
				if(ele.pname!=""){
							//变量的拼接
					str+='<dl pid="'+ele.pid+'">'
						+'<dt><img src="images/'+ele.imgsrc+'"/></dt>'
						+'<dd>'+ele.pname+'</dd>'
						+'<dd>$'+ele.price+'</dd>'
						+'<button onclick="location.href=\'renrenDetails.html?pid='+ele.pid+'\'">查看详情</button>'
					+'</dl>'
								
					}
				})
			$(".list").html(str);
			
			
		})
	}
	loadRenren();
	var x=0;
	var searchText=null;
	$("#searchBtn").click(function(){
		x=0;
		searchText=$("#search").val();
		loadRenren(searchText);
			
	})
	//价格由低到高
	
	$(".priceOrder").click(function(){
		var order;
		if(x%2==0){
			order="down";
		}else{
			order="up";
		}
	
		loadRenren(searchText,order);
		x++;
	})
	
	
	
	
})
