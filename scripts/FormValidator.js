export default class FormValidator {
  constructor (validationData, formSelector) {
    this._input = validationData.input;
    this._button = validationData.button;
    this._buttonInactive = validationData.buttonInactive;
    this._fieldInvalid = validationData.fieldInvalid;
    this._formDomElement = document.querySelector(formElement);
  };

  enableValidation() {
    this._formDomElement.addEventListener('input', (event) => this._handlerFormInput(event));
    //this._setEventListeners();
    //this._toggleFieldError()
    //this._setSaveButtonState();
  };

  _handlerFormInput(event) {
    this._input = event.target;
    this._formDomElement = event.currentTarget;

    this._toggleFieldError();
    this._setSaveButtonState();
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

  _setSaveButtonState() { 

    this._button = form.querySelector(); 
    const isValid = form.checkValidity(); 
  
    if (isValid) { 
      this._button.removeAttribute('disabled'); 
      this._button.classList.remove(this._buttonInactive); 
    } else { 
      this._button.setAttribute('disabled', true); 
      this._button.classList.add(this._buttonInactive); 
    } 
  
  } 
}