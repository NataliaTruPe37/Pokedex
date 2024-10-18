const express = require('express');
const axios = require('axios');
const router = express.Router();

const POKE_API_BASE_URL = 'https://pokeapi.co/api/v2/pokemon';

// Ruta para obtener un Pokémon por ID
router.get('/pokemon/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const response = await axios.get(`${POKE_API_BASE_URL}/${id}`);
        res.json(response.data); // Devuelve los datos del Pokémon en formato JSON
    } catch (error) {
        res.status(404).send('Pokemon not found'); // Maneja el error si el Pokémon no se encuentra
    }
});

module.exports = router;
