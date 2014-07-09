var express    = require('express');

// Express 4.x removed the bodyParser middleware
// so now it needs to be enabled as a dependency
    bodyParser = require('body-parser'),
// Model-level functions are maintained in their own module
    model      = require('./model');

module.exports = app = express();

// enable our body paser so we can accept JSON input from
// our clients. 
app.use(bodyParser.json());

// CRUD routes
app.post('/', model.createPost);
app.get('/:id', model.readPost);
app.update('/:id', model.updatePost);
app.delete('/:id', model.deletePost);