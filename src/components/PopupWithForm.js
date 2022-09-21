import Popup from './Popup.js'
export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._saveButton = this._popupSelector.querySelector('.popup__save-button');
    this._form = this._popupSelector.querySelector('.popup__form');
    this._inputList = Array.from(this._form.querySelectorAll('.popup__input'));
  };

  _getInputValues() {
    this._formValues = {};
    
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    
    return this._formValues;
  };
  
  close() {
    super.close();
  }

  setEventListeners() {
    super.setEventListeners();
    
    this._popupSelector.addEventListener('submit', (evt) => this._handleFormSubmit(evt, this._getInputValues()));
  };
}