export  default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector
    this._handleEscClick = this._handleEscClick.bind(this)
    this._closeButton = this._popupSelector.querySelector('.popup__close-button');
  };

  open() {
    this._popupSelector.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClick);
  };

  close() {
    this._popupSelector.classList.remove('popup_opened');
    document.removeEventListener('keydown',this._handleEscClick);
  };

  _handleEscClick(evt) {
    if (evt.key === 'Escape') {
      this._popupSelector.classList.remove('popup_opened');
    }
  };

  setEventListeners() {
    this._closeButton.addEventListener('click',() => {this.close()});
    this._popupSelector.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
        this.close()
      }
    })
  };
}