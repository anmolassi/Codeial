const passport=require('passport');

const User = require('../models/user');

const LocalStrategy=require('passport-local').Strategy;
;
//authentication using passport
passport.use(new LocalStrategy({
    usernameField:'email'       //usernmaeField is a part pf the syntax
},
function(email,password,done){
    // email and password will be passed and done will also be passed into the function, done is callback function reporting back to PASSPORT
    //find a user and establish the identity
    User.findOne({email:email},function(err,user){
        if(err){
            console.log('Error in finding user ---> Passport');
            return done(err);
        }
        if(!user || user.password!=password){
            console.log('Invalid Username/Password');
            return done(null,false); //if user not found , return false
        }
        return done(null,user); // else return the user
        // null is represnting error, in this error is null
    });
}
));

//serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user,done){
    done(null,user.id);
});
// deserializing the user from the key in the cookies
passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err){
            console.log('Error in finding user ---> Passport');
            return done(null,user);
        }
        return done(null,user);
    });
});

//chech if the user is authenticated
passport.checkAuthentication=function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    // if the user is not signed in
    return res.redirect("/users/sign-in");
}
passport.setAuthenticatedUser=function(req,res,next){
    if(req.isAuthenticated()){
        //req.user contains the current signed in user from the session cookie and we are just sending this to the locals for the views
        res.locals.user=req.user;
    }
    next()
}
module.exports =passport;