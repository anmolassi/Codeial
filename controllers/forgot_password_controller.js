const User = require("../models/user");
const crypto = require("crypto");
const resetPassword = require("../models/reset-password");
const resetPasswordMailer = require("../mailers/reset_password_mailer");
const alert=require('alert');
module.exports.create = async function (req, res) {
  try {
    let token = crypto.randomBytes(20).toString("hex");
    let userr = await User.findOne({ email: req.params.email });
    if (userr) {
      let resetPass = await resetPassword.create({
        user: userr._id,
        accessToken: token,
        isValid: true,
      });
      resetPass = await resetPass.populate("user", "name email");
      console.log(token);
      resetPasswordMailer.setPassword(resetPass);

      req.flash("success", "Email sent!");
    }
    else{
      alert('No such user');
    }

    return res.redirect("back");
  } catch (err) {
    req.flash("error", err);
    console.log("Error", err);
    return res.redirect("back");
  }
};
