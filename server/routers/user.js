const express = require('express');
const router = express.Router();

const { usersController } = require("../controllers");

router.post('/signin', usersController.signin);

module.exports = router;
