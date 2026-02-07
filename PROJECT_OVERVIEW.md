# Recipe App - React Application

A modern, responsive Recipe App built with React that allows users to view, search, and explore different recipes easily.

## 🚀 Features

### 1. **Clean & Responsive UI**
- Modern design with gradient backgrounds and smooth animations
- Fully responsive layout that works on desktop, tablet, and mobile devices
- Interactive hover effects and smooth transitions
- Clean card-based layout for better user experience

### 2. **React Router Navigation**
- Seamless page navigation without page reloads
- Multiple routes:
  - **Home** (`/`) - Main landing page with categories
  - **All Recipes** (`/all-recipes`) - Complete recipe list with search
  - **Recipe Details** (`/recipe/:id`) - Detailed view of individual recipes
  - **Category Recipes** (`/category/:category`) - Filtered recipes by category

### 3. **Search Functionality**
- **Global Search** on home page - Quick search with redirect to results
- **Real-time Search** on All Recipes page - Filter recipes as you type
- Search across recipe names, categories, and descriptions
- Visual feedback showing number of search results

### 4. **API Integration Pattern**
- Modular API service layer (`services/api.js`)
- Async data fetching with loading states
- Error handling for failed API calls
- Ready to connect to real REST APIs
- Currently uses simulated API calls with local data

### 5. **Category-based Browsing**
- 6 recipe categories: Breakfast, Lunch, Dinner, Desserts, Snacks, Drinks
- Color-coded category cards with emojis
- Filter recipes by category

### 6. **Recipe Details**
- Complete recipe information including:
  - Ingredients list
  - Step-by-step instructions
  - Cooking time and difficulty level
  - Number of servings

### 7. **State Management**
- React Hooks (useState, useEffect)
- URL-based search params
- Loading states for better UX

## 🛠️ Technologies Used

- **React** - UI library for building components
- **React Router** - Client-side routing
- **Vite** - Fast build tool and dev server
- **CSS3** - Modern styling with gradients, animations, and responsive design
- **JavaScript ES6+** - Modern JavaScript features

## 📁 Project Structure

```
router/
├── src/
│   ├── pages/           # Page components
│   │   ├── Home.jsx           # Landing page
│   │   ├── AllRecipes.jsx     # Recipe list with search
│   │   ├── RecipeDetail.jsx   # Individual recipe view
│   │   └── CategoryRecipes.jsx # Category filtered recipes
│   ├── services/        # API integration layer
│   │   └── api.js             # API service functions
│   ├── data/           # Data files
│   │   └── recipesData.js     # Recipe database
│   ├── App.jsx         # Main app component with routes
│   └── main.jsx        # Entry point
├── public/             # Static assets
└── package.json        # Dependencies
```

## 🚦 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

## 💡 Key Learning Points

This project demonstrates:

1. **React Component Architecture** - Reusable, maintainable components
2. **React Router Implementation** - Single-page application routing
3. **API Integration** - Async data fetching and state management
4. **Search & Filter Logic** - Real-time data filtering
5. **Responsive Design** - Mobile-first CSS approach
6. **User Experience** - Loading states, animations, and smooth transitions

## 🔄 API Integration

The app is structured to easily integrate with real APIs. The `services/api.js` file contains all API functions:

```javascript
// Example: Connect to real API
export const fetchAllRecipes = async () => {
  const response = await fetch('https://your-api.com/recipes');
  const data = await response.json();
  return data;
};
```

### Available API Functions:
- `fetchAllRecipes()` - Get all recipes
- `fetchRecipeById(id)` - Get single recipe
- `searchRecipes(query)` - Search recipes
- `fetchRecipesByCategory(category)` - Get category recipes

## 🎨 Customization

- **Colors**: Modify gradient colors in CSS files
- **Categories**: Update categories array in `Home.jsx`
- **Recipes**: Add/edit recipes in `recipesData.js`
- **API**: Replace simulated API calls in `services/api.js`

## 📱 Responsive Breakpoints

- Mobile: < 480px
- Tablet: 481px - 768px
- Desktop: > 768px

## 🌟 Features Implemented

✅ HTML structure for app layout  
✅ CSS responsive design with animations  
✅ JavaScript logic for data fetching and interactions  
✅ React components and state management  
✅ React Router for navigation  
✅ Search functionality (global & real-time)  
✅ API integration pattern  
✅ Category filtering  
✅ Loading states  
✅ Error handling  

## 🔮 Future Enhancements

- Connect to real recipe API (e.g., Spoonacular, Edamam)
- Add user authentication
- Implement favorites/bookmarks
- Add recipe ratings and reviews
- Create shopping list feature
- Add nutritional information
- Recipe video tutorials
- User-generated recipes

## 📝 License

This project is open source and available for learning purposes.

---

**Developed with ❤️ using React**
