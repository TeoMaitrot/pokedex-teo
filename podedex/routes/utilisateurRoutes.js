const express = require('express');
const { check, validationResult } = require('express-validator');
const utilisateurController = require('../controllers/utilisateurController');

const router = express.Router();

// Récupérer tous les utilisateurs
router.get('/', utilisateurController.getAllUtilisateurs);
// Récupérer un utilisateur 
router.get('/:id', utilisateurController.getUtilisateurById);
// Créer un utilisateur
router.post('/', [
    check('nom').notEmpty().withMessage('Le nom ne doit pas être vide.')
], utilisateurController.createUtilisateur);
// Ajouter un pokemon à l'équipe de l'utilisateur
router.post('/:utilisateurId/pokedexes/:pokedexId/equipe', [
    check('pokemonId').isNumeric().withMessage('L\'ID du Pokémon doit être un nombre.')
], utilisateurController.addPokemonToEquipe);
// Récupérer tous les pokemons de l'équipe d'un utilisateur 
router.get('/:utilisateurId/equipe', utilisateurController.getEquipeByUtilisateurId);
// Retirer un pokemon de l'équipe d'un utilisateur 
router.delete('/:utilisateurId/equipe/:pokemonId', utilisateurController.removePokemonFromEquipe);
// Récupérer tous les pokedexs d'un utilisateur 
router.get('/:utilisateurId/pokedexes', utilisateurController.getPokedexesByUtilisateur);

module.exports = router;
