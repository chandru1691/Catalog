// load the things we need
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

// define the schema for our user model
var sourceSchema = mongoose.Schema({
    item: String,
    isbn: String,
    description: String,
    author: String,
    owner: String,
    access: []
});

// create index for collection
sourceSchema.index({'$**': 'text'});

// create the model for source and expose it to our app
module.exports = mongoose.model('sources', sourceSchema);