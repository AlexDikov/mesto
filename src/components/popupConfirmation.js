import Popup from "./Popup";
export default class PopupConfirmation extends Popup {
  constructor(popupElement, handleFormSubmit) {
    super(popupElement);
    this._handleFormSubmit = handleFormSubmit;
    this._popupElement = popupElement;
  }

  setEventListeners() {
    super.setEventListeners();

    const deleteForm = document.getElementById("confirmation");

    deleteForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit();
    });
  }
}
