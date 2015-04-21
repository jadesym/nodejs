# nodejs
mongod --> sets up mongo database
express appname
npm install npm -g
npm start

Have to make data directory
mkdir data


if npm install bcrypt doesnt work -- saves this in package.json
sudo npm install bcrypt --save

to delete everything in the database -- MONGOD needs to be running
mongo
show dbs  (shows all databases)
use examplemongo
db
show collections
db.users.remove({}) -- removes all users

Homework: 4/20/15
Sessions + cookies to keep you logged in
login/logout