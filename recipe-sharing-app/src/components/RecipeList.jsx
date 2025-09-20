import { useRecipeStore } from "./recipeStore";
import { useParams } from "react-router-dom";

const RecipeDetails = () => {
  const { id } = useParams();
  const recipe = useRecipeStore((state) =>
    state.recipes.find((r) => r.id === Number(id))
  );
  const favorites = useRecipeStore((state) => state.favorites);
  const addFavorite = useRecipeStore((state) => state.addFavorite);
  const removeFavorite = useRecipeStore((state) => state.removeFavorite);

  const isFavorite = favorites.includes(recipe.id);

  return (
    <div>
      <h1>{recipe.title}</h1>
      <p>{recipe.description}</p>
      {isFavorite ? (
        <button onClick={() => removeFavorite(recipe.id)}>Remove Favorite</button>
      ) : (
        <button onClick={() => addFavorite(recipe.id)}>Add to Favorites</button>
      )}
    </div>
  );
};

export default RecipeDetails;
