export  default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector
  };

  open() {
    this._popupSelector.classList.add('popup_opened');
    document.addEventListener('keydown', (evt) => {this._handleEscClick(evt)});
  };

  close() {
    this._popupSelector.classList.remove('popup_opened');
    document.removeEventListener('keydown', (evt) => {this._handleEscClick(evt)});
  };

  _handleEscClick(evt) {
    if (evt.key === 'Escape') {
      this._popupSelector.classList.remove('popup_opened');
    }
  };

  setEventListeners() {
    this._popupSelector.querySelector('.popup__close-button').addEventListener('click',() => {this.close()});
    this._popupSelector.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
        this.close()
      }
    })
    
  };
}