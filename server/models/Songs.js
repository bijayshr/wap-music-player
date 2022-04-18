let songs = [
    {
        songId: 1,
        title: "Joker and the Queen",
        releaseDate: "Feb 14, 2022"
    },
    {
        songId: 2,
        title: "Assassin",
        releaseDate: "March 02, 2022"
    },
    {
        songId: 3,
        title: "For You",
        releaseDate: "January 10, 2022"
    }
]

module.exports = class Songs{

    constructor(songId, title, releaseDate) {
        this.songId = songId;
        this.title = title;
        this.releaseDate = releaseDate;
    }

    static getSongs(){
        console.log('fetching songs ....');
        return songs;
    }

    static findSongById(songId){
        console.log('calling ... find song by id');
        console.log('song id :: ', songId);
       const isSongExist = songs.findIndex(s=>s.songId == songId);
       if(isSongExist > -1){
           return songs[isSongExist];
       }
    throw new Error('Song Not Fount')
    }
}