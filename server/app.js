const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());

app.use(express.json());

const userRouter = require('./routes/userRouter');
const songRouter = require('./routes/songRouter');
const playlistRouter = require('./routes/playlistRouter');


app.use('/wap/users', userRouter);
app.use('/wap/songs', songRouter);
app.use('/wap/playlists', playlistRouter);

app.use((req, res, next)=>{
    res.status(200).send(`<h1>Hello World</h1>`);
})

app.use((err, req, res, next)=>{
    res.status(500).send('Something is wrong. Try again later: ' + err);
})

app.listen(process.env.PORT, ()=>{
    console.log('Server Listening to Port :: %s', process.env.PORT)
})