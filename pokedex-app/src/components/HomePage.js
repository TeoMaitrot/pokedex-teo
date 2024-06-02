import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <div className="container text-center mt-5">
            <h1>Bienvenue dans l'application de Téo Maitrot</h1>
            <p>Bienvenue dans le gestionnaire de pokedex</p>
            <p>Cette application permet de visualier et le pokdex et les équipes de différents utilisateurs.</p>
            <p>Avant d'afficher les données d'un pokedex n'oubliez pas de charger les données</p>
            <div className="mt-4">
                <Link to="/create-user" className="btn btn-primary me-2">Créer un utilisateur</Link>
                <Link to="/create-pokedex" className="btn btn-primary m-2">Créer un Pokédex</Link>
                <Link to="/load-data" className="btn btn-primary m-2">Charger les données Pokémon</Link>
            </div>
        </div>
    );
};

export default HomePage;
