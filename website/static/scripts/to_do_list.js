document.addEventListener('DOMContentLoaded', () => {
  // Add Task Popup
  const addTaskButton = document.getElementById('AddTask');
  const taskPopup = document.getElementById('taskPopup');
  const closeAddTaskPopupButton = document.getElementById('closePopup');

  if (addTaskButton && taskPopup && closeAddTaskPopupButton) {
    // Show Add Task popup
    addTaskButton.addEventListener('click', (event) => {
      event.preventDefault();
      taskPopup.style.display = 'flex';
    });

    // Close Add Task popup
    closeAddTaskPopupButton.addEventListener('click', () => {
      taskPopup.style.display = 'none';
    });

    // Close Add Task popup when clicking outside
    window.addEventListener('click', (event) => {
      if (event.target === taskPopup) {
        taskPopup.style.display = 'none';
      }
    });
  }

  // Edit Task Popup
  const closeEditTaskPopupButton = document.getElementById('closeEditTaskPopup');
  const editTaskPopup = document.getElementById('editTaskPopup');

  if (closeEditTaskPopupButton && editTaskPopup) {
    // Close Edit Task popup
    closeEditTaskPopupButton.addEventListener('click', () => {
      editTaskPopup.style.display = 'none';
    });

    // Close Edit Task popup when clicking outside
    window.addEventListener('click', (event) => {
      if (event.target === editTaskPopup) {
        editTaskPopup.style.display = 'none';
      }
    });
  }
});

function showEditPopup(button) {
  const taskId = button.getAttribute('data-task-id');
  const taskTitle = button.getAttribute('data-task-title');
  const taskDescription = button.getAttribute('data-task-description');
  const taskDueDate = button.getAttribute('data-task-due');
  
  // Populate the form fields
  document.getElementById('edit_task_id').value = taskId;
  document.getElementById('edit_title').value = taskTitle;
  document.getElementById('edit_description').value = taskDescription;
  document.getElementById('edit_due_datetime').value = taskDueDate;
  
  // Show the Edit Task popup
  document.getElementById('editTaskPopup').style.display = 'flex';
}