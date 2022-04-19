let songs = [
    { id: 1, title: 'What is Love?', releaseDate: '2019-09-08', href: 'https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg' },
    { id: 2, title: 'Baby Can I hold You Tonight', releaseDate: '2016-10-32', href: 'https://actions.google.com/sounds/v1/alarms/bugle_tune.ogg' },
    { id: 3, title: 'Tenerife Sea', releaseDate: '2017-05-15', href: 'https://actions.google.com/sounds/v1/alarms/setting_alarm_clock.ogg' },
    { id: 4, title: 'Hotel Californication', releaseDate: '1998-10-32', href: 'https://actions.google.com/sounds/v1/alarms/radiation_meter.ogg' },
    { id: 5, title: 'Intersteller', releaseDate: '2021-07-32', href: 'https://actions.google.com/sounds/v1/animals/animal_bark_and_growl.ogg' },
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