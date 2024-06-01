// Services pour la gestion des pokemons
const axios = require('axios');
const Pokemon = require('../models/Pokemon');
const Pokedex = require('../models/Pokedex');
const pokemonManager = require('../managers/pokemonManager');

exports.getAllPokemons = async () => {
    return await pokemonManager.getAllPokemons();
};

exports.getPokemonById = async (id) => {
    return await pokemonManager.getPokemonById(id);
};

exports.createPokemon = async (pokemonData) => {
    return await pokemonManager.createPokemon(pokemonData);
};

exports.loadPokemonData = async () => {
    try {
        // Récupération des données depuis l'API
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=1302');
        const pokemons = response.data.results;

        // Suppression de tous les Pokémon existants
        await Pokemon.deleteMany({});

        // Suppression de tous les Pokémon des Pokédex
        await Pokedex.updateMany({}, { $set: { pokemons: [] } });

        // Création des nouveaux Pokémon
        const pokemonPromises = pokemons.map(pokemonData => {
            const id = pokemonData.url.split('/').filter(Boolean).pop();
            const pokemon = new Pokemon({ id, nom: pokemonData.name });
            return pokemon.save();
        });
        await Promise.all(pokemonPromises);

        // Mise à jour des Pokédex
        const pokedexes = await Pokedex.find();
        const pokemonIds = pokemons.map(pokemonData => {
            return {
                pokemon: parseInt(pokemonData.url.split('/').filter(Boolean).pop()),
                captured: false
            };
        });

        const pokedexPromises = pokedexes.map(pokedex => {
            pokedex.pokemons = pokemonIds;
            return pokedex.save();
        });
        await Promise.all(pokedexPromises);

        console.log('Pokémon data loaded and Pokédexes updated successfully.');
    } catch (error) {
        console.error('Error loading Pokémon data:', error);
    }
};
