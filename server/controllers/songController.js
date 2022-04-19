const Song = require('../models/Song');

exports.findAll = (req,res,next) => {
    let query = req.query.searchQuery;
    if(query!=null || query!=undefined){
        res.status(200).json(Song.searchQuery(query));
    } else {
        res.status(200).json(Song.findAll());
    }
}