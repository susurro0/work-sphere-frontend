import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home'; 
import Pathfinder from './pages/Pathfinder'; 
import AuthPage from './pages/AuthPage';
import BaseLayout from './layout/BaseLayout';
const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/pathfinder" element={<Pathfinder />} />
      <Route path="/auth" element={<BaseLayout><AuthPage /></BaseLayout>} />

      {/* Add more routes as needed */}
    </Routes>
  </Router>
);

export default App;
