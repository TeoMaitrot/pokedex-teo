// Controller des utilisateurs
const { check, validationResult } = require('express-validator');

const utilisateurService = require('../services/utilisateurService');

exports.getAllUtilisateurs = async (req, res) => {
    try {
        const utilisateurs = await utilisateurService.getAllUtilisateurs();
        res.send(utilisateurs);
    } catch (error) {
        res.status(500).send({ error: "Erreur lors de la récupération des utilisateurs" });
    }
};

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

exports.createUtilisateur = async (req, res) => {
    try {
        const utilisateur = await utilisateurService.createUtilisateur(req.body);
        res.send(utilisateur);
    } catch (error) {
        res.status(500).send({ error: "Erreur lors de la création de l'utilisateur" });
    }
};

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

