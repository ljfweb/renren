
$(function(){
//	调取商品数据
		var pid=getQueryString("pid");
		$.ajax({
			url:"/renren/details",
			type:"post",
			data:{
				pid:pid
			},
			dataType:"json"
		}).done(function(res){
			console.log(res);
			$(".list td").eq(0).find("img").attr("src","images/"+res[0].imgsrc);
			$(".list td").eq(1).html(res[0].pname);
			$(".list td").eq(2).html(res[0].price);
			$(".list td").eq(3).html(res[0].size);
			$(".list td").eq(4).html(res[0].color);
			$(".list td").eq(5).find("input").val(1);
			
		function total(){
			var totalCount=Number(res[0].price)* Number($(".list td").eq(5).find("input").val())
			 return totalCount
		}
		$(".total").html(total());	
			
		$(".plus").click(function(){
			var inpval=Number( $(".list td").eq(5).find("input").val() );
			$(".list td").eq(5).find("input").val(inpval+1);
			$(".total").html(total());	
		})
		$(".min").click(function(){
			var inpval=Number( $(".list td").eq(5).find("input").val() );
			if(inpval<=1){
				inpval=1;
			}else{
				$(".list td").eq(5).find("input").val(inpval-1);
			}
			
			$(".total").html(total());	
		})
		
			//点击确认购买
		
		$(".sureBuy").click(function(){
			var address="";
			
			$.each($("#myarea select"), function(index,ele) {
				address+=ele.value;
			});
			//详细地址
			address+=$("#deAddress").val();
			console.log(address)
			
			var obj={
				"pid":pid,
				"pname":res[0].pname,
				"price":res[0].price,
				"total":$(".total").html(),
				"num":$(".list td").eq(5).find("input").val(),
				"color":res[0].color,
				"size":res[0].size,
				"imgsrc":res[0].imgsrc,
				"address":address,
				"phone":$("#orderPhone").val(),
				"truename":$("#truename").val()
			};
			
				$.ajax({
						url:"/order/addOrder",
						type:"post",
						data:obj,
						dataType:"json"
				}).done(function(res){
					console.log(res);
				})
			
			
			
			
		})
		
		
	})
	

})
