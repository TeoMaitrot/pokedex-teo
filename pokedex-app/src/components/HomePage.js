import React from 'react';

const HomePage = () => {
    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Bienvenue dans le gestionnaire de pokedex</h1>
            <p style={styles.description}>
                Cette application permet de visualier et le pokdex et les équipes de différents utilisateurs.
            </p>
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
};

export default HomePage;
