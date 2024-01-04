// App.js
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './App.css';
import Login from './components/Login/Login';
import Services from './components/Services';
import Accueil from './components/Accueil/Accueil';
import Inscription from './components/Inscription/Inscription';

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

  useEffect(() => {
    if (!user && window.location.pathname !== '/login') {
      window.location.href = '/login';
    }
  }, [user]);
  

  useEffect(() => {
    const handleStorageChange = () => {
      setUser(JSON.parse(localStorage.getItem('user')));
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <BrowserRouter>
      <Routes>
      
        <Route path='/' element={<Login />} />
        <Route path='/login' element={<Login />} />
        <Route path='/services' element={<Services />} />
        <Route path='/accueil' element={<Accueil />} />
        <Route path='/inscription' element={<Inscription />} />
       
      </Routes>
    </BrowserRouter>
  );
}

export default App;
