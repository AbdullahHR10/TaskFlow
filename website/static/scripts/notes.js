// Add Note Popup
document.addEventListener('DOMContentLoaded', () => {
  const addNoteButton = document.getElementById('AddNote');
  const notePopup = document.getElementById('notePopup');
  const closeNotePopupButton = document.getElementById('closeNotePopup');

  // Show Add Note popup
  addNoteButton.addEventListener('click', (event) => {
    event.preventDefault();
    notePopup.style.display = 'flex';
  });

  // Close Add Note popup
  closeNotePopupButton.addEventListener('click', () => {
    notePopup.style.display = 'none';
  });

  // Close Add Note popup when clicking outside
  window.addEventListener('click', (event) => {
    if (event.target === notePopup) {
      notePopup.style.display = 'none';
    }
  });
});

// Edit Note Popup
/* eslint-disable no-unused-vars */
function showEditNotePopup(button) {
  const noteId = button.getAttribute('data-note-id');
  const title = button.getAttribute('data-note-title');
  const content = button.getAttribute('data-note-content');

  document.getElementById('edit_note_id').value = noteId;
  document.getElementById('edit_note_title').value = title;
  document.getElementById('edit_note_content').value = content;

  document.getElementById('editNotePopup').style.display = 'flex';
}
/* eslint-enable no-unused-vars */

// Add event listeners to Edit Note buttons
document.querySelectorAll('[id^="EditNoteBtn"]').forEach((button) => {
  button.addEventListener('click', function () {
    showEditNotePopup(this);
  });
});
// Close Edit Note popup
document.addEventListener('DOMContentLoaded', () => {
  const closeEditNotePopupButton =
    document.getElementById('closeEditNotePopup');

  closeEditNotePopupButton.addEventListener('click', () => {
    document.getElementById('editNotePopup').style.display = 'none';
  });

  // Close Edit Note popup when clicking outside
  window.addEventListener('click', (event) => {
    const editPopup = document.getElementById('editNotePopup');
    if (event.target === editPopup) {
      editPopup.style.display = 'none';
    }
  });
});