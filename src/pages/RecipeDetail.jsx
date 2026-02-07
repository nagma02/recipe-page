import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchRecipeById } from '../services/api';
import './RecipeDetail.css';

function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const getRecipe = async () => {
      setLoading(true);
      try {
        const data = await fetchRecipeById(id);
        setRecipe(data);
      } catch (error) {
        console.error('Failed to fetch recipe:', error);
      } finally {
        setLoading(false);
      }
    };
    getRecipe();
  }, [id]);

  useEffect(() => {
    // Check if recipe is in favorites
    const saved = localStorage.getItem('favoriteRecipes');
    if (saved) {
      const favorites = JSON.parse(saved);
      setIsFavorite(favorites.includes(id));
    }
  }, [id]);

  const toggleFavorite = () => {
    const saved = localStorage.getItem('favoriteRecipes');
    let favorites = saved ? JSON.parse(saved) : [];
    
    if (favorites.includes(id)) {
      favorites = favorites.filter(fav => fav !== id);
    } else {
      favorites.push(id);
    }
    
    localStorage.setItem('favoriteRecipes', JSON.stringify(favorites));
    setIsFavorite(!isFavorite);
  };

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return <div className="recipe-detail"><div className="loading">Loading recipe...</div></div>;
  }

  if (!recipe) {
    return (
      <div className="recipe-detail">
        <h1>Recipe not found!</h1>
        <Link to="/">Go back to home</Link>
      </div>
    );
  }

  return (
    <div className="recipe-detail">
      <div className="detail-container">
        <Link to="/all-recipes" className="back-btn">← Back to Recipes</Link>
        
        <div className="detail-actions">
          <button onClick={toggleFavorite} className={`action-btn favorite-action ${isFavorite ? 'active' : ''}`}>
            {isFavorite ? '❤️ Saved' : '🤍 Save Recipe'}
          </button>
          <button onClick={handlePrint} className="action-btn print-btn">
            🖨️ Print Recipe
          </button>
        </div>
        
        <div className="recipe-hero">
          {recipe.image ? (
            <img src={recipe.image} alt={recipe.name} className="recipe-hero-image" />
          ) : (
            <div className="recipe-hero-icon">{recipe.icon}</div>
          )}
          <div className="recipe-header-info">
            <h1>{recipe.name}</h1>
            <p className="recipe-description">{recipe.description}</p>
            
            <div className="recipe-info">
              <div className="info-item">
                <span className="info-icon">⏱️</span>
                <div>
                  <span className="info-label">Time</span>
                  <span className="info-value">{recipe.time}</span>
                </div>
              </div>
              <div className="info-item">
                <span className="info-icon">👨‍🍳</span>
                <div>
                  <span className="info-label">Difficulty</span>
                  <span className={`info-value difficulty-${recipe.difficulty.toLowerCase()}`}>{recipe.difficulty}</span>
                </div>
              </div>
              <div className="info-item">
                <span className="info-icon">🍽️</span>
                <div>
                  <span className="info-label">Servings</span>
                  <span className="info-value">{recipe.servings}</span>
                </div>
              </div>
              <div className="info-item">
                <span className="info-icon">🏷️</span>
                <div>
                  <span className="info-label">Category</span>
                  <span className="info-value">{recipe.category}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="recipe-content">
          <div className="ingredients-section">
            <h2><span className="section-icon">📝</span> Ingredients</h2>
            <ul className="ingredients-list">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>
                  <span className="ingredient-check">✓</span>
                  {ingredient}
                </li>
              ))}
            </ul>
          </div>

          <div className="instructions-section">
            <h2><span className="section-icon">👩‍🍳</span> Instructions</h2>
            <ol className="instructions-list">
              {recipe.instructions.map((instruction, index) => (
                <li key={index}>
                  <span className="step-number">Step {index + 1}</span>
                  <p>{instruction}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecipeDetail;
