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

exports.addPokemonToEquipe = async (utilisateurId, pokemonId) => {
    const utilisateur = await utilisateurManager.getUtilisateurById(utilisateurId);
    if (!utilisateur) {
        throw new Error('Utilisateur non trouvé');
    }

    if (utilisateur.equipe.length >= 6) {
        throw new Error('L\'équipe ne peut pas avoir plus de 6 Pokémon');
    }

    utilisateur.equipe.push(pokemonId);
    return await utilisateurManager.updateUtilisateur(utilisateur);
};
