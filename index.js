const express = require('express');
const app = require('liquid-express-views')(express())
const methodOverride = require('method-override')
port = 3000;
const pokemonArr = require('./pokedex/models/pokemon.js')

//Middleware
app.use((req, res, next) => {
    console.log('I run for all routes');
    next();
});
app.use(express.static('public'))
app.use(express.urlencoded({extended:false}));
app.use(methodOverride('_method'))
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
    let newPokemon = {
        name: req.body.name,
        img: req.body.img,
        type: [req.body.type1,req.body.type2]
    }
    pokemonArr.push(newPokemon)
    console.log(req.body.type)
    console.log(pokemonArr.slice((pokemonArr.length - 2), pokemonArr.length))
    res.redirect('/pokedex')
})

app.get('/pokedex/:indexOfPokemon', (req,res) =>{

    console.log(req.body)
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

let currentIndex = ""
app.get('/pokedex/:indexOfPokemon/edit', (req,res) =>{
    currentIndex = req.params.indexOfPokemon
    res.render(
        "edit", {
            pokemon: pokemonArr[req.params.indexOfPokemon],
            index: req.params.indexOfPokemon
        }
    )
})

app.put('/pokedex/:indexOfPokemon', (req,res) =>{
    pokemonArr[req.params.indexOfPokemon].name = req.body.name
    res.redirect(`/pokedex/${currentIndex}`)

})













app.listen(port,() =>{
    console.log("listening on port:", port)
})