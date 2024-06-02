import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const CreatePokedexForm = () => {
    const [nom, setNom] = useState('');
    const [utilisateurId, setUtilisateurId] = useState('');
    const [utilisateurs, setUtilisateurs] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        // Récupérer les utilisateurs existants
        const fetchUtilisateurs = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/utilisateurs');
                setUtilisateurs(response.data);
            } catch (error) {
                console.error('Erreur lors de la récupération des utilisateurs:', error);
            }
        };

        fetchUtilisateurs();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:5000/api/pokedexes/${utilisateurId}/pokedexes`, { nom });
            setMessage('Pokédex créé avec succès!');
            setNom('');
            setUtilisateurId('');
        } catch (error) {
            setMessage('Erreur lors de la création du Pokédex');
            console.error('Erreur lors de la création du Pokédex:', error);
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="position-absolute top-0 start-0 m-3">
                <Link to="/" className="btn btn-link">
                    <i className="bi bi-arrow-left-circle" style={{ fontSize: '1.5rem' }}></i> Retour
                </Link>
            </div>
            <div className="card p-4 w-50">
                <h2 className="mb-4 text-center">Créer un Pokédex</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="nom" className="form-label">Nom du Pokédex</label>
                        <input
                            type="text"
                            className="form-control"
                            id="nom"
                            value={nom}
                            onChange={(e) => setNom(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="utilisateurId" className="form-label">Utilisateur</label>
                        <select
                            className="form-control"
                            id="utilisateurId"
                            value={utilisateurId}
                            onChange={(e) => setUtilisateurId(e.target.value)}
                            required
                        >
                            <option value="">Sélectionner un utilisateur</option>
                            {utilisateurs.map((utilisateur) => (
                                <option key={utilisateur._id} value={utilisateur._id}>
                                    {utilisateur.nom}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Créer</button>
                </form>
                {message && <div className="mt-3 alert alert-info">{message}</div>}
            </div>
        </div>
    );
};

export default CreatePokedexForm;
