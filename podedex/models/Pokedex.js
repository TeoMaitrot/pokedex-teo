const mongoose = require("mongoose");

// Définition du schéma pour le modèle d'un pokedex
const pokedexSchema = new mongoose.Schema({
    // Le nom du pokedex
    nom: { type: String, required: true },
    // Référence à l'utilisateur du pokedex
    utilisateur: { type: mongoose.Schema.Types.ObjectId, ref: "Utilisateur", required: true },
    // Dictionnaire de pokemon avec un flag pour savoir si le pokemon a été capturé ou non
    pokemons: [{
        pokemon: { type: Number, ref: "Pokemon" },
        captured: { type: Boolean, default: false },
        spriteUrl: { type: String }
    }]
}, { timestamps: true });

module.exports = mongoose.model("Pokedex", pokedexSchema);
