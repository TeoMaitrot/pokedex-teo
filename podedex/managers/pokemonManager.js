// Réalisation CRUD sur les pokemons
const Pokemon = require('../models/Pokemon');

exports.getAllPokemons = async () => {
    return await Pokemon.find();
};

exports.getPokemonById = async (id) => {
    return await Pokemon.findOne({ id });
};

exports.createPokemon = async (pokemonData) => {
    const pokemon = new Pokemon(pokemonData);
    return await pokemon.save();
};
