var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	
//res.render('index', { title: 'Express' });
//	重定向--跳转到指定页面
//		如果不重定向--可以自动找到index.html页面
		res.redirect("/login.html");
		
});

module.exports = router;
