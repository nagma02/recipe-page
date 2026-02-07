import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const categories = [
    { id: 1, name: 'Breakfast', emoji: '🍳', color: '#FFD93D', count: '8+' },
    { id: 2, name: 'Lunch', emoji: '🍛', color: '#FF6B6B', count: '12+' },
    { id: 3, name: 'Dinner', emoji: '🍝', color: '#4ECDC4', count: '15+' },
    { id: 4, name: 'Desserts', emoji: '🍰', color: '#95E1D3', count: '10+' },
    { id: 5, name: 'Snacks', emoji: '🍿', color: '#F38181', count: '12+' },
    { id: 6, name: 'Drinks', emoji: '🥤', color: '#AA96DA', count: '5+' }
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/all-recipes?search=${searchTerm}`);
    }
  };

  return (
    <div className="home">
      <div className="home-hero">
        <div className="hero-content">
          <h1 className="hero-title">🍴 Welcome to Recipe Hub</h1>
          <p className="hero-subtitle">Discover, Cook, and Share Amazing Recipes</p>
          <p className="hero-description">50+ International & Indian Recipes | Easy to Follow | Professional Quality</p>
          
          {/* Home Search */}
          <form onSubmit={handleSearch} className="home-search">
            <input
              type="text"
              placeholder="🔍 Search recipes, ingredients, or cuisines..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="home-search-input"
            />
            <button type="submit" className="search-btn">Search</button>
          </form>
        </div>
      </div>
      
      <div className="categories-section">
        <h2 className="section-title">Browse by Category</h2>
          <div className="categories-grid">
          {categories.map(category => (
            <Link 
              key={category.id} 
              to={`/category/${category.name.toLowerCase()}`}
              className="category-card"
              style={{ backgroundColor: category.color }}
            >
              <div className="category-emoji">{category.emoji}</div>
              <h3>{category.name}</h3>
              <p className="recipe-count">{category.count} recipes</p>
            </Link>
          ))}
        </div>
      </div>
      
      <div className="features-section">
        <h2 className="section-title">Why Recipe Hub?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🌍</div>
            <h3>Global Cuisines</h3>
            <p>Indian, Italian, Chinese, Mexican & more</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>Quick & Easy</h3>
            <p>Step-by-step instructions for all levels</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔍</div>
            <h3>Smart Search</h3>
            <p>Find recipes by ingredients or name</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📱</div>
            <h3>Mobile Friendly</h3>
            <p>Cook anywhere, anytime on any device</p>
          </div>
        </div>
      </div>
      
      <div className="home-footer">
        <Link to="/all-recipes" className="view-all-btn">
          View All Recipes →
        </Link>
      </div>
    </div>
  );
}

export default Home;
