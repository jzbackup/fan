var BlogModel = require('../model/BlogModel');
var ObjectID = require('mongodb').ObjectID;
var config = require('../config/dev_config.js');

// don't need to pass results back, handle with callBack function directly
function getUserBlogByPageNum(option, callBack) {
	BlogModel.find({uid:option.uid})
			 .skip((option.pageNum - 1) * config.pageSize)
			 .sort({createTime: -1}).limit(config.pageSize)
			 .exec(function(err, rows) {
				if (err) {
					console.log(err);
				} else {
					callBack(null, rows);
				}
			 });
};

function getBlogByPageNum(pageNum, callBack) {
	BlogModel.find({})
			 .sort({createTime:-1})
			 .skip((pageNum - 1) * config.pageSize)
			 .limit(config.pageSize)
			 .exec(function(err, rows){
				if (err) {
					console.log(err);
				} else {
					callBack(null, rows);
				}
			 });
};

function addBlog(option, callBack) {
	var newBlog = new BlogModel({
		title:option.title,
		content:option.content,
		uid:option.uid,
		uname:option.uname
	});
	
	newBlog.save(function(err, blog) {
		if (err) {
			console.log("FATAL" + err);
		} else {
			callBack(null, blog);
		}
	});	
}

exports.getUserBlogByPageNum = getUserBlogByPageNum;
exports.getBlogByPageNum = getBlogByPageNum;
exports.addBlog = addBlog;