// Controller des pokedexs
const pokedexService = require('../services/pokedexService');

exports.getAllPokedexes = async (req, res) => {
    try {
        const pokedexes = await pokedexService.getAllPokedexes();
        res.send(pokedexes);
    } catch (error) {
        res.status(500).send({ error: "Erreur lors de la récupération des pokédex" });
    }
};

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

exports.createPokedex = async (req, res) => {
    try {
        const pokedex = await pokedexService.createPokedex(req.params.utilisateurId, req.body);
        res.send(pokedex);
    } catch (error) {
        res.status(500).send({ error: "Erreur lors de la création du pokédex" });
    }
};

exports.getPokemonsInPokedex = async (req, res) => {
    try {
        const pokemons = await pokedexService.getPokemonsInPokedex(req.params.utilisateurId, req.params.pokedexId);
        res.send(pokemons);
    } catch (error) {
        res.status(500).send({ error: "Erreur lors de la récupération des pokémons dans le pokédex" });
    }
};

exports.addPokemonToPokedex = async (req, res) => {
    try {
        const pokedex = await pokedexService.addPokemonToPokedex(req.params.utilisateurId, req.params.pokedexId, req.body.pokemonId);
        res.send(pokedex);
    } catch (error) {
        res.status(500).send({ error: "Erreur lors de l'ajout du Pokémon dans le pokédex" });
    }
};

exports.togglePokemonCapture = async (req, res) => {
    try {
        const pokedex = await pokedexService.togglePokemonCapture(req.params.utilisateurId, req.params.pokedexId, req.params.pokemonId);
        res.send(pokedex);
    } catch (error) {
        res.status(500).send({ error: "Erreur lors de la mise à jour de l'état de capture du Pokémon" });
    }
};