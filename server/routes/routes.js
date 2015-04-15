var express = require('express');
var router = express.Router();
var path = require('path');

// DATABASE
var mongoose = require('mongoose');
var dbConfig = require('../config/database');
mongoose.connect(dbConfig.uri);

// CONTROLLERS
var returnIndex = require('../controllers/returnIndex');
var addItem = require('../controllers/addItem');
var getUser = require('../controllers/getUser');
var getUserItems = require('../controllers/getUserItems');

// ROUTES
// all views handled with Angular
router.get('/', returnIndex);
router.get('/profile/*', returnIndex);
router.get('/feed', returnIndex);

// API endpoints
router.get('/api/getUser', getUser); // params: name // returns: user object
router.get('/api/getUserItems', getUserItems); // params: name // returns: items list
router.post('/api/addItem', addItem); // params: name, caption, url, faviconUrl // returns: confirmation message

module.exports = router;