import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import CreateUserForm from './components/CreateUserForm';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/create-user" element={<CreateUserForm />} />
          {/* Futurs routes */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
