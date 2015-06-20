var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

// define schema for model
var itemSchema = mongoose.Schema({
    owner: {type: ObjectId, ref: 'User'},
    caption: String,
    url: String,
    faviconUrl: String
});

// export model
module.exports = mongoose.model('Item', itemSchema);