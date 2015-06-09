# fan
Start
1. Use nodemon to monitor file changes
2. 'nodemon ./bin/www'

MongoDB
1. install mongodb
2. create /data under project dir as the home of mongodb db files
3. need a deamon for mongo: mongod /path/to/data/ --rest (the --rest is to enable the http :28018 port)

Jade
1. submit form
2. show user lists

Monk
1. write to db
2. read from db

Mongoose
1. Define Schema: it can has properties and methods
2. Compile Schema to Model
3. Create object with new Model()
4. object.save() to save to mongodb
5. 

Weibo Logic
URL:
/ website homepage
  display different contents for logged in user and ananymour user
/users/home/[user] user's homepage
  user's homepage, show the user's infomation and his own posts
/posts/add publish an article
  must be logged in
  get and post
/posts/delete
  get and post
/posts/view/id
  ?how to encode the id? use the name?
/accounts/register register
  must be not logged in
/accounts/login login
  must be not logged in
/accounts/logout logout
  must be loggend in
/accounts/password/reset
  must be not logged in
  reset password for an email

6/7/15
Use middleware and next() to check whether user is logged in

Use req.flash('success', 'ok'); to output notification

6/8/15
Add blogs logic
Change email



