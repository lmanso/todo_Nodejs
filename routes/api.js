var express = require('express'),
    router = express.Router(),
    mongodb = require('mongodb'),
    MongoClient = mongodb.MongoClient,
    // ObjectId = mongodb.ObjectID,
    url = "mongodb://localhost:27017/todolist";

// MongoClient.connect(url,
//     { useNewUrlParser: true },

    router.use(function (req, res, next) {
        res.setHeader('Content-Type', 'application/json');
        next();
    });
        router.delete('/:id', function (req, res, next) {
            db.collection('todos').deleteOne({ _id: ObjectId(req.params.id) }), 
            function (err, result) {
                if(err) return next(err);
                return res.json(result);
                // db.close();
            }
         });

        router.put('/:id', function (req, res, next) {
            db.collection('todos').updateOne({ _id: ObjectId(req.params.id) }), {$set: req.body /*{state:true}*/},
            function (err, result) {
                if (err) return next(err);
                return res.json(result);
            }
        });

module.exports = router;