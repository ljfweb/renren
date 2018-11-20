var express = require('express');
var mongo=require("./dbfengzhuang");
var router = express.Router();
var crypto=require('crypto'); //加密模块
// 处理 mongodb里面的 _id格式 _id:Object("asdsad")
var ObjectId=require('mongodb').ObjectID; 

//构造函数  存用户信息
	function User(users){
		this.name=users.name; //登陆人员的账号
		this.veri=users.veri;
		this.password=users.password;
		this.id=users.id;
	}
//验证码功能	 
//	请求验证码   /users/adminVeri?action=veri
//  验证验证码   /users/adminVeri?action=checkVeri
router.get('/adminVeri', function(req, res, next) {
//	res---response---响应
	//前端get传来的参数 req--request   用req.query
	//前端post传来的参数  用req.body
	if(req.query.action=="veri"){
		var veriCode="";
	var codearr="ABCDEFGHIGKLMNabcdefghijklmnopqrstuvwxyz0123456789";	
		for(var i=0;i<4;i++){
			veriCode+=codearr[Math.floor(Math.random()*codearr.length)]
		}
		//session 服务器 储存用户信息的			
			var newUser=new User({
				 name:'',
				 veri:veriCode,
				 password:'',
				 id:''
			})
			console.log(req.session);
			req.session.user=newUser;//存储到session	
			
			res.send('{"success":"成功","veri":"'+ veriCode+'"}')
	}else if(req.query.action=="checkVeri"){
		//识别验证码--和session中比较
		if(req.query.veri.toLowerCase()==req.session.user.veri.toLowerCase() ){
				res.send('{"success":"校验成功"}')
		}else{
				res.send('{"err":"校验失败"}')
		}

	}

});
//注册和登录接口
//	注册功能  /users/LoginAndReg?action=reg
router.post("/LoginAndReg",function(req , res){
	console.log(req.body);
		if(req.body.action=="reg"){
			//注册要操作数据库 添加数据  添加之前 来连接数据库的表 
//			Administor---用户表
			mongo("find","Administor",null,function(arr){
				//准备注册数据  添加到数据库
				var userInfos={
				 
				}
				userInfos.tokenId=arr.length+1;     //用户id
				userInfos.createAt=new Date();      //创建时间
				userInfos.power=req.body.power;     //权限
				userInfos.powerCode=req.body.power=='会员'?1:2;//权限码
				//用户名
				userInfos.userName=req.body.userName==""?"false":req.body.userName
				//真实姓名
				userInfos.turename=req.body.turename==""?"false":req.body.turename
				//密码
				var MD5=crypto.createHash('md5');
				//加密密码  --转成64位
				userInfos.password=MD5.update(req.body.password).digest('base64');
				//手机号
				userInfos.phone=/^1\d{10}$/.test(parseInt(req.body.phone))?req.body.phone:"false"
				//判断用户名和真实姓名不为空
				if(userInfos.userName!="false"&&userInfos.turename!="false"){
					//判断用户名是否存在
					mongo("find","Administor",{userName:req.body.userName},function(data){
						if(data.length==0){
							//添加到数据库
							mongo("add","Administor",userInfos,function(result){
								console.log(result)
								if(res.length==0){
									res.send('{"err":"注册失败"}')
								}else{
									res.send('{"success":"注册成功"}')
								}
							})
						}else{
							res.send('{"err":"用户已经被注册了"}')
						}
						
					})
					}else{
					res.send('{"err":"格式错误"}')
				}

			})
		//登录接口
		}else if(req.body.action=="login"){
				//密码
				var MD5=crypto.createHash('md5');
				//加密密码  --转成64位
			var password=MD5.update(req.body.password).digest('base64');
			//前端传来的账号密码
			var sel={userName:req.body.userName,password:password};
			//去数据库中查找
			mongo("find","Administor",sel,function(result){
////				result----[{
//			    "_id": ObjectId("5bea887afcda551c18172733"),
//			    "tokenId": NumberInt("5"),
//			    "createAt": ISODate("2018-11-13T08:16:58.779Z"),
//			    "power": "会员",
//			    "powerCode": NumberInt("1"),
//			    "userName": "www",
//			    "turename": "sdd",
//			    "password": "ICy5YqxZB1uWSwcVLSNLcA==",
//			    "phone": "18888888888"
//				}]

				if(result.length==0){
					
					res.send('{"err":"账号密码错误"}')
				}else{
					//通过验证的用户名密码存到session中
					req.session.user.name=req.body.userName;
					req.session.user.password=password;
					req.session.user.id=result[0]._id;
					res.send('{"success":"登录成功"}')
					
				}
	
			})
		}
		
		
})
//退出登录系统
  router.get("/Adminquit",function(req,res,next){
  		if(req.query.action=="quit"){
  			//退出系统
  			if(req.session.user){
  				//清空session的值
  				req.session.user={};
  				res.send('{"success":"退出成功"}')
  			}else{
  				res.send('{"err":"请登录"}')
  			}
  		}
  })
//修改密码    用户名userName   oldPass原密码    新密码
router.post("/updatePass",function(req,res,next){
		
				//密码
			var MD5=crypto.createHash('md5');
				//加密密码  --转成64位
			var password=MD5.update(req.body.password).digest('base64');
		//查找传来的用户
		mongo("find","Administor",{userName:req.body.userName},function(data){
				if(data.length==0){
					res.send('{"err":"用户不存在"}')
				}else{
					
					//判断传来的原密码和数据库中是否相等
					
					if(password==data[0].password){
						var MD5=crypto.createHash('md5');
						var newPwd=MD5.update(req.body.newPwd).digest('base64');
						//可以修改密码
						var sel=[
								{userName:req.body.userName},
								{$set:{
									password:newPwd,
									upDate:new Date()
								}}	
						]
						//修改
						mongo("updates","Administor",sel,function(result){
								
								res.send('{"success":"修改成功"}');
						
						})

					}else{
						
						res.send('{"err":"原密码错误"}');
					}	
				}
		})

})
// 查看用户信息接口
router.get("/seeUser",function(req,res,next){

			//登录状态  请求 session里有用户名
			
//			查询所有信息  根据session中的值
		mongo("find","Administor",{userName:req.session.user.name},function(result){
			//返回查到的用户信息
			res.send(result);
		})
})

//编辑用户信息

router.post("/editUser",function(req,res,next){
	
		var sel={
			phone:req.body.phone,
			turename:req.body.turename,
			power:req.body.power,
			powerCode:req.body.power=="会员"?1:2
		}

	mongo("updates","Administor",[{userName:req.body.userName},{$set:sel}],function(result){
				if(result.length==0){
					res.send('{"err":"修改失败"}');
				}else{
					res.send('{"success":"修改成功"}');
				}
				
	})
})

//判定用户是否登录的接口
router.get("/isLogin",function(req,res,next){
	console.log(88888888888888)
	console.log(req.session.user);
	if(req.session.user.name){
		res.send('{"success":"已登录"}')
	}else{
			res.send('{"err":"未登录"}')
	}
	
})





module.exports = router;
