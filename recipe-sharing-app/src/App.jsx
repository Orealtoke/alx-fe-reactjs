import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import RecipeList from "./components/RecipeList";
import AddRecipeForm from "./components/AddRecipeForm";
import RecipeDetails from "./components/RecipeDetails";

function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Recipes</Link> | <Link to="/add">Add Recipe</Link>
      </nav>
      <Routes>
        <Route path="/" element={<RecipeList />} />
        <Route path="/add" element={<AddRecipeForm />} />
        <Route path="/recipe/:id" element={<RecipeDetails />} />
      </Routes>
    </Router>
  );
}

export default App;

