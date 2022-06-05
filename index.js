const express = require('express');
const app = require('liquid-express-views')(express())
const methodOverRide = require('method-override')
port = 3000;
const pokemonArr = require('./pokedex/models/pokemon.js')

//Middleware
app.use((req, res, next) => {
    console.log('I run for all routes');
    next();
});
app.use(express.static('public'))
app.use(express.urlencoded({extended:false}));
app.use(methodOverRide('_method'))


app.get('/pokedex', (req,res) =>{
    res.render('index', 
    {
        allPokemon: pokemonArr
    }
    
    )
})










app.listen(port,() =>{
    console.log("listening on port:", port)
})