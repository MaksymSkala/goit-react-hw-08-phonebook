import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navigation from './Navigation/Navigation';
import Register from './Register/Register';
import Login from './Login/Login';
import Contacts from './Contacts/Contacts';

const App = () => {
  return (
    <Router>
      <div>
        <Navigation />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/contacts" component={Contacts} />
      </div>
    </Router>
  );
};

export default App;