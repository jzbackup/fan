var UserModel = require('../model/UserModel');
var ObjectID = require('mongodb').ObjectID;
var config = require('../config/dev_config');

function getUsersByPageNum(pageNum,callBack) {
    UserModel.find({})
			 .skip((pageNum - 1) * config.pageSize)
			 .limit(config.pageSize)
             .exec(function(err,rows) {
                if(err) {
                    console.log(err);
                } else {
                    callBack(null,rows);
              }
    });
};

function getUserById(uid,callBack) {
    UserModel.find({_id:new ObjectID(uid)})
      .exec(function(err,rows) {
        if(err) {
            console.log(err);
        } else {
            callBack(null,rows);
        }
    });
};

function getUserByName(username, callBack) {
    console.log('find user');
    UserModel.find({username:username})
      .exec(function(err,rows) {
        if(err) {
            console.log(err);
        } else {
            console.log('rows:' + rows);
            callBack(null,rows);
        }
    });
};

function getUserByNameAndPass(option,callBack) {
    UserModel.find({username:option.username, password:option.password})
      .exec(function(err,rows) {
        if(err) {
            console.log(err);
        } else {
            callBack(null,rows);
        }
    });
};

function addUser(option,callBack) {
    var newUser = new UserModel({
        username:option.username,
        password:option.password,
        email:option.email
    });
    newUser.save(function(err,user) {
        if(err) {
            console.log("FATAL"+err);
        } else {
            callBack(null,user);
        }
    });
};

exports.getUsersByPageNum = getUsersByPageNum;
exports.getUserByName = getUserByName;
exports.addUser = addUser;
exports.getUserByNameAndPass = getUserByNameAndPass;
exports.getUserById = getUserById;