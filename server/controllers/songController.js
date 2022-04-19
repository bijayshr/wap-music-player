const Songs = require('../models/Songs');

exports.getSongs = (req, res, next)=>{
    if(req.query.title){
        let title = req.query.title.toLowerCase();
        res.status(200).json(Songs.findSongByTitle(title));
    }
    res.status(200).json(Songs.getSongs());
}

exports.getSongById = (req, res)=>{
    let songId = req.params.songId;
    res.status(200).json(Songs.findSongById(songId));
}