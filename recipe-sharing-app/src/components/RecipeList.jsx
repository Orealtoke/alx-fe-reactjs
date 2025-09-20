import { useRecipeStore } from "./recipeStore";
import { Link } from "react-router-dom";

function RecipeList() {
  const recipes = useRecipeStore((state) => state.recipes);

  return (
    <div style={{ padding: 20 }}>
      <h2>Recipes</h2>
      {recipes.length === 0 ? (
        <p>No recipes yet. Add one below!</p>
      ) : (
        recipes.map((recipe) => (
          <div key={recipe.id} style={{ border: "1px solid #ddd", padding: 12, margin: "8px 0", borderRadius: 6 }}>
            <h3 style={{ margin: 0 }}>{recipe.title}</h3>
            <p style={{ marginTop: 6 }}>{recipe.description}</p>
            <div style={{ marginTop: 8 }}>
              <Link to={`/recipes/${recipe.id}`} style={{ marginRight: 10 }}>View</Link>
              <Link to={`/recipes/${recipe.id}`} >Edit</Link>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default RecipeList;

