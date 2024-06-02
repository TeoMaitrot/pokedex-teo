const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const cors = require('cors');
const pokemonRoutes = require('./routes/pokemonRoutes');
const utilisateurRoutes = require('./routes/utilisateurRoutes');
const pokedexRoutes = require('./routes/pokedexRoutes');

const app = express();

// URL pour se connecter à ta base de données MongoDB
const mongoAtlasUri = "mongodb+srv://teo21maitr:admin@cluster0.ztutran.mongodb.net/pokedex?retryWrites=true&w=majority";

// Fonction asynchrone pour se connecter à MongoDB
async function connectToDatabase() {
    try {
        await mongoose.connect(mongoAtlasUri);
        console.log("Mongoose est connecté");
    } catch (e) {
        console.error("La connexion a échoué", e);
    }
}

// Appel de la fonction pour se connecter à la base de données
connectToDatabase();

app.use(cors());
app.use(bodyParser.json());

// Utiliser les routes sous le préfixe /api
app.use('/api/pokemons', pokemonRoutes);
app.use('/api/utilisateurs', utilisateurRoutes);
app.use('/api/pokedexes', pokedexRoutes);

app.listen(5000, () => {
    console.log("Le serveur a démarré !");
});
