// Controller des utilisateurs
const { check, validationResult } = require('express-validator');

const utilisateurService = require('../services/utilisateurService');

/**
 * Permet de récupérer tous les utilisateurs
 * @param {*} req requête HTML
 * @param {*} res résultat de la requête
 */
exports.getAllUtilisateurs = async (req, res) => {
    try {
        const utilisateurs = await utilisateurService.getAllUtilisateurs();
        res.send(utilisateurs);
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: "Erreur lors de la récupération des utilisateurs" });
    }
};

/**
 * Permet de récupérer un utilisateur par son id
 * @param {*} req requête HTML
 * @param {*} res résultat de la requête
 * @returns un utilisateur
 */
exports.getUtilisateurById = async (req, res) => {
    try {
        const utilisateur = await utilisateurService.getUtilisateurById(req.params.id);
        if (!utilisateur) {
            return res.status(404).send({ error: "Utilisateur non trouvé" });
        }
        res.send(utilisateur);
    } catch (error) {
        res.status(500).send({ error: "Erreur lors de la récupération de l'utilisateur" });
    }
};

/**
 * Permet de créer un utilisateur
 * @param {*} req requête HTML  
 * @param {*} res résultat de la requête
 * @returns un utilisateur
 */
exports.createUtilisateur = async (req, res) => {
    try {
        const utilisateur = await utilisateurService.createUtilisateur(req.body);
        res.send(utilisateur);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Erreur lors de la création de l'utilisateur" });
    }
};

/**
 * Permet d'ajouter un pokemon d'un pokedex à l'équipe d'un utilisateur
 * @param {*} req requête HTML
 * @param {*} res résultat de la requête
 * @returns l'utilisateur modifié
 */
exports.addPokemonToEquipe = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const utilisateurId = req.params.utilisateurId;
        const pokedexId = req.params.pokedexId;
        const { pokemonId } = req.body;

        const utilisateur = await utilisateurService.addPokemonToEquipe(utilisateurId, pokedexId, pokemonId);
        res.send(utilisateur);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Erreur lors de l'ajout du Pokémon à l'équipe" });
    }
};

/**
 * Permet de récupérer l'équipe d'un utilisateur
 * @param {*} req requête HTML
 * @param {*} res résultat de la requête
 */
exports.getEquipeByUtilisateurId = async (req, res) => {
    try {
        const equipe = await utilisateurService.getEquipeByUtilisateurId(req.params.utilisateurId);
        res.send(equipe);
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: "Erreur lors de la récupération de l'équipe" });
    }
};

/**
 * Permet de retirer un pokemon de l'équipe de l'utilisateur
 * @param {*} req requête HTML
 * @param {*} res résultat de la requête
 */
exports.removePokemonFromEquipe = async (req, res) => {
    try {
        const { utilisateurId, pokemonId } = req.params;
        const updatedUtilisateur = await utilisateurService.removePokemonFromEquipe(utilisateurId, pokemonId);
        res.send(updatedUtilisateur);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

