const express = require('express');
const playlistController = require('../controllers/playlistController');

const router = express.Router();

router.post('/users/:userId', playlistController.addSongInPlaylist);
router.get('/users/:userId', playlistController.getPlaylistsByUserId);
router.get('/', playlistController.getPlaylists);
router.delete('/songs/:songId/users/:userId', playlistController.removeSongFromPlaylistByUserId);

module.exports = router;