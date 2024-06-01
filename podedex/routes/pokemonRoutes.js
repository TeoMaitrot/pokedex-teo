const express = require('express');
const pokemonController = require('../controllers/pokemonController');

const router = express.Router();

//Définition des routes pour la gestion des pokemons
router.get('/', pokemonController.getAllPokemons);
router.get('/:id', pokemonController.getPokemonById);
router.post('/', pokemonController.createPokemon);

module.exports = router;