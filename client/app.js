window.onload = function () {

    const message = "Welcome to Music Website";
    const songMessage = "Your Interested Songs";
    const playListMessage = "Your Playlist";
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
        const response = await fetch('http://localhost:3000/wap/playlists', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                "secret": sessionStorage.getItem('secret'),
            },
            body: JSON.stringify({
                songs: [
                    {
                        title: song.title,
                        songId: song.songId
                    }
                ]
            })
        }).then(response => {
            if (response.status === 200) {
                let isSongExist = JSON.parse(sessionStorage.getItem('user-playlist')).songs.findIndex(song => song.songId == song.songId);
                console.log('isSongexits:: ', isSongExist);
                if (isSongExist <0) {
                    addPlaylist(document.getElementById('tbl-playlists'), song);
                    let playlist = JSON.parse(sessionStorage.getItem('playlists'));
                    playlist.push(song);
                    sessionStorage.setItem('user-playlist', JSON.stringify(playlist));
                }
            }
        });
    }

    const addPlaylist = (table, song) => {
        console.log('adding playlistsong -->', song);
        let row = table.insertRow();
        let id = row.insertCell(0);
        let title = row.insertCell(1);
        let action = row.insertCell(2);
        id.innerHTML = song.songId;
        title.innerHTML = song.title;
        const div = document.createElement("div");
        div.classList = "d-grid gap-2 d-md-flex";
        
        const removeSong = document.createElement("button");
        removeSong.setAttribute("data-id", song.songId);
        removeSong.addEventListener("click", function (event) {
            event.preventDefault();
            //TODO:: // REOMOVE LOGIC REMAINING
        });
        removeSong.classList = "btn btn-sm remove-song";
        removeSong.innerHTML = '<i class="fa-solid fa-minus"></i>';
        div.append(removeSong);
        action.append(div);
    }

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
        console.log('user playlist :: ', sessionStorage.getItem('user-playlist') )
        createPlaylistTable();
    };


    function createPlaylistTable() {
        const div = document.createElement("div");
        div.innerHTML = `<h2>${playListMessage}</h2>`;
        let playlistTable = document.createElement('table');
        playlistTable.id = "tbl-playlists"
        playlistTable.classList = "table table-bordered"
        playlistTable.innerHTML = `<thead>
        <tr>
            <th scope="col">Id</th>
            <th scope="col">Title</th>
            <th scope="col">Action</th>
        </tr>
        </thead>
        <tbody></tbody>`;
        div.appendChild(playlistTable);
        document.getElementById("main-container").appendChild(div);
    }

    const composePlaylistTable = (table, song, callback) => {
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

}