// module.exports.profile = function(req, res){
//     res.end('<h1>User Profile</h1>');
// }
const User = require("../models/user");
module.exports.profile = function (req, res) {
  // console.log('SAS');
  // return res.render('user_profile', {
  //     title: "USER PROFILE"
  // });

  //   if (req.cookies.user_id) {
  //     User.findById(req.cookies.user_id, function (err, user) {
  //       if (user) {
  //         return res.render("user_profile", {
  //           title: "User Profile",
  //           user: user,
  //         });
  //       }
  //       return res.redirect("/users/sign-in");
  //     });
  //   } else {
  //     return res.redirect("/users/sign-in");
  //   }
  User.findById(req.params.id, function (err, user) {
    return res.render("user_profile", {
      title: "User Profile",
      profile_user:user
    });
  });
};
// module.exports.user_profile = function (req, res) {
//   console.log("sas");
//   return res.render("user_profile", {
//     title: "USER PROFILE",
//   });
// };

module.exports.update= function(req,res){
  if(req.user.id == req.params.id){
    // User.findByIdAndUpdate(req.params.id,{name: req.body.name, email:req.body.email},function(err,user){
    //   return res.redirect('back');
    // });
    User.findByIdAndUpdate(req.params.id,req.body,function(err,user){
      return res.redirect('back');
    });
  }else{
    return res.status(401).send('Unauthorized');
  }
}
//render the sign up page
module.exports.signUp = function (req, res) {
  if (req.isAuthenticated()) {
    res.redirect("/users/profile");
  }
  return res.render("user_sign_up", {
    title: "Codeial| Sign Up",
  });
};
//render the sign in page
module.exports.signIn = function (req, res) {
  if (req.isAuthenticated()) {
    res.redirect("/users/profile");
  }
  return res.render("user_sign_in", {
    title: "Codeial| Sign In",
  });
};
//get the sign up data
module.exports.create = function (req, res) {
  //console.log(req.body);
  if (req.body.password != req.body.confirm_password) {
    return res.redirect("back");
  }
  //if user is not found
  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) {
      console.log("error in finding user in signing up");
      return;
    }

    if (!user) {
      User.create(req.body, function (err, user) {
        if (err) {
          console.log("error in creating user while signing up");
          return;
        }

        return res.redirect("/users/sign-in");
      });
    } else {
      return res.redirect("back");
    }
  });
};
//sign in and create session for the user
module.exports.createSession = function (req, res) {
  return res.redirect("/");
};

// module.exports.createSession = function (req, res) {
//   //steps to authenticate
//   //find the  user
//   User.findOne({ email: req.body.email }, function (err, user) {
//     if (err) {
//       console.log("error in finding user in signing in");
//       return;
//     }
//     //handle user found
//     if (user) {
//       // handle password which don't match
//       if (user.password != req.body.password) {
//         return res.redirect("back");
//       }
//       //handle session creation
//       res.cookie("user_id", user.id);
//       return res.redirect("/users/profile");
//     } else {
//       //handle user not found
//       return res.redirect("back");
//     }
//   });
// };

// sign out
// module.exports.signOut=function(req,res){
//     let id=req.cookies.user_id;
//     console.log(id);
//     res.cookie("user_id","");
//     return res.redirect("back");
// }

// module.exports.destorySession=function(req,res){
//   req.logout();

//   return res.redirect('/')
// }
module.exports.destorySession = function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
};
