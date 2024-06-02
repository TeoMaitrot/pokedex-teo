// Réalisation CRUD sur les pokedexs
const Pokedex = require('../models/Pokedex');
const Pokemon = require('../models/Pokemon');

/**
 * Retournes tous les pokedex
 * @returns tous les pokedex
 */
exports.getAllPokedexes = async () => {
    return await Pokedex.find();
};

/**
 * Retourne un pokedex
 * @param {*} id id du pokedex à retourner
 * @returns un pokedex
 */
exports.getPokedexById = async (id) => {
    return await Pokedex.findById(id);
};

/**
 * Permet de créer un pokedexs
 * @param {*} pokedexData les données du pokedex à créer
 * @returns le pokedex créé
 */
exports.createPokedex = async (pokedexData) => {
    const pokedex = new Pokedex(pokedexData);
    return await pokedex.save();
};

/**
 * Met à jour un pokedex
 * @param {*} pokedex pokedex à mettre à jour avec ses modifications
 * @returns le pokedex mis à jour
 */
exports.updatePokedex = async (pokedex) => {
    return await pokedex.save();
};

/**
 * Retourne un lot de pokemon du pokedex
 * @param {*} pokedexId id du pokedex souhaité
 * @param {*} limit limite de la requête 
 * @param {*} offset offset de la requête
 * @returns un lot de pokemon du pokedex
 */
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
