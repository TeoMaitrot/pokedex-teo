const mongoose = require("mongoose");

// Définition du schéma pour le modèle d'un utilisateur
const utilisateurSchema = new mongoose.Schema({
    // Id de l'utilisateur
    id: { type: Number, required: true, unique: true },
    // Le nom de l'utilisateur
    nom: { type: String, required: true },
    // Ses pokedex
    pokedexes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Pokedex" }],
    // Son équipe de pokemon
    equipe: [{ type: mongoose.Schema.Types.ObjectId, ref: "Pokemon" }]
});

module.exports = mongoose.model("Utilisateur", utilisateurSchema);
