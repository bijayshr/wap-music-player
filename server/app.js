const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());

app.use(express.json());



const path = require("path");


app.all('/*', (req, res, next) => {
    const secret = req.headers['secret'];
    console.log('secret :: ', secret);
    if (!UserAuth.isAuthenticated(secret)) {
        return res.status(400).send("Invalid Request.");
    }
    next();
});
const UserAuth = require('./models/UserAuth');
const dashboardRouter = require('./routes/dashboardRouter');
const userRouter = require('./routes/userRouter');
const songRouter = require('./routes/songRouter');
const playlistRouter = require('./routes/playlistRouter');

app.use('/wap/users', userRouter);
app.use('/wap/songs', songRouter);
app.use('/wap/playlists', playlistRouter);
app.use('/wap/dashboard', dashboardRouter);



app.use((err, req, res, next) => {
    res.status(500).send('Something is wrong. Try again later: ' + err);
})

app.listen(process.env.PORT, () => {
    console.log('Server Listening to Port :: %s', process.env.PORT)
})