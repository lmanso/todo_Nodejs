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

        router.post('/', function (req, res, next) {
            var todo = {
                title: req.body.title,
                content: req.body.content,
                state: false,
                update_date: new Date(),
                creation_date: new Date(),
                deadline: "",
                user: 'test',
                // date: new Date(),
            }
            db.collection('todos').insertOne(todo, function(err, result) {
                if (err) return next(err);
                db.collection('todos').findOne({ _id: ObjectId(result.insertedId) },
                    function (err, doc) {
                        if (err) return next(err);
                        res.render('todo', { todo: doc }, function (err, html) {
                            if (err) return next(err);
                            return res.json({ response: html })
                        });
                    });
            });
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
            });
        });
    });

    router.put('/order', function(req, res, next){
        req.body.order= [];
        var  isOk = 0;
        req.body.order.forEach(function (id, pos){
            db.collection('todos').updateOne({_id:ObjectId(id)},
            {$set: { position : pos} }, function(err, result) {
                if(err || !result.ok) isOk = 1;
            })
        })
        res.json({ok:1})
    });
})

module.exports = router;