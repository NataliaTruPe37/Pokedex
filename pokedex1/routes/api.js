const express = require('express');
const axios = require('axios');
const router = express.Router();

const POKE_API_BASE_URL = 'https://pokeapi.co/api/v2/pokemon';


router.get('/pokemon/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const response = await axios.get(`${POKE_API_BASE_URL}/${id}`);
        res.json(response.data); 
    } catch (error) {
        res.status(404).send('Pokemon not found'); 
    }
});

module.exports = router;
