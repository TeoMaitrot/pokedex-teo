const express = require('express');
const { check, validationResult } = require('express-validator');
const pokedexController = require('../controllers/pokedexController');

const router = express.Router();

// Définition des routes pour la gestion des pokedex
router.get('/', pokedexController.getAllPokedexes);
router.get('/:id', pokedexController.getPokedexById);
// Création d'un pokédex pour un utilisateur
router.post('/:utilisateurId/pokedexes', [
    check('nom').notEmpty().withMessage('Le nom ne doit pas être vide.')
], pokedexController.createPokedex);
router.get('/:utilisateurId/pokedexes/:pokedexId/pokemons', pokedexController.getPokemonsInPokedex);
router.post('/:utilisateurId/pokedexes/:pokedexId/pokemons', pokedexController.addPokemonToPokedex);
router.put('/:utilisateurId/pokedexes/:pokedexId/pokemons/:pokemonId/capture', pokedexController.togglePokemonCapture);
router.get('/:utilisateurId/pokedexes/:pokedexId/pokemons-par-lot', pokedexController.getPokemonsByPokedex);

module.exports = router;
