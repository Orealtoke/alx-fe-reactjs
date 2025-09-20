import { create } from "zustand";

export const useRecipeStore = create((set) => ({
  recipes: [
    // optional starter data
    { id: 1, title: "Spaghetti Carbonara", description: "Classic creamy carbonara." },
    { id: 2, title: "Avocado Toast", description: "Simple breakfast favorite." }
  ],
  addRecipe: (newRecipe) =>
    set((state) => ({ recipes: [...state.recipes, newRecipe] })),
  updateRecipe: (id, updatedFields) =>
    set((state) => ({
      recipes: state.recipes.map((r) => (r.id === id ? { ...r, ...updatedFields } : r)),
    })),
  deleteRecipe: (id) =>
    set((state) => ({ recipes: state.recipes.filter((r) => r.id !== id) })),
  setRecipes: (recipes) => set({ recipes }),
}));

export default useRecipeStore;
