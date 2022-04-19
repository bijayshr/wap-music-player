const express = require('express');
const playlistController = require('../controllers/playlistController');

const router = express.Router();

router.post('/users/:userId', playlistController.addSongInPlaylist);
router.get('/users/:userId', playlistController.getPlaylistsByUserId);
router.delete('/songs/:songId/users/:userId', playlistController.removeSongFromPlaylistByUserId);
router.get('/', playlistController.getPlaylists);

module.exports = router;