const Songs = require('../models/Songs');
const path = require('path');

exports.getSongs = (req, res, next)=>{
    if(req.query.title){
        let title = req.query.title.toLowerCase();
        res.status(200).sendFile().json(Songs.findSongByTitle(title));
    }
    res.status(200).json(Songs.getSongs());
}

exports.getSongById = (req, res)=>{
    let songId = req.params.songId;
    res.status(200).json(Songs.findSongById(songId));
}

exports.showSongPage = (req, res) =>{
    const songPage = path.join(__dirname, "..","..", "client", "dashboard.html");
    res.status(200).sendfile(songPage);
}