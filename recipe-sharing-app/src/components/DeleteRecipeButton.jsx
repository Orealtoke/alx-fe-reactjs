import { useRecipeStore } from "./recipeStore";
import { useNavigate } from "react-router-dom";

function DeleteRecipeButton({ recipeId }) {
  const deleteRecipe = useRecipeStore((s) => s.deleteRecipe);
  const navigate = useNavigate();

  const handleDelete = () => {
    if (!confirm("Are you sure you want to delete this recipe?")) return;
    deleteRecipe(recipeId);
    navigate("/"); // go back to list after delete
  };

  return (
    <button onClick={handleDelete} style={{ background: "#e74c3c", color: "white", border: "none", padding: "8px 12px", borderRadius: 4 }}>
      Delete Recipe
    </button>
  );
}

export default DeleteRecipeButton;
