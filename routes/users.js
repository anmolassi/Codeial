const express=require('express');
const router=express.Router();
const userController=require('../controllers/users_contollers');
const postController=require('../controllers/post_controller');
const passport =require('passport');

// router.get('/',userController.user_profile);
// router.get('/profile',userController.profile);
router.get('/profile/:id', passport.checkAuthentication,userController.profile); 
router.post('/update/:id', passport.checkAuthentication,userController.update); 
router.get('/sign-up',userController.signUp);
router.get('/sign-in',userController.signIn);
// router.get('/sign-out',userController.signOut);
// router.use('/profile/post',require('./post'));
router.post('/create',userController.create);
// router.post('/create-session',userController.createSession);
//use passport as a middleware to authenticate
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect:'/users/sign-in'}
), userController.createSession);
router.get('/sign-out',userController.destorySession);
module.exports=router;