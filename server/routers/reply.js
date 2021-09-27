const express = require('express');
const router = express.Router();
const { replyController } = require("../controllers");

router.post('/', replyController.reply.post);
router.delete('/:id', replyController.reply.delete);
router.patch('/', replyController.reply.patch);

module.exports = router;
