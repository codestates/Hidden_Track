const express = require('express');
const router = express.Router();
const { trackController } = require("../controllers");

router.post('/', trackController.track.post);


module.exports = router;
