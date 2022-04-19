const Songs = require('./Songs');
/**
 *
 * RESPONSE SAMPLE OF PLAYLIST
 *
 *
let playlist = [
        {
            "username": "3-1231241",
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
    constructor(username, songs) {
        this.username = username;
        this.songs = songs;
    }

    static findPlaylistByUsername(username){
        console.log('finding playlist for user:: ', username);
        const isPlaylistExist = playlists.findIndex(p=>p.username === username);
        if(isPlaylistExist > -1){
            return playlists[isPlaylistExist];
        }
        throw new Error('Playlist Not Found');
    }

    addSongInPlaylist(){
        let isPlaylistExist = playlists.findIndex(p=>p.username === this.username);
        if(isPlaylistExist > -1){
            console.log('Updating playlist for user :: ', this.username);
            playlists[isPlaylistExist].songs= this.songs;
            return playlists[isPlaylistExist];
        }else{
            console.log('Original playlist :: ', playlists);
            playlists.push(this);
        }
        console.log('Final playlist :: ', playlists);
        return playlists[playlists.length-1];
    }

    static getPlaylistsByUsername(username){
        let isPlaylistExist = playlists.findIndex(p=>p.username === username);
        if(isPlaylistExist > -1){
            return playlists[isPlaylistExist];
        }else{
            return new Playlist(username, []);
        }
    }

    static getPlaylist(){
        console.log('Playlist size :: ', playlists.length)
        return playlists;
    }

    static removeSongFromPlaylistByUsername(username, songId){
        let isPlaylistExist = playlists.findIndex(p=>p.username == username);
        if(isPlaylistExist > -1){
            let songArr = playlists[isPlaylistExist].songs;
            let isSongIndex = songArr.findIndex(song=>song.songId == songId);
            if(isSongIndex > -1){
                songArr.splice(isSongIndex, 1);
                return playlists[isPlaylistExist];
            }
        }
        throw new Error('Song doesn\'t exist for the user.');
    }

}