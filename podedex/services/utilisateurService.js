// Service pour la gestion des utilisateurs
const utilisateurManager = require('../managers/utilisateurManager');

exports.getAllUtilisateurs = async () => {
    return await utilisateurManager.getAllUtilisateurs();
};

exports.getUtilisateurById = async (id) => {
    return await utilisateurManager.getUtilisateurById(id);
};

exports.createUtilisateur = async (utilisateurData) => {
    return await utilisateurManager.createUtilisateur(utilisateurData);
};

exports.addPokemonToEquipe = async (utilisateurId, pokedexId, pokemonId) => {
    const utilisateur = await utilisateurManager.getUtilisateurById(utilisateurId);
    if (!utilisateur) {
        throw new Error('Utilisateur non trouvé');
    }

    // Vérifier si le pokémon est dans le pokédex de l'utilisateur
    const pokedex = await utilisateurManager.getPokedexById(utilisateurId, pokedexId);
    if (!pokedex) {
        throw new Error('Pokedex non trouvé');
    }

    const pokemonEntry = pokedex.pokemons.find(p => p.pokemon === pokemonId);
    if (!pokemonEntry) {
        throw new Error('Le Pokémon n\'est pas dans le Pokédex de l\'utilisateur');
    }

    if (!pokemonEntry.captured) {
        throw new Error('Le Pokémon doit être capturé pour être ajouté à l\'équipe');
    }

    if (utilisateur.equipe.length >= 6) {
        throw new Error('L\'équipe ne peut pas avoir plus de 6 Pokémon');
    }

    if(utilisateur.equipe.includes(pokemonId)){
        throw new Error('Ce pokemon est déjà dans l\'équipe');
    }

    utilisateur.equipe.push(pokemonId);
    return await utilisateurManager.updateUtilisateur(utilisateur);
};

