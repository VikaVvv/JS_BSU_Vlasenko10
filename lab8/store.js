const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'data', 'recipes.json');

// Инициализация хранилища
if (!fs.existsSync(path.dirname(DATA_FILE))) {
  fs.mkdirSync(path.dirname(DATA_FILE)), { recursive: true };
}
if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, '[]', 'utf8');
}

// Чтение всех рецептов
function getAllRecipes() {
  try {
    const data = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading recipes file:', error);
    return [];
  }
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
    title: recipeData.title,
    category: recipeData.category,
    ingredients: typeof recipeData.ingredients === 'string' 
      ? recipeData.ingredients.split(',').map(item => item.trim())
      : recipeData.ingredients,
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

// Поиск рецептов по названию
function searchRecipes(query) {
  const recipes = getAllRecipes();
  if (!query) return recipes;
  
  return recipes.filter(recipe => 
    recipe.title.toLowerCase().includes(query.toLowerCase())
  );
}

// Сортировка рецептов по названию
function sortRecipes(recipes, order = 'asc') {
  return [...recipes].sort((a, b) => {
    const titleA = a.title.toLowerCase();
    const titleB = b.title.toLowerCase();
    const comparison = titleA.localeCompare(titleB);
    return order === 'asc' ? comparison : -comparison;
  });
}

// Пагинация рецептов
function paginateRecipes(recipes, page = 1, perPage = 5) {
  const start = (page - 1) * perPage;
  const end = start + perPage;
  return recipes.slice(start, end);
}

// Сохранение рецептов в файл
function saveRecipes(recipes) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(recipes, null, 2), 'utf8');
  } catch (error) {
    console.error('Error saving recipes:', error);
  }
}

module.exports = {
  getAllRecipes,
  getRecipeById,
  addRecipe,
  updateRecipe,
  deleteRecipe,
  searchRecipes,
  sortRecipes,
  paginateRecipes,
  saveRecipes
};