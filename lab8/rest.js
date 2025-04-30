const express = require('express');
const router = express.Router(); // Важно создать router ДО его использования
const store = require('./store');

// Получение всех рецептов (с пагинацией, сортировкой и поиском)
router.get('/recipes', (req, res) => {
  let recipes = store.getAllRecipes();
  
  // Поиск
  if (req.query.search) {
    recipes = store.searchRecipes(req.query.search);
  }
  
  // Сортировка
  if (req.query.sort) {
    recipes = store.sortRecipes(recipes, req.query.sort);
  }
  
  // Пагинация
  const page = parseInt(req.query.page) || 1;
  const perPage = 5;
  const paginatedRecipes = store.paginateRecipes(recipes, page, perPage);
  
  res.render('recipes', {
    recipes: paginatedRecipes,
    currentPage: page,
    totalPages: Math.ceil(recipes.length / perPage),
    searchQuery: req.query.search || '',
    sortOrder: req.query.sort || 'asc'
  });
});

// Остальные маршруты остаются без изменений
router.get('/recipes/:id', (req, res) => {
  const recipe = store.getRecipeById(req.params.id);
  if (recipe) {
    res.json(recipe);
  } else {
    res.status(404).send('Recipe not found');
  }
});

router.post('/recipes', (req, res) => {
  try {
    const newRecipe = store.addRecipe(req.body);
    res.status(201).json(newRecipe);
    // Или перенаправление на список рецептов:
    // res.redirect('/api/recipes');
  } catch (error) {
    res.status(500).send('Error adding recipe');
  }
});

router.put('/recipes/:id', (req, res) => {
  const updatedRecipe = store.updateRecipe(req.params.id, req.body);
  if (updatedRecipe) {
    res.json(updatedRecipe);
  } else {
    res.status(404).send('Recipe not found');
  }
});

router.delete('/recipes/:id', (req, res) => {
  if (store.deleteRecipe(req.params.id)) {
    res.status(204).send();
  } else {
    res.status(404).send('Recipe not found');
  }
});
// Маршрут для страницы редактирования
router.get('/recipes/:id/edit', (req, res) => {
  const recipe = store.getRecipeById(req.params.id);
  if (recipe) {
    res.render('edit-recipe', { recipe });
  } else {
    res.status(404).send('Recipe not found');
  }
});
module.exports = router;