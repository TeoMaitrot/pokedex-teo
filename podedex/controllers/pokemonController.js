// Controller des pokemons
const pokemonService = require('../services/pokemonService');

exports.getAllPokemons = async (req, res) => {
    try {
        const pokemons = await pokemonService.getAllPokemons();
        res.send(pokemons);
    } catch (error) {
        res.status(500).send({ error: "Erreur lors de la récupération des pokémons" });
    }
};

exports.getPokemonById = async (req, res) => {
    try {
        const pokemon = await pokemonService.getPokemonById(req.params.id);
        if (!pokemon) {
            return res.status(404).send({ error: "Pokémon non trouvé" });
        }
        res.send(pokemon);
    } catch (error) {
        res.status(500).send({ error: "Erreur lors de la récupération du pokémon" });
    }
};

exports.createPokemon = async (req, res) => {
    try {
        const pokemon = await pokemonService.createPokemon(req.body);
        res.send(pokemon);
    } catch (error) {
        res.status(500).send({ error: "Erreur lors de la création du pokémon" });
    }
};

exports.loadPokemonData = async (req, res) => {
    try {
        await pokemonService.loadPokemonData();
        res.send({ message: 'Les données des pokemons et des pokedex ont bien été chargée.' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Une erreur est survenue lors du chargement des données des pokemons' });
    }
};
