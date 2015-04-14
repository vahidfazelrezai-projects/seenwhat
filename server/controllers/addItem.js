var mongoose = require('mongoose');
var User = require('../models/user');
var Item = require('../models/item');
var ObjectId = mongoose.Schema.Types.ObjectId;

function addItem (req, res) {

    // get request information and create item
    var name = req.body.name;

    var title = req.body.title;
    var url = req.body.title;
    var faviconUrl = req.body.title;

    var newItem = new Item({
        'title': title,
        'url': url,
        'faviconUrl': faviconUrl
    });

    // save item and evoke callback with saved item
    newItem.save(function(err, item) {
        if (err)
            console.log(err);

        if (item) {

            // find user and add new item ID to list
            User.findOne({'name' : name}, function (err, user) {
                if (err)
                    console.log(err);

                if (user) {
                    user.items.push(item._id);
                    user.save();

                    console.log('Item added!');
                    res.send('Item added!');
                } else {
                    console.log('User not found');
                }
            });

        } else {
            console.log('Item not added');
        }
    });

};

module.exports = addItem;