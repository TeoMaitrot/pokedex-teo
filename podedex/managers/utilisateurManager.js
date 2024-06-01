// Réalisation CRUD sur les utilisateurs
const Utilisateur = require('../models/Utilisateur');

exports.getAllUtilisateurs = async () => {
    return await Utilisateur.find();
};

exports.getUtilisateurById = async (id) => {
    return await Utilisateur.findById(id).populate('pokedexes').populate('equipe');
};

exports.createUtilisateur = async (utilisateurData) => {
    const utilisateur = new Utilisateur(utilisateurData);
    return await utilisateur.save();
};

exports.updateUtilisateur = async (utilisateur) => {
    return await utilisateur.save();
};

