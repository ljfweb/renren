$(function(){
	//获取地址栏参数
	function getQueryString(name) {
	    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
	    var r = window.location.search.substr(1).match(reg);
	    if (r != null) {
	        return unescape(r[2]);
	    }
	    return null;
	}
		//获取地址栏中pid
		var pid=getQueryString("pid");
		
		$.ajax({
			type:"post",
			url:"/renren/details",
			async:true,
			data:{
				pid:pid
			},
			dataType:"json"
		}).done(function(res){
//			console.log(res[0].imgsrc);
			var size=JSON.parse(res[0].size);
			var sizeStr='';
			$.each(size,function(index,ele){
				if(index==0){
					sizeStr+='<span class="active">'+ele+'</span>';
				}else{
					sizeStr+='<span>'+ele+'</span>';
				}
				
			})
			
			$(".con_left img").attr("src","images/"+res[0].imgsrc);
			$(".pname span").html(res[0].pname);
			$(".price span").html(res[0].price);
			$(".size div").html(sizeStr)
			$(".color span").html(res[0].color);
			$(".kucun span").html(res[0].kucun);
			$(".info img").attr("src","images/"+res[0].info.bigimg);
		})
		$(".sureBuy").click(function(){
			
			var data=tool.isLogin();
			console.log(data);
			if(data.success){
				
				//到订单页--pid  --userName 用户
				location.href="dingdan.html?pid="+pid;
				
			}
			if(data.err){
//				登录页
				$(".loginMask").show();
				$(".loginMask").html('<iframe src="buyLogin.html"  width="300" height="300"></iframe>');
				$(".loginMask").click(function(){
					$(this).hide();
					$(".loginMask").html("");
				})
				
			}
			
		})
	
	
})
