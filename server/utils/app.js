const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());

app.use(express.json());

const userRouter = require('./routes/userRouter');
const songRouter = require('./routes/songRouter');
const playlistRouter = require('./routes/playlistRouter');
const dashboardRouter = require('./routes/dashboardRouter');
const UserAuth = require('./models/UserAuth');


app.all('/*', (req, res, next) => {
    const secret = req.headers['secret'];
    console.log('secret :: ', secret);
    if (!UserAuth.isAuthenticated(secret)) {
        return res.status(400).send("Invalid Request.");
    } else{
        next();
    }
});
app.use('/wap/users', userRouter);
app.use('/wap/songs', songRouter);
app.use('/wap/playlists', playlistRouter);
app.use('/wap/dashboard', dashboardRouter);


app.use((req, res, next) => {
    res.status(404).json({ error: req.url + ' API not supported for request method '+ req.method });
});


app.use((err, req, res, next) => {
        res.status(500).json({ error: 'Something is wrong! Try later' });
});
app.listen(process.env.PORT, () => {
    console.log('Server Listening to Port :: %s', process.env.PORT)
})