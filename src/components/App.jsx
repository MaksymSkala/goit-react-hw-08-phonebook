import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './Navigation/Navigation';
import Register from './Register/Register';
import Login from './Login/Login';
import Contacts from './Contacts/Contacts';

const App = () => {
  return (
    <Router>
      <div>
        <Navigation />
        <Routes>        
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/contacts" element={<Contacts />} />
          {/* Додайте маршрут за замовчуванням */}
          <Route path="*" element={<DefaultComponent />} />
        </Routes>
      </div>
    </Router>
  );
};

// Компонент за замовчуванням, який може бути вашим компонентом 404 або іншим
const DefaultComponent = () => {
  return <div>Default Content</div>;
};

export default App;