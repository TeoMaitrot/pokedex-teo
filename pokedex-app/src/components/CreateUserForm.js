import React, { useState } from 'react';

const CreateUserForm = () => {
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Implémentez la logique pour créer un utilisateur ici
    // Vous pouvez utiliser axios pour faire un POST vers l'API backend

    console.log('Utilisateur créé:', { nom, prenom });
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <div>
        <label>Nom:</label>
        <input type="text" value={nom} onChange={(e) => setNom(e.target.value)} required />
      </div>
      <div>
        <label>Prénom:</label>
        <input type="text" value={prenom} onChange={(e) => setPrenom(e.target.value)} required />
      </div>
      <button type="submit">Créer l'utilisateur</button>
    </form>
  );
};

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    padding: '20px',
    backgroundColor: '#f5f5f5',
    borderRadius: '5px',
    maxWidth: '400px',
    margin: '0 auto',
  }
};

export default CreateUserForm;
