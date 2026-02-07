import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchRecipesByCategory } from '../services/api';
import './AllRecipes.css';

function CategoryRecipes() {
  const { category } = useParams();
  const [categoryRecipes, setCategoryRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('favoriteRecipes');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    const getRecipes = async () => {
      setLoading(true);
      try {
        const data = await fetchRecipesByCategory(category);
        setCategoryRecipes(data);
      } catch (error) {
        console.error('Failed to fetch recipes:', error);
      } finally {
        setLoading(false);
      }
    };
    getRecipes();
  }, [category]);

  const toggleFavorite = (recipeId) => {
    let newFavorites;
    if (favorites.includes(recipeId)) {
      newFavorites = favorites.filter(id => id !== recipeId);
    } else {
      newFavorites = [...favorites, recipeId];
    }
    setFavorites(newFavorites);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
  };

  return (
    <div className="all-recipes">
      <div className="recipes-header">
        <Link to="/" className="back-btn">← Back</Link>
        <h1>{category.charAt(0).toUpperCase() + category.slice(1)} Recipes</h1>
        <p>Delicious {category} recipes just for you!</p>
      </div>
      
      {loading ? (
        <div className="loading">Loading recipes...</div>
      ) : (
        <div className="recipes-grid">
          {categoryRecipes.length > 0 ? (
          categoryRecipes.map(recipe => (
            <div key={recipe.id} className="recipe-card-wrapper">
              <button 
                className={`favorite-btn ${favorites.includes(recipe.id) ? 'active' : ''}`}
                onClick={() => toggleFavorite(recipe.id)}
              >
                {favorites.includes(recipe.id) ? '❤️' : '🤍'}
              </button>
              <Link 
                to={`/recipe/${recipe.id}`}
                className="recipe-card"
              >
                {recipe.image ? (
                  <img src={recipe.image} alt={recipe.name} className="recipe-image" />
                ) : (
                  <div className="recipe-icon">{recipe.icon}</div>
                )}
                <h3>{recipe.name}</h3>
                <div className="recipe-meta">
                  <span>⏱️ {recipe.time}</span>
                  <span>👨‍🍳 {recipe.difficulty}</span>
                </div>
                <p className="recipe-preview">{recipe.description}</p>
              </Link>
            </div>
          ))
        ) : (
          <p>No recipes found in this category.</p>
        )}
      </div>
      )}
    </div>
  );
}

export default CategoryRecipes;
