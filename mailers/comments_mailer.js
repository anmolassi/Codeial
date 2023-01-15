const nodeMailer= require('../config/nodemailer');


// module.exports= newComment;
exports.newComment = (comment) => {
    let htmlString = nodeMailer.renderTemplate({comment:comment}, '/comments/new_comment.ejs');
    console.log('inside newComment mailer');

    nodeMailer.transporter.sendMail({
        from:'anmolassi01@gmail.com',
        to: comment.user.email,
        subject:"New Comment Published!",
        html: htmlString
        // html:'<h1>Yup, your comment is now published</h1>'
    }, (err, info) => {
        if(err){
            console.log('Error in sending mail',err);
            return;
        }


        console.log('Message sent', info);
        return;
    });
}