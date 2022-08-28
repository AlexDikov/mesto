export default class FormValidator {
  constructor (validationData, formSelector) {
    this._input = validationData.input;
    this._button = validationData.button;
    this._buttonInactive = validationData.buttonInactive;
    this._fieldInvalid = validationData.fieldInvalid;
    this._formSelector = document.querySelector(formSelector);
  };

  
  
  enableValidation() {
    this._formSelector.addEventListener('input', () => _handlerFormInput());
    //this._setEventListeners();
    //this._toggleFieldError()
    //this._setSaveButtonState();
  };

  _handlerFormInput(event) {
    this._input = event.target;
    this._formSelector = event.currentTarget;

    _toggleFieldError();
    _setSaveButtonState();
  };

  _toggleFieldError() {
    const span = this._input.nextElementSibling;
    span.textContent = this._input.validationMessage;
  
    if (span.textContent !== '') {
      this._input.classList.add(this._fieldInvalid)
    } else {
      this._input.classList.remove(this._fieldInvalid)
    }
  };
}