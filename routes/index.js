const express=require('express');

const router = express.Router();
const homeController=require('../controllers/home_controller');
const forgotPasswordController=require('../controllers/forgot_password_controller');
const resetPasswordController=require('../controllers/reset-password_controller');
console.log('router loaded');
console.log(homeController);

router.get('/',homeController.home);
router.use('/users',require('./users'));
router.use('/posts',require('./posts'));
router.use('/comments',require('./comments'));
router.use('/api',require('./api'));
router.get('/forgot-password/:email',forgotPasswordController.create);
router.get('/reset-password/:token',resetPasswordController.reset);
router.post('/change-password/',resetPasswordController.update);
router.get('/change-password/:token',resetPasswordController.openform);
// for any further routes, access from here
// router.use('/routerName', require('./routerfile));
module.exports=router;