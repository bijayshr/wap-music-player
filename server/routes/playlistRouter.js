const express = require('express');
const playlistController = require('../controllers/playlistController');

const router = express.Router();

router.post('/', playlistController.addSongInPlaylist);
router.get('/', playlistController.getPlaylistsByUsername);
router.delete('/songs/:songId/', playlistController.removeSongFromPlaylistByUsername);
router.get('/all', playlistController.getPlaylists);

module.exports = router;