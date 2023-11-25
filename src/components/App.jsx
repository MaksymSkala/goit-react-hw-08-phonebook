import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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
              // Якщо не автентифіковано, перенаправте на сторінку логіну
              <Navigate to="/login" />
            )}
          />
          {/* Додайте маршрут за замовчуванням */}
          <Route path="*" element={<DefaultComponent />} />
        </Routes>
      </div>
    </Router>
  );
};

// Компонент за замовчуванням, який може бути вашим компонентом 404 або іншим
const DefaultComponent = () => {
  return <div>Phonebook</div>;
};

export default App;