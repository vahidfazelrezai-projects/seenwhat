var mongoose = require('mongoose');

// define schema for model
var itemSchema = mongoose.Schema({
    title: String,
    url: String,
    faviconUrl: String
});

// export model
module.exports = mongoose.model('Item', itemSchema);