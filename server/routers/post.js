const express = require('express');
const router = express.Router();
const { postController } = require("../controllers");

router.get('/charts',postController.charts);
router.post('/grade',postController.grade);
router.post('/good',postController.good);
router.get('/post',postController.post);
router.get('/hashtag',postController.hashtag);


module.exports = router;
