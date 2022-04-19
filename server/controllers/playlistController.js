const Playlist = require('../models/Playlist');
const UserAuth = require('../models/UserAuth');

exports.findPlaylistByUserId = (req, res, next)=>{
    res.status(200).json(Playlist.findPlaylistByUserId());
}

exports.addSongInPlaylist = (req, res)=>{
    let songs = req.body.songs;
    let username = UserAuth.findUsernameBySecret(req.headers['secret']);
    const newPlaylist = new Playlist(username, songs);
    const response =newPlaylist.addSongInPlaylist();
    res.status(200).json(response);
}

exports.getPlaylistsByUsername = (req, res) =>{
    let username = UserAuth.findUsernameBySecret(req.headers['secret']);
    const response =Playlist.getPlaylistsByUsername(username);
    res.status(200).json(response);
}

exports.getPlaylists = (req, res) =>{
    const response =Playlist.getPlaylist();
    res.status(200).json(response);
}

exports.removeSongFromPlaylistByUsername = (req, res) =>{
    let {songId} = req.params;
    let username = UserAuth.findUsernameBySecret(req.headers['secret']);
    const response =Playlist.removeSongFromPlaylistByUsername(username, songId);
    res.status(200).json(response);
}