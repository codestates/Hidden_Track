const express = require('express');
const router = express.Router();
const upload = require("../modules/Profile");
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

router.post('/profile', upload.single("profile"),userController.profile.post);
router.patch('/profile', upload.single("profile"),userController.profile.patch);
router.delete('/profile', userController.profile.delete);

module.exports = router;
