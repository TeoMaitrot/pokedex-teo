// Service pour la gestion des pokedexs
const pokedexManager = require('../managers/pokedexManager');
const utilisateurManager = require('../managers/utilisateurManager');
const pokemonManager = require('../managers/pokemonManager');

/**
 * Retourne tous les pokedex
 * @returns tous les pokedex
 */
exports.getAllPokedexes = async () => {
    return await pokedexManager.getAllPokedexes();
};

/**
 * Récupère un pokedex
 * @param {*} id id du pokedex à récupérer
 * @returns un pokdex
 */
exports.getPokedexById = async (id) => {
    return await pokedexManager.getPokedexById(id);
};

/**
 * Créer un pokedex
 * @param {*} utilisateurId id de l'utilisateur du pokedex
 * @param {*} pokedexData données du pokedex à créer
 * @returns un pokedex
 */
exports.createPokedex = async (utilisateurId, pokedexData) => {
    const utilisateur = await utilisateurManager.getUtilisateurById(utilisateurId);
    if (!utilisateur) {
        throw new Error('Utilisateur non trouvé');
    }

    const pokedex = await pokedexManager.createPokedex({ ...pokedexData, utilisateur: utilisateur._id.toString });
    utilisateur.pokedexes.push(pokedex._id);
    await utilisateurManager.updateUtilisateur(utilisateur);

    return pokedex;
};

/**
 * Retourne tous les pokemons d'un pokedex 
 * @param {*} utilisateurId utiisateur du pokedex
 * @param {*} pokedexId id du pokedex
 * @returns tous les pokemons d'un pokedex
 */
exports.getPokemonsInPokedex = async (utilisateurId, pokedexId) => {
    const utilisateur = await utilisateurManager.getUtilisateurById(utilisateurId);
    if (!utilisateur) {
        throw new Error('Utilisateur non trouvé');
    }

    const pokedex = await pokedexManager.getPokedexById(pokedexId);
    if (!pokedex || !pokedex.utilisateur.equals(utilisateur._id)) {
        throw new Error('Pokédex non trouvé');
    }

    return pokedex.pokemons;
};

/**
 * Ajouter un pokemon à un pokedex d'un utilisateur
 * @param {*} utilisateurId id de l'utilsiateur
 * @param {*} pokedexId id du pokedex
 * @param {*} pokemonId id du pokemon
 * @returns le pokedex mis à jour
 */
exports.addPokemonToPokedex = async (utilisateurId, pokedexId, pokemonId) => {
    const utilisateur = await utilisateurManager.getUtilisateurById(utilisateurId);
    if (!utilisateur) {
        throw new Error('Utilisateur non trouvé');
    }

    const pokedex = await pokedexManager.getPokedexById(pokedexId);
    if (!pokedex || !pokedex.utilisateur.equals(utilisateur._id)) {
        throw new Error('Pokédex non trouvé');
    }

    const numericPokemonId = Number(pokemonId);
    const pokemonExisteEnBase = await pokemonManager.getPokemonById(numericPokemonId);
    console.debug(pokemonExisteEnBase);
    if (!pokemonExisteEnBase) {
        throw new Error('Ce pokemon n\'est pas connu dans la base du professeur');
    }

    const pokemonExiste = pokedex.pokemons.some(pokemon => pokemon.pokemon === pokemonId);
    if (pokemonExiste) {
        throw new Error('Pokémon déjà présent dans le Pokédex');
    }

    pokedex.pokemons.push({ pokemon: pokemonId, captured: false });
    return await pokedexManager.updatePokedex(pokedex);
};

/**
 * Changer l'état de capture d'un pokemon
 * @param {*} utilisateurId id de l'utilisateur
 * @param {*} pokedexId id du pokedex
 * @param {*} pokemonId id du pokemon
 * @returns le pokedex modifié
 */
exports.togglePokemonCapture = async (utilisateurId, pokedexId, pokemonId) => {
    const utilisateur = await utilisateurManager.getUtilisateurById(utilisateurId);
    if (!utilisateur) {
        throw new Error('Utilisateur non trouvé');
    }

    const pokedex = await pokedexManager.getPokedexById(pokedexId);
    if (!pokedex || !pokedex.utilisateur.equals(utilisateur._id)) {
        throw new Error('Pokédex non trouvé');
    }

    console.debug('Pokedex:', pokedex);
    console.debug('Pokedex Pokemons:', pokedex.pokemons);
    console.debug('Type of pokemonId:', typeof pokemonId);

    // Comparer directement les valeurs numériques
    const pokemonEntry = pokedex.pokemons.find(entry => {
        console.debug('Entry pokemon:', entry.pokemon, 'Type:', typeof entry.pokemon);
        return entry.pokemon === pokemonId;
    });

    console.debug('Found pokemonEntry:', pokemonEntry);

    if (!pokemonEntry) {
        throw new Error('Pokemon non trouvé dans le Pokédex');
    }

    pokemonEntry.captured = !pokemonEntry.captured;
    return await pokedexManager.updatePokedex(pokedex);
};

/**
 * Retourne un lot de pokemon du pokedex avec leur sprite
 * @param {*} utilisateurId id de l'utilisateur
 * @param {*} pokedexId id du pokedex
 * @param {*} limit  limite du lot
 * @param {*} offset offset du lot
 * @returns un lot de pokemon du pokedex
 */
exports.getPokemonsByPokedex = async (utilisateurId, pokedexId, limit, offset) => {
    const utilisateur = await utilisateurManager.getUtilisateurById(utilisateurId);
    if (!utilisateur) {
        throw new Error('Utilisateur non trouvé');
    }

    const pokedex = await pokedexManager.getPokedexById(pokedexId);
    if (!pokedex || !pokedex.utilisateur.equals(utilisateur._id)) {
        throw new Error('Pokédex non trouvé');
    }

    return await pokedexManager.getPokemonsByPokedex(pokedexId, limit, offset);
};
