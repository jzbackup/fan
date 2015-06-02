var express = require('express');
var userDao = require('../dao/userDao');
var blogDao = require('../dao/blogDao');
var router = express.Router();

router.get('/input', function(req, res, next) {
	res.render('addBlog', {"uid": req.session.userid});
});

router.post('/save', function(req, res, next) {
	console.log('save blog');
	if (req.body.title === '' || req.body.content === '') {
		var json = '{"result":"error", "message":"no content!}';
		res.send(json);
	} else {
		console.log(req.session);
		userDao.getUserById(req.session.userid, function(err, rows) {
			if (err) {
				console.log(err);
			} else {
				var blog = {title: req.body.title
			                ,content: req.body.content
						    ,uid: req.session.userid
						    ,uname: rows[0].username
						    ,createTime: new Date() 
							};
				blogDao.addBlog(blog
							    ,function(err, rows) {
			                       if(err){
				                       console.log(err);
				                   }else{
				                       console.log(rows);
//				                       var json = '{"result":"success","message":"发表成功！","uid":"'+req.session.userid+'"}';
//				                       res.send(json);
									   res.redirect('/users/home/' + req.session.userid + '/1');
				                   }
							   });
				console.log("add blog");
			}
		});
	}
});

module.exports = router;