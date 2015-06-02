var mongo = require('mongodb')
//var monk = require('monk')
//var db = monk('localhost:27017/fandb1');

var DAO = function(host, port) {
	this.db = monk(host + port + '/fandb1');
};

module.exports = new DAO('localhost', '27017');