export default class FormValidator {
  constructor (validationData, formDomElement) {
    this._input = validationData.input;
    this._buttonInactive = validationData.buttonInactive; 
    this._fieldInvalid = validationData.fieldInvalid; 
    this._formDomElement = document.querySelector(formDomElement);
    this._domButton = document.querySelector(validationData.button);
    this._domCloseButton = document.querySelector(validationData.closeButton);
  }

  enableValidation() {
    this._domButton.setAttribute('disabled', true);
    this._domButton.classList.add(this._buttonInactive);
    this._formDomElement.addEventListener('input', (event) => {this._handlerFormInput(event)});
    this._setEventListeners();
};

  //обработчик ввода данных
  _handlerFormInput(event) {
    this._input = event.target;

    this._toggleFieldError();
    this._setSaveButtonState();
  };
  
  //выведение текста ошибки
  _toggleFieldError() {
    const span = this._input.nextElementSibling;
    span.textContent = this._input.validationMessage;
  
    if (span.textContent !== '') {
      this._input.classList.add(this._fieldInvalid)
    } else {
      this._input.classList.remove(this._fieldInvalid)
    }
  };
  
  //включение-выключение кнопки отправки при валидации
  _setSaveButtonState() {
    const isValid = this._formDomElement.checkValidity();
 
    if (isValid) {
      this._domButton.removeAttribute('disabled');
      this._domButton.classList.remove(this._buttonInactive);
    } else {
      this._domButton.setAttribute('disabled', true);
      this._domButton.classList.add(this._buttonInactive);
    }
  }
  
  _setEventListeners() {
    this._domCloseButton.addEventListener('click', (event) => {this._clearPopupError(event)});
  }

  //очистка попапа
  _clearPopupError(event) {
    this._domCloseButton = event.currentTarget;

    const inputList = Array.from(document.querySelectorAll('.popup__input'));

    inputList.forEach((input) => {
      const span = input.nextElementSibling;
      span.textContent = '';
      input.classList.remove(this._fieldInvalid);
  })

  // _disableButton() {
  //   this._domButton.setAttribute('disabled', true);
  //   this._domButton.classList.add(this._buttonInactive);
  // }
}

}