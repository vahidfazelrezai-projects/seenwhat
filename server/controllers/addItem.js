var mongoose = require('mongoose');
var User = require('../models/user');
var Item = require('../models/item');
var ObjectId = mongoose.Schema.Types.ObjectId;

function addItem (req, res) {

    // create new item object from request
    function createNewItem(req) {

        // get request information and create item
        var name = req.query.name;

        var caption = req.query.caption;
        var url = req.query.url;
        var faviconUrl = req.query.faviconUrl;
        var spotter;
        var newItem;

        // find name to get spotter ID
        User.findOne({'name' : name}, function (err, user) {
            if (err)
                console.log(err);

            if (user) {
                spotter = user._id;
                
                newItem = new Item({
                    'spotter': spotter,
                    'caption': caption,
                    'url': url,
                    'faviconUrl': faviconUrl
                });

                // pass new item to next function, which saves relevant database documents
                saveNewItem(name, newItem);
            } else {
                console.log('User not found');
            }
        });
    }

    // save the new item in the database
    function saveNewItem(name, newItem) {
       
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
    }

    createNewItem(req);
};

module.exports = addItem;