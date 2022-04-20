const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/',userController.playlist);
router.post('/songs', userController.addSong);
router.delete('/songs/:songsId', userController.removeSong);

module.exports = router;
