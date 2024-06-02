// Réalisation CRUD sur les pokemons
const Pokemon = require('../models/Pokemon');

/**
 * Retourne tous les pokemons
 * @returns tous les pokemons
 */
exports.getAllPokemons = async () => {
    return await Pokemon.find();
};

/**
 * Retourne un pokemon
 * @param {*} id id du pokemon à retourner
 * @returns un pokemon
 */
exports.getPokemonById = async (id) => {
    return await Pokemon.findOne({ id });
};

/**
 * Permet de créer un pokemon
 * @param {*} pokemonData données du pokemon à créer
 * @returns le pokemon créé
 */
exports.createPokemon = async (pokemonData) => {
    const pokemon = new Pokemon(pokemonData);
    return await pokemon.save();
};
