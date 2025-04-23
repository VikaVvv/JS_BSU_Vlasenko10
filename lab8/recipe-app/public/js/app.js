// Обработка удаления рецепта
document.querySelectorAll('.delete').forEach(button => {
    button.addEventListener('click', async (e) => {
      const id = e.target.dataset.id;
      try {
        const response = await fetch(`/api/recipes/${id}`, {
          method: 'DELETE'
        });
        
        if (response.ok) {
          e.target.closest('.recipe-card').remove();
        } else {
          alert('Ошибка при удалении рецепта');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    });
  });