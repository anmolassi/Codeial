const express=require('express');
const router=express.Router();
const userController=require('../controllers/users_contollers');
const postController=require('../controllers/post_controller');

router.get('/',userController.user_profile);
router.get('/profile',userController.profile); 

router.use('/profile/post',require('./post'));
module.exports=router;