// Controller des utilisateurs
const utilisateurService = require('../services/utilisateurService');

exports.getAllUtilisateurs = async (req, res) => {
    try {
        const utilisateurs = await utilisateurService.getAllUtilisateurs();
        res.send(utilisateurs);
    } catch (error) {
        res.status(500).send({ error: "Erreur lors de la récupération des utilisateurs" });
    }
};

exports.getUtilisateurById = async (req, res) => {
    try {
        const utilisateur = await utilisateurService.getUtilisateurById(req.params.id);
        if (!utilisateur) {
            return res.status(404).send({ error: "Utilisateur non trouvé" });
        }
        res.send(utilisateur);
    } catch (error) {
        res.status(500).send({ error: "Erreur lors de la récupération de l'utilisateur" });
    }
};

exports.createUtilisateur = async (req, res) => {
    try {
        const utilisateur = await utilisateurService.createUtilisateur(req.body);
        res.send(utilisateur);
    } catch (error) {
        res.status(500).send({ error: "Erreur lors de la création de l'utilisateur" });
    }
};

exports.addPokemonToEquipe = async (req, res) => {
    try {
        const utilisateur = await utilisateurService.addPokemonToEquipe(req.params.utilisateurId, req.body.pokemonId);
        res.send(utilisateur);
    } catch (error) {
        res.status(500).send({ error: "Erreur lors de l'ajout du Pokémon à l'équipe" });
    }
};
