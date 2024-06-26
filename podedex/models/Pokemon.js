const mongoose = require("mongoose");

// Définition du schéma pour le modèle Pokemon
const schema = mongoose.Schema({
    // Identifiant du pokemon
    id: {
        type: Number,
        required: true,
        unique: true
    },
    // Nom du pokemon
    nom: {
        type: String,
        required: true
    },
    // URL de l'image front_default
    spriteUrl: {
        type: String,
        required: true
    }
}, { timestamps: true });

// Création et exportation du modèle Pokemon basé sur le schéma
module.exports = mongoose.model("Pokemon", schema);