var mongoose = require('mongoose');
var User = require('../models/user');
var Item = require('../models/item');

function addItem (req, res) {

    // get request information and create item
    var name = req.body.params.name;

    var title = req.body.params.title;
    var url = req.body.params.title;
    var faviconUrl = req.body.params.title;

    var newItem = new Item({
        'title': title,
        'url': url,
        'faviconUrl': faviconUrl
    });

    // save item and evoke callback with saved item
    newItem.save(function(err, item) {
        if (err) {
            console.log(err);
        } else {

            // find user and add new item ID to list
            User.findOne({'name' : name}, function (err, user) {
                if (err) {
                    console.log(err);
                } else {
                    user.items.push(new ObjectId(item._id));
                    user.save()

                    console.log('Item added!');
                    res.send('Item added!');
                }
            }
        }
    });

};

module.exports = addItem;