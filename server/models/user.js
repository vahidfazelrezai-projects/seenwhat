var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

// define schema for model
var userSchema = mongoose.Schema({
    name: String,
    email: String,
    items: [{type: ObjectId, ref: 'Item'}],
    google: {
        id: String,
        token: String,
        email: String,
        name: String
    }
});

// export model
module.exports = mongoose.model('User', userSchema);