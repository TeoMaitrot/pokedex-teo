// Réalisation CRUD sur les utilisateurs
const Utilisateur = require('../models/Utilisateur');
const Pokedex = require('../models/Pokedex');

exports.getAllUtilisateurs = async () => {
    return await Utilisateur.find();
};

exports.getUtilisateurById = async (id) => {
    return await Utilisateur.findById(id);
};

exports.createUtilisateur = async (utilisateurData) => {
    const utilisateur = new Utilisateur(utilisateurData);
    return await utilisateur.save();
};

exports.updateUtilisateur = async (utilisateur) => {
    return await utilisateur.save();
};

exports.getPokedexById = async (utilisateurId, pokedexId) => {
    const utilisateur = await this.getUtilisateurById(utilisateurId);
    if (!utilisateur) return null;

    const pokedex = await Pokedex.findOne({ _id: pokedexId, utilisateur: utilisateur._id }).populate('pokemons.pokemon.id');
    return pokedex;
};

