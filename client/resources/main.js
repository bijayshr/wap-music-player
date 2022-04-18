window.onload = function () {

    document.getElementById('loginBtn').onclick = function(){
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
        }).then((response)=>{
            if(response.status ===200) {
                return response.json();
            }
            throw new Error('Something went wrong, try again later!')
        }).then(json=>{
            console.log('response :: ', json);
            sessionStorage.setItem('secret', json);
            window.location.href = "http://localhost:3000/wap/songs";
        }).catch(err=>{
            console.log('err :: ', err);
        })
    };

    document.getElementById()
}