// components/LoadDataPage.js
import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const LoadDataPage = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleLoadData = async () => {
    setLoading(true);
    setMessage('');
    try {
      await axios.post('http://localhost:5000/api/pokemons/loadPokemonData');
      setMessage('Les données Pokémon ont été chargées avec succès.');
    } catch (error) {
      setMessage('Erreur lors du chargement des données Pokémon.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-center">
      <Link to="/" className="btn btn-secondary mb-3">
        Retour à l'accueil
      </Link>
      <div className="card mx-auto" style={{ maxWidth: '400px', padding: '20px', borderRadius: '15px', borderColor: '#007bff' }}>
        <h2 className="mb-4">Charger les données Pokémon</h2>
        {loading ? (
          <div>
            <div className="spinner-border text-primary" role="status">
              <span className="sr-only">  </span>
            </div>
            <p className="mt-3">Le chargement des données peut prendre un certain temps...</p>
          </div>
        ) : (
          <button onClick={handleLoadData} className="btn btn-primary">
            Charger les données
          </button>
        )}
        {message && <p className="mt-3">{message}</p>}
      </div>
    </div>
  );
};

export default LoadDataPage;
