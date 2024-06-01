// Réalisation CRUD sur les pokedexs
const Pokedex = require('../models/Pokedex');

exports.getAllPokedexes = async () => {
    return await Pokedex.find();
};

exports.getPokedexById = async (id) => {
    return await Pokedex.findById(id);
};

exports.createPokedex = async (pokedexData) => {
    const pokedex = new Pokedex(pokedexData);
    return await pokedex.save();
};

exports.updatePokedex = async (pokedex) => {
    return await pokedex.save();
};
