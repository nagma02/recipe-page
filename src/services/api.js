// API Service for Recipe App
// Using TheMealDB API (Free, no API key required)

const API_BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

// Toggle between API and local data
const USE_API = false; // Set to true for API, false for instant local data

// Helper function to transform API data to our format
const transformMealToRecipe = (meal, index) => {
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient && ingredient.trim()) {
      ingredients.push(`${measure} ${ingredient}`.trim());
    }
  }

  const instructions = meal.strInstructions
    ? meal.strInstructions.split('\r\n').filter(step => step.trim())
    : meal.strInstructions.split('.').filter(step => step.trim());

  return {
    id: parseInt(meal.idMeal) || index,
    name: meal.strMeal,
    icon: getCategoryIcon(meal.strCategory),
    category: mapCategory(meal.strCategory),
    time: "30-45 mins",
    difficulty: "Medium",
    servings: "4",
    description: meal.strMeal,
    image: meal.strMealThumb,
    ingredients: ingredients,
    instructions: instructions.map(step => step.trim())
  };
};

// Map API categories to our categories
const mapCategory = (apiCategory) => {
  const categoryMap = {
    'Breakfast': 'Breakfast',
    'Dessert': 'Desserts',
    'Starter': 'Snacks',
    'Side': 'Snacks',
    'Vegetarian': 'Lunch',
    'Seafood': 'Dinner',
    'Chicken': 'Dinner',
    'Beef': 'Dinner',
    'Lamb': 'Dinner',
    'Pork': 'Dinner',
    'Pasta': 'Lunch'
  };
  return categoryMap[apiCategory] || 'Lunch';
};

// Get icon based on category
const getCategoryIcon = (category) => {
  const iconMap = {
    'Breakfast': '🍳',
    'Dessert': '🍰',
    'Starter': '🍿',
    'Seafood': '🐟',
    'Chicken': '🍗',
    'Beef': '🥩',
    'Lamb': '🍖',
    'Pork': '🥓',
    'Pasta': '🍝',
    'Vegetarian': '🥗'
  };
  return iconMap[category] || '🍽️';
};

/**
 * Fetch all recipes from TheMealDB API
 */
export const fetchAllRecipes = async () => {
  try {
    // If API is disabled, use local data
    if (!USE_API) {
      const { recipesData } = await import('../data/recipesData');
      return recipesData;
    }
    
    // Try to fetch from API - Get more categories for more recipes
    const categories = ['Chicken', 'Beef', 'Dessert', 'Vegetarian', 'Seafood', 'Pasta', 'Pork', 'Lamb', 'Breakfast', 'Side'];
    const allRecipes = [];
    
    for (const category of categories) {
      try {
        const response = await fetch(`${API_BASE_URL}/filter.php?c=${category}`);
        const data = await response.json();
        
        if (data.meals) {
          // Get first 8 from each category for faster loading
          const meals = data.meals.slice(0, 8);
          for (const meal of meals) {
            // Fetch full details for each meal
            const detailResponse = await fetch(`${API_BASE_URL}/lookup.php?i=${meal.idMeal}`);
            const detailData = await detailResponse.json();
            if (detailData.meals && detailData.meals[0]) {
              allRecipes.push(transformMealToRecipe(detailData.meals[0], allRecipes.length + 1));
            }
          }
        }
      } catch (err) {
        console.log(`Error fetching ${category}:`, err);
      }
    }
    
    // If API fails or returns nothing, fallback to local data
    if (allRecipes.length === 0) {
      const { recipesData } = await import('../data/recipesData');
      return recipesData;
    }
    
    return allRecipes;
  } catch (error) {
    console.error('Error fetching recipes from API, using local data:', error);
    // Fallback to local data
    const { recipesData } = await import('../data/recipesData');
    return recipesData;
  }
};

/**
 * Fetch single recipe by ID from API
 */
export const fetchRecipeById = async (id) => {
  try {
    // Try API first
    const response = await fetch(`${API_BASE_URL}/lookup.php?i=${id}`);
    const data = await response.json();
    
    if (data.meals && data.meals[0]) {
      return transformMealToRecipe(data.meals[0], id);
    }
    
    // Fallback to local data
    const { recipesData } = await import('../data/recipesData');
    return recipesData.find(recipe => recipe.id === parseInt(id));
  } catch (error) {
    console.error('Error fetching recipe:', error);
    // Fallback to local data
    const { recipesData } = await import('../data/recipesData');
    return recipesData.find(recipe => recipe.id === parseInt(id));
  }
};

/**
 * Search recipes by query from API
 */
export const searchRecipes = async (query) => {
  try {
    if (!USE_API) {
      // Use local search
      const { recipesData } = await import('../data/recipesData');
      return recipesData.filter(recipe =>
        recipe.name.toLowerCase().includes(query.toLowerCase()) ||
        recipe.category.toLowerCase().includes(query.toLowerCase()) ||
        recipe.description.toLowerCase().includes(query.toLowerCase())
      );
    }
    
    // Try multiple search strategies
    let allResults = [];
    
    // 1. Search by name
    try {
      const nameResponse = await fetch(`${API_BASE_URL}/search.php?s=${query}`);
      const nameData = await nameResponse.json();
      if (nameData.meals) {
        allResults = nameData.meals.map((meal, index) => transformMealToRecipe(meal, index));
      }
    } catch (err) {
      console.log('Name search error:', err);
    }
    
    // 2. Search by first letter if query is single character
    if (query.length === 1) {
      try {
        const letterResponse = await fetch(`${API_BASE_URL}/search.php?f=${query}`);
        const letterData = await letterResponse.json();
        if (letterData.meals) {
          const letterResults = letterData.meals.map((meal, index) => transformMealToRecipe(meal, index + allResults.length));
          allResults = [...allResults, ...letterResults];
        }
      } catch (err) {
        console.log('Letter search error:', err);
      }
    }
    
    // 3. Search by ingredient
    try {
      const ingredientResponse = await fetch(`${API_BASE_URL}/filter.php?i=${query}`);
      const ingredientData = await ingredientResponse.json();
      if (ingredientData.meals) {
        for (const meal of ingredientData.meals.slice(0, 10)) {
          const detailResponse = await fetch(`${API_BASE_URL}/lookup.php?i=${meal.idMeal}`);
          const detailData = await detailResponse.json();
          if (detailData.meals && detailData.meals[0]) {
            // Check if not already in results
            if (!allResults.find(r => r.id === parseInt(meal.idMeal))) {
              allResults.push(transformMealToRecipe(detailData.meals[0], allResults.length));
            }
          }
        }
      }
    } catch (err) {
      console.log('Ingredient search error:', err);
    }
    
    return allResults;
  } catch (error) {
    console.error('Error searching recipes:', error);
    return [];
  }
};

/**
 * Fetch recipes by category from API
 */
export const fetchRecipesByCategory = async (category) => {
  try {
    // Map our categories to API categories
    const apiCategoryMap = {
      'breakfast': 'Breakfast',
      'lunch': 'Vegetarian',
      'dinner': 'Chicken',
      'desserts': 'Dessert',
      'snacks': 'Starter',
      'drinks': 'Dessert'
    };
    
    const apiCategory = apiCategoryMap[category.toLowerCase()] || 'Chicken';
    
    const response = await fetch(`${API_BASE_URL}/filter.php?c=${apiCategory}`);
    const data = await response.json();
    
    if (data.meals && data.meals.length > 0) {
      const detailedRecipes = [];
      // Get details for first 10 meals
      for (const meal of data.meals.slice(0, 10)) {
        const detailResponse = await fetch(`${API_BASE_URL}/lookup.php?i=${meal.idMeal}`);
        const detailData = await detailResponse.json();
        if (detailData.meals && detailData.meals[0]) {
          detailedRecipes.push(transformMealToRecipe(detailData.meals[0], detailedRecipes.length));
        }
      }
      return detailedRecipes;
    }
    
    // Fallback to local data
    const { recipesData } = await import('../data/recipesData');
    return recipesData.filter(
      recipe => recipe.category.toLowerCase() === category.toLowerCase()
    );
  } catch (error) {
    console.error('Error fetching category recipes:', error);
    // Fallback to local data
    const { recipesData } = await import('../data/recipesData');
    return recipesData.filter(
      recipe => recipe.category.toLowerCase() === category.toLowerCase()
    );
  }
};

/**
 * Fetch recipes by area/cuisine
 */
export const fetchRecipesByArea = async (area) => {
  try {
    const response = await fetch(`${API_BASE_URL}/filter.php?a=${area}`);
    const data = await response.json();
    
    if (data.meals && data.meals.length > 0) {
      const detailedRecipes = [];
      for (const meal of data.meals.slice(0, 15)) {
        const detailResponse = await fetch(`${API_BASE_URL}/lookup.php?i=${meal.idMeal}`);
        const detailData = await detailResponse.json();
        if (detailData.meals && detailData.meals[0]) {
          detailedRecipes.push(transformMealToRecipe(detailData.meals[0], detailedRecipes.length));
        }
      }
      return detailedRecipes;
    }
    
    return [];
  } catch (error) {
    console.error('Error fetching recipes by area:', error);
    return [];
  }
};
