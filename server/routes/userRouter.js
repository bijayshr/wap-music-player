const express = require('express');
const userAuthController = require('../controllers/userAuthController');

const router = express.Router();

router.get('/',userController.playlist);
router.post('/songs', userController.addSong);
router.delete('/songs/:songsId', userController.removeSong);

module.exports = router;
