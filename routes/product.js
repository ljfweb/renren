var express = require('express');
var mongo=require("./dbfengzhuang");
var router = express.Router();
// 处理 mongodb里面的 _id格式 _id:Object("asdsad")
var ObjectId=require('mongodb').ObjectID; 
//添加商品接口和修改商品
router.post("/addPro",function(req,res,next){
	//准备好添加的数据
	mongo("find","product",{},function(result){
		
		var sel={
		}
		sel.pname=req.body.pname;
		sel.price=req.body.price;
		sel.imgsrc=req.body.imgsrc;
		sel.color=req.body.color;
		
		sel.size=req.body.size;
		sel.kucun=req.body.kucun;
		sel.fenlei=req.body.fenlei;
		
		sel.info={};
		sel.info.bigimg=req.body.bigimg;
		sel.info.gonglv=req.body.gonglv;
		
		console.log(req.body.action)
		if(req.body.action=="add"){
			//添加设置pid
				if(result.length==0){
					pid=1;
				}else{
					pid=Number(result[result.length-1].pid)+1;
				}
				
				sel.pid=pid;
				
				mongo("add","product",sel,function(result){
					if(result.length==0){
						res.send('{"err":"添加失败"}')
					}else{
						res.send('{"success":"添加成功"}')
					}
				})	
		}
		//修改
		if(req.body.action=="edit"){
//			console.log(req.body.epid)
			mongo("updates","product",[{pid:Number(req.body.epid)},{$set:sel}],function(data){
					if(result.length==0){
						res.send('{"err":"修改失败"}')
					}else{
						res.send('{"editsuccess":"修改成功"}')
					}		
			})
		}
	
})
})

//卖家列表显示接口
router.get("/proList",function(req,res,next){
	//获取所有商品信息
	mongo("find","product",{},function(data){
		if(data.length==0){
			res.send('{"err":"请求失败"}')
		}else{
			res.send(data)
		}
		
	})

})
//删除商品接口
router.post("/delPro",function(req,res,next){
		var pid=Number(req.body.pid);
	mongo("del","product",{pid:pid},function(data){
		if(data.length==0){
			res.send('{"err":"删除失败"}')
		}else{
			res.send('{"success":"删除成功"}')
		}
	})
	
})








module.exports=router;