const express = require('express');
const playlistController = require('../controllers/playlistController');

const router = express.Router();

router.post('/users/:userId', playlistController.addInPlaylist);
router.get('/users/:userId', playlistController.getPlaylistsByUserId);

module.exports = router;