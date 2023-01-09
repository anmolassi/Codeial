const { redirect } = require("express/lib/response");
const Comment = require("../models/comment");
const Post = require("../models/post");
const commentsMailer= require('../mailers/comments_mailer');
module.exports.create = async function (req, res) {
  //first find the post then comment to prevent misuse by misusing the ID in inspect
  try {
    let post = await Post.findById(req.body.post);
    if (post) {
      let comment = await Comment.create({
        content: req.body.content,
        post: req.body.post,
        user: req.user._id,
      });

      post.comments.push(comment);
      post.save();

      comment = await (await comment.populate("user", "name email")).populate("post");
      commentsMailer.newComment(comment);
      if (req.xhr) {

        return res.status(200).json({
          data: {
            comment: comment,
          },
          message: "Comment made!",
        });
      }
      req.flash("success", "Comment published!");

      res.redirect("/");
    }
  } catch (err) {
    console.log("Error", err);
    return;
  }
};
module.exports.destroy = async function (req, res) {
  try {
    let comment = await Comment.findById(req.params.id);
    let poost = await Post.findById(comment.post);
    if (comment.user == req.user.id || req.user.id == poost.user.id) {
      let postId = comment.post;

      await comment.remove();
      await req.flash("error", "Comment removed!");
      await Post.findByIdAndUpdate(postId, {
        $pull: { comments: req.params.id },
      });
      return res.redirect("back");
    } else {
      return res.redirect("back");
    }
  } catch (err) {
    console.log("Error", err);
    return res.redirect("back");
  }
};
