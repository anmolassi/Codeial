const nodeMailer= require('../config/nodemailer');


// module.exports= newComment;
exports.setPassword = (access) => {

    console.log('inside newComment mailer');
    console.log(access);
    nodeMailer.transporter.sendMail({
        from:'anmolassi01@gmail.com',
        to: `${access.user.email}`,
        subject:"Now you can reset your password!",
        // html: htmlString
        html:`<h1>${access.user.name}</h1>
              <small>http://localhost:8000/reset-password/${access.accessToken}</small>`
    }, (err, info) => {
        if(err){
            console.log('Error in sending mail',err);
            return;
        } 


        console.log('Message sent', info);
        return;
    });
}