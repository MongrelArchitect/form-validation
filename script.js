function showError(target) {
  const errorMessage = document.querySelector(
    `#${target.id} + span.error`,
  );
  errorMessage.className = 'error visible';

  target.removeAttribute('placeholder');
  if (target.validity.valueMissing) {
    errorMessage.textContent = 'Required - please fill out this field';
  }

  if (target.id === 'email') {
    if (target.validity.typeMismatch) {
      errorMessage.textContent = 'Invalid email address';
    }
  }

  if (target.id === 'country') {
    if (target.validity.tooShort) {
      errorMessage.textContent = 'Too short - not a real country!';
    }
  }

  if (target.id === 'password') {
    if (target.validity.tooShort) {
      errorMessage.textContent = 'Too short - enter at least 8 characters';
    }
  }

  const confirm = document.querySelector('#pass-confirm');
  if (target.validity.customError) {
    document.querySelector(`#${confirm.id} + span.error`)
      .textContent = 'Passwords do not match!';
  }
}

const inputs = document.querySelectorAll('input');

inputs.forEach((input) => {
  const errorMessage = document.querySelector(`#${input.id} + span.error`);
  input.addEventListener('input', (event) => {
    const password = document.querySelector('#password');
    const confirm = document.querySelector('#pass-confirm');
    // Ensure passwords match and set validity accordingly
    if (password.value !== confirm.value) {
      confirm.setCustomValidity('Passwords do not match!');
    } else {
      confirm.setCustomValidity('');
    }

    // Check validity and report accordingly
    if (!input.validity.valid) {
      showError(event.target);
    } else {
      errorMessage.textContent = 'Looks good!';
      errorMessage.className = 'error';
    }
  });
});

const form = document.querySelector('form');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  if (form.checkValidity()) {
    alert('Everything is correct. Good job!');
    window.location.reload();
  } else {
    inputs.forEach((input) => {
      if (!input.validity.valid) {
        showError(input);
      }
    });
  }
});
