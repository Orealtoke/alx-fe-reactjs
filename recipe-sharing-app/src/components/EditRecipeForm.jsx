// src/components/EditRecipeForm.jsx
import { useState } from "react";
import { useRecipeStore } from "./recipeStore";
import { useNavigate } from "react-router-dom";

function EditRecipeForm({ recipe }) {
  const updateRecipe = useRecipeStore((s) => s.updateRecipe);
  const [title, setTitle] = useState(recipe.title);
  const [description, setDescription] = useState(recipe.description);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return alert("Fill in both fields.");
    updateRecipe(recipe.id, { title: title.trim(), description: description.trim() });
    // navigate back to details (or to home)
    navigate(`/recipes/${recipe.id}`);
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: 8 }}>
      <div>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          style={{ display: "block", marginBottom: 8, padding: 8, width: 400 }}
        />
      </div>
      <div>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          style={{ display: "block", marginBottom: 8, padding: 8, width: 400, height: 100 }}
        />
      </div>
      <button type="submit" style={{ padding: "8px 14px" }}>Save Changes</button>
    </form>
  );
}

export default EditRecipeForm;
