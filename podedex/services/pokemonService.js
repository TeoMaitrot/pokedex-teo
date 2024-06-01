// Services pour la gestion des pokemons
const pokemonManager = require('../managers/pokemonManager');

exports.getAllPokemons = async () => {
    return await pokemonManager.getAllPokemons();
};

exports.getPokemonById = async (id) => {
    return await pokemonManager.getPokemonById(id);
};

exports.createPokemon = async (pokemonData) => {
    return await pokemonManager.createPokemon(pokemonData);
};
