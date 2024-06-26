// Controller des pokedexs
const { validationResult } = require('express-validator');

const pokedexService = require('../services/pokedexService');

/**
 * Permet de récupérer tous les pokedex
 * @param {*} req requête HTML
 * @param {*} res résultat de la requête
 */
exports.getAllPokedexes = async (req, res) => {
    try {
        const pokedexes = await pokedexService.getAllPokedexes();
        res.send(pokedexes);
    } catch (error) {
        res.status(500).send({ error: "Erreur lors de la récupération des pokédex" });
    }
};

/**
 * Permet de récupérer un pokedex par son id
 * @param {*} req requête HTML
 * @param {*} res résultat de la requête
 * @returns un pokedex
 */
exports.getPokedexById = async (req, res) => {
    try {
        const pokedex = await pokedexService.getPokedexById(req.params.id);
        if (!pokedex) {
            return res.status(404).send({ error: "Pokédex non trouvé" });
        }
        res.send(pokedex);
    } catch (error) {
        res.status(500).send({ error: "Erreur lors de la récupération du pokédex" });
    }
};

/**
 * Permet de créer un pokedex
 * @param {*} req requête HTML  
 * @param {*} res résultat de la requête
 * @returns un pokedex
 */
exports.createPokedex = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { nom } = req.body;
        const pokedex = await pokedexService.createPokedex(req.params.utilisateurId, { nom });
        res.send(pokedex);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Erreur lors de la création du pokédex" });
    }
};

/**
 * Permet de récupérer tous les pokemons d'un pokedex d'un utilisateur
 * @param {*} req requête HTML
 * @param {*} res résultat de la requête
 */
exports.getPokemonsInPokedex = async (req, res) => {
    try {
        const pokemons = await pokedexService.getPokemonsInPokedex(req.params.utilisateurId, req.params.pokedexId);
        res.send(pokemons);
    } catch (error) {
        res.status(500).send({ error: "Erreur lors de la récupération des pokémons dans le pokédex" });
    }
};

/**
 * Permet d'ajouter un pokemon au pokedex d'un utilisateur
 * @param {*} req requête HTML
 * @param {*} res résultat de la requête
 */
exports.addPokemonToPokedex = async (req, res) => {
    try {
        const pokedex = await pokedexService.addPokemonToPokedex(req.params.utilisateurId, req.params.pokedexId, req.body.pokemonId);
        res.send(pokedex);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Erreur lors de l'ajout du Pokémon dans le pokédex" });
    }
};

/**
 * Permet de changer l'état de capture d'un pokemon
 * @param {*} req requête HTML
 * @param {*} res résultat de la requête
 */
exports.togglePokemonCapture = async (req, res) => {
    try {
        const { utilisateurId, pokedexId, pokemonId } = req.params;
        const numericPokemonId = Number(pokemonId); 
        const updatedPokedex = await pokedexService.togglePokemonCapture(utilisateurId, pokedexId, numericPokemonId);
        res.send(updatedPokedex);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Erreur lors de la mise à jour de l'état de capture du Pokemon" });
    }
};

/**
 * Permet de récupérer par lot les pokemons d'un pokedex d'un utilisateur
 * @param {*} req requête HTML
 * @param {*} res résultat de la requête
 */
exports.getPokemonsByPokedex = async (req, res) => {
    try {
        const { limit = 10, offset = 0 } = req.query;
        const pokemons = await pokedexService.getPokemonsByPokedex(req.params.utilisateurId, req.params.pokedexId, parseInt(limit), parseInt(offset));
        res.send(pokemons);
    } catch (error) {
        console.error(error);

        res.status(500).send({ error: error.toString() });
    }
};

