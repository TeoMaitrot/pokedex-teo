const express = require("express")
const Pokemon = require("./models/Pokemon")
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

module.exports = router