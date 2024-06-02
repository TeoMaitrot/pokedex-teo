// Services pour la gestion des pokemons
const axios = require('axios');
const Pokemon = require('../models/Pokemon');
const Pokedex = require('../models/Pokedex');
const pokemonManager = require('../managers/pokemonManager');

// Constante définissant le maximum d'appel en parralèle possible
const MAX_PARALLEL_REQUESTS = 300;

/**
 * Méthode permettant de récupérer le détail d'un pokemon grâce à son url
 * @param {*} url url du pokemon
 * @returns le détail du pokemon
 */
async function fetchPokemonDetails(url) {
    const response = await axios.get(url);
    return response.data;
}

/**
 * Retourne tous les pokemons
 * @returns tous les pokemons
 */
exports.getAllPokemons = async () => {
    return await pokemonManager.getAllPokemons();
};

/**
 * Retourne un pokemon
 * @param {*} id id du pokemon
 * @returns un pokemon
 */
exports.getPokemonById = async (id) => {
    return await pokemonManager.getPokemonById(id);
};

/**
 * Permet de créer un pokemon
 * @param {*} pokemonData données du pokemon à créer
 * @returns le pokemon créé
 */
exports.createPokemon = async (pokemonData) => {
    return await pokemonManager.createPokemon(pokemonData);
};

/**
 * Récupère les données des pokemons et des pokedex par le biai d'une api externe
 */
exports.loadPokemonData = async () => {
    try {
        let nextUrl = 'https://pokeapi.co/api/v2/pokemon?limit=1000';
        const fetchedPokemons = [];

        while (nextUrl) {
            const response = await axios.get(nextUrl);
            const { results, next } = response.data;
            nextUrl = next;

            for (const pokemon of results) {
                const id = pokemon.url.split('/').slice(-2, -1)[0]; // Extraire l'ID de l'URL
                fetchedPokemons.push({ id, name: pokemon.name });
            }
        }

        // Mettre à jour les Pokémon dans la base de données
        for (const { id, name } of fetchedPokemons) {
            await Pokemon.findOneAndUpdate(
                { id },
                { nom: name },
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
            for (const { id } of fetchedPokemons) {
                pokedex.pokemons.push({
                    pokemon: id,
                    captured: existingPokemons[id] || false,
                });
            }

            await pokedex.save();
        }

        console.log('Données Pokémon chargées avec succès');
    } catch (error) {
        console.error('Erreur lors du chargement des données Pokémon', error);
    }
};

/**
 * Charge les sprites d'un lot de pokemon
 * @param {*} startId id du début du lot
 * @param {*} endId id de fin du lot
 */
exports.loadPokemonDataWithSprite = async (startId, endId) => {
    try {
        const fetchedPokemons = [];

        for (let id = startId; id <= endId; id++) {
            const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
            const response = await fetchPokemonDetails(url);
            fetchedPokemons.push(response);
        }

        // Mettre à jour les Pokémon avec les sprites dans la base de données
        for (const { id, sprites } of fetchedPokemons) {
            await Pokemon.findOneAndUpdate(
                { id },
                { spriteUrl: sprites.front_default },
                { upsert: true, new: true }
            );
        }

        console.log(`Sprites des Pokémon ${startId} à ${endId} chargés avec succès`);
    } catch (error) {
        console.error(`Erreur lors du chargement des sprites des Pokémon ${startId} à ${endId}`, error);
    }
};
