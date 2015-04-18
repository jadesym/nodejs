var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/examplemongo';

/* GET users listing. */
router.get('/', function(req, res, next) {
  MongoClient.connect(url, function(err, db) {
    var collection = db.collection('users');
    collection.find().toArray(function(err, items) {
      res.render('users/index', {
        users: items
      });
    });
  });
});

router.get('/new', function(req, res, next) {
  res.render('users/new');
});

router.post('/create', function(req, res, next) {
  MongoClient.connect(url, function(err, db) {
    var collection = db.collection('users');
    collection.insert(req.body, function(err, result) {
      if (!err) {
        res.send("User created");
      } else {
        res.send(err);
      }
    });
  });
});
module.exports = router;