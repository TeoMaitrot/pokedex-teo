const express = require("express")
const Pokemon = require("./models/Pokemon")
const Utilisateur = require("./models/Utilisateur");
const Pokedex = require("./models/Pokedex");
const { check, validationResult } = require('express-validator');
const { ObjectId } = require('mongoose').Types;
const mongoose = require("mongoose");
const router = express.Router()

// Récupérer tous les pokemons
router.get("/pokemons", async (req, res) => {
	const pokemons = await Pokemon.find()
	res.send(pokemons)
})

// Créer les pokemons
router.post("/pokemons", [
    check('id').isNumeric().withMessage('L\'ID doit être un nombre.'),
    check('nom').notEmpty().withMessage('Le nom ne doit pas être vide.')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const pokemon = new Pokemon({
        id: req.body.id,
        nom: req.body.nom,
    });
    await pokemon.save();
    res.send(pokemon);
});

// Récupérer un seul pokemon
router.get("/pokemons/:id", async (req, res) => {
    try {
        const pokemon = await Pokemon.findOne({ id: req.params.id });
        if (!pokemon) {
            return res.status(404).json({ error: "Le pokemon avec l'ID " + req.params.id + " n'existe pas" });
        }
        res.send(pokemon);
    } catch (error) {
        res.status(500).json({ error: "Une erreur est survenue lors de la récupération du pokemon" });
    }
});

// Récupérer tous les utilisateurs
router.get("/utilisateurs", async (req, res) => {
    try {
        const utilisateurs = await Utilisateur.find();
        res.send(utilisateurs);
    } catch (error) {
        res.status(500).send({ error: "Erreur lors de la récupération des utilisateurs" });
    }
});

// Récupérer un utilisateur par ID
router.get('/utilisateurs/:id', async (req, res) => {
    try {
        const utilisateur = await Utilisateur.findById(req.params.id)
            .populate('pokedexes')
            .populate('equipe');
        if (!utilisateur) {
            return res.status(404).send({ error: 'Utilisateur non trouvé' });
        }
        res.send(utilisateur);
    } catch (error) {
        res.status(500).send({ error: 'Erreur lors de la récupération de l\'utilisateur' });
    }
});


// Créer un utilisateur
router.post('/utilisateurs', [
    check('nom').notEmpty().withMessage('Le nom ne doit pas être vide.')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { nom } = req.body;

        const utilisateur = new Utilisateur({
            nom,
            pokedexes: [],
            equipe: []
        });

        await utilisateur.save();

        res.send(utilisateur);
    } catch (error) {
        res.status(500).send({ error: 'Erreur lors de la création de l\'utilisateur' });
    }
});


// Création d'un pokedex pour un utilisateur
router.post('/utilisateurs/:utilisateurId/pokedexes', [
    check('nom').notEmpty().withMessage('Le nom ne doit pas être vide.')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const utilisateur = await Utilisateur.findById(req.params.utilisateurId);
        const { nom } = req.body;

        if (!utilisateur) {
            return res.status(404).send({ error: 'Utilisateur non trouvé' });
        }

        const pokedex = new Pokedex({
            nom,
            utilisateur: utilisateur._id, // Utilise l'ObjectId
            pokemons: []
        });

        await pokedex.save();

        utilisateur.pokedexes.push(pokedex._id); // Utilise l'ObjectId
        await utilisateur.save();

        res.send(pokedex);
    } catch (error) {
        res.status(500).send({ error: 'Erreur lors de la création du Pokédex' });
    }
});

// Récupérer tous les pokedex
router.get("/pokedexes", async (req, res) => {
    try {
        const pokedexes = await Pokedex.find().populate("utilisateur").populate("pokemons.pokemon");
        res.send(pokedexes);
    } catch (error) {
        res.status(500).send({ error: "Erreur lors de la récupération des pokédex" });
    }
});

// Récupérer un pokédex par ID
router.get('/pokedexes/:id', async (req, res) => {
    try {
        const pokedex = await Pokedex.findById(req.params.id).populate('pokemons.pokemon');
        if (!pokedex) {
            return res.status(404).send({ error: 'Pokédex non trouvé' });
        }
        res.send(pokedex);
    } catch (error) {
        res.status(500).send({ error: 'Erreur lors de la récupération du pokédex' });
    }
});


// Ajouter un pokemon dans l'équipe d'un utilisateur
router.post('/utilisateurs/:utilisateurId/equipe', [
    check('pokemonId').isNumeric().withMessage('L\'ID du Pokémon doit être un nombre.')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const utilisateur = await Utilisateur.findById(req.params.utilisateurId);
        const { pokemonId } = req.body;

        if (!utilisateur) {
            return res.status(404).send({ error: 'Utilisateur non trouvé' });
        }

        if (utilisateur.equipe.length >= 6) {
            return res.status(400).send({ error: 'L\'équipe ne peut pas avoir plus de 6 Pokémon' });
        }

        utilisateur.equipe.push(pokemonId);
        await utilisateur.save();

        res.send(utilisateur);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Erreur lors de l\'ajout du Pokémon à l\'équipe' });
    }
});




// Récupérer tous les pokémons dans un Pokédex
router.get("/utilisateurs/:utilisateurId/pokedexes/:pokedexId/pokemons", async (req, res) => {
    try {
        const utilisateurId = req.params.utilisateurId;
        const pokedexId = req.params.pokedexId;

        // Vérifier si l'utilisateur existe
        const utilisateur = await Utilisateur.findById(utilisateurId);
        if (!utilisateur) {
            return res.status(404).send({ error: "Utilisateur non trouvé" });
        }

        // Vérifier si le pokedex appartient à l'utilisateur
        const pokedex = await Pokedex.findOne({ _id: pokedexId, utilisateur: utilisateur._id }).populate("pokemons.pokemon.id");
        if (!pokedex) {
            return res.status(404).send({ error: "Pokédex non trouvé" });
        }

        res.send(pokedex.pokemons);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Erreur lors de la récupération des pokémons dans le Pokédex" });
    }
});


// Ajouter un Pokémon dans un Pokédex d'un utilisateur
router.post("/utilisateurs/:utilisateurId/pokedexes/:pokedexId/pokemons", [
    check('pokemonId').isNumeric().withMessage('L\'ID du Pokémon doit être un nombre.')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const utilisateurId = req.params.utilisateurId;
        const pokedexId = req.params.pokedexId;
        const { pokemonId } = req.body;

        // Vérifier si l'utilisateur existe
        const utilisateur = await Utilisateur.findById(utilisateurId);
        if (!utilisateur) {
            return res.status(404).send({ error: 'Utilisateur non trouvé' });
        }

        // Vérifier si le Pokédex appartient à l'utilisateur
        const pokedex = await Pokedex.findOne({ _id: pokedexId, utilisateur: utilisateur._id });
        if (!pokedex) {
            return res.status(404).send({ error: 'Pokédex non trouvé' });
        }

        // Vérifier si le Pokémon existe déjà dans le Pokédex
        const pokemonExiste = pokedex.pokemons.some(pokemon => pokemon.pokemon === pokemonId);
        if (pokemonExiste) {
            return res.status(400).send({ error: 'Pokémon déjà présent dans le Pokédex' });
        }

        // Ajouter le Pokémon dans le Pokédex
        pokedex.pokemons.push({ pokemon: pokemonId, captured: false });
        await pokedex.save();

        res.send(pokedex);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Erreur lors de l\'ajout du Pokémon dans le Pokédex' });
    }
});

// Modifier l'état de capture d'un Pokémon dans un Pokédex d'un utilisateur
router.put("/utilisateurs/:utilisateurId/pokedexes/:pokedexId/pokemons/:pokemonId/captured", [
    check('captured').isBoolean().withMessage('La valeur de capture doit être un booléen.')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const utilisateurId = req.params.utilisateurId;
        const pokedexId = req.params.pokedexId;
        const pokemonId = req.params.pokemonId;
        const { captured } = req.body;

        // Vérifier si l'utilisateur existe
        const utilisateur = await Utilisateur.findById(utilisateurId);
        if (!utilisateur) {
            return res.status(404).send({ error: 'Utilisateur non trouvé' });
        }

        // Vérifier si le Pokédex appartient à l'utilisateur
        const pokedex = await Pokedex.findOne({ _id: pokedexId, utilisateur: utilisateur._id });
        if (!pokedex) {
            return res.status(404).send({ error: 'Pokédex non trouvé' });
        }

        // Recherche du Pokémon dans le Pokédex en utilisant son ID
        const pokemonEntry = pokedex.pokemons.find(entry => entry.pokemon === parseInt(pokemonId));
        if (!pokemonEntry) {
            return res.status(404).send({ error: 'Pokemon non trouvé dans le Pokédex' });
        }

        // Met à jour l'attribut captured
        pokemonEntry.captured = captured;
        await pokedex.save();

        res.send(pokedex);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Erreur lors de la mise à jour de l\'état de capture du Pokémon' });
    }
});


module.exports = router