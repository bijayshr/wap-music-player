const Playlist = require('../models/Playlist');

exports.findPlaylistByUserId = (req, res, next)=>{
    res.status(200).json(Playlist.findPlaylistByUserId());
}

exports.addInPlaylist = (req, res)=>{
    let userId = req.params.userId;
    let songs = req.body.songs;
    res.status(200).json(Playlist.addInPlaylist(userId, songs));
}

exports.getPlaylistsByUserId = (req, res) =>{
    let userId = req.params.userId;
    res.status(200).json(Playlist.getPlaylistsByUserId(userId));
}