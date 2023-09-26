// RecipeDetailPage.jsx
import React, { useState, useEffect } from 'react';

const RecipeDetailPage = ({ match }) => {
  const [recipe, setRecipe] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { id } = match.params;

    // Fetch the recipe details based on the recipe ID
    const fetchRecipeDetails = async () => {
      try {
        const response = await fetch(
          `https://api.spoonacular.com/recipes/${id}/information?apiKey=de71274385354176a7f96c7a86e5f807`
        );
        const data = await response.json();
        setRecipe(data);
      } catch (error) {
        console.error('Error fetching recipe details:', error);
      }
      setLoading(false);
    };

    fetchRecipeDetails();
  }, [match.params]);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h2>{recipe.title}</h2>
          <img src={recipe.image} alt={recipe.title} />
          <p>{recipe.summary}</p>
          <a href={recipe.sourceUrl} target="_blank" rel="noopener noreferrer">
            View Recipe
          </a>
        </div>
      )}
    </div>
  );
};

export default RecipeDetailPage;
