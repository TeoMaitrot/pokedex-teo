const mongoose = require('mongoose');

// Modèle d'un utilisateur
const utilisateurSchema = new mongoose.Schema({
    // Nom de l'utilisateur
    nom: { type: String, required: true },
    // Liste des pokedex de l'utilisateur
    pokedexes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pokedex' }],
    // Equipe de l'utilisateur
    equipe: [{
        type: Number,
        ref: 'Pokemon',
        validate: [val => val.length <= 6, '{PATH} exceeds the limit of 6']
    }]
}, { timestamps: true });

module.exports = mongoose.model('Utilisateur', utilisateurSchema);
