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
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=10');
        const pokemonList = response.data.results;

        for (const pokemon of pokemonList) {
            const pokemonDetails = await axios.get(pokemon.url);
            const { id, name, sprites } = pokemonDetails.data;

            // Créer ou mettre à jour le Pokémon dans la base de données
            await Pokemon.findOneAndUpdate(
                { id },
                { nom: name, spriteUrl: sprites.front_default },
                { upsert: true, new: true }
            );
        }

        // Charger tous les Pokédex et mettre à jour les Pokémons
        const pokedexes = await Pokedex.find();

        for (const pokedex of pokedexes) {
            // Conserver les états de capture existants
            const existingPokemons = pokedex.pokemons.reduce((acc, { pokemon, captured }) => {
                acc[pokemon] = captured;
                return acc;
            }, {});

            // Supprimer les Pokémons actuels
            pokedex.pokemons = [];

            // Recharger les Pokémons avec les nouvelles données
            for (const pokemon of pokemonList) {
                const pokemonDetails = await axios.get(pokemon.url);
                const { id, sprites } = pokemonDetails.data;

                pokedex.pokemons.push({
                    pokemon: id,
                    captured: existingPokemons[id] || false,
                    spriteUrl: sprites.front_default
                });
            }

            await pokedex.save();
        }

        console.log('Données Pokémon chargées avec succès');
    } catch (error) {
        console.error('Erreur lors du chargement des données Pokémon', error);
    }
};
