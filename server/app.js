const express = require('express');;
const User = require('./models/User');
const userRouter = require('./routes/userRouter');
const songRouter = require('./routes/songRouter');
const app = express();

const cors = require('cors');

app.use(cors());

app.use(express.json());

app.all('/*', (req, res, next) => {
    const secret = req.headers['secret'];
    console.log('secret :: ', secret);
    if (!User.hasAccess(secret)) {
        return res.status(400).send("Invalid Request.");
    }
    next();
});

app.use('/wap/users', userRouter);
app.use('/wap/songs', songRouter);

app.use((req, res, next) => {
    res.status(404).json({error: '/'+ req.METHOD + ' ' + req.url + 'API not accessible.'});
});

app.use((err, req, res, next) => {
    res.status(500).send('Something is wrong. Try again later: ' + err);
});

app.listen(process.env.PORT, () => {
    console.log('Server Listening to Port :: %s', process.env.PORT)
});