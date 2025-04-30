document.addEventListener('DOMContentLoaded', () => {
  // Обработка удаления рецепта
  document.querySelectorAll('.delete').forEach(button => {
    button.addEventListener('click', async (e) => {
      const id = e.target.dataset.id;
      if (confirm('Вы уверены, что хотите удалить этот рецепт?')) {
        try {
          const response = await fetch(`/api/recipes/${id}`, {
            method: 'DELETE'
          });
          if (response.ok) {
            window.location.reload();
          }
        } catch (error) {
          console.error('Ошибка при удалении рецепта:', error);
        }
      }
    });
  });
});