import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react'; // Ajoutez useState
import './Accueil.css';

const Accueil = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user'))); // Nouveau

  useEffect(() => {
    const handleStorageChange = () => {
      setUser(JSON.parse(localStorage.getItem('user')));
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []); // Nouveau

  const handleLogout = () => {
    if (window.confirm('Êtes-vous sûr de vouloir vous déconnecter ?')) {
      localStorage.removeItem('user');
      navigate('/login');
    }
  };

  return (
    <div className="accueil-container">
      <header>
        <div className="navbar">
          <div className="logo">
            <Link to="/">
              <span>K</span>LOC
            </Link>
          </div>
          <div className="nav-links">
            <Link to="/accueil">
              Accueil
            </Link>
            <Link to="/services">Dépanne-moi</Link>
            <Link to="/contact">Contactez-nous</Link>
            <strong className='text'>{user && <div>Bonjour, {user.nom}!</div>}</strong> {/* Nouveau */}
            <button type="button" onClick={handleLogout} className='btn btn-outline-danger'>Déconnexion</button>
          </div>
        </div>
        <div className="header-content">
          <h1 className='titre'>DEPANNAGE AUTOMOBILE</h1>
          <div className="button">
            <Link to="/login" className="btn">
              GET STARTED
            </Link>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Accueil;
