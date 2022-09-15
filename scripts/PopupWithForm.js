import Popup from './Popup.js'
export default class PopupWithForm extends Popup {
  constructor({popupSelector, handleFormSubmit}) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._saveButton = this._popupSelector.querySelector('.popup__save-button');
  };

  _getInputValues() {
    this._inputList = array.from(this._popupSelector.querySelectorAll('.popup__input'));

    this._formValues = {};
    
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    
    return this._formValues;
  };
  
  close() {
    super.close();
    this._saveButton.setAttribute('disabled', true);
    this._saveButton.classList.add('popup__save-button_inactive');
  }

  setEventListeners() {
    super.setEventListeners();
    
    this._element.addEventListener('submit', (evt) => {
      evt.preventDefault();
    
      this._handleFormSubmit(this._getInputValues());
    
      this._element.reset();
    });
  };
}