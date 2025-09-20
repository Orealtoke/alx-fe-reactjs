import { useState } from "react";
import { useRecipeStore } from "./recipeStore";
import { useNavigate } from "react-router-dom";

function AddRecipeForm() {
  const addRecipe = useRecipeStore((s) => s.addRecipe);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return alert("Please fill in all fields.");
    const newRecipe = { id: Date.now(), title: title.trim(), description: description.trim() };
    addRecipe(newRecipe);
    setTitle("");
    setDescription("");
    navigate(`/recipes/${newRecipe.id}`); // optionally go to the new recipe details
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
      <button type="submit">Add Recipe</button>
    </form>
  );
}

export default AddRecipeForm;
