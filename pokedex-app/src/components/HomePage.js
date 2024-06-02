import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <div className="container text-center mt-5">
            <h1>Bienvenue dans l'application de Téo Maitrot</h1>
            <p>Bienvenue dans le gestionnaire de pokedex</p>
            <p>Cette application permet de visualier et le pokdex et les équipes de différents utilisateurs.</p>
            <div className="mt-4">
                <Link to="/create-user" className="btn btn-primary me-2">Créer un utilisateur</Link>
                <Link to="/create-pokedex" className="btn btn-secondary">Créer un Pokédex</Link>
            </div>
        </div>
    );
};

export default HomePage;
