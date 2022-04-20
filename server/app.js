const express = require('express');;
const User = require('./models/User');
const userAuthRouter = require('./routes/userAuthRouter');
const userPlaylistRouter = require('./routes/UserPlaylistRouter');
const songRouter = require('./routes/songRouter');
const app = express();

const cors = require('cors');

app.use(cors());

app.use(express.json());

app.use('/wap/auth/users/', userAuthRouter);

app.all('/*', (req, res, next) => {
    const secret = req.headers['secret'];
    if (!User.hasAccess(secret)) {
        return res.status(400).send("Invalid Request.");
    }
    next();
});

app.use('/wap/playlists', userPlaylistRouter);
app.use('/wap/songs', songRouter);

app.use((req, res, next) => {
    res.status(404).json({error: '/'+ req.method + ' ' + req.url + 'API not accessible.'});
});

app.use((err, req, res, next) => {
    res.status(500).send('Something is wrong. Try again later: ' + err);
});

app.listen(process.env.PORT, () => {
    console.log('Server Listening to Port :: %s', process.env.PORT)
});