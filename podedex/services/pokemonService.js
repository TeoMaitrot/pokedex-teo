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

        // Mettre à jour chaque pokedex en conservant l'état de capture des pokémons
        const pokedexPromises = pokedexes.map(async pokedex => {
            const existingPokemons = pokedex.pokemons.reduce((acc, entry) => {
                acc[entry.pokemon] = entry.captured;
                return acc;
            }, {});

            const updatedPokemons = pokemonIds.map(entry => ({
                pokemon: entry.pokemon,
                captured: existingPokemons[entry.pokemon] || false
            }));

            pokedex.pokemons = updatedPokemons;
            return pokedex.save();
        });

        await Promise.all(pokedexPromises);

        console.log('Les données des pokemons et des pokedex ont bien été mises à jour');
    } catch (error) {
        console.error('Erreur lors du chargement des données des pokemons et des pokedexs:', error);
    }
};
