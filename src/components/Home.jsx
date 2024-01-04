
import { Link } from 'react-router-dom';


const Home = () => {
  return (
    <div className="home-container">
      <header>
        <div className="navbar">
          <div className="logo">
            <Link to="/">
              <span>K</span>LOC
            </Link>
          </div>
          <div className="nav-links">
            <Link to="/accueil">Accueil</Link>
            <Link to="/services">Dépanne-moi</Link>
            <Link to="/contact">Contactez-nous</Link>
            <Link to="/login" className="btn">
              Se connecter
            </Link>
          </div>
        </div>
        <div className="header-content">
          <h1 className="title">Localisation des services de dépannage</h1>
          <p className="subtitle">Trouvez rapidement des services de dépannage près de chez vous.</p>
          <div className="button">
            <Link to="/services" className="btn">
              Découvrir
            </Link>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Home;
