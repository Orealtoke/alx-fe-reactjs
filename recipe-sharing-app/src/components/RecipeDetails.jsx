// src/components/RecipeDetails.jsx
import { Link, useParams, useNavigate } from "react-router-dom";
import { useRecipeStore } from "./recipeStore";
import EditRecipeForm from "./EditRecipeForm";
import DeleteRecipeButton from "./DeleteRecipeButton";

function RecipeDetails() {
  const { id } = useParams();
  const recipeId = Number(id);
  const recipe = useRecipeStore((s) => s.recipes.find((r) => r.id === recipeId));
  const navigate = useNavigate();

  if (!recipe) {
    return (
      <div style={{ padding: 20 }}>
        <p>Recipe not found.</p>
        <button onClick={() => navigate("/")}>Back</button>
      </div>
    );
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>{recipe.title}</h1>
      <p>{recipe.description}</p>

      <div style={{ marginTop: 20 }}>
        <h3>Edit Recipe</h3>
        <EditRecipeForm recipe={recipe} />
      </div>

      <div style={{ marginTop: 20 }}>
        <DeleteRecipeButton recipeId={recipeId} />
      </div>

      <p style={{ marginTop: 20 }}>
        <Link to="/">← Back to recipes</Link>
      </p>
    </div>
  );
}

export default RecipeDetails;
