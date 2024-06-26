import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import CreateUserForm from './components/CreateUserForm';
import CreatePokedexForm from './components/CreatePokedexForm';
import LoadDataPage from './components/LoadDataPage';
import SelectPokemonPage from './components/SelectPokemonPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/create-user" element={<CreateUserForm />} />
          <Route path="/create-pokedex" element={<CreatePokedexForm />} />
          <Route path="/load-data" element={<LoadDataPage />} />
          <Route path="/select-pokemon" element={<SelectPokemonPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
