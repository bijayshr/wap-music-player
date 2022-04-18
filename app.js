const express = require('express');

const app = express();


app.listen(process.env.PORT, ()=>{
    console.log('Server Listening to Port :: %s', process.env.PORT)
})