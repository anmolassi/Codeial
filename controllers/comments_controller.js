const Comment = require('../models/comment');
const Post=require('../models/post')
module.exports.create=function(req,res){
    //first find the post then comment to prevent misuse by misusing the ID in inspect
    Post.findById(req.body.post,function(err,post){
        if(post)
        {
            Comment.create({
                content:req.body.content,
                post:req.body.post,
                user:req.user._id
            }, function(err,comment){
                //handle error
                post.comments.push(comment);
                post.save();
                res.redirect('/');
            });
        }
    });
}