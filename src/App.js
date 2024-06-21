// src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Home from './pages/Home'; // Your protected dashboard component
import ProtectedRoute from './ProtectedRoute';
import Profile from './pages/Profile';
import Navbar from './components/Navbar';
import { useAuth } from './providers/AuthProvider';
import SearchPage from './pages/Search';



const App = () => {
  const [mode, setMode] = React.useState('light');
  const toggleColorMode = () => {
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const { user } = useAuth()
  
  return (
    <BrowserRouter>
    <Navbar mode={mode} toggleColorMode={toggleColorMode} />
      <Routes>
        <Route path="/signup" element={ user ? <Home/> : <SignUp />  } />
        <Route path="/login" element={<SignIn />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/home" element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } />
        <Route path="/search" element={
          <ProtectedRoute>
            <SearchPage />
          </ProtectedRoute>
        } />
        <Route path="/" element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } />
        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
