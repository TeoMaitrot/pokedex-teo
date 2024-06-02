import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const CreateUserForm = () => {
    const [nom, setNom] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/utilisateurs', { nom });
            setMessage('Utilisateur créé avec succès!');
            setNom(''); // Vider le champ de saisie
        } catch (error) {
            setMessage('Erreur lors de la création de l\'utilisateur');
            console.error('Erreur lors de la création de l\'utilisateur:', error);
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
                <h2 className="mb-4 text-center">Créer un utilisateur</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="nom" className="form-label">Nom</label>
                        <input
                            type="text"
                            className="form-control"
                            id="nom"
                            value={nom}
                            onChange={(e) => setNom(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Créer</button>
                </form>
                {message && <div className="mt-3 alert alert-info">{message}</div>}
            </div>
        </div>
    );
};

export default CreateUserForm;
