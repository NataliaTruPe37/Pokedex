const express = require('express');
const fetch = require('node-fetch'); 
const app = express();


app.set('view engine', 'ejs');
app.use(express.static('public')); 


app.get('/', async (req, res) => {
    try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100');
        const data = await response.json();
        const pokemons = await Promise.all(data.results.map(async (pokemon) => {
            const pokemonDetails = await fetch(pokemon.url);
            return await pokemonDetails.json();
        }));
        res.render('index', { pokemons }); 
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener los Pokémon');
    }
});


app.get('/pokemon/:id', async (req, res) => {
    const pokemonId = req.params.id;
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
        const pokemon = await response.json();
        res.render('pokemon', { pokemon }); 
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener el Pokémon');
    }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
