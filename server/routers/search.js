const express = require('express');
const router = express.Router();
const { searchController } = require('../controllers');

router.get('/', searchController.search);
router.get('/hashtag', searchController.hashtag);
module.exports = router;
