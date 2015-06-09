var express = require('express');
var userDao = require('../dao/userDao');
var blogDao = require('../dao/blogDao');
var router = express.Router();

function checkLogin(req, res, next) {
    if (!req.session.user) {
        req.flash('error', '未登录');
        return res.redirect('/home');
    }
    console.log('check login');
    next();
}

//function checkNotLogin(req, res, next) {
//    if (req.session.user) {
//        req.flash('error', '已登陆');
//        return res.redirect('/home');
//    }
//    console.log('check not login');
//    next();
//}

router.get('/add', checkLogin);
router.get('/add', function(req, res, next) {
	//res.render('addBlog', {"us": req.session.userid});
	res.render('addBlog');
});

router.get('/add', checkLogin);
router.post('/add', function(req, res, next) {
	console.log('save blog');
	if (req.body.title === '' || req.body.content === '') {
		var json = '{"result":"error", "message":"no content!}';
		res.send(json);
	} else {
		console.log(req.session);
		
		var blog = {title: req.body.title
				    ,content: req.body.content
				    ,uid: req.session._id
				    ,uname: req.session.user.username
				    ,createTime: new Date() 
					};
		blogDao.addBlog(blog, function(err, rows) {
           if(err) {
               console.log(err);
           } else {
               console.log(rows);
//               var json = '{"result":"success","message":"发表成功！","uid":"'+req.session.userid+'"}';
//               res.send(json);
			   req.flash('success', '发表成功');
			   res.redirect('/home');
           }
	   });
	console.log("add blog");
	}
});

module.exports = router;