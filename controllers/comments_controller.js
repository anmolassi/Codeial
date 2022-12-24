const { redirect } = require("express/lib/response");
const Comment = require("../models/comment");
const Post = require("../models/post");
console.log("googhy");
module.exports.create = function (req, res) {
  //first find the post then comment to prevent misuse by misusing the ID in inspect
  Post.findById(req.body.post, function (err, post) {
    if (post) {
      Comment.create(
        {
          content: req.body.content,
          post: req.body.post,
          user: req.user._id,
        },
        function (err, comment) {
          //handle error
          post.comments.push(comment);
          post.save();
          res.redirect("/");
        }
      );
    }
  });
};
module.exports.destroy = function (req, res) {
  Comment.findById(req.params.id, function (err, comment) {
    Post.findById(comment.post, function (err, post) {
      if (comment.user == req.user.id || req.user.id == post.user) {
        let postId = comment.post;

        comment.remove();

        Post.findByIdAndUpdate(
          postId,
          { $pull: { comments: req.params.id } },
          function (err, post) {
            return res.redirect("back");
          }
        );
      } else {
        return res.redirect("back");
      }
    });
  });
};
