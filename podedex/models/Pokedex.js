const mongoose = require("mongoose");

// Définition du schéma pour le modèle d'un pokedex
const pokedexSchema = new mongoose.Schema({
    // Id du pokedex
    id: { type: Number, required: true, unique: true },
    // Le nom du pokedex
    nom: { type: String, required: true },
    // Référence à l'utilisateur du pokedex
    utilisateur: { type: mongoose.Schema.Types.ObjectId, ref: "Utilisateur", required: true },
    // Liste de pokemon avec un flag pour savoir si le pokemon a été capturé ou non
    pokemons: [{
        pokemon: { type: mongoose.Schema.Types.ObjectId, ref: "Pokemon" },
        captured: { type: Boolean, default: false }
    }]
});

module.exports = mongoose.model("Pokedex", pokedexSchema);
