/* circular bar */
document.addEventListener('DOMContentLoaded', () => {
  const progressBar = document.querySelector('.circular-progress');
  const valueContainer = document.querySelector('.value-container');

  // Ensure that the progress bar and value container exist before proceeding
  if (!progressBar || !valueContainer) {
    console.error('Progress bar or value container not found in the DOM');
    return; // Exit the function if elements are missing
  }

  const completedTasks = parseInt(
    progressBar.getAttribute('data-completed'),
    10
  );
  const totalTasks = parseInt(progressBar.getAttribute('data-total'), 10);

  let percentage = 0;

  if (totalTasks > 0) {
    percentage = (completedTasks / totalTasks) * 100;
  }

  if (percentage < 1) {
    percentage = 0;
  }

  // Circular progress bar logic
  let progressValue = 0;
  const progressEndValue = Math.round(percentage);
  const speed = 20;

  const progress = setInterval(() => {
    if (progressValue < progressEndValue) {
      progressValue++;
      valueContainer.textContent = `${progressValue}%`;
      progressBar.style.background = `conic-gradient(
          #0061cf ${progressValue * 3.6}deg,
          #cadcff ${progressValue * 3.6}deg
        )`;
    } else {
      clearInterval(progress);
    }
  }, speed);
});