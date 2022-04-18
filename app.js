const express = require('express');
const app = express();
const userRouter = require('./routes/userRouter');
app.use(express.json());

app.use('/users', userRouter);
app.use((req, res, next)=>{

    req.send(`<h1>Hello World</h1>`);
})

app.listen(process.env.PORT, ()=>{
    console.log('Server Listening to Port :: %s', process.env.PORT)
})