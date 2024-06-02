import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const SelectPokemonPage = () => {
  const [utilisateurs, setUtilisateurs] = useState([]);
  const [selectedUtilisateur, setSelectedUtilisateur] = useState('');
  const [pokedexes, setPokedexes] = useState([]);
  const [selectedPokedex, setSelectedPokedex] = useState('');
  const [pokemons, setPokemons] = useState([]);
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchUtilisateurs();
  }, []);

  const fetchUtilisateurs = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/utilisateurs');
      setUtilisateurs(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des utilisateurs', error);
    }
  };

  const fetchPokedexes = async (utilisateurId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/utilisateurs/${utilisateurId}/pokedexes`);
      setPokedexes(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des pokédexes', error);
    }
  };

  const loadSprites = async (startId, endId) => {
    try {
      setLoading(true);
      await axios.post('http://localhost:5000/api/pokemons/load-sprites', { startId, endId });
      setLoading(false);
    } catch (error) {
      console.error('Erreur lors du chargement des sprites', error);
      setLoading(false);
    }
  };

  const fetchPokemons = async (pokedexId, limit = 16, offset = 0) => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:5000/api/pokedexes/${selectedUtilisateur}/pokedexes/${pokedexId}/pokemons-par-lot`, {
        params: { limit, offset },
      });
      setPokemons(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Erreur lors de la récupération des pokémons', error);
      setLoading(false);
    }
  };

  const fetchTeam = async (utilisateurId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/utilisateurs/${utilisateurId}/equipe`);
      setTeam(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'équipe', error);
    }
  };

  const handleUtilisateurChange = (event) => {
    const utilisateurId = event.target.value;
    setSelectedUtilisateur(utilisateurId);
    fetchPokedexes(utilisateurId);
    fetchTeam(utilisateurId);
    setPokedexes([]);
    setPokemons([]);
  };

  const handlePokedexChange = async (event) => {
    const pokedexId = event.target.value;
    setSelectedPokedex(pokedexId);
    await loadSprites(1, 16);
    fetchPokemons(pokedexId);
  };

  const handleNextPage = async () => {
    const nextPage = currentPage + 1;
    const offset = nextPage * 16;
    await loadSprites(offset + 1, offset + 16);
    fetchPokemons(selectedPokedex, 16, offset);
    setCurrentPage(nextPage);
  };

  const handlePreviousPage = async () => {
    const prevPage = currentPage - 1;
    if (prevPage < 0) return;
    const offset = prevPage * 16;
    fetchPokemons(selectedPokedex, 16, offset);
    setCurrentPage(prevPage);
  };

  const handleAddToTeam = async (pokemonId) => {
    try {
      await axios.post(`http://localhost:5000/api/utilisateurs/${selectedUtilisateur}/pokedexes/${selectedPokedex}/equipe`, { pokemonId });
      const newPokemon = pokemons.find(pokemon => pokemon.id === pokemonId);
      setTeam([...team, newPokemon]);
      setErrorMessage('');
      window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to the top on success
    } catch (error) {
      const errorMsg = error.response?.data?.error || 'Erreur lors de l\'ajout du Pokémon à l\'équipe';
      setErrorMessage(`Erreur lors de l'ajout du Pokémon à l'équipe : ${errorMsg}`);
      window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to the top on error
    }
  };

  const handleRemoveFromTeam = async (pokemonId) => {
    try {
      await axios.delete(`http://localhost:5000/api/utilisateurs/${selectedUtilisateur}/equipe/${pokemonId}`);
      setTeam(team.filter(pokemon => pokemon.id !== pokemonId));
    } catch (error) {
      console.error('Erreur lors de la suppression du Pokémon de l\'équipe', error);
    }
  };

  const handleToggleCapture = async (pokemonId) => {
    try {
      await axios.put(`http://localhost:5000/api/pokedexes/${selectedUtilisateur}/pokedexes/${selectedPokedex}/pokemons/${pokemonId}/capture`);
      setPokemons(pokemons.map(pokemon => 
        pokemon.id === pokemonId ? { ...pokemon, captured: !pokemon.captured } : pokemon
      ));
      setErrorMessage('');
    } catch (error) {
      console.error('Erreur lors du changement de l\'état de capture du Pokémon', error);
    }
  };

  return (
    <div className="text-center">
      <Link to="/" className="btn btn-secondary mb-3">
        Retour à l'accueil
      </Link>
      <div className="card mx-auto" style={{ maxWidth: '1500px', padding: '20px', borderRadius: '15px', borderColor: '#007bff' }}>
        <h2 className="mb-4">Sélectionner un utilisateur et un Pokédex</h2>
        <div className="form-group">
          <label htmlFor="utilisateurSelect">Utilisateur</label>
          <select id="utilisateurSelect" className="form-control" value={selectedUtilisateur} onChange={handleUtilisateurChange}>
            <option value="">Sélectionner un utilisateur</option>
            {utilisateurs.map((utilisateur) => (
              <option key={utilisateur._id} value={utilisateur._id}>{utilisateur.nom}</option>
            ))}
          </select>
        </div>
        <div className="form-group mt-3">
          <label htmlFor="pokedexSelect">Pokédex</label>
          <select id="pokedexSelect" className="form-control" value={selectedPokedex} onChange={handlePokedexChange} disabled={!selectedUtilisateur}>
            <option value="">Sélectionner un pokédex</option>
            {pokedexes.map((pokedex) => (
              <option key={pokedex._id} value={pokedex._id}>{pokedex.nom}</option>
            ))}
          </select>
        </div>
        <div className="mt-4">
          <h3>Équipe</h3>
          <div className="d-flex justify-content-center">
            {team.map((pokemon) => (
              <div key={pokemon.pokemon} className="card m-2" style={{ width: '150px' }}>
                <img src={pokemon.spriteUrl} className="card-img-top" alt={pokemon.nom} />
                <div className="card-body">
                  <h5 className="card-title">{pokemon.nom}</h5>
                  <p className={`card-text ${pokemon.captured ? 'text-success' : 'text-danger'}`}>
                    {pokemon.captured ? 'Capturé' : 'Non capturé'}
                  </p>
                  <button className="btn btn-danger btn-sm" onClick={() => handleRemoveFromTeam(pokemon.id)}>Retirer</button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-4">
          <h3>Pokédex</h3>
          {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
          {loading ? (
            <p>Chargement...</p>
          ) : (
            <div className="d-flex justify-content-center flex-wrap">
              {pokemons.map((pokemon) => (
                <div key={pokemon.id} className="card m-2" style={{ width: '150px' }}>
                  <img src={pokemon.spriteUrl} className="card-img-top" alt={pokemon.nom} />
                  <div className="card-body">
                    <h5 className="card-title">{pokemon.nom}</h5>
                    <p className={`card-text ${pokemon.captured ? 'text-success' : 'text-danger'}`}>
                      {pokemon.captured ? 'Capturé' : 'Non capturé'}
                    </p>
                    <button className="btn btn-primary btn-sm" onClick={() => handleToggleCapture(pokemon.id)}>Changer l'état</button>
                    <button className="btn btn-secondary btn-sm mt-1" disabled={!pokemon.captured} onClick={() => handleAddToTeam(pokemon.id)}>Ajouter à l'équipe</button>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="d-flex justify-content-between mt-4">
            <button className="btn btn-secondary" onClick={handlePreviousPage} disabled={currentPage === 0}>
              Précédent
            </button>
            <button className="btn btn-secondary" onClick={handleNextPage}>
              Suivant
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectPokemonPage;
