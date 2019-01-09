var express = require('express'),
  router = express.Router(),
  mongodb = require('mongodb'),
  MongoClient = mongodb.MongoClient,
  // ObjectId = mongodb.ObjectID,
  url = "mongodb://localhost:27017/todolist";

MongoClient.connect(url,
  { useNewUrlParser: true },

  function (err, client) {
    if (err) throw err;

    let db = client.db('todolist');

    // router.use(function (req, res, next) {
    //   res.setHeader('Content-Type', 'application/json');
    //   next();
    // });
    
    /* GET home page. */
    // router.get('/', function(req, res, next) {
    //   res.render('index', { title: 'Express' });
    // });

    router.get('/', function (req, res, next) {
      db.collection('todos').find({}).toArray(function (error, datas) {
        console.log(datas);
        res.render('index', { title: 'Todolist', todos: datas})
      })
    });

  });

module.exports = router;
