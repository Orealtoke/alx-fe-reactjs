import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fallback image
  const fallbackImage = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=60";

  const handleImageError = (e) => {
    e.target.src = fallbackImage;
  };

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        setLoading(true);
        
        // Fetch from data.json
        const response = await fetch("/src/data.json");
        if (!response.ok) {
          throw new Error("Failed to fetch recipes");
        }
        
        const recipes = await response.json();
        const foundRecipe = recipes.find(recipe => recipe.id === parseInt(id));
        
        if (foundRecipe) {
          // Add detailed information to the basic recipe data
          const detailedRecipe = {
            ...foundRecipe,
            prepTime: getPrepTime(foundRecipe.id),
            cookTime: getCookTime(foundRecipe.id),
            servings: getServings(foundRecipe.id),
            difficulty: getDifficulty(foundRecipe.id),
            ingredients: getIngredients(foundRecipe.id),
            instructions: getInstructions(foundRecipe.id)
          };
          setRecipe(detailedRecipe);
        } else {
          setError("Recipe not found");
        }
      } catch (err) {
        console.error("Error fetching recipe:", err);
        setError("Failed to load recipe");
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  // Helper functions to provide detailed recipe data
  const getPrepTime = (recipeId) => {
    const times = {
      1: "15 mins",
      2: "30 mins",
      3: "20 mins",
      4: "15 mins",
      5: "20 mins"
    };
    return times[recipeId] || "15 mins";
  };

  const getCookTime = (recipeId) => {
    const times = {
      1: "15 mins",
      2: "40 mins",
      3: "25 mins",
      4: "10 mins",
      5: "10 mins"
    };
    return times[recipeId] || "20 mins";
  };

  const getServings = (recipeId) => {
    const servings = {
      1: 4,
      2: 4,
      3: 4,
      4: 2,
      5: 4
    };
    return servings[recipeId] || 4;
  };

  const getDifficulty = (recipeId) => {
    const difficulties = {
      1: "Easy",
      2: "Medium",
      3: "Medium",
      4: "Easy",
      5: "Easy"
    };
    return difficulties[recipeId] || "Easy";
  };

  const getIngredients = (recipeId) => {
    const ingredients = {
      1: [
        "400g spaghetti",
        "200g guanciale or pancetta, diced",
        "4 large eggs",
        "100g Pecorino Romano cheese, grated",
        "Black pepper, freshly ground",
        "Salt to taste"
      ],
      2: [
        "500g chicken breast, cubed",
        "1 cup yogurt",
        "2 tbsp ginger-garlic paste",
        "2 onions, finely chopped",
        "4 tomatoes, pureed",
        "1/2 cup cream",
        "2 tbsp butter",
        "Spices: garam masala, turmeric, chili powder, cumin"
      ],
      3: [
        "500g beef sirloin, sliced",
        "1 onion, sliced",
        "200g mushrooms, sliced",
        "1 cup sour cream",
        "2 tbsp flour",
        "1 cup beef broth",
        "2 tbsp butter",
        "Salt and pepper to taste"
      ],
      4: [
        "2 cups mixed vegetables (bell peppers, broccoli, carrots, snow peas)",
        "2 cloves garlic, minced",
        "1 tbsp ginger, grated",
        "2 tbsp soy sauce",
        "1 tbsp oyster sauce",
        "1 tsp sesame oil",
        "2 tbsp vegetable oil",
        "Sesame seeds for garnish"
      ],
      5: [
        "500g white fish fillets (tilapia, cod, or mahi-mahi)",
        "8 small corn tortillas",
        "1 cup cabbage, shredded",
        "1 avocado, sliced",
        "1/2 cup sour cream or Greek yogurt",
        "Lime wedges",
        "Spices: chili powder, cumin, paprika",
        "Fresh cilantro for garnish"
      ]
    };
    return ingredients[recipeId] || ["Ingredients not available"];
  };

  const getInstructions = (recipeId) => {
    const instructions = {
      1: [
        "Bring a large pot of salted water to boil and cook spaghetti according to package instructions.",
        "While pasta cooks, sauté guanciale in a large pan until crispy.",
        "In a bowl, whisk eggs with grated cheese and black pepper.",
        "Reserve 1 cup of pasta water before draining spaghetti.",
        "Add hot pasta to the pan with guanciale, remove from heat.",
        "Quickly stir in egg mixture, adding pasta water as needed to create a creamy sauce.",
        "Serve immediately with extra cheese and pepper."
      ],
      2: [
        "Marinate chicken in yogurt and spices for 2 hours.",
        "Grill or bake chicken until cooked through.",
        "Sauté onions in butter until golden brown.",
        "Add tomato puree and cook until oil separates.",
        "Add cream and grilled chicken, simmer for 10 minutes.",
        "Garnish with fresh coriander and serve with naan or rice."
      ],
      3: [
        "Season beef with salt and pepper, then sear in butter until browned. Remove and set aside.",
        "In the same pan, sauté onions and mushrooms until tender.",
        "Sprinkle flour over vegetables and cook for 1 minute.",
        "Gradually add beef broth, stirring constantly.",
        "Return beef to pan and simmer for 10 minutes.",
        "Stir in sour cream and heat through (do not boil).",
        "Serve over egg noodles or rice."
      ],
      4: [
        "Heat vegetable oil in a wok or large pan over high heat.",
        "Add garlic and ginger, stir for 30 seconds until fragrant.",
        "Add harder vegetables first (carrots, broccoli), stir fry for 2 minutes.",
        "Add remaining vegetables and stir fry for 3-4 minutes until crisp-tender.",
        "Add soy sauce and oyster sauce, toss to combine.",
        "Drizzle with sesame oil and garnish with sesame seeds.",
        "Serve immediately with rice or noodles."
      ],
      5: [
        "Season fish fillets with spices and salt.",
        "Grill or pan-fry fish until cooked through and flaky.",
        "Warm tortillas in a dry pan or microwave.",
        "Flake the cooked fish into large pieces.",
        "Assemble tacos: place fish on tortillas, top with cabbage, avocado, and a dollop of sour cream.",
        "Garnish with cilantro and serve with lime wedges."
      ]
    };
    return instructions[recipeId] || ["Instructions not available"];
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading recipe...</div>
      </div>
    );
  }

  if (error || !recipe) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-xl text-red-600 mb-4">{error || "Recipe not found"}</div>
          <Link to="/" className="text-green-600 hover:text-green-700 underline">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Back Button */}
        <Link 
          to="/" 
          className="inline-flex items-center text-green-600 hover:text-green-700 mb-6 font-semibold"
        >
          <span className="mr-2">←</span>
          Back to Recipes
        </Link>

        {/* Recipe Header */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-64 md:h-80 object-cover"
            onError={handleImageError}
          />
          <div className="p-6">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              {recipe.title}
            </h1>
            <p className="text-gray-600 text-lg mb-6">{recipe.summary}</p>
            
            {/* Recipe Meta Information */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-500">Prep Time</div>
                <div className="font-semibold text-gray-800">{recipe.prepTime}</div>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-500">Cook Time</div>
                <div className="font-semibold text-gray-800">{recipe.cookTime}</div>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-500">Servings</div>
                <div className="font-semibold text-gray-800">{recipe.servings}</div>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-500">Difficulty</div>
                <div className="font-semibold text-gray-800">{recipe.difficulty}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Ingredients and Instructions */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Ingredients Card */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
              <span className="mr-2">📋</span>
              Ingredients
            </h2>
            <ul className="space-y-3">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-green-500 mr-3 mt-1">•</span>
                  <span className="text-gray-700">{ingredient}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Instructions Card */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
              <span className="mr-2">👨‍🍳</span>
              Cooking Instructions
            </h2>
            <ol className="space-y-4">
              {recipe.instructions.map((step, index) => (
                <li key={index} className="flex">
                  <span className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 flex-shrink-0 mt-1">
                    {index + 1}
                  </span>
                  <span className="text-gray-700">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Additional Notes */}
        <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-yellow-800 mb-2">💡 Chef's Tip</h3>
          <p className="text-yellow-700">
            For best results, make sure all your ingredients are prepared and measured before starting to cook. 
            This is called "mise en place" and makes the cooking process much smoother!
          </p>
        </div>
      </div>
    </div>
  );
}

export default RecipeDetail;