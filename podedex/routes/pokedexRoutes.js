const express = require('express');
const { check, validationResult } = require('express-validator');
const pokedexController = require('../controllers/pokedexController');

const router = express.Router();

// Récupérer tous les pokedex
router.get('/', pokedexController.getAllPokedexes);
// Récupérer un pokedex par son id
router.get('/:id', pokedexController.getPokedexById);
// Création d'un pokédex pour un utilisateur
router.post('/:utilisateurId/pokedexes', [
    check('nom').notEmpty().withMessage('Le nom ne doit pas être vide.')
], pokedexController.createPokedex);
// Récupérer tous les pokemons d'un pokedex
router.get('/:utilisateurId/pokedexes/:pokedexId/pokemons', pokedexController.getPokemonsInPokedex);
// Ajouter un pokemon à un pokedex d'un utilisateur
router.post('/:utilisateurId/pokedexes/:pokedexId/pokemons', pokedexController.addPokemonToPokedex);
// Changer l'état de capture d'un pokemon dans un pokedex
router.put('/:utilisateurId/pokedexes/:pokedexId/pokemons/:pokemonId/capture', pokedexController.togglePokemonCapture);
// Récupérer un lot de pokemon du pokedex avec leurs sprites
router.get('/:utilisateurId/pokedexes/:pokedexId/pokemons-par-lot', pokedexController.getPokemonsByPokedex);

module.exports = router;
