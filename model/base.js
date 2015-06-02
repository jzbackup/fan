//var mongoose = require('mongoose')
//mongoose.connect('mongodb://localhost:27017/fandb1');
//
//// define the schema
//// Schema can has properties and methods
//var CatSchema = mongoose.Schema({
//  name : String
// });
// CatSchema.methods.speak = function() {
//   var greeting = this.name
//     ? "Meow name is " + this.name
//     : "I don't have a name"
//   console.log(greeting);
// }
//// compile the Schema to Model
//var Cat = mongoose.model('Cat', CatSchema); // Cat is a model
//
//// kitty is an object
//var kitty = new Cat({ name: 'kitty'});
//kitty.speak();
//
//// save the cat
//kitty.save(function (err) {
//  if (err) {
//    console.log('Meow Save Error');
//  } 
//});
//
//// find all the cats
//Cat.find(function (err, kittens) {
//  if (err) return console.error(err);
//  console.log(kittens)
//});

var mongo = require('mongodb')
var monk = require('monk')
//var db = monk('localhost:27017/fandb1');

var DAO = function(host, port) {
	this.db = monk(host + port + '/fandb1');
};

DAO.prototype.findAllUsers = function(host, port) {
  var collection = this.db.get('usercollection');
  collection.find({},{},function(err, docs) {
    res.render('userlist', {
      "userlist" : docs
    });
  });
};

module.exports = new DAO('localhost', '27017');