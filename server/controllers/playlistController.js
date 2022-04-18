const Playlist = require('../models/Playlist');

exports.findPlaylistByUserId = (req, res, next)=>{
    res.status(200).json(Playlist.findPlaylistByUserId());
}

exports.addSongInPlaylist = (req, res)=>{
    let userId = req.params.userId;
    let songs = req.body.songs;
    const newPlaylist = new Playlist(userId, songs);
    const response =newPlaylist.addSongInPlaylist();
    res.status(200).json(response);
}

exports.getPlaylistsByUserId = (req, res) =>{
    let userId = req.params.userId;
    const response =Playlist.getPlaylistsByUserId(userId);
    res.status(200).json(response);
}

exports.getPlaylists = (req, res) =>{
    const response =Playlist.getPlaylist();
    res.status(200).json(response);
}

exports.removeSongFromPlaylistByUserId = (req, res) =>{
    let {userId, songId} = req.params;

    const response =Playlist.removeSongFromPlaylistByUserId(userId, songId);
    res.status(200).json(response);
}