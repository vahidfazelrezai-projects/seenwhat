var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

// define schema for model
var userSchema = mongoose.Schema({
    name: String,
    items: [{type: ObjectId, ref: 'Item'}]
});

// export model
module.exports = mongoose.model('User', userSchema);