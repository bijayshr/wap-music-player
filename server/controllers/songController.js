const Songs = require('../models/Songs');

exports.getSongs = (req, res, next)=>{
    res.status(200).json(Songs.getSongs());
}

exports.getSongById = (req, res)=>{
    let songId = req.params.songId;
    res.status(200).json(Songs.findSongById(songId));
}