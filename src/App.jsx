// App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import BrowserRouter as Router, Routes, and Route
import RecipeSearch from './RecipeSearch';
import RecipeList from './RecipeList';
import RecipeDetail from './RecipeDetail';
import './App.css';

function App() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchRecipes = async (query) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=de71274385354176a7f96c7a86e5f807&query=${query}`
      );

      const data = await response.json();
      setRecipes(data.results);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    searchRecipes('');
  }, []);

  return (
    <Router>
      <div className="App">
        <h1>Recipe Website</h1>
        <RecipeSearch onSearch={searchRecipes} />
        <Routes>
          <Route path="/" element={loading ? <p>Loading...</p> : <RecipeList recipes={recipes} />} />
          <Route path="/recipe/:id" element={<RecipeDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
