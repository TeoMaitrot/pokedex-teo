// Controller des pokemons
const pokemonService = require('../services/pokemonService');

/**
 * Permet de récupérer tous les pokemons
 * @param {*} req requête HTML
 * @param {*} res résultat de la requête
 */
exports.getAllPokemons = async (req, res) => {
    try {
        const pokemons = await pokemonService.getAllPokemons();
        res.send(pokemons);
    } catch (error) {
        res.status(500).send({ error: "Erreur lors de la récupération des pokémons" });
    }
};

/**
 * Permet de récupérer un pokemon par son id
 * @param {*} req requête HTML
 * @param {*} res résultat de la requête
 * @returns un pokedex
 */
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

/**
 * Permet de créer un pokemon
 * @param {*} req requête HTML  
 * @param {*} res résultat de la requête
 * @returns un pokemon
 */
exports.createPokemon = async (req, res) => {
    try {
        const pokemon = await pokemonService.createPokemon(req.body);
        res.send(pokemon);
    } catch (error) {
        res.status(500).send({ error: "Erreur lors de la création du pokémon" });
    }
};

/**
 * Permet de charger les données des pokemons et des pokedex à partir d'une API externe
 * @param {*} req requête HTML
 * @param {*} res résultat de la requête
 */
exports.loadPokemonData = async (req, res) => {
    try {
        await pokemonService.loadPokemonData();
        res.send({ message: 'Les données des pokemons et des pokedex ont bien été chargée.' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Une erreur est survenue lors du chargement des données des pokemons' });
    }
};

/**
 * Permet de charger les sprites des pokemons par lot à partir par l'intermédiaire d'une API externe
 * @param {*} req requête HTML
 * @param {*} res résultat de la requête
 */
exports.loadPokemonDataWithSprite = async (req, res) => {
    const { startId, endId } = req.body;
    try {
        await pokemonService.loadPokemonDataWithSprite(startId, endId);
        res.send({ message: `Sprites des Pokémon ${startId} à ${endId} chargés avec succès` });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: `Erreur lors du chargement des sprites des Pokémon ${startId} à ${endId}` });
    }
};
