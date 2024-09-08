// Add Task Popup
document.addEventListener('DOMContentLoaded', () => {
  const addTaskButton = document.getElementById('AddTask');
  const taskPopup = document.getElementById('taskPopup');
  const closePopupButton = document.getElementById('closePopup');

  // Show Add Task popup
  addTaskButton.addEventListener('click', (event) => {
    event.preventDefault();
    taskPopup.style.display = 'flex';
  });

  // Close Add Task popup
  closePopupButton.addEventListener('click', () => {
    taskPopup.style.display = 'none';
  });

  // Close Add Task popup when clicking outside
  window.addEventListener('click', (event) => {
    if (event.target === taskPopup) {
      taskPopup.style.display = 'none';
    }
  });
});

// Close Edit Task popup
document.addEventListener('DOMContentLoaded', () => {
  const closeEditTaskPopupButton =
    document.getElementById('closeEditTaskPopup');

  closeEditTaskPopupButton.addEventListener('click', () => {
    document.getElementById('editTaskPopup').style.display = 'none';
  });

  // Close Edit Task popup when clicking outside
  window.addEventListener('click', (event) => {
    const editPopup = document.getElementById('editTaskPopup');
    if (event.target === editPopup) {
      editPopup.style.display = 'none';
    }
  });
});