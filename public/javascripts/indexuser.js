	
			$("#quit").click(function(){
				$.ajax({
					url:"/users/Adminquit",
					type:"get",
					dataType:"json",
					data:{
						action:"quit"
					}
				}).done(function(res){
					if(res.success){
						alert("退出成功");
						location.replace("login.html");
					}else{
						alert(res.err);
						location.replace("login.html");
					}
				})
	
			})
			
			//修改密码 关闭
			$(".close").click(function(){
				
				$("#passMask").hide();

			})
			$(".updatePass").click(function(){
					$("#passMask").show();
			})
			//修改密码
			$("#sureUp").click(function(){
				if($("#newpass").val()==$("#renewpass").val()){
					$.ajax({
						url:"/users/updatePass",
						type:"post",
						data:{
							userName:$("#userP").val(),
							password:$("#oldpass").val(),
							newPwd:$("#newpass").val()
						},
						dataType:"json"
					}).done(function(res){
						if(res.success){
							alert("修改成功");
							
							location.replace("login.html");
						}
						if(res.err){
							alert(res.err);
							$("#userP").val("");
							$("#oldpass").val("");
							$("#newpass").val("");
							$("#renewpass").val("");
						}
					})
				}else{
					alert("俩次密码不一致");
				}		
			})
			
			//查看用户信息
			$(".seeUser").click(function(){
				var resdata="";
				$("#infoMask").show();
				function loadInfo(){
					//请求数据
					$.ajax({
						url:"/users/seeUser",
						type:"get",
						dataType:"json"
					}).done(function(res){
						console.log(res)
						resdata=res;
						$(".infoContent span:eq(0)").html(res[0].userName);
						$(".infoContent span:eq(1)").html(res[0].phone);
						$(".infoContent span:eq(2)").html(res[0].turename);
						$(".infoContent span:eq(3)").html(new Date(res[0].createAt).toLocaleString());
						$(".infoContent span:eq(4)").html(res[0].power);
					})
				}
				loadInfo();
				//编辑点击
				$("#edit").click(function(e){
		
					$(".infoContent").hide();
					$(".editInfo").show();
					$(".editInfo input:eq(0)").val(resdata[0].userName);
					$(".editInfo input:eq(1)").val(resdata[0].phone);
					$(".editInfo input:eq(2)").val(resdata[0].turename);
					$(".editInfo input:eq(3)").val(new Date(resdata[0].createAt).toLocaleString());
					$(".editInfo select").val(resdata[0].power);
					

				})
				//阻止冒泡
				$(".infoContent").add(".editInfo").click(function(e){
					var e=e||window.event;
						e.stopPropagation();
				})
				//保存
				$("#save").click(function(e){
						
					$.ajax({
						type:"post",
						url:"/users/editUser",
						async:true,
						data:{
							userName:$("#euser").val(),
							turename:$("#ename").val(),
							phone:$("#ephone").val(),
							power:$("#epower").val()
						},
						dataType:"json"
					}).done(function(res){
						console.log(res)
						if(res.success){
							alert("修改成功");
							loadInfo();
							$(".editInfo").hide();
							$(".infoContent").show();
						}
						if(res.err){
							alert(res.err);
						}
						
					})
	
				})
				//点击遮罩关闭
			$("#infoMask").click(function(){
				$(this).hide();
				$(".infoContent").show();
				$(".editInfo").hide();
			})		
		})
	