// Add Habit Popup
document.addEventListener('DOMContentLoaded', () => {
  const openAddHabitPopupBtn = document.getElementById('AddHabit');
  const addHabitPopup = document.querySelector('.popup-add-habit');
  const closeAddHabitPopupBtn = document.getElementById('closePopup');

  // Open the Add Habit popup
  openAddHabitPopupBtn.addEventListener('click', () => {
    addHabitPopup.style.display = 'block';
  });

  // Close the Add Habit popup
  closeAddHabitPopupBtn.addEventListener('click', () => {
    addHabitPopup.style.display = 'none';
  });

  // Close the Add Habit popup when clicking outside of it
  window.addEventListener('click', (event) => {
    if (event.target === addHabitPopup) {
      addHabitPopup.style.display = 'none';
    }
  });
});

// Edit Habit Popup
document.addEventListener('DOMContentLoaded', () => {
  const editHabitPopup = document.querySelector('.popup-edit-habit');
  const closeEditHabitPopupBtn = document.getElementById('closeEditPopup');

  // Function to show the Edit Habit popup
  function showEditHabitPopup(button) {
    document.getElementById('edit_habit_id').value =
      button.getAttribute('data-habit-id');
    document.getElementById('edit_habit_name').value =
      button.getAttribute('data-habit-name');
    document.getElementById('edit_habit_category').value = button.getAttribute(
      'data-habit-category',
    );
    document.getElementById('edit_habit_description').value =
      button.getAttribute('data-habit-description');
    document.getElementById('edit_habit_frequency').value = button.getAttribute(
      'data-habit-frequency',
    );

    editHabitPopup.style.display = 'block';
  }

  // Close the Edit Habit popup
  closeEditHabitPopupBtn.addEventListener('click', () => {
    editHabitPopup.style.display = 'none';
  });

  // Close the Edit Habit popup when clicking outside of it
  window.addEventListener('click', (event) => {
    if (event.target === editHabitPopup) {
      editHabitPopup.style.display = 'none';
    }
  });

  // Add event listeners to Edit Habit buttons
  document.querySelectorAll('[id^="EditHabitBtn"]').forEach((button) => {
    button.addEventListener('click', function () {
      showEditHabitPopup(this);
    });
  });
});
