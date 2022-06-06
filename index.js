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
let index= []

app.get('/pokedex', (req,res) =>{
    res.render('index', 
    {
        allPokemon: pokemonArr
    }
    
    )
})
app.get('/pokedex/new', (req,res) => {
    res.render('new',{

    })
})

app.post('/pokedex', (req,res) => {
    pokemonArr.push(req.body)
    console.log(pokemonArr.slice((pokemonArr.length - 2), pokemonArr.length))
    res.redirect('/pokedex')
})

app.get('/pokedex/:indexOfPokemon', (req,res) =>{

    console.log(index)
    res.render('show', 
    {
        pokemon: pokemonArr[req.params.indexOfPokemon],
        currentIndex : req.params.indexOfPokemon
        // currentIndex: index[0]

    }
    )
})

app.delete('/pokedex/:indexOfPokemon', (req,res) =>{
    console.log("i deleted")
    pokemonArr.splice(req.params.indexOfPokemon, 1)
    res.redirect("/pokedex")
})












app.listen(port,() =>{
    console.log("listening on port:", port)
})