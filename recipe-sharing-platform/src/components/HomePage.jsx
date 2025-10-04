import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function HomePage() {
  const [recipes, setRecipes] = useState([]);

  // Fallback image for broken images
  const fallbackImage = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop&q=60";

  const handleImageError = (e) => {
    e.target.src = fallbackImage;
  };

  useEffect(() => {
    // Combine data from JSON and localStorage
    const loadRecipes = async () => {
      try {
        // Load from data.json
        const response = await fetch("/src/data.json");
        const jsonRecipes = await response.json();
        
        // Load from localStorage
        const localRecipes = JSON.parse(localStorage.getItem('recipes') || '[]');
        
        // Combine both (local recipes first, then JSON recipes)
        const allRecipes = [...localRecipes, ...jsonRecipes];
        setRecipes(allRecipes);
      } catch (error) {
        console.error("Error loading recipes:", error);
      }
    };

    loadRecipes();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      {/* Header with Add Recipe Button */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-green-700 mb-4 sm:mb-0">
          🍽️ Recipe Sharing Platform
        </h1>
        <Link
          to="/add-recipe"
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-colors duration-200"
        >
          + Add New Recipe
        </Link>
      </div>

      {/* Recipes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((recipe) => (
          <Link 
            key={recipe.id} 
            to={`/recipe/${recipe.id}`}
            className="block no-underline"
          >
            <div className="bg-white rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition-transform duration-300 ease-in-out p-4 cursor-pointer h-full">
              <img
                alt={recipe.title}
                className="w-full h-48 object-cover rounded-md mb-4"
                src={recipe.image}
                onError={handleImageError}
              />
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {recipe.title}
              </h2>
              <p className="text-gray-600 text-sm">{recipe.summary}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Empty State */}
      {recipes.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg mb-4">No recipes found.</p>
          <Link
            to="/add-recipe"
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-colors duration-200"
          >
            Add Your First Recipe
          </Link>
        </div>
      )}
    </div>
  );
}

export default HomePage;