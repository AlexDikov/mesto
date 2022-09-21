import Popup from './Popup.js'
export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imgLink =  this._popupSelector.querySelector('.popup__picture');
    this._imgCap =  this._popupSelector.querySelector('.popup__picture-cap');
  };

  open(name, link) {
    this._imgLink.src = link;
    this._imgLink.alt = name;
    this._imgCap.textContent = name;
    super.open();
  };
}