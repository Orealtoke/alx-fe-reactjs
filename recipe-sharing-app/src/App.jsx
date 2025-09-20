import RecipeList from "./src/components/RecipeList";
import AddRecipeForm from "./src/components/AddRecipeForm";

function App() {
  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>🍲 Recipe Sharing App</h1>
      <AddRecipeForm />
      <RecipeList />
    </div>
  );
}

export default App;
