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

// ROUTES
router.get('/', returnIndex);

router.post('/addItem', addItem)


module.exports = router;