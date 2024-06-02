// Réalisation CRUD sur les utilisateurs
const Utilisateur = require('../models/Utilisateur');
const Pokedex = require('../models/Pokedex');

/**
 * Retourne tous les utilisateurs
 * @returns tous les utilisateurs
 */
exports.getAllUtilisateurs = async () => {
    return await Utilisateur.find();
};

/**
 * Retourne un utilisateur
 * @param {*} id id de l'utilisateur à retourner
 * @returns un utilisateur
 */
exports.getUtilisateurById = async (id) => {
    return await Utilisateur.findById(id);
};

/**
 * Permet de créer un utilisateur
 * @param {*} utilisateurData données de l'utilisateur à créer
 * @returns utilisateur créé
 */
exports.createUtilisateur = async (utilisateurData) => {
    const utilisateur = new Utilisateur(utilisateurData);
    return await utilisateur.save();
};

/**
 * Met à jour un utilisateur
 * @param {*} utilisateur utilisateur modifié
 * @returns utilisateur modifié
 */
exports.updateUtilisateur = async (utilisateur) => {
    return await utilisateur.save();
};

/**
 * Retourne le pokedex d'un utilisateur
 * @param {*} utilisateurId id de l'utilisateur ciblé
 * @param {*} pokedexId id du pokedex ciblé
 * @returns le pokedex d'un utilisateur
 */
exports.getPokedexById = async (utilisateurId, pokedexId) => {
    const utilisateur = await this.getUtilisateurById(utilisateurId);
    if (!utilisateur) return null;

    const pokedex = await Pokedex.findOne({ _id: pokedexId, utilisateur: utilisateur._id }).populate('pokemons.pokemon.id');
    return pokedex;
};

