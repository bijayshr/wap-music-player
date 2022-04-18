const express = require('express');
const playlistController = require('../controllers/playlistController');

const router = express.Router();

router.post('/users/:userId', playlistController.addSongInPlaylist);
router.get('/users/:userId', playlistController.getPlaylistsByUserId);
router.get('/', playlistController.getPlaylists);

module.exports = router;