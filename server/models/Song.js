let songs = [
    {
        id: 1,
        title: 'Batman Theme',
        releaseDate: '2022-01-01',
        href: 'https://actions.google.com/sounds/v1/animals/distant_dog_barking.ogg'
    },
    {
        id: 2,
        title: 'Baby Can I hold You Tonight',
        releaseDate: '2016-10-32',
        // href: 'https://www.dropbox.com/s/gp79cv8arwph6bj/Tracy%20Chapman%20-%20Baby%20Can%20I%20Hold%20You%20%28Official%20Music%20Video%29.mp3'
        // href: 'https://drive.google.com/file/d/1Y5VZvIGuaQYHoUy8ukZuB9sgSVd5K7OY/view?usp=sharing'
        href: 'https://actions.google.com/sounds/v1/ambiences/factory_background.ogg'
    },
    {
        id: 3,
        title: 'Tenerife Sea',
        releaseDate: '2017-05-15',
        href: 'https://actions.google.com/sounds/v1/cartoon/cowbell_ringing.ogg'
    },
    {
        id: 4,
        title: 'Hotel California',
        releaseDate: '1998-10-32',
        // href: 'https://www.dropbox.com/s/70gthnxuti486r3/Hotel%20California%20%282013%20Remaster%29.mp3'
        href: 'https://actions.google.com/sounds/v1/foley/bottle_cap_open.ogg'
    },
    {
        id: 5,
        title: 'Intersteller',
        releaseDate: '2021-07-32',
        href: 'https://actions.google.com/sounds/v1/cartoon/drum_roll.ogg'
    },
]

module.exports = class Song {

    constructor(id, title, releaseDate, href) {
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