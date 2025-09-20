import { useState } from "react";
import { useRecipeStore } from "../store/recipeStore";

function AddRecipeForm() {
  const addRecipe = useRecipeStore((state) => state.addRecipe);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !description) return alert("Please fill in all fields.");
    addRecipe({ id: Date.now(), title, description });
    setTitle("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
      <h2>Add a Recipe</h2>
      <input
        type="text"
        placeholder="Recipe Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ display: "block", margin: "10px 0", padding: "8px", width: "300px" }}
      />
      <textarea
        placeholder="Recipe Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={{ display: "block", margin: "10px 0", padding: "8px", width: "300px" }}
      />
      <button type="submit" style={{ padding: "8px 16px" }}>
        Add Recipe
      </button>
    </form>
  );
}

export default AddRecipeForm;
