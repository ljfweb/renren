//引入express
var express = require('express');
//引入路径模块
var path = require('path');
//cookie模块
var cookieParser = require('cookie-parser');
//日志模块

var logger = require('morgan');
//引入路由
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productRouetr=require('./routes/product');
var renrenRouetr=require('./routes/renren');
var orderRouetr=require('./routes/order');
//session模块
var session =require('express-session') // 下载

var app = express();

//  格式
app.use(session({
	    name:'tianmao',
	    secret:'tianmao',
	    cookie:{
	    	maxAge:80000000000 //
	    },
	    resave:false, //每次请求是否重新设置session
//	指每次请求重新设置 session cookie ,假如你设置的 cookie有效 10分钟    
	    saveUninitialized:false //每次请求是否初始化session	    
}))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//路径配置
app.use(express.static(path.join(__dirname, 'public')));
//使用路由
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/product',productRouetr);
app.use('/renren',renrenRouetr);
app.use('/order',orderRouetr);

module.exports = app;
