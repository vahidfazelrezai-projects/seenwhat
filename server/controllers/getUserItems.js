var mongoose = require('mongoose');
var User = require('../models/user');
var Item = require('../models/item');
var ObjectId = mongoose.Schema.Types.ObjectId;

function getUserItems (req, res) {

    // extract name from request information
    var name = req.query.name;

    User.findOne({'name' : name}, function (err, user) {
        if (err)
            console.log(err);

        if (user) {
            res.send(user.items);
            console.log('User found');
        } else {
            console.log('User not found');
        }
    }).populate('items');
};

module.exports = getUserItems;