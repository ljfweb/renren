var express = require('express');
var mongo=require("./dbfengzhuang");
var router = express.Router();
// 处理 mongodb里面的 _id格式 _id:Object("asdsad")
var ObjectId=require('mongodb').ObjectID; 

//订单接口--确认订单  数据插入订单表

router.post("/addOrder",function(req,res,next){
	
		var sel={
			"pid":req.body.pid,
			"truename":req.body.truename,
			"pname":req.body.pname,
			"price":req.body.price,
			"total":req.body.total,
			"num":req.body.num,
			"color":req.body.color,
			"size":req.body.size,
			"imgsrc":req.body.imgsrc,
			"user":req.session.user.name,
			"address":req.body.address,
			"phone":req.body.phone,
			"buyDate":new Date(),
			"status":1,
			"orderid":new Date().getTime()		
		}
		
	mongo("add","order",sel,function(data){
		if(data.length==0){
				res.send('{"err":"购买失败"}');
		}else{
			res.send('{"success":"购买成功"}');
		}
	})
	
})
module.exports=router;