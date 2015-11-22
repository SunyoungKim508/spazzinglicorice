
// passport strategy for facebook
var FacebookStrategy = require('passport-facebook').Strategy;

// load up the user model
var User = require('../db/user');

// load the auth variables
var configAuth = require('./auth');


module.exports = function(passport) {

  // used to serialize the user for the session
  passport.serializeUser(function(user, done) {
      done(null, user.facebookId);
  });

  // used to deserialize the user
  passport.deserializeUser(function(facebookId, done) {
      User.findOne({'facebookId': facebookId}, function(err, user) {
          done(err, user);
      });
  });

  // =========================================================================
  // FACEBOOK ================================================================
  // =========================================================================
  passport.use(new FacebookStrategy({

    // pull in our app id and secret from auth.js file
    clientID: configAuth.facebookAuth.clientID,
    clientSecret: configAuth.facebookAuth.clientSecret,
    callbackURL: configAuth.facebookAuth.callbackURL,
    profileFields: ['id', 'email', 'gender', 'link', 'locale', 'name', 'timezone', 'updated_time', 'verified']

  },

  // facebook will send back the token and profile
  function(token, refreshToken, profile, done) {

    // asynchronous
    process.nextTick(function() {

      // find the user in the database based on their facebook id
      User.findOne({ 'facebookId' : profile.id }, function(err, user) {

        // if there is an error, stop everything and return that
        // ie an error connecting to the database
        if (err)
          return done(err);

        // if the user is found, then log them in
        if (user) {
          return done(null, user); // user found, return that user
        } else {
          console.log(profile);
          console.log(profile.first_name);
          // if there is no user found with that facebook id, create them
          var newUser= new User();

          // set all of the facebook information in our user model
          newUser.facebookId = profile.id; // set the users facebook id                   
          newUser.token = token; // we will save the token that facebook provides to the user                    
          newUser.lastName  = profile.name.familyName;
          newUser.firstName = profile.name.givenName;
          newUser.email = profile.emails[0].value; // facebook can return multiple emails so we'll take the first
          newUser.todos = [];
          newUser.bookmarks = [];

          // save our user to the database
          newUser.save(function(err) {
            // if there is an error throw it
            if (err) {
              throw err;
            }

            // if successful, return the new user
            return done(null, newUser);
          });
        }

      });
    });

  }));

  };
