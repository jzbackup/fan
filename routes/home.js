var express = require('express');
var moment = require('moment');
var blogDao = require('../dao/blogDao');
var router = express.Router();

router.get('/',function(req,res,next){
    console.log('home')
    if (!req.session.user){
        blogDao.getBlogByPageNum(1,function(err,rows){
            if(err){
                console.log(err);
            }else{
                for(var i=0;i<rows.length;i++){
                    rows[i].createTime=moment(rows[i].createTime).format('YYYY-MM-DD HH:mm:ss');
                }
                res.render('home', {blogs:rows});
            }
        });
    } else {
        console.log('has user');
        console.log(req.session.user);
//         find the first 10 articles for the user
        blogDao.getBlogByUserId(req.session.user, function(err, rows){
            console.log('found');
            console.log(rows);
            if(err){
                console.log(err);
            }else{
                for(var i=0;i<rows.length;i++){
                    rows[i].createTime=moment(rows[i].createTime).format('YYYY-MM-DD HH:mm:ss');
                }
                res.render('home', {uid:req.session.user._id, blogs:rows, 'prePaginationUrl':'/home/0', nextPaginationUrl:'/home/2'});
            }
        });
        console.log('not found ');
    }
});

router.get('/:pageNum',function(req,res,next){
    var pageNum=parseInt(req.params.pageNum) || 1;
    if(pageNum<1){
        pageNum=1;
    }
    var prePage=pageNum-1;
    var nextPage=pageNum+1;
    blogDao.getBlogByPageNum(pageNum,function(err,rows){
        if(err){
            console.log(err);
        }else{
            for(var i=0;i<rows.length;i++){
                rows[i].createTime=moment(rows[i].createTime).format('YYYY-MM-DD HH:mm:ss');
            }
            res.render('home',{uid:req.params.uid
                              ,blogs:rows
                              ,'prePaginationUrl':'/home/'+prePage
                              ,nextPaginationUrl:'/home/'+nextPage});
        }
    });
});

router.get('/:uid/:pageNum',function(req,res,next){
    var pageNum=parseInt(req.params.pageNum) || 1;
    if(pageNum<1){
        pageNum=1;
    }
    var prePage=pageNum-1;
    var nextPage=pageNum+1;
    blogDao.getBlogByPageNum(pageNum,function(err,rows) {
        if(err) {
            console.log(err);
        } else {
            for(var i=0;i<rows.length;i++) {
                rows[i].createTime=moment(rows[i].createTime).format('YYYY-MM-DD HH:mm:ss');
            }
            res.render('home',{uid:req.params.uid
                              ,blogs:rows
                              ,'prePaginationUrl':'/home/'+req.params.uid+'/'+prePage
                              ,nextPaginationUrl:'/home/'+req.params.uid+'/'+nextPage});
        }
    });
});


module.exports = router;