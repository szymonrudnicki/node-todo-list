let express = require('express');
let router = express.Router();
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let config = require('../config');

//Connect to the database
mongoose.connect(config.databaseUri, { useNewUrlParser: true });

//Create a schema - blueprint
let todoSchema = new mongoose.Schema({
    item: String
});

let Todo = mongoose.model('Todo', todoSchema);

let urlencodedParser = bodyParser.urlencoded({extended: false });

router.get('/', function (req, res) {
    Todo.find(function (err, data) {
        if(err) throw err;
        res.render('todo', { todos: data });
    });
});

router.post('/', urlencodedParser, function (req, res) {
    Todo(req.body).save(function (err, data) {
        if(err) throw err;
        res.redirect('/');
    });
});

router.delete('/:item', function (req, res) {
    Todo.find({ item: req.params.item.replace(/\-/g, '-') }).remove(function (err, data) {
        if(err) throw err;
        res.render('todo', { todos: data });
    });
});

module.exports = router;
