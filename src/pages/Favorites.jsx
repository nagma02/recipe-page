import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchRecipeById } from '../services/api';
import './Favorites.css';

function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFavorites = async () => {
      const saved = localStorage.getItem('favoriteRecipes');
      if (saved) {
        const favoriteIds = JSON.parse(saved);
        setFavorites(favoriteIds);
        
        // Fetch all favorite recipes
        setLoading(true);
        const recipePromises = favoriteIds.map(id => fetchRecipeById(id));
        try {
          const loadedRecipes = await Promise.all(recipePromises);
          setRecipes(loadedRecipes.filter(r => r !== null));
        } catch (error) {
          console.error('Error loading favorites:', error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };
    
    loadFavorites();
  }, []);

  const removeFavorite = (id) => {
    const newFavorites = favorites.filter(fav => fav !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
    setFavorites(newFavorites);
    setRecipes(recipes.filter(recipe => recipe.id !== id));
  };

  if (loading) {
    return <div className="favorites-page"><div className="loading">Loading your favorites...</div></div>;
  }

  return (
    <div className="favorites-page">
      <div className="favorites-container">
        <div className="favorites-header">
          <Link to="/" className="back-btn">← Back to Home</Link>
          <h1>❤️ My Favorite Recipes</h1>
          <p>{recipes.length} saved {recipes.length === 1 ? 'recipe' : 'recipes'}</p>
        </div>

        {recipes.length === 0 ? (
          <div className="no-favorites">
            <div className="no-favorites-icon">🍳</div>
            <h2>No favorites yet!</h2>
            <p>Start exploring recipes and save your favorites by clicking the heart icon.</p>
            <Link to="/all-recipes" className="explore-btn">Explore Recipes</Link>
          </div>
        ) : (
          <div className="favorites-grid">
            {recipes.map(recipe => (
              <div key={recipe.id} className="favorite-card-wrapper">
                <button 
                  className="remove-favorite-btn"
                  onClick={() => removeFavorite(recipe.id)}
                  title="Remove from favorites"
                >
                  ❌
                </button>
                <Link to={`/recipe/${recipe.id}`} className="favorite-card">
                  {recipe.image ? (
                    <img src={recipe.image} alt={recipe.name} className="favorite-image" />
                  ) : (
                    <div className="favorite-icon">{recipe.icon}</div>
                  )}
                  <div className="favorite-info">
                    <h3>{recipe.name}</h3>
                    <div className="favorite-meta">
                      <span className="meta-badge">⏱️ {recipe.time}</span>
                      <span className={`meta-badge difficulty-${recipe.difficulty.toLowerCase()}`}>
                        {recipe.difficulty}
                      </span>
                    </div>
                    <p className="favorite-preview">{recipe.description}</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Favorites;
