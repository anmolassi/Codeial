// module.exports.profile = function(req, res){
//     res.end('<h1>User Profile</h1>');
// }
module.exports.profile = function(req, res){
    console.log('SAS');
    return res.render('user_profile', {
        title: "USER PROFILE"
    });
}
module.exports.user_profile = function(req, res){
    console.log('sas');
    return res.render('user_profile', {
        title: "USER PROFILE"
    });
}