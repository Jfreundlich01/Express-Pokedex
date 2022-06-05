const express = require('express');
const app = require('liquid-express-views')(express())

port = 3000;

app.listen(port,() =>{
    console.log("listening on port:", port)
})

