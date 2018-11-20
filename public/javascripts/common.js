//获取地址栏参数
	function getQueryString(name) {
	    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
	    var r = window.location.search.substr(1).match(reg);
	    if (r != null) {
	        return unescape(r[2]);
	    }
	    return null;
	}
//判断是否登录

function isLogin(){
	
}

var tool={
	isLogin:function(){
		var data=null;
			$.ajax({
				type:"get",
				url:"/users/isLogin",
				async:false,
				dataType:"json"
			}).done(function(res){
				data=res;
					
			})	
			return data;
	}
}
//闭包形式的封装
function Tool(){
	return {
		isLogin:function(){
			
		}
	}
	
}
//构造的封装
  function Tools(url){
  	this.url=url;
  	this.isLogin=function(){
  		
  	}
  }
