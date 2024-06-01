// Réalisation CRUD sur les pokedexs
const Pokedex = require('../models/Pokedex');

exports.getAllPokedexes = async () => {
    return await Pokedex.find().populate('utilisateur').populate('pokemons.pokemon');
};

exports.getPokedexById = async (id) => {
    return await Pokedex.findById(id).populate('utilisateur').populate('pokemons.pokemon');
};

exports.createPokedex = async (pokedexData) => {
    const pokedex = new Pokedex(pokedexData);
    return await pokedex.save();
};

exports.updatePokedex = async (pokedex) => {
    return await pokedex.save();
};
