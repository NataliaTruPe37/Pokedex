const pokemonList = document.getElementById('pokemon-list');
const pokemonDisplay = document.getElementById('pokemon-display');

async function fetchAllPokemons() {
    for (let i = 1; i <= 898; i++) { 
        await fetchPokemon(i);
    }
}

async function fetchPokemon(id) {
    try {
        const response = await fetch(`/api/pokemon/${id}`);
        if (response.ok) {
            const data = await response.json();
            displayPokemon(data);
        }
    } catch (error) {
        console.error('Error fetching Pokémon:', error);
    }
}

function displayPokemon(pokemon) {
    const pokemonItem = document.createElement('div');
    pokemonItem.className = 'pokemon-item';
    pokemonItem.innerHTML = `
        <img src="${pokemon.sprites.front_default || 'default-image.png'}" alt="${pokemon.name}" onclick="showDetails(${pokemon.id})">
        <h2>${pokemon.name}</h2>
    `;
    pokemonList.appendChild(pokemonItem);
}

async function showDetails(id) {
    const response = await fetch(`/api/pokemon/${id}`);
    if (response.ok) {
        const pokemon = await response.json();
        pokemonDisplay.innerHTML = `
            <h2>${pokemon.name}</h2>
            <img src="${pokemon.sprites.front_default || 'default-image.png'}" alt="${pokemon.name}">
            <p>Type: ${pokemon.types.map(t => t.type.name).join(', ')}</p>
            <p>Experience: ${pokemon.base_experience}</p>
            <p>Weight: ${pokemon.weight}</p>
            <p>Height: ${pokemon.height}</p>
            <p>Moves: ${pokemon.moves.map(m => m.move.name).join(', ')}</p>
            <p>Abilities: ${pokemon.abilities.map(a => a.ability.name).join(', ')}</p>
            <button onclick="hideDetails()">Close</button>
        `;
        pokemonDisplay.style.display = 'block';
    } else {
        pokemonDisplay.innerHTML = '<p>Pokemon not found.</p>';
        pokemonDisplay.style.display = 'block';
    }
}

function hideDetails() {
    pokemonDisplay.style.display = 'none';
}

fetchAllPokemons();
