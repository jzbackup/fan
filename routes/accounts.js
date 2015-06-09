var express = require('express');
var moment = require('moment');
var crypto = require('crypto')
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

function checkNotLogin(req, res, next) {
    if (req.session.user) {
        req.flash('error', '已登陆');
        return res.redirect('/home');
    }
    console.log('check not login');
    next();
}

router.get('/', checkNotLogin);
router.get('/', function(req, res, next) {
    res.render('register',{info:'请注册'});
});

router.get('/register', checkNotLogin);
router.get('/register',function(req,res,next) {
    res.render('register',{info:'请注册'});
});

router.post('/register', checkNotLogin);
router.post('/register',function(req,res,next) {
    console.log('register post');

    userDao.getUserByName(req.body.username, function(err, rows) {
        if(err) {
            console.log(err);
            return;
        } else {
            console.log(req.body);
            if(rows.length > 0) {
                res.render('register',{info:'该用户名已被占用！'});
                return;
            } else {
                // hash the password, we cannot store the password directly
                var md5 = crypto.createHash('md5');
                var password_md5 = md5.update(req.body.password).digest('base64');
                userDao.addUser({username: req.body.username
                                ,password: password_md5
                                ,email: req.body.email}
                                ,function(err,rows)
                                {
                                    if(err){
                                        console.log(err);
                                    }else{
                                        console.log(rows);
                                    }
                                });
                req.flash('success', '注册成功，请登陆');
                res.redirect('login');
                return;
            }
        }
    });
});

router.get('/login', checkNotLogin);
router.get('/login',function(req,res,next){
    res.render('login', {info: '请登录'});
});

router.post('/login', checkNotLogin);
router.post('/login',function(req,res,next){
    console.log('login');

    var md5 = crypto.createHash('md5');
    var password_md5 = md5.update(req.body.password).digest('base64');
    console.log(password_md5);
    userDao.getUserByEmailAndPass({email:req.body.email, password:password_md5}, function(err,rows){
        console.log('has result');
        if(err){
            console.log(err);
            return;
        }else{
            console.log(rows);
            if(rows.length <= 0){
                //req.flash('error', 'Email或密码不正确！');
                res.render('login', {info:'Email或密码不正确！'});
                //res.redirect('login');
                return;
            } else {
                req.session.user = rows[0];
                console.log('user login');
                console.log(req.session.user);
                req.flash('success', '登陆成功');
                res.redirect('/home');
                return;
            }
        }
    });
});

//router.get('/home/:uid/:pageNum',function(req,res,next){
//    var pageNum=parseInt(req.params.pageNum) || 1;
//    if(pageNum<1){
//        pageNum=1;
//    }
//    var prePage=pageNum - 1;
//    var nextPage=pageNum + 1;
//    if(req.session.userid != req.params.uid){
//        res.render('login',{info:'请先登录！'});
//        return;
//    }else{      
//        console.log(req.session);
//        blogDao.getUserBlogByPageNum({uid:req.session.userid, pageNum:pageNum}, function(err,rows) {
//            if(err){
//                console.log(err);
//            }else{
//                for(var i=0;i<rows.length;i++){
//                    rows[i].createTime=moment(rows[i].createTime).format("YYYY-MM-DD HH:mm:ss");
//                }
//                console.log(rows);
//                res.render('home',{uid : req.params.uid
//                                 ,blogs : rows
//                                 ,'prePaginationUrl' : '/users/home/'+req.params.uid+'/'+prePage
//                                 ,nextPaginationUrl : '/users/home/'+req.params.uid+'/'+nextPage});
//                return;
//            }
//        });
//    }
//});

router.get('/logout', checkLogin);
router.get('/logout', function(req,res,next){
    req.session.user = null;
    req.flash('success', '已登出');
    res.redirect('/home');
});

module.exports = router;