var express = require('express');
var moment = require('moment');
var userDao = require('../dao/userDao');
var blogDao = require('../dao/blogDao');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('register',{info:'register'});
});

router.get('/register',function(req,res,next) {
    res.render('register',{info:'register'});
});

router.post('/register',function(req,res,next) {
    console.log('register post');

    userDao.getUserByName(req.body.username, function(err, rows){
        console.log('callback called');
        if(err) {
            console.log(err);
            return;
        } else {
            console.log(req.body);
            if(rows.length > 0) {
                res.render('error',{message:'该用户名已被占用！'});
                return;
            } else {
                userDao.addUser({username:req.body.username
                                ,password:req.body.password
                                ,email:req.body.useremail}
                                ,function(err,rows)
                                {
                                    if(err){
                                        console.log(err);
                                    }else{
                                        console.log(rows);
                                    }
                                });
                res.redirect('login');
                return;
            }
        }
    });
});

router.get('/login',function(req,res,next){
    res.render('login', {info: 'Please login'});
});

router.post('/login',function(req,res,next){
    console.log(req.body);
    userDao.getUserByNameAndPass({username:req.body.username, password:req.body.password}, function(err,rows){
        console.log('has result');
        if(err){
            console.log(err);
            return;
        }else{
            console.log(rows);
            if(rows.length <= 0){
                res.render('login',{info:'用户名或密码不正确！'});
                return;
            } else {
                req.session.userid = rows[0]._id;
                res.redirect('/users/home/' + rows[0]._id+'/1');
                return;
            }
        }
    });
});

router.get('/home/:uid/:pageNum',function(req,res,next){
    var pageNum=parseInt(req.params.pageNum) || 1;
    if(pageNum<1){
        pageNum=1;
    }
    var prePage=pageNum - 1;
    var nextPage=pageNum + 1;
    if(req.session.userid != req.params.uid){
        res.render('login',{info:'请先登录！'});
        return;
    }else{      
        console.log(req.session);
        blogDao.getUserBlogByPageNum({uid:req.session.userid, pageNum:pageNum}, function(err,rows) {
            if(err){
                console.log(err);
            }else{
                for(var i=0;i<rows.length;i++){
                    rows[i].createTime=moment(rows[i].createTime).format("YYYY-MM-DD HH:mm:ss");
                }
                console.log(rows);
                res.render('home',{uid : req.params.uid
                                 ,blogs : rows
                                 ,'prePaginationUrl' : '/users/home/'+req.params.uid+'/'+prePage
                                 ,nextPaginationUrl : '/users/home/'+req.params.uid+'/'+nextPage});
                return;
            }
        });
    }
});

router.get('/logout', function(req,res,next){
    req.session.userid = null;
    res.redirect('/home');
});

module.exports = router;