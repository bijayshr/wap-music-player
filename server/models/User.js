const StringGenerator = require('../utils/StringGenerator');

let users = [
  {
    username: "john",
    password: "john",
    secret: "",
    playlist: [
      {
        id: 1,
        title: "Batman Theme",
        releaseDate: "22022-01-01",
        href: "https://www.dropbox.com/s/3vxg6iy3zym09y2/Batman%20Theme%20%282022%29%20But%20only%20the%20Good%20Part.mp3",
      },
      {
        id: 2,
        title: "Baby Can I hold You Tonight",
        releaseDate: "2016-10-32",
        href: "https://www.dropbox.com/s/gp79cv8arwph6bj/Tracy%20Chapman%20-%20Baby%20Can%20I%20Hold%20You%20%28Official%20Music%20Video%29.mp3",
      },
      {
        id: 3,
        title: "Tenerife Sea",
        releaseDate: "2017-05-15",
        href:
          "https://www.dropbox.com/s/ibu54ya5y5a72rr/Ed%20Sheeran%20-%20Tenerife%20Sea.mp3",
      }
    ],
  },
  {
    username: "bijay",
    password: "bijay",
    secret: "",
    playlist: [
      {
        id: 1,
        title: "Batman Theme",
        releaseDate: "22022-01-01",
        href: "https://www.dropbox.com/s/3vxg6iy3zym09y2/Batman%20Theme%20%282022%29%20But%20only%20the%20Good%20Part.mp3",
      },
      {
        id: 3,
        title: "Tenerife Sea",
        releaseDate: "2017-05-15",
        href:
            "https://www.dropbox.com/s/ibu54ya5y5a72rr/Ed%20Sheeran%20-%20Tenerife%20Sea.mp3",
      }
    ],
  },
  {
    username: "matt",
    password: "matt",
    access_token: "",
    playlist: [
      {
        id: 1,
        title: 'Batman Theme',
        releaseDate: '2022-01-01',
        href: 'https://www.dropbox.com/s/3vxg6iy3zym09y2/Batman%20Theme%20%282022%29%20But%20only%20the%20Good%20Part.mp3'
      },
      {
        id: 5,
        title: 'Intersteller',
        releaseDate: '2021-07-32',
        href: 'https://www.dropbox.com/s/0wr881rxa47s4qm/Interstellar%20-%20Main%20Theme%20-%20Hans%20Zimmer%20%28Epic%20instrumental_piano%20cover%29.mp3'
      },
    ],
  },
];

module.exports = class User {
  constructor(username, password, playlist) {
    this.username = username;
    this.password = password;
    this.playlist = playlist;
  }

  static isAuthenticated(secret) {
    let index = users.findIndex((user) => user.secret == secret);
    if (index >= 0) {
      return true;
    }
    return false;
  }

  static addSongToPlaylist(username, song) {
    let index = users.findIndex((user) => user.username == username);
    if (!User.isSongExist(username, song)) {
      users[index].playlist.push(song);
    }
  }

  static removeSongFromPlaylist(username, trackId) {
    let index = users.findIndex((user) => user.username == username);
    let songIndex = users[index].playlist.findIndex(
      (song) => song.id == trackId
    );
    users[index].playlist.splice(songIndex, 1);
  }

  static isSongExist(username, song) {
    let index = users.findIndex((user) => user.username == username);
    if (users[index].playlist.findIndex((s) => s.id == song.id) >= 0) {
      return true;
    }
    return false;
  }

  static findPlaylistByUserName(username) {
    return users.find((user) => user.username == username).playlist;
  }

  static findUserBySecret(secret) {
    return users.find((user) => user.secret == secret).username;
  }

  static logout(secret){
    let index = users.findIndex((user) => user.secret == secret);
    if(index>-1){
      users[index].secret ='';
      console.debug(` ******* Removed Secret Key ***********`);
    }
  }

  static login(username, password) {
    let index = users.findIndex(
      (user) => user.username == username && user.password == password
    );
    if (index < 0) {
      throw new Error('User Not Found');
    }
    let secret = StringGenerator.generateString(username);
    users[index].secret = secret;
    return secret;
  }
};
