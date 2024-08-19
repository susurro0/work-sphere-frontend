import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home'; 
import Pathfinder from './pages/Pathfinder'; 
import AuthPage from './pages/AuthPage';
import BaseLayout from './layout/BaseLayout';
import ProtectedRoute  from './auth/ProtectedRoute'
import { StoreProvider } from './store/contexts/StoreContext';

const App = () => (
  <StoreProvider>
    <Router>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pathfinder" element={
            <ProtectedRoute element={<Pathfinder />} />
          } />      
          <Route path="/auth" element={<BaseLayout><AuthPage /></BaseLayout>} />

          {/* Add more routes as needed */}
      </Routes>
    </Router>
  </StoreProvider>

);

export default App;
