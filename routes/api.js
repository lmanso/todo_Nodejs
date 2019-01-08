var express = require('express'),
    router = express.Router(),
    mongodb = require('mongodb'),
    MongoClient = mongodb.MongoClient,
    ObjectId = mongodb.ObjectID,
    url = "mongodb://localhost:27017/todolist";

MongoClient.connect(url,
    { useNewUrlParser: true },

    function (err, client) {
        if (err) throw err;

        let db = client.db('todolist');

    router.use(function (req, res, next) {
        res.setHeader('Content-Type', 'application/json');
        next();
    });
        router.delete('/:id', function (req, res, next) {
            db.collection('todos').deleteOne({ _id:ObjectId(req.params.id) }, 
            function (err, result) {
                if(err) return next(err);
                return res.json(result);
                // db.close();
            });
         });

        router.put('/:id', function (req, res, next) {
            db.collection('todos').updateOne({ _id:ObjectId(req.params.id) },
             {$set: req.body /*{state:true}*/},
            function (err, result) {
                if (err) return next(err);
                db.collection('todos').findOne({_id:ObjectId(req.params.id)}, function (err, doc){
                    if(err) return next(err);
                    res.render('todo', {todo : doc}, function(err, html) {
                        if(err) return next(err);
                        return res.json({response : html})   
                    })
                })
            });
        });
});

module.exports = router;