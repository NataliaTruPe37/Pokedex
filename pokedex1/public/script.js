const display = document.getElementById('pokemon-display');
let currentPokemonIndex = 1; // Comienza con el Pokémon #1

async function fetchPokemon(id) {
    try {
        const response = await fetch(`/api/pokemon/${id}`);
        if (response.ok) {
            const data = await response.json();
            displayPokemon(data);
        } else {
            throw new Error('Pokemon not found');
        }
    } catch (error) {
        display.innerHTML = '<p>Pokemon not found. <a href="/">Go back</a></p>';
    }
}

function displayPokemon(pokemon) {
    display.innerHTML = `
        <img src="${pokemon.sprites.front_default || 'default-image.png'}" alt="${pokemon.name}">
        <h2>${pokemon.name}</h2>
        <p>Type: ${pokemon.types.map(t => t.type.name).join(', ')}</p>
        <p>Experience: ${pokemon.base_experience}</p>
        <p>Weight: ${pokemon.weight}</p>
        <p>Height: ${pokemon.height}</p>
        <p>Moves: ${pokemon.moves.map(m => m.move.name).join(', ')}</p>
        <p>Abilities: ${pokemon.abilities.map(a => a.ability.name).join(', ')}</p>
    `;
}

document.getElementById('prev-btn').addEventListener('click', () => {
    currentPokemonIndex = (currentPokemonIndex === 1) ? 898 : currentPokemonIndex - 1; // 898 es el último Pokémon
    fetchPokemon(currentPokemonIndex);
});

document.getElementById('next-btn').addEventListener('click', () => {
    currentPokemonIndex = (currentPokemonIndex === 898) ? 1 : currentPokemonIndex + 1;
    fetchPokemon(currentPokemonIndex);
});

document.getElementById('search-btn').addEventListener('click', () => {
    const searchInput = document.getElementById('search').value.toLowerCase();
    fetchPokemon(searchInput);
});

fetchPokemon(currentPokemonIndex); // Carga el primer Pokémon al inicio
