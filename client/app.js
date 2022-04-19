window.onload = function () {

    const message = "Welcome to Music Website";
    const songMessage = "Your Interested Songs";
    document.getElementById('msg').innerHTML = `<h1>${message}</h1>`;

    document.getElementById('loginBtn').onclick = function () {
        let uname = document.getElementById('uname');
        let pswd = document.getElementById('pswd');

        fetch('http://localhost:3000/wap/users/login', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify({
                username: uname.value,
                password: pswd.value
            })
        }).then((response) => {
            if (response.status === 200) {
                return response.json();
            }
            throw new Error('Something went wrong, try again later!')
        }).then(json => {
            sessionStorage.setItem('secret', json);
            // window.location.href = 'http://localhost:3000/wap/dashboard';
            getInterestedSongsList();
            getPlaylistsByUsername();
            uname.style.display = 'none';
            pswd.style.display = 'none';
            document.getElementById('loginBtn').style.display = 'none';
            document.getElementById('logoutBtn').style.display = 'block'
            document.getElementById('msg').style.display = 'none';
        }).catch(err => {
            console.log('err :: ', err);
        })
    };

    document.getElementById('logoutBtn').onclick = function () {
        document.getElementById('loginBtn').style.display = 'inline-block';
        document.getElementById('logoutBtn').style.display = 'none';
        document.getElementById('uname').style.display = 'inline-block';
        document.getElementById('pswd').style.display = 'inline-block';
        document.querySelector('#tbl-songs').style.display = 'none';
        sessionStorage.clear();
    }

    async function getInterestedSongsList() {
        let songs = [];
        songs = await fetch('http://localhost:3000/wap/songs', {
            method: 'GET',
            headers: {
                'secret': sessionStorage.getItem('secret')
            },
        }).then(response => response.json());
        sessionStorage.setItem("songs", JSON.stringify(songs));
        createInterestedSongTable();
        songs.forEach((song) => {
            composeSongTable(document.getElementById('tbl-songs').getElementsByTagName('tbody')[0],
                song, (e) => {
                    e.preventDefault();
                    addSongInPlayList(song)
                });
        });

    }

    function createInterestedSongTable() {
        const div = document.createElement("div");
        div.innerHTML = `<h2>${songMessage}</h2>`;
        let songTable = document.createElement('table');
        songTable.id = "tbl-songs"
        songTable.classList = "table table-bordered"
        songTable.innerHTML = `<thead>
        <tr>
            <th scope="col">Id</th>
            <th scope="col">Title</th>
            <th scope="col">Release Date</th>
            <th scope="col">Action</th>
        </tr>
        </thead>
        <tbody></tbody>`;
        div.appendChild(songTable);
        document.getElementById("main-container").appendChild(div);
    }

    const composeSongTable = (table, song, callback) => {
        const addSong = document.createElement('button');
        addSong.setAttribute("data-id", song.id);
        addSong.addEventListener("click", callback);
        addSong.classList = "btn btn-sm";
        addSong.innerHTML = '<i class="fa-solid fa-plus"></i>';
        let row = table.insertRow();
        let id = row.insertCell(0);
        let title = row.insertCell(1);
        let releaseDate = row.insertCell(2);
        let action = row.insertCell(3);
        id.innerHTML = song.songId;
        title.innerHTML = song.title;
        releaseDate.innerHTML = song.releaseDate;
        action.append(addSong);
    }


    async function addSongInPlayList(song) {
        console.log('song :: ', song);
        const result = await fetch('http://localhost:3000/wap/playlists', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                "secret": sessionStorage.getItem('secret'),
            },
            body: JSON.stringify({
                title: song.title,
                songId: song.songId
            }),
        }).then(res => {
            if (res.status === 200) {
                if (sessionStorage.getItem("user-playlists") == null) {
                    sessionStorage.setItem("user-playlists", JSON.stringify([]));
                }
                let songIndex = JSON.parse(
                    sessionStorage.getItem("user-playlists")
                ).findIndex((song) => song.id == element.id);
                if (songIndex < 0) {
                    if (JSON.parse(sessionStorage.getItem("user-playlists")).length == 0) {
                        document.getElementById("playlist-container").remove();
                        playlistTables();
                    }
                    let playlistTable = document
                        .getElementById("playlist")
                        .getElementsByTagName("tbody")[0];
                    addPlaylistRow(playlistTable, element);
                    let playlist = JSON.parse(sessionStorage.getItem("playlists"));
                    playlist.push(element);
                    sessionStorage.setItem("playlists", JSON.stringify(playlist));
                    alert("Added successfully");
                }
            }
        });
    }


    const addPlaylistRow = (table, element) => {
        let row = table.insertRow();
        let id = row.insertCell(0);
        let title = row.insertCell(1);
        let action = row.insertCell(2);
        id.innerHTML = element.id;
        title.innerHTML = element.title;
        const actionDiv = document.createElement("div");
        actionDiv.classList = "d-grid gap-2 d-md-flex";
        const removeSong = document.createElement("button");
        removeSong.setAttribute("data-id", element.id);
        removeSong.addEventListener("click", function (event) {
            event.preventDefault();
            console.log(`Removing song ${element.id}`);
            fetch("http://localhost:3001/api/playlists/tracks/" + element.id, {
                method: "DELETE",
                headers: {
                    "x-access-token": sessionStorage.getItem("access_token"),
                },
            }).then((response) => {
                if (response.status == 200) {
                    alert("Delete successfully");
                }
                row.remove();
                let playlist = JSON.parse(sessionStorage.getItem("playlists"));
                let index = playlist.findIndex((song) => song.id == element.id);
                if (index > -1) {
                    playlist.splice(index, 1);
                }
                if (playlist.length === 0) {
                    document.getElementById("playlist-container").remove();
                    emptyPlaylist();
                }
                sessionStorage.setItem("playlists", JSON.stringify(playlist));
                let currentPlay = document.getElementById("play-pause-link").dataset.id;
                if (currentPlay == element.id) {
                    resetAudio();
                }
            });
        });
        removeSong.classList = "btn btn-sm remove-song";
        removeSong.innerHTML = '<i class="fa-solid fa-minus"></i>';
        const playSong = document.createElement("button");
        playSong.addEventListener("click", function (event) {
            event.preventDefault();
            console.log(`Playing song ${element.id}`);
            audioPlayer(element.source, element.id, element.title);
            document.getElementById("play-pause-link").click();
        });
        playSong.classList = "btn btn-sm play-song";
        playSong.innerHTML = '<i class="fa-solid fa-play"></i>';
        actionDiv.append(removeSong);
        actionDiv.append(playSong);
        action.append(actionDiv);
    };

    async function getPlaylistsByUsername() {
        let playlistByUsername = [];
        playlistByUsername = await fetch('http://localhost:3000/wap/playlists/', {
            method: 'GET',
            headers: {
                'secret': sessionStorage.getItem('secret')
            }
        }).then(response => response.json());
        console.log('-------> response :: ', playlistByUsername);
        sessionStorage.setItem('user-playlist', JSON.stringify(playlistByUsername));
        console.log('user playlist :: ', sessionStorage.getItem('user-playlist'))
        createPlaylistTable();
    };

    function playlistTables() {
        if (document.getElementById("playlist-container")) {
            document.getElementById("playlist-container").remove();
        }
        const div = document.createElement("div");
        div.classList = "content";
        div.id = "playlist-container";
        div.innerHTML = `<h1>Your Playlist</h1>`;
        const playlistTable = document.createElement("table");
        playlistTable.classList = "table  table-bordered";
        playlistTable.id = "playlist";
        playlistTable.innerHTML = `<thead>
                                    <tr>
                                        <th scope="col">Id</th>
                                        <th scope="col">Title</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead><tbody></tbody>`;
        div.appendChild(playlistTable);
        document.getElementById("container-fluid").appendChild(div);
        document.getElementById("footer").style.display = "block";
    }


}