import React from 'react';
import './App.css';
import Register from './Register'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login.js';
import User from './User.js';


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/register" element={<Register />} />
        </Routes>
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
        <Routes>
          <Route path="/user/:id" element={<User />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
