module.exports = function(passport) {

	// REQUIREMENTS //
	var express = require('express');
	var router = express.Router();
	var path = require('path');

	// DATABASE //
	var mongoose = require('mongoose');
	var configDatabase = require('../config/database');
	mongoose.connect(configDatabase.uri);

	// CONTROLLERS //
	var returnIndex = require('../controllers/returnIndex');
	var addItem = require('../controllers/addItem');
	var getUser = require('../controllers/getUser');
	var getUserItems = require('../controllers/getUserItems');

	// VIEWS //
	router.get('/', returnIndex);

	// API //
	router.get('/api/getUser', getUser); // params: name // returns: User object
	router.get('/api/getUserItems', getUserItems); // params: name // returns: list of Item objects
	router.post('/api/addItem', addItem); // params: name, caption, url, faviconUrl // returns: confirmation message

	// AUTH //
	router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
	router.get('/auth/google/callback', passport.authenticate('google', { 
        successRedirect: '/success', // incomplete (just filler routes)
        failureRedirect: '/failure'
	}));
	router.get('/logout', function(req, res) {
	    req.logout();
	    res.redirect('/');
	});

	return router;
}