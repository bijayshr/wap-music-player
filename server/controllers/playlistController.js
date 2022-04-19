const Playlist = require('../models/Playlist');
const UserAuth = require('../models/UserAuth');

exports.findPlaylistByUserId = (req, res, next) => {
    res.status(200).json(Playlist.findPlaylistByUserId());
}

exports.addSongInPlaylist = (req, res) => {
    let song = req.body;
    let playList = {};
    let response = {};
    let username = UserAuth.findUsernameBySecret(req.headers['secret']);
    let userPlaylistObj = Playlist.getPlaylistsByUsername(username);
    if (userPlaylistObj) {
        if (Playlist.hasSong(song, username)) {
            throw new Error('Song already exists');
        }
        response = userPlaylistObj.addSongInPlaylist(song);
        res.status(200).json(response);
    } else {
        playList = new Playlist(username, [song]);
        response = playList.addSongInPlaylist();
        res.status(200).json(response);
    }


}

exports.getPlaylistsByUsername = (req, res) => {
    let username = UserAuth.findUsernameBySecret(req.headers['secret']);
    const response = Playlist.getPlaylistsByUsername(username);
    res.status(200).json(response);
}

exports.getPlaylists = (req, res) => {
    const response = Playlist.getPlaylist();
    res.status(200).json(response);
}

exports.removeSongFromPlaylistByUsername = (req, res) => {
    let { songId } = req.params;
    let username = UserAuth.findUsernameBySecret(req.headers['secret']);
    const response = Playlist.removeSongFromPlaylistByUsername(username, songId);
    res.status(200).json(response);
}