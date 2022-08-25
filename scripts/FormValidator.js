export default class FormValidator {
  constructor (validationData, formSelector) {
    this._form = validationData.form;
    this._input = validationData.input;
    this._button = validationData.button; 
    this._buttonInactive = validationData.buttonInactive; 
    this._fieldInvalid = validationData.fieldInvalid; 
    this._formSelector = formSelector;
  }

  //обработчик ввода данных
  _handlerFormInput() {
  
    toggleFieldError();
    setSaveButtonState();
  };
  
  //выведение текста ошибки
  _toggleFieldError() {
    const span = this._formInput.nextElementSibling;
    span.textContent = this._formInput.validationMessage;
  
    if (span.textContent !== '') {
      this._formInput.classList.add(this._data.fieldInvalid)
    } else {
      this._formInput.classList.remove(this._data.fieldInvalid)
    }
  };
  
  //включение-выключение кнопки отправки при валидации
  _setSaveButtonState() {
    const isValid = this._form.checkValidity();
  
    if (isValid) {
      this._data.button.removeAttribute('disabled');
      this._data.button.remove(this._data.buttonInactive);
    } else {
      this._data.button.setAttribute('disabled', true);
      this._data.button.classList.add(this._data.buttonInactive);
    }
  }
  
  //очистка попапа
  _clearPopup() {
    this._inputList = Array.from(document.querySelectorAll(this._formInput));
  
    inputList.forEach(() => {
      const span = this._formInput.nextElementSibling;
      span.textContent = '';
      this._formInput.classList.remove(this._data.fieldInvalid);
    })
  }

  _setEventListeners() {
    //this.element.querySelector('.element-place__like-button').addEventListener('click', () => {
    //  this._handlerFormInput();
  };
  
  enableValidation() {
    this._inputList = Array.from(document.querySelectorAll(data.form));
  
    formList.forEach((form) => {
      form.addEventListener('input', (event) => handlerFormInput(event, config));
    })
  };

}