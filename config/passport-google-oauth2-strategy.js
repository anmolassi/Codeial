const passport = require('passport');
const googleStrategy=require('passport-google-oauth').OAuth2Strategy;
const crypto =require('crypto');

const User=require('../models/user');

// tell passport to use a new strategy for google login
passport.use(new googleStrategy({
        clientID:"250885903336-s7424af4gdpapu6nb8jbrd3stbgtu6q5.apps.googleusercontent.com",
        clientSecret:"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",
        callbackURL:"http://localhost:8000/users/auth/google/callback",
    },
    // profile holds the information of the email selected by the user 
    //A refresh token is a special kind of token that can be used to obtain a renewed access token

    function(accessToken, refreshToken, profile, done){
        User.findOne({email: profile.emails[0].value}).exec(function(err,user){
            if(err){console.log('error in google startegy-passport',err); return;}

            console.log(accessToken,refreshToken);
            console.log(profile);

            if(user){
                // if found, set this user as req.user
                return done(null,true);
            }else{
                // if not found, create the user and set it as req.user (meaning sign up is made)
                User.create({
                    name:profile.displayName,
                    email:profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex')
                },function(err, user){
                    if(err){console.log('error in creating user google strategy-passport',err); return;}

                    return done(null,user);
                })
            }
        })
    }

))


module.exports= passport;