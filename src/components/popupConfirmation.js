import Popup from "./Popup";
export default class PopupConfirmation extends Popup {
  constructor(popupElement, handleFormSubmit) {
    super(popupElement);
    this._handleFormSubmit = handleFormSubmit;
  }

  setEventListeners() {
    super.setEventListeners();

    this._popupElement.addEventListener("submit", (evt) =>
      this._handleFormSubmit(evt, this._getInputValues())
    );
  }
}
