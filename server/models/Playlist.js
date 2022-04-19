/**
 * TODO:// Do During Free time.
 * 
 */



// const Songs = require('./Songs');




// let playlists = [];
// module.exports = class Playlist {
//     constructor(username, songs) {
//         this.username = username;
//         this.songs = songs;
//     }

//     static findPlaylistByUsername(username) {
//         console.log('finding playlist for user:: ', username);
//         const isPlaylistExist = playlists.findIndex(p => p.username === username);
//         if (isPlaylistExist > -1) {
//             return playlists[isPlaylistExist];
//         }
//         throw new Error('Playlist Not Found');
//     }

//     addSongInPlaylist(song) {
//         let isPlaylistExist = playlists.findIndex(p => p.username === this.username);
//         if (isPlaylistExist > -1) {
//             playlists[isPlaylistExist].songs.push(song);
//             return playlists[isPlaylistExist];
//         } else {
//             playlists.push(this);
//         }
//         return playlists;
//     }

//     static getPlaylistsByUsername(username) {
//         let isPlaylistExist = playlists.findIndex(p => p.username === username);
//         if (isPlaylistExist > -1) {
//             return playlists[isPlaylistExist];
//         } else {
//             playlists = [];
//             return playlists;
//         }
//     }

//     static removeSongFromPlaylistByUsername(username, songId) {
//         let isPlaylistExist = playlists.findIndex(p => p.username == username);
//         if (isPlaylistExist > -1) {
//             let songArr = playlists[isPlaylistExist].songs;
//             let isSongIndex = songArr.findIndex(song => song.id == songId);
//             if (isSongIndex > -1) {
//                 songArr.splice(isSongIndex, 1);
//                 return playlists[isPlaylistExist];
//             }
//         }
//         throw new Error('Song doesn\'t exist for the user.');
//     }

//     static hasSong(song, username) {
//         const playlist = Playlist.getPlaylistsByUsername(username);
//         console.log('------>a', playlist)
//         if (playlist.size > 0) {
//             console.log('------>=b')
//             if (playlist.songs.findIndex(s => s.songId == song.id) >= 0) {
//                 return true;
//             }
//         }
//         console.log('------>c')
//         return false;
//     }

//     static hasPlaylistsByUsername(username) {
//         let isPlaylistExist = playlists.findIndex(p => p.username === username);
//         if (isPlaylistExist > -1) {
//             return true;
//         }
//         return false
//     }



//     /**
//      * 
//      * @returns TO BE DONE IN FREE TIME
//      */
//     // addSongsInPlaylist() {
//     //     let isPlaylistExist = playlists.findIndex(p => p.username === this.username);
//     //     console.log('isPlaylistExist ::', isPlaylistExist);
//     //     if (isPlaylistExist > -1) {
//     //         let len = playlists[isPlaylistExist].songs.length;
//     //         console.log('len :: ', len);
//     //         if (len == 0) {
//     //             console.log('len is zeero, ', len);
//     //             playlists.songs.push(this.songs);
//     //         } else {
//     //             console.log('len is not zeo');
//     //             for (let i = 0; i < len; i++) {
//     //                 for (let j = 0; j < this.songs.length; j++) {
//     //                     console.log('---->',playlists[isPlaylistExist].songs);
//     //                     console.log('+++++>', this.songs[j]);
//     //                     if (!objectsEqual(playlists[isPlaylistExist].songs[i], ))) {
//     //                         console.log('song id is not a match ****');
//     //                         playlists[isPlaylistExist].songs.push(this.songs[j]);
//     //                     }
//     //                 }
//     //             }
//     //         }
//     //         console.log('final playlist ;: ', playlists[isPlaylistExist]);
//     //         return playlists[isPlaylistExist];
//     //     } else {
//     //         console.log('new push');
//     //         playlists.push(this);
//     //     }
//     //     console.log('Final playlist :: ', playlists);
//     //     return playlists[playlists.length - 1];
//     // }


//     // objectsEqual = (o1, o2) =>
//     //     Object.keys(o1).length === Object.keys(o2).length
//     //     && Object.keys(o1).every(p => o1[p] === o2[p]);

// }