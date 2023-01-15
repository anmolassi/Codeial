const User = require("../models/user");
const crypto = require("crypto");
const resetPassword = require("../models/reset-password");
const resetPasswordMailer = require("../mailers/reset_password_mailer");
const alert = require("alert");
const passport = require("passport");
module.exports.openform = async function(req,res){
    return res.render('changePassword', {
        title: "Codeial | Change Password",
        token: req.params.token,
      });
}
module.exports.reset = async function (req, res) {
  try {
    let resetCase = await resetPassword.findOne({
      accessToken: req.params.token,
    });
    if (resetCase) {
      if (resetCase.isValid) {
        resetPassword.updateOne(
          { _id: resetCase.id },
          {
            // isValid: false,
          },
          function (err) {
            if (err) {
              console.log(err);
            }
          }
        );

        let user = await User.findById(resetCase.user);
        req.login(user, function (err) {
          if (err) {
            console.log(err);
          } else {
            return res.redirect(`/change-password/${resetCase.id}`);
          }
        });
      } else {
        alert("link is not valid");
        return res.render("user_sign_in", {
          title: "Codeial | Sign_in",
        });
      }
    }
  } catch (err) {
    req.flash("error", err);
    console.log("Error", err);
    return res.redirect("back");
  }
};
module.exports.update = async function (req, res) {
  try {
    console.log(req.body);
    let resetCase = await resetPassword
      .findById(req.body.token).populate('user');
      console.log(resetCase);
    User.findByIdAndUpdate(
      resetCase.user.id,
      { password: req.body.newPass },
      function (err, docs) {
        if (err) {
          console.log(err);
        } else {
          console.log("Updated User : ", docs);
          return res.redirect('/');
        }
      }
    );
  } catch (err) {
    req.flash("error", err);
    console.log("Error", err);
    return res.redirect("back");
  }
};
