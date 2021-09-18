const express = require('express');
const router = express.Router();
const { userController } = require("../controllers");

router.post('/signin', userController.signin);
router.post('/signup',userController.signup);
router.get('/signout',userController.signout);
router.get('/userinfo',userController.userinfo);
router.get('/token',userController.token);
router.get('/duplication',userController.duplication);
router.patch('/password',userController.password);
router.patch('/nickname',userController.nickname);
router.patch('/artist',userController.artist);


module.exports = router;
