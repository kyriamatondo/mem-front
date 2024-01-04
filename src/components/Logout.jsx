// Logout.js
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (window.confirm('Êtes-vous sûr de vouloir vous déconnecter ?')) {
      localStorage.removeItem('user');
      navigate('/login');
    } else {
      navigate(-1);
    }
  }, [navigate]);

  return null;
}

export default Logout;
