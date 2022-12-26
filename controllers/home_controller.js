// module.exports.home=function(req,res){
//     return res.end('<h1>Express is up for Codeial</h1>');
// }
console.log("ejs file");
const Post = require("../models/post");
const User = require("../models/user");
module.exports.home = async function (req, res) {
  // return res.render('home', {
  //     title: "Home"
  // });
  // Post.find({},function(err,posts){
  //     return res.render('home',{
  //         title:"Codeial | Home",
  //         posts: posts
  //     });
  // });

  try{
    let posts= await Post.find({})
    .populate("user")
    .populate({
      path: "comments",
      populate: {
        path: "user",
      },
    });
    let users= await User.find({});
      return res.render("home", {
        title: "Codeial | Home",
        posts: posts,
        all_users: users,
      });

  }catch(err)
  {
    console.log('Error',err);
    return;
  }
  //populate the user of each post
  
};

// using then 
// Post.find({}).populate('comments').then(function());
// let posts=Post.find({}).populate('comments').exec();
// posts.then