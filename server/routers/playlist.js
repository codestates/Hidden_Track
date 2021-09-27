const express = require('express');
const router = express.Router();
const { playlistController } = require("../controllers");

router.post('/', playlistController.playlist.post);
router.delete('/', playlistController.playlist.delete);
router.get('/', playlistController.playlist.get);

module.exports = router;
