const express=require('express');
const router=express.Router();
const postController=require('../controllers/post_controller');
router.get('/',postController.jacket);
module.exports=router;