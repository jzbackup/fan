//var config = require('./lib/config');
//var error = require('./routes/error');
var accounts = require('./routes/accounts');
var posts = require('./routes/posts');
var home = require('./routes/home');

module.exports = function(app) {
//  app.redirect('home', '/');

//  app.get('/', users.userlist);
//    console.log(error);
//    console.log(users);
//    app.get('/users', users.userlist);
//    app.get('/register', users.adduser);
//    app.get('/adduser', users.adduser);
//    app.get('/blog', blog);
//  
//  app.get('/404', error.notFound);
//  app.get('/500', error.ProError);
//  app.get('*', error.notFound);
    app.use('/accounts', accounts);   // user's homepage, user login, register, logout, post
    app.use('/home', home);
    app.use('/posts', posts);         // all the posts related CRUD
    //app.use('/blog', blog);
    console.log("routers");
};