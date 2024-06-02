import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Bienvenue dans le gestionnaire de pokedex</h1>
            <p style={styles.description}>
                Cette application permet de visualier et le pokdex et les équipes de différents utilisateurs.
            </p>
            <Link to="/create-user">
                <button style={styles.button}>Créer un utilisateur</button>
            </Link>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#f5f5f5',
        padding: '0 20px',
    },
    title: {
        fontSize: '2.5rem',
        color: '#333',
    },
    description: {
        fontSize: '1.2rem',
        color: '#666',
        textAlign: 'center',
        maxWidth: '600px',
    },
    button: {
      padding: '10px 20px',
      fontSize: '16px',
      cursor: 'pointer',
      backgroundColor: '#4CAF50',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
    }
};

export default HomePage;
