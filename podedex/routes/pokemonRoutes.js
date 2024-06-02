const express = require('express');
const pokemonController = require('../controllers/pokemonController');

const router = express.Router();

// Récupérer tous les pokemons
router.get('/', pokemonController.getAllPokemons);
// Récupérer un pokemon
router.get('/:id', pokemonController.getPokemonById);
// Créer un pokemon
router.post('/', pokemonController.createPokemon);
// Charger les données de tous les pokemons et pokedex par le biai d'une autre API
router.post('/loadPokemonData', pokemonController.loadPokemonData);
// Charger les sprites par lot des pokemons par le biai d'une autre API'
router.post('/load-sprites', pokemonController.loadPokemonDataWithSprite);

module.exports = router;
