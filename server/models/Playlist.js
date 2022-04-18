const Songs = require('./Songs');
/*
let playlists = [
    {
        "userId":1,
        "songs":[
            {
                "title":"Joker and the Queen",
                "songId":1
            },
            {
                "title":"For You",
                "songId":3
            }
        ]
    },
    {
        "userId": 2,
        "songs": [
            {
                "title":"Assassin",
                "songId":2
            },
            {
                "title":"Joker and the Queen",
                "songId":1
            },
            {
                "title":"For You",
                "songId":3
            }
        ]
    }
];

*/
let playlists = [];
module.exports = class Playlist{
    constructor(userId, songs) {
        this.userId = userId;
        this.songs = songs;
    }

    static findPlaylistByUserId(userId){
        console.log('finding playlist for user:: ', userId);
        const isPlaylistExist = playlists.findIndex(p=>p.userId == userId);
        if(isPlaylistExist > -1){
            return playlists[isPlaylistExist];
        }
        throw new Error('Playlist Not Found');
    }

    static addInPlaylist(userId, songs){
        let isPlaylistExist = playlists.findIndex(p=>p.userId = userId);
        if(isPlaylistExist > -1){
            console.log('Updating playlist for user :: ', userId);
            playlists[isPlaylistExist].songs= songs;
        }else{
            console.log('Creating new Playlist for user :: ', userId);
            const newPlaylist = new Playlist(userId, []);
            songs.forEach(s=>newPlaylist.songs.push(s));
            playlists.push(newPlaylist);
            console.log(playlists);
        }
        return playlists;
    }

    static getPlaylistsByUserId(userId){
        console.debug('Getting Playlist for User ID :: ', userId);
        return playlists.filter(p=>p.userId == userId)[0];
    }

}