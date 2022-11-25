import Popup from "./Popup";
export default class PopupWithImage extends Popup {
  constructor(popupElement) {
    super(popupElement);
    this._imgLink = this._popupElement.querySelector(".popup__picture");
    this._imgCap = this._popupElement.querySelector(".popup__picture-cap");
  }

  open(name, link) {
    this._imgLink.src = link;
    this._imgLink.alt = name;
    this._imgCap.textContent = name;
    super.open();
  }
}
