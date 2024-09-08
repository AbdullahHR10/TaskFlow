document.addEventListener('DOMContentLoaded', function () {
  setTimeout(function () {
    var alerts = document.querySelectorAll('.alert');
    alerts.forEach(function (alert) {
      alert.style.opacity = '0';
      setTimeout(function () {
        alert.style.display = 'none';
    }, 600);
  });
  }, 5000);
});