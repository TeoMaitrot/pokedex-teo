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

module.exports = router