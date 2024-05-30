const express = require("express")
const Pokemon = require("./models/Pokemon")
const Utilisateur = require("./models/Utilisateur");
const Pokedex = require("./models/Pokedex");
const router = express.Router()

// Récupérer tous les pokemons
router.get("/pokemons", async (req, res) => {
	const pokemons = await Pokemon.find()
	res.send(pokemons)
})

// Créer les pokemons
router.post("/pokemons", async (req, res) => {
	const pokemon = new Pokemon({
		id: req.body.id,
		nom: req.body.nom,
	})
	await pokemon.save()
	res.send(pokemon)
})

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

// Créer un utilisateur
router.post("/utilisateurs", async (req, res) => {
    try {
        const { id, nom } = req.body;

        const utilisateur = new Utilisateur({
            id,
            nom,
            pokedexes: [],
            equipe: []
        });

        await utilisateur.save();

        res.send(utilisateur);
    } catch (error) {
        res.status(500).send({ error: "Erreur lors de la création de l'utilisateur" });
    }
});

// Création d'un pokedex pour un utilisateur
router.post("/utilisateurs/:utilisateurId/pokedexes", async (req, res) => {
    try {
        const utilisateur = await Utilisateur.findOne({ id: req.params.utilisateurId });
        const { id, nom } = req.body;

        if (!utilisateur) {
            return res.status(404).send({ error: "Utilisateur non trouvé" });
        }

        const pokedex = new Pokedex({
            id,
            nom,
            utilisateur: utilisateur._id,
            pokemons: []
        });

        await pokedex.save();

        utilisateur.pokedexes.push(pokedex._id);
        await utilisateur.save();

        res.send(pokedex);
    } catch (error) {
        res.status(500).send({ error: "Erreur lors de la création du Pokédex" });
    }
});

module.exports = router