const formNew = {
  form: '.popup__form',
  button: '.popup__save-button',
  buttonInactive: 'popup__save-button_inactive'
};

function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.form));

  formList.forEach((form) => {
    form.addEventListener('input', (event) => handlerFormInput(event, config));
  })
};

function handlerFormInput(event, config) {
  const input = event.target;
  const form = event.currentTarget;

  toggleFieldError(input);
  setSaveButtonState(form, config);
};


function toggleFieldError(input) {
  const span = input.nextElementSibling;
  span.textContent = input.validationMessage;

  if (span.textContent !== '') {
    input.classList.add('popup__input_invalid')
  } else {
    input.classList.remove('popup__input_invalid')
  }
};

function setSaveButtonState(form, config) {
  const button = form.querySelector(config.button);

  const isValid = form.checkValidity();

  if (isValid) {
    button.removeAttribute('disabled');
    button.classList.remove(config.buttonInactive);
  } else {
    button.setAttribute('disabled', true);
    button.classList.add(config.buttonInactive);
  }
}

function clearPopup() {
  const inputList = Array.from(document.querySelectorAll('.popup__input'));

  inputList.forEach((input) => {
    const span = input.nextElementSibling;
    span.textContent = '';
    input.classList.remove('popup__input_invalid');

  })
}

const popups = document.querySelectorAll('.popup')

popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup)
    }
  })
})

enableValidation(formNew);