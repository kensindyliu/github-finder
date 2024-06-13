import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Search from './components/Search';
import User from './components/User';
import '../src/style/styles.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Search />} />
        <Route path="/user/:username" element={<User />} />
      </Routes>
    </Router>
  );
}

export default App;
