export default class PopupWithImage extends Popup {
  constuctor(popupSelector) {
    super(popupSelector);
  };

  open() {
    this._popupSelector.classList.add('popup_opened');
  };
}