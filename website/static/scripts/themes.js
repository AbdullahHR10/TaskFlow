/* themes */
document.addEventListener('DOMContentLoaded', (event) => {
  const themeButton = document.getElementById('themeButton');
  const themePopup = document.getElementById('themePopup');
  const closePopup = document.getElementById('closePopup');
  const themeOptions = document.querySelectorAll('.theme-option');
  const savedTheme = localStorage.getItem('theme');

  // Apply saved theme
  if (savedTheme) {
    document.body.classList.add(savedTheme);
  }

  // Show popup when theme button is clicked
  themeButton.addEventListener('click', (e) => {
    e.preventDefault(); // Prevent default anchor behavior
    themePopup.style.display = 'block';
  });

  // Hide popup when close button is clicked
  closePopup.addEventListener('click', () => {
    themePopup.style.display = 'none';
  });

  // Hide popup when clicking outside of it
  window.addEventListener('click', (e) => {
    if (e.target === themePopup) {
      themePopup.style.display = 'none';
    }
  });

  // Change theme when an option is clicked
  themeOptions.forEach((option) => {
    option.addEventListener('click', () => {
      const selectedTheme = option.getAttribute('data-theme');
      document.body.className = ''; // Remove all theme classes
      if (selectedTheme) {
        document.body.classList.add(`${selectedTheme}-theme`);
        localStorage.setItem('theme', `${selectedTheme}-theme`);
      }
      themePopup.style.display = 'none';
    });
  });
});