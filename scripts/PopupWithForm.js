export default class PopupWithForm extends Popup {
  constuctor(popupSelector) {
    super(popupSelector);
  };
  _getInputValues() {

  }

  close() {
    this._popupSelector.classList.remove('popup_opened');
    document.removeEventListener('keydown', (evt) => {this._handleEscClick(evt)});
    this._disableSaveButton()
  }

  setEventListeners() {
    this._popupSelector.querySelector('.popup__close-button').addEventListener('click',() => {this.close()});
    this._popupSelector.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
        this.close()
      }
    })
    this._popupSelector.querySelector('.popup__close-button').addEventListener('submit',() => {this.close()});
  };
}