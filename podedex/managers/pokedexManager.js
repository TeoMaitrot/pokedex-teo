// Réalisation CRUD sur les pokedexs
const Pokedex = require('../models/Pokedex');
const Pokemon = require('../models/Pokemon');

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

exports.getPokemonsByPokedex = async (pokedexId, limit, offset) => {
    const pokedex = await Pokedex.findById(pokedexId);
    if (!pokedex) {
        throw new Error('Pokedex non trouvé');
    }

    const paginatedPokemons = pokedex.pokemons.slice(offset, offset + limit);

    const pokemons = await Promise.all(paginatedPokemons.map(async (entry) => {
        const pokemon = await Pokemon.findOne({ id: entry.pokemon });
        return {
            id: pokemon.id,
            nom: pokemon.nom,
            spriteUrl: pokemon.spriteUrl,
            captured: entry.captured
        };
    }));

    return pokemons;
};
