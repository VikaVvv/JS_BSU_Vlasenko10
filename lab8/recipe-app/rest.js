const express = require('express');
const router = express.Router();
const store = require('./store');

// Получение всех рецептов
router.get('/recipes', (req, res) => {
  const recipes = store.getAllRecipes();
  res.render('recipes', { recipes });
});

// Получение одного рецепта
router.get('/recipes/:id', (req, res) => {
  const recipe = store.getRecipeById(req.params.id);
  if (recipe) {
    res.json(recipe);
  } else {
    res.status(404).send('Recipe not found');
  }
});

// Создание нового рецепта
router.post('/recipes', (req, res) => {
  const newRecipe = store.addRecipe(req.body);
  res.status(201).json(newRecipe);
});

// Обновление рецепта
router.put('/recipes/:id', (req, res) => {
  const updatedRecipe = store.updateRecipe(req.params.id, req.body);
  if (updatedRecipe) {
    res.json(updatedRecipe);
  } else {
    res.status(404).send('Recipe not found');
  }
});

// Удаление рецепта
router.delete('/recipes/:id', (req, res) => {
  if (store.deleteRecipe(req.params.id)) {
    res.status(204).send();
  } else {
    res.status(404).send('Recipe not found');
  }
});

module.exports = router;