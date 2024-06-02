const express = require('express');
const { check, validationResult } = require('express-validator');
const utilisateurController = require('../controllers/utilisateurController');

const router = express.Router();

// Définition des routes pour la gestion des utilisateurs
router.get('/', utilisateurController.getAllUtilisateurs);
router.get('/:id', utilisateurController.getUtilisateurById);
router.post('/', [
    check('nom').notEmpty().withMessage('Le nom ne doit pas être vide.')
], utilisateurController.createUtilisateur);
router.post('/:utilisateurId/pokedexes/:pokedexId/equipe', [
    check('pokemonId').isNumeric().withMessage('L\'ID du Pokémon doit être un nombre.')
], utilisateurController.addPokemonToEquipe);
router.get('/:utilisateurId/equipe', utilisateurController.getEquipeByUtilisateurId);
router.delete('/:utilisateurId/equipe/:pokemonId', utilisateurController.removePokemonFromEquipe);

module.exports = router;
