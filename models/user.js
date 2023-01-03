const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const AVATAR_PATH = path.join("/uploads/users/avatars");
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname,'..', AVATAR_PATH));
    console.log('__dirname:         ',__dirname);
    console.log('AVATAR_PATH:       ',AVATAR_PATH);
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now());
    console.log('file.fieldname:    ',file.fieldname);
    console.log('Date.now():        ',Date.now());
  },
});

//static
userSchema.statics.uploadedAvatar = multer({storage: storage}).single('avatar');
userSchema.statics.avatarPath=AVATAR_PATH;


const User = mongoose.model("User", userSchema); //telling mongoose that this is a model
module.exports = User;
