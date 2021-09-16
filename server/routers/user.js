const express = require('express');
const router = express.Router();

const { usersController } = require("../controllers");

router.post('/signin', usersController.signin);
router.post('/signup',usersController.signup);
router.get('/signout',usersController.signout);
router.get('/userinfo',usersController.userinfo);
router.get('/token',usersController.token);
router.get('/duplication',usersController.duplication);
router.patch('/password',usersController.password);
module.exports = router;
