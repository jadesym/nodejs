var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/examplemongo';
// Load the bcrypt module
var bcrypt = require('bcrypt');

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

router.post('/login', function(req, res, next){
  MongoClient.connect(url, function(err, db) {
    var formObjects = req.body;
    var password = formObjects.password;
    var input_email = formObjects.email;
    var collection = db.collection('users');
    collection.findOne({email: input_email}, function(err, result) {
      if (!err) {
        var hash = result.password;
        if (bcrypt.compareSync(password, hash)) {
          res.send("Successful Login");
        } else {
          res.send("The password is incorrect!");
        }
      } else {
        res.send("That user account does not exist.");
      }
    });
  });
});

router.get('/login', function(req, res, next) {
  res.render('users/login');
});

router.get('/new', function(req, res, next) {
  res.render('users/new');
});

router.post('/create', function(req, res, next) {
  MongoClient.connect(url, function(err, db) {
    var collection = db.collection('users');

    // Generate a salt
    var salt = bcrypt.genSaltSync(10);
    // Hash the password with the salt
    var hash = bcrypt.hashSync(req.body.password, salt);
    // var hash = bcrypt.hashSync("my password", 10); Can be done in one line
    var formObjects = req.body;
    var password = formObjects.password;
    formObjects.password = hash;
    collection.insert(formObjects, function(err, result) {
      if (!err) {
        res.send("User created");
      } else {
        res.send(err);
      }
    });
  });
});


module.exports = router;