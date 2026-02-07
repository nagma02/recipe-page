import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import AllRecipes from './pages/AllRecipes';
import RecipeDetail from './pages/RecipeDetail';
import CategoryRecipes from './pages/CategoryRecipes';
import Favorites from './pages/Favorites';
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/all-recipes" element={<AllRecipes />} />
        <Route path="/recipe/:id" element={<RecipeDetail />} />
        <Route path="/category/:category" element={<CategoryRecipes />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App
