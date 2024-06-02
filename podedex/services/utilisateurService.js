// Service pour la gestion des utilisateurs
const utilisateurManager = require('../managers/utilisateurManager');
const pokemonManager = require('../managers/pokemonManager');

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

exports.getEquipeByUtilisateurId = async (utilisateurId) => {
    const utilisateur = await utilisateurManager.getUtilisateurById(utilisateurId);
    if (!utilisateur) {
        throw new Error('Utilisateur non trouvé');
    }

    const equipeDetails = await Promise.all(
        utilisateur.equipe.map(async (pokemonId) => {
            const pokemon = await pokemonManager.getPokemonById(pokemonId);
            return {
                id: pokemon.id,
                nom: pokemon.nom,
                spriteUrl: pokemon.spriteUrl,
                captured: true, // Par définition, un Pokémon dans l'équipe est capturé
            };
        })
    );

    return equipeDetails;
};

exports.removePokemonFromEquipe = async (utilisateurId, pokemonId) => {
    const utilisateur = await utilisateurManager.getUtilisateurById(utilisateurId);
    if (!utilisateur) {
        throw new Error('Utilisateur non trouvé');
    }

    const pokemonIndex = utilisateur.equipe.indexOf(pokemonId);
    if (pokemonIndex === -1) {
        throw new Error('Le Pokémon n\'est pas dans l\'équipe');
    }

    utilisateur.equipe.splice(pokemonIndex, 1);
    return await utilisateurManager.updateUtilisateur(utilisateur);
};

