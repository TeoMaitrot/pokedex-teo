const express = require('express');
const utilisateurController = require('../controllers/utilisateurController');

const router = express.Router();

// Définition des routes pour la gestion des utilisateurs
router.get('/', utilisateurController.getAllUtilisateurs);
router.get('/:id', utilisateurController.getUtilisateurById);
router.post('/', utilisateurController.createUtilisateur);
router.post('/:utilisateurId/equipe', utilisateurController.addPokemonToEquipe);

module.exports = router;
