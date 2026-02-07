import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-icon">🍴</span>
          <span className="logo-text">Recipe Hub</span>
        </Link>
        
        <div className="navbar-menu">
          <Link 
            to="/" 
            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
          >
            Home
          </Link>
          <Link 
            to="/all-recipes" 
            className={`nav-link ${location.pathname === '/all-recipes' ? 'active' : ''}`}
          >
            All Recipes
          </Link>
          <Link 
            to="/favorites" 
            className={`nav-link ${location.pathname === '/favorites' ? 'active' : ''}`}
          >
            ❤️ Favorites
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
