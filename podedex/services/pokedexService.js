// Service pour la gestion des pokedexs
const pokedexManager = require('../managers/pokedexManager');
const utilisateurManager = require('../managers/utilisateurManager');

exports.getAllPokedexes = async () => {
    return await pokedexManager.getAllPokedexes();
};

exports.getPokedexById = async (id) => {
    return await pokedexManager.getPokedexById(id);
};

exports.createPokedex = async (utilisateurId, pokedexData) => {
    const utilisateur = await utilisateurManager.getUtilisateurById(utilisateurId);
    if (!utilisateur) {
        throw new Error('Utilisateur non trouvé');
    }

    const pokedex = await pokedexManager.createPokedex({ ...pokedexData, utilisateur: utilisateur._id });
    utilisateur.pokedexes.push(pokedex._id);
    await utilisateurManager.updateUtilisateur(utilisateur);

    return pokedex;
};

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

exports.addPokemonToPokedex = async (utilisateurId, pokedexId, pokemonId) => {
    const utilisateur = await utilisateurManager.getUtilisateurById(utilisateurId);
    if (!utilisateur) {
        throw new Error('Utilisateur non trouvé');
    }

    const pokedex = await pokedexManager.getPokedexById(pokedexId);
    if (!pokedex || !pokedex.utilisateur.equals(utilisateur._id)) {
        throw new Error('Pokédex non trouvé');
    }

    const pokemonExiste = pokedex.pokemons.some(pokemon => pokemon.pokemon === pokemonId);
    if (pokemonExiste) {
        throw new Error('Pokémon déjà présent dans le Pokédex');
    }

    pokedex.pokemons.push({ pokemon: pokemonId, captured: false });
    return await pokedexManager.updatePokedex(pokedex);
};

exports.togglePokemonCapture = async (utilisateurId, pokedexId, pokemonId) => {
    const utilisateur = await utilisateurManager.getUtilisateurById(utilisateurId);
    if (!utilisateur) {
        throw new Error('Utilisateur non trouvé');
    }

    const pokedex = await pokedexManager.getPokedexById(pokedexId);
    if (!pokedex || !pokedex.utilisateur.equals(utilisateur._id)) {
        throw new Error('Pokédex non trouvé');
    }

    const pokemonEntry = pokedex.pokemons.find(entry => entry.pokemon === pokemonId);
    if (!pokemonEntry) {
        throw new Error('Pokemon non trouvé dans le Pokédex');
    }

    pokemonEntry.captured = !pokemonEntry.captured;
    return await pokedexManager.updatePokedex(pokedex);
};
