const StringGenerator = require('../utils/StringGenerator');

users = [
  {
    username: "john",
    password: "john",
    secret: "",
    playlist: [
      {
        id: 1,
        title: "What is Love?",
        releaseDate: "2019-09-08",
        source: "https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg",
      },
      {
        id: 2,
        title: "Baby Can I hold You Tonight",
        releaseDate: "2016-10-32",
        source: "https://actions.google.com/sounds/v1/alarms/bugle_tune.ogg",
      },
      {
        id: 3,
        title: "Tenerife Sea",
        releaseDate: "2017-05-15",
        source:
          "https://actions.google.com/sounds/v1/alarms/setting_alarm_clock.ogg",
      }
    ],
  },
  {
    username: "a",
    password: "a",
    secret: "",
    playlist: [
      {
        id: 4,
        title: "Hotel Californication",
        releaseDate: "1998-10-32",
        source:
          "https://actions.google.com/sounds/v1/ambiences/outside_night.ogg",
      },
      {
        id: 5,
        title: "Intersteller",
        releaseDate: "2021-07-32",
        source: "https://actions.google.com/sounds/v1/cartoon/clown_horn.ogg",
      },
    ],
  },
  {
    username: "matt",
    password: "matt",
    access_token: "",
    playlist: [
      {
        id: 6,
        title: "Life of Bijay S",
        releaseDate: "2014-10-32",
        source:
          "https://actions.google.com/sounds/v1/ambiences/outside_night.ogg",
      },
      {
        id: 7,
        title: "Mission Impossible",
        releaseDate: "1996-07-32",
        source: "https://actions.google.com/sounds/v1/cartoon/clown_horn.ogg",
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

  static hasAccess(secret) {
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
      console.log(`Removed Secret Key`);
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
