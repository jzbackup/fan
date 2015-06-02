var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	ObjectId = Schema.ObjectId;
	
// this is a schema
var UserSchema = new Schema({
//	_id:ObjectId,
	username: String,
	password: String,
	email: String
});

// this is a model
module.exports = mongoose.model('User', UserSchema);