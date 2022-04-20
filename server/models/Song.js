let songs = [
    {
        id: 1,
        title: 'Batman Theme',
        releaseDate: '2022-01-01',
        href: 'https://www.dropbox.com/s/3vxg6iy3zym09y2/Batman%20Theme%20%282022%29%20But%20only%20the%20Good%20Part.mp3'
    },
    {
        id: 2,
        title: 'Baby Can I hold You Tonight',
        releaseDate: '2016-10-32',
        href: 'https://www.dropbox.com/s/gp79cv8arwph6bj/Tracy%20Chapman%20-%20Baby%20Can%20I%20Hold%20You%20%28Official%20Music%20Video%29.mp3'
    },
    {
        id: 3,
        title: 'Tenerife Sea',
        releaseDate: '2017-05-15',
        href: 'https://www.dropbox.com/s/ibu54ya5y5a72rr/Ed%20Sheeran%20-%20Tenerife%20Sea.mp3'
    },
    {
        id: 4,
        title: 'Hotel California',
        releaseDate: '1998-10-32',
        href: 'https://www.dropbox.com/s/70gthnxuti486r3/Hotel%20California%20%282013%20Remaster%29.mp3'
    },
    {
        id: 5,
        title: 'Intersteller',
        releaseDate: '2021-07-32',
        href: 'https://www.dropbox.com/s/0wr881rxa47s4qm/Interstellar%20-%20Main%20Theme%20-%20Hans%20Zimmer%20%28Epic%20instrumental_piano%20cover%29.mp3'
    },
]

module.exports = class Song {

    constructor(id, title, releaseDate, source) {
        this.id = id;
        this.title = title;
        this.releaseDate = releaseDate;
        this.href = href;
    }

    static searchQuery(query) {
        return songs.filter(song => song.title.toLowerCase().includes(query.toLowerCase()));
    }

    static findAll() {
        return songs;
    }

}