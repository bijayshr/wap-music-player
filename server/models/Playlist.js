const Songs = require('./Songs');
/**
 *
 * RESPONSE SAMPLE OF PLAYLIST
 *
 *
let playlist = [
        {
            "userId": "3",
            "songs":[
                {
                    "title":"Assassin",
                    "songId":2
                },
                {
                    "title":"Joker and The Queen",
                    "songId":2
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

    addSongInPlaylist(){
        let isPlaylistExist = playlists.findIndex(p=>p.userId == this.userId);
        if(isPlaylistExist > -1){
            console.log('Updating playlist for user :: ', this.userId);
            playlists[isPlaylistExist].songs= this.songs;
            return playlists[isPlaylistExist];
        }else{
            console.log('Original playlist :: ', playlists);
            playlists.push(this);
        }
        console.log('Final playlist :: ', playlists);
        return playlists[playlists.length-1];
    }

    static getPlaylistsByUserId(userId){
        console.debug('Getting Playlist for User ID :: ', userId);
        let playlist = playlists.filter(p => p.userId == userId)[0];
        if(playlist === undefined){
            return [];
        }
        console.log('Output :: ', playlist);
        return playlist;
    }

    static getPlaylist(){
        console.log('Playlist size :: ', playlists.length)
        return playlists;
    }

}