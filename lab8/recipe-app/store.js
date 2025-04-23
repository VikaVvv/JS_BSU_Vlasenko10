const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'data', 'recipes.json');

// Инициализация хранилища
if (!fs.existsSync(path.dirname(DATA_FILE))) {
  fs.mkdirSync(path.dirname(DATA_FILE));
}
if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, '[]');
}

// Чтение всех рецептов
function getAllRecipes() {
  const data = fs.readFileSync(DATA_FILE, 'utf8');
  return JSON.parse(data);
}

// Получение рецепта по ID
function getRecipeById(id) {
  const recipes = getAllRecipes();
  return recipes.find(recipe => recipe.id === id);
}

// Добавление нового рецепта
function addRecipe(recipeData) {
  const recipes = getAllRecipes();
  const newRecipe = {
    id: Date.now().toString(),
    ...recipeData,
    createdAt: new Date().toISOString()
  };
  recipes.push(newRecipe);
  saveRecipes(recipes);
  return newRecipe;
}

// Обновление рецепта
function updateRecipe(id, recipeData) {
  const recipes = getAllRecipes();
  const index = recipes.findIndex(recipe => recipe.id === id);
  
  if (index !== -1) {
    const updatedRecipe = {
      ...recipes[index],
      ...recipeData,
      updatedAt: new Date().toISOString()
    };
    recipes[index] = updatedRecipe;
    saveRecipes(recipes);
    return updatedRecipe;
  }
  return null;
}

// Удаление рецепта
function deleteRecipe(id) {
  const recipes = getAllRecipes();
  const index = recipes.findIndex(recipe => recipe.id === id);
  
  if (index !== -1) {
    recipes.splice(index, 1);
    saveRecipes(recipes);
    return true;
  }
  return false;
}

// Сохранение рецептов в файл
function saveRecipes(recipes) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(recipes, null, 2));
}

module.exports = {
  getAllRecipes,
  getRecipeById,
  addRecipe,
  updateRecipe,
  deleteRecipe
};