import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { fetchAllRecipes, fetchRecipesByArea } from '../services/api';
import './AllRecipes.css';

function AllRecipes() {
  const [searchParams] = useSearchParams();
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('name');
  const [filterDifficulty, setFilterDifficulty] = useState('all');
  const [filterCuisine, setFilterCuisine] = useState('all');
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('favoriteRecipes');
    return saved ? JSON.parse(saved) : [];
  });

  // Fetch recipes - optimized for instant loading
  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      try {
        let data;
        if (filterCuisine !== 'all') {
          data = await fetchRecipesByArea(filterCuisine);
        } else {
          data = await fetchAllRecipes();
        }
        setRecipes(data);
        setFilteredRecipes(data);
      } catch (error) {
        console.error('Failed to fetch recipes:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipes();
  }, [filterCuisine]);

  // Enhanced Search functionality - searches name, category, description, and ingredients
  useEffect(() => {
    let results = recipes.filter(recipe => {
      const searchLower = searchTerm.toLowerCase();
      return (
        recipe.name.toLowerCase().includes(searchLower) ||
        recipe.category.toLowerCase().includes(searchLower) ||
        recipe.description.toLowerCase().includes(searchLower) ||
        recipe.ingredients.some(ing => ing.toLowerCase().includes(searchLower))
      );
    });

    // Filter by difficulty
    if (filterDifficulty !== 'all') {
      results = results.filter(recipe => recipe.difficulty.toLowerCase() === filterDifficulty);
    }

    // Sort recipes
    results.sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      } else if (sortBy === 'time') {
        return parseInt(a.time) - parseInt(b.time);
      } else if (sortBy === 'difficulty') {
        const difficultyOrder = { 'Easy': 1, 'Medium': 2, 'Hard': 3 };
        return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
      }
      return 0;
    });

    setFilteredRecipes(results);
  }, [searchTerm, recipes, sortBy, filterDifficulty]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Print functionality - can be added to recipe cards if needed
  // const handlePrint = (recipe) => {
  //   const printWindow = window.open('', '', 'height=600,width=800');
  //   printWindow.document.write(`...`);
  //   printWindow.document.close();
  //   printWindow.print();
  // };

  const toggleFavorite = (recipeId) => {
    setFavorites(prev => {
      const newFavorites = prev.includes(recipeId)
        ? prev.filter(id => id !== recipeId)
        : [...prev, recipeId];
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  return (
    <div className="all-recipes">
      <div className="recipes-header">
        <Link to="/" className="back-btn">← Back</Link>
        <h1>All Recipes</h1>
        <p>Explore our complete collection of delicious recipes</p>
        
        {/* Search Bar */}
        <div className="search-container">
          <input
            type="text"
            placeholder="🔍 Search recipes by name, ingredients, or category..."
            value={searchTerm}
            onChange={handleSearch}
            className="search-input"
          />
        </div>
        
        {/* Filters and Sort */}
        <div className="filters-container">
          <div className="filter-group">
            <label>Sort by:</label>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="filter-select">
              <option value="name">Name (A-Z)</option>
              <option value="time">Cooking Time</option>
              <option value="difficulty">Difficulty</option>
            </select>
          </div>
          
          <div className="filter-group">
            <label>Difficulty:</label>
            <select value={filterDifficulty} onChange={(e) => setFilterDifficulty(e.target.value)} className="filter-select">
              <option value="all">All Levels</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
          
          <div className="filter-group">
            <label>Cuisine:</label>
            <select value={filterCuisine} onChange={(e) => setFilterCuisine(e.target.value)} className="filter-select">
              <option value="all">All Cuisines</option>
              <option value="Indian">Indian</option>
              <option value="Italian">Italian</option>
              <option value="Chinese">Chinese</option>
              <option value="Mexican">Mexican</option>
              <option value="Japanese">Japanese</option>
              <option value="Thai">Thai</option>
              <option value="French">French</option>
              <option value="American">American</option>
            </select>
          </div>
        </div>
        
        {searchTerm && (
          <p className="search-results">Found {filteredRecipes.length} recipe{filteredRecipes.length !== 1 ? 's' : ''}</p>
        )}
      </div>
      
      {loading ? (
        <div className="loading">Loading recipes...</div>
      ) : (
        <div className="recipes-grid">
          {filteredRecipes.length > 0 ? (
            filteredRecipes.map(recipe => (
          <div key={recipe.id} className="recipe-card-wrapper">
            <button 
              className={`favorite-btn ${favorites.includes(recipe.id) ? 'active' : ''}`}
              onClick={() => toggleFavorite(recipe.id)}
              title={favorites.includes(recipe.id) ? 'Remove from favorites' : 'Add to favorites'}
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
        <div className="no-results">
          <h3>No recipes found</h3>
          <p>Try searching with different keywords</p>
        </div>
      )}
      </div>
      )}
    </div>
  );
}

export default AllRecipes;
