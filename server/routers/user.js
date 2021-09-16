const express = require('express');
const router = express.Router();

const { usersController } = require("../controllers");

router.post('/signin', usersController.signin);
router.get('/signout',usersController.signout);
router.get('/userinfo',usersController.userinfo);
router.get('/token',usersController.token);
router.get('/duplication',usersController.duplication);

module.exports = router;
