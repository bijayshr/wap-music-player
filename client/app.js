window.onload = function () {

    document.getElementById('loginBtn').onclick = function () {
        let uname = document.getElementById('uname').value;
        let pswd = document.getElementById('pswd').value;

        fetch('http://localhost:3000/wap/users/login', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify({
                username: uname,
                password: pswd
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
            getPlaylistsByUserId();
        }).catch(err => {
            console.log('err :: ', err);
        })
    };



    async function getInterestedSongsList() {
        let songs = [];
        songs = await fetch('http://localhost:3000/wap/songs', {
            method: 'GET',
            headers: {
                'secret': sessionStorage.getItem('secret')
            },
        }).then(response => response.json())
            .then(data => {
                songs = data
                console.log('songs :: ', songs);
                return songs;
            });
        createInterestedSongTable(songs);
    };

    function createInterestedSongTable(songs) {
        let interestedSongTbl = document.querySelector('#songs-table');
        let headers = ['Id', 'Title', 'Release Date', 'Actions'];
        let table = document.createElement('table');
        let headerRow = document.createElement('tr');

        headers.forEach(headerTxt => {
            let header = document.createElement('th');
            let textNode = document.createTextNode(headerTxt);
            header.appendChild(textNode);
            headerRow.appendChild(header);
        });
        table.appendChild(headerRow);
        console.log('songs :: ', songs);
        songs.forEach(song => {
            let row = document.createElement('tr');
            Object.values(song).forEach(text => {
                let cell = document.createElement('td');
                let textNode = document.createTextNode(text);
                cell.appendChild(textNode);
                row.appendChild(cell);
            })

            table.appendChild(row);
        })
        interestedSongTbl.appendChild(table);
    }

    async function getPlaylistsByUserId() {
        let playlistByUserIdArr = [];
        playlistByUserIdArr = await fetch('http://localhost:3000/wap/playlists/users/', {
            method: 'GET',
            headers: {
                'secret': sessionStorage.getItem('secret')
            }
        }).then(response => response.json())
            .then(data => {
                playlistByUserIdArr = data
                return playlistByUserIdArr;
            });

        let playlistSongTbl = document.getElementById("playlist-tbl");

        let txt = "";
        txt = "<tr><th>Id</th><th>Song Title</th><th>Actions</th></tr>";
        let count = 1;
        for (let i = 0; i < playlistByUserIdArr.songs.length; i++) {
            txt += "<tr>";
            txt += "<td>" + count++ + "</td>";
            txt += "<td>" + playlistByUserIdArr.songs[i].title + "</td>";
            txt += "<td>" + "<button type='button' class='btn' onclick='removeFromPlaylist(this)'>" + "Remove" + "</button>" + "</td>";
            txt += "</tr>";
        }
        playlistSongTbl.innerHTML = txt;
    };

}