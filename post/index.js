var express    = require('express');
    bodyParser = require('body-parser'),
    model      = require('./model');

module.exports = app = express();


app.use(bodyParser.json());

app.post('/', model.createPost);
app.get('/:id', model.readPost);
app.update('/:id', model.updatePost);
app.delete('/:id', model.deletePost);