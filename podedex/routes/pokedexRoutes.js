const express = require('express');
const pokedexController = require('../controllers/pokedexController');

const router = express.Router();

// Définition des routes pour la gestion des pokedex
router.get('/', pokedexController.getAllPokedexes);
router.get('/:id', pokedexController.getPokedexById);
router.post('/:utilisateurId/pokedexes', pokedexController.createPokedex);
router.get('/:utilisateurId/pokedexes/:pokedexId/pokemons', pokedexController.getPokemonsInPokedex);
router.post('/:utilisateurId/pokedexes/:pokedexId/pokemons', pokedexController.addPokemonToPokedex);
router.put('/:utilisateurId/pokedexes/:pokedexId/pokemons/:pokemonId/capture', pokedexController.togglePokemonCapture);

module.exports = router;
