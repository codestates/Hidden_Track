const express = require('express');
const router = express.Router();
const trackImage = require("../modules/trackimage");
const trackFile = require("../modules/trackfile");
const { trackController } = require("../controllers");


router.post('/', trackController.track.post);
router.patch('/', trackController.track.patch);
router.delete('/', trackController.track.delete);
router.get('/:trackId', trackController.track.redirect);

router.post('/grade',trackController.grade);
router.post('/good',trackController.good);
router.get('/hashtag/:tag',trackController.hashtag.redirect);
router.get('/genre/:genre',trackController.genre.redirect);

router.post('/trackimage',trackImage.single("trackimage"),trackController.trackimage.post);
router.patch('/trackimage',trackImage.single("trackimage"),trackController.trackimage.post);

router.post('/trackfile',trackFile.single("trackfile"),trackController.trackfile.post);
router.patch('/trackfile',trackFile.single("trackfile"),trackController.trackfile.post);

module.exports = router;
