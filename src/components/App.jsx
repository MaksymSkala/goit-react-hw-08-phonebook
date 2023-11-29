import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navigation from './Navigation/Navigation';
import Register from './Register/Register';
import Login from './Login/Login';
import Contacts from './Contacts/Contacts';

const App = () => {
  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <Router>
      <div>
        <Navigation />
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/contacts"
            element={isAuthenticated ? (
              <Contacts />
            ) : (
              <Navigate to="/login" />
            )}
          />
          <Route path="*" element={<DefaultComponent />} />
        </Routes>
      </div>
    </Router>
  );
};

const DefaultComponent = () => {
  return <div>Phonebook</div>;
};

export default App;