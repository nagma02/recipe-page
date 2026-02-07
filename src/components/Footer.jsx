import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>🍴 Recipe Hub</h3>
          <p>Discover and cook amazing recipes from around the world</p>
        </div>
        
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/all-recipes">All Recipes</a></li>
            <li><a href="#about">About</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>Categories</h4>
          <ul>
            <li><a href="/category/breakfast">Breakfast</a></li>
            <li><a href="/category/lunch">Lunch</a></li>
            <li><a href="/category/dinner">Dinner</a></li>
            <li><a href="/category/desserts">Desserts</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>Connect</h4>
          <div className="social-links">
            <a href="#" className="social-icon">📘</a>
            <a href="#" className="social-icon">📷</a>
            <a href="#" className="social-icon">🐦</a>
            <a href="#" className="social-icon">📌</a>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; 2026 Recipe Hub. All rights reserved.</p>
        <p className="developer-credit">
          Developed by <strong>Your Name</strong> | 
          <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer"> GitHub</a> | 
          <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer"> LinkedIn</a> | 
          <a href="https://yourportfolio.com" target="_blank" rel="noopener noreferrer"> Portfolio</a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
