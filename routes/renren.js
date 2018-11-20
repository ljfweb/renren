var express = require('express');
var mongo=require("./dbfengzhuang");
var router = express.Router();
// 处理 mongodb里面的 _id格式 _id:Object("asdsad")
var ObjectId=require('mongodb').ObjectID; 
//显示列表的接口，搜索，筛选

router.post("/renrenList",function(req,res,next){
	//库存排序  req.body.kumax     
	//  价格     req.body.pricemax 
	// 搜索字段  req.body.searchText
	console.log(99999999999);
	console.log(req.session)
	if(!req.session.user){
		req.session.user={
			 	name:'',
				 veri:'',
				 password:'',
				 id:''
		};
	}
	mongo("find","product",{},function(data){
				
				//如果搜索
				if(req.body.searchText){
					var searchArr=[];
					var reg=new RegExp(req.body.searchText,"g");
					console.log(reg);
					for(var i=0;i<data.length;i++){
						
						if(reg.test(data[i].pname)){
							searchArr.push(data[i])
						 }
					}
					if(searchArr.length==0){
							res.send('{"err":"搜索失败，没有数据"}')
					}else{
						//排序不返回数据
						if(req.body.order){
							
						}else{
							res.send(searchArr);
						}
						
					}
				}else{
						if(req.body.order){	
						}else{
								res.send(data);
						}
				}
				
//				排序函数

				function orderData(arr){
						//有搜索字段 处理searchArr 冒泡排序
							for(var j=0;j<arr.length;j++){
								for(var k=0;k<arr.length-1-j;k++){
										
										if(Number(arr[k].price)>Number(arr[k+1].price)){
												var temp=arr[k];
												arr[k]=arr[k+1];
												arr[k+1]=temp;
										}
								}
								
							}		
								if(req.body.order=="down"){
									res.send(arr);
								}else if(req.body.order=="up"){
									res.send(arr.reverse());
								}
				}
				
				
				
				//如果有价格低到高
				if(req.body.order){
//					
						if(req.body.searchText)	{
							//处理搜索
							orderData(searchArr);
								
						}else{
							//处理整个data
							orderData(data);
		
						}
					
					
				}
			
		})
	
	
})
//详情页数据请求 
router.post("/details",function(req,res,next){
//	根据pid返回数据
		mongo("find","product",{pid:Number(req.body.pid)},function(data){
			if(data.length==0){
				res.send('{"err":"查询失败"}')
			}else{
				res.send(data);
			}
			
		})
})



module.exports=router;

