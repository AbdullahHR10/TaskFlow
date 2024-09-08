// Transaction Form Popup
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('transactionForm');
  const modal = document.getElementById('addTransactionPopup');
  const btn = document.getElementById('addTransactionButton');
  const span = document.getElementsByClassName('close')[0];

  // Open the popup and reset form
  btn.onclick = function () {
    modal.style.display = 'block';
    form.reset();
  };

  // Close the popup when the user clicks on (x)
  span.onclick = function () {
    modal.style.display = 'none';
  };

  // Close the popup when clicking outside
  window.onclick = function (event) {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  };
});

// Transaction Form Validation
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('transactionForm');
  const purchaseCheckbox = document.getElementById('is_purchase');
  const saleCheckbox = document.getElementById('is_sale');
  const errorMessage = document.getElementById('error-message');

  form.addEventListener('submit', function (event) {
    if (purchaseCheckbox.checked && saleCheckbox.checked) {
      errorMessage.textContent =
        'You can only select one option: either Purchase or Sale.';
      errorMessage.style.display = 'block';
      event.preventDefault();
    } else {
      errorMessage.style.display = 'none';
    }
  });

  // Automatically uncheck the other checkbox
  purchaseCheckbox.addEventListener('change', () => {
    if (purchaseCheckbox.checked) {
      saleCheckbox.checked = false;
    }
  });

  saleCheckbox.addEventListener('change', () => {
    if (saleCheckbox.checked) {
      purchaseCheckbox.checked = false;
    }
  });
});

// Edit Balance Popup
document.addEventListener('DOMContentLoaded', () => {
  const editBalanceButton = document.getElementById('edit-balance');
  const editBalancePopup = document.getElementById('editBalancePopup');
  const closeEditButton = document.querySelector('.close-edit');

  // Show popup when the edit button is clicked
  editBalanceButton.addEventListener('click', () => {
    editBalancePopup.style.display = 'flex';
  });

  // Hide popup when the close button is clicked
  closeEditButton.addEventListener('click', () => {
    editBalancePopup.style.display = 'none';
  });

  // Hide popup if the user clicks outside the popup content
  window.addEventListener('click', (event) => {
    if (event.target === editBalancePopup) {
      editBalancePopup.style.display = 'none';
    }
  });
});