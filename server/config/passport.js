// REQUIREMENTS //
var User = require('../models/user');
var GoogleStrategy = require('passport-google-oauth2').Strategy;
var configAuth = require('./auth');

module.exports = function(passport) {

    // SESSION //
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    // GOOGLE OUATH 2.0 // 
    passport.use(new GoogleStrategy({
        clientID: configAuth.googleAuth.clientID,
        clientSecret: configAuth.googleAuth.clientSecret,
        callbackURL: configAuth.googleAuth.callbackURL
    },
    function(token, refreshToken, profile, done) {
        // asynchronous so User.findOne won't fire until we have all our data back from Google
        process.nextTick(function() {
            // find by google id
            User.findOne({ 'google.id' : profile.id }, function(err, user) {
                if (err)
                    return done(err);

                if (user) { 
                    // if user is found, log in
                    return done(null, user); 
                } else { 
                    // create new user
                    var newUser = new User(); 
                    newUser.name = profile.displayName;
                    newUser.email = profile.emails[0].value;
                    newUser.google.id = profile.id;
                    newUser.google.token = token;
                    newUser.google.name = profile.displayName;
                    newUser.google.email = profile.emails[0].value;

                    // save the user
                    newUser.save(function(err) {
                        if (err)
                            throw err;
                        return done(null, newUser);
                    });
                }
            });
        });
    }));
};