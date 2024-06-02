// Service pour la gestion des utilisateurs
const utilisateurManager = require('../managers/utilisateurManager');
const pokemonManager = require('../managers/pokemonManager');

/**
 * Retourne tous les utilsiateurs
 * @returns tous les utilsiateurs 
 */
exports.getAllUtilisateurs = async () => {
    return await utilisateurManager.getAllUtilisateurs();
};

/**
 * Retourne un utilisateur
 * @param {*} id id de l'utilisateur
 * @returns un utilisateur
 */
exports.getUtilisateurById = async (id) => {
    return await utilisateurManager.getUtilisateurById(id);
};

/**
 * Permet de créer un utilisateur
 * @param {*} utilisateurData données de l'utilisateur à créer
 * @returns l'utilisateur créé
 */
exports.createUtilisateur = async (utilisateurData) => {
    return await utilisateurManager.createUtilisateur(utilisateurData);
};

/**
 * Ajoute un pokemon à l'équipe d'un utilisateur
 * @param {*} utilisateurId id de l'utilisateur
 * @param {*} pokedexId id du pokedex de l'utilisateur 
 * @param {*} pokemonId id du pokemon
 * @returns l'utilisateur modifié
 */
exports.addPokemonToEquipe = async (utilisateurId, pokedexId, pokemonId) => {
    const utilisateur = await utilisateurManager.getUtilisateurById(utilisateurId);
    if (!utilisateur) {
        throw new Error('Utilisateur non trouvé');
    }

    // Vérifier si le pokémon est dans le pokédex de l'utilisateur
    const pokedex = await utilisateurManager.getPokedexById(utilisateurId, pokedexId);
    if (!pokedex) {
        throw new Error('Pokedex non trouvé');
    }

    const pokemonEntry = pokedex.pokemons.find(p => p.pokemon === pokemonId);
    if (!pokemonEntry) {
        throw new Error('Le Pokémon n\'est pas dans le Pokédex de l\'utilisateur');
    }

    if (!pokemonEntry.captured) {
        throw new Error('Le Pokémon doit être capturé pour être ajouté à l\'équipe');
    }

    if (utilisateur.equipe.length >= 6) {
        throw new Error('L\'équipe ne peut pas avoir plus de 6 Pokémon');
    }

    if(utilisateur.equipe.includes(pokemonId)){
        throw new Error('Ce pokemon est déjà dans l\'équipe');
    }

    utilisateur.equipe.push(pokemonId);
    return await utilisateurManager.updateUtilisateur(utilisateur);
};

/**
 * Récupère l'équipe d'un utilisateur
 * @param {*} utilisateurId id de l'utilisateur
 * @returns l'équpe de l'utilisateur
 */
exports.getEquipeByUtilisateurId = async (utilisateurId) => {
    const utilisateur = await utilisateurManager.getUtilisateurById(utilisateurId);
    if (!utilisateur) {
        throw new Error('Utilisateur non trouvé');
    }

    const equipeDetails = await Promise.all(
        utilisateur.equipe.map(async (pokemonId) => {
            const pokemon = await pokemonManager.getPokemonById(pokemonId);
            return {
                id: pokemon.id,
                nom: pokemon.nom,
                spriteUrl: pokemon.spriteUrl,
                captured: true, // Par définition, un Pokémon dans l'équipe est capturé
            };
        })
    );

    return equipeDetails;
};

/**
 * Permet de retirer un pokemon de l'équipe d'un utilisateur
 * @param {*} utilisateurId id de l'utilisateur
 * @param {*} pokemonId id du pokemon
 * @returns l'utilisateur modifié
 */
exports.removePokemonFromEquipe = async (utilisateurId, pokemonId) => {
    const utilisateur = await utilisateurManager.getUtilisateurById(utilisateurId);
    if (!utilisateur) {
        throw new Error('Utilisateur non trouvé');
    }

    const pokemonIndex = utilisateur.equipe.indexOf(pokemonId);
    if (pokemonIndex === -1) {
        throw new Error('Le Pokémon n\'est pas dans l\'équipe');
    }

    utilisateur.equipe.splice(pokemonIndex, 1);
    return await utilisateurManager.updateUtilisateur(utilisateur);
};

