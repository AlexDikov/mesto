//селекторы
const validationConfig = {
  form: '.popup__form',
  button: '.popup__save-button',
  buttonInactive: 'popup__save-button_inactive',
  fieldInvalid: 'popup__input_invalid'
};

//нахождение форм и навешивание слушателя
function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.form));

  formList.forEach((form) => {
    form.addEventListener('input', (event) => handlerFormInput(event, config));
  })
};

//обработчик ввода данных
function handlerFormInput(event, config) {
  const input = event.target;
  const form = event.currentTarget;

  toggleFieldError(input, config);
  setSaveButtonState(form, config);
};

//выведение текста ошибки
function toggleFieldError(input, config) {
  const span = input.nextElementSibling;
  span.textContent = input.validationMessage;

  if (span.textContent !== '') {
    input.classList.add(config.fieldInvalid)
  } else {
    input.classList.remove(config.fieldInvalid)
  }
};

//включение-выключение кнопки отправки при валидации
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

//очистка попапа
function clearPopup(config) {
  const inputList = Array.from(document.querySelectorAll('.popup__input'));

  inputList.forEach((input) => {
    const span = input.nextElementSibling;
    span.textContent = '';
    input.classList.remove(config.fieldInvalid);
  })
}

enableValidation(validationConfig);