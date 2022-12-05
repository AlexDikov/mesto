import Popup from "./Popup";
export default class PopupWithForm extends Popup {
  constructor(popupElement, handleFormSubmit) {
    super(popupElement);
    this._handleFormSubmit = handleFormSubmit;
    this._saveButton = this._popupElement.querySelector(".popup__save-button");
    this._form = this._popupElement.querySelector(".popup__form");
    this._inputList = Array.from(this._form.querySelectorAll(".popup__input"));
  }

  _getInputValues() {
    this._formValues = {};

    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }

  proceedSubmit() {
    this._saveButton.textContent = "Сохранение...";
  }

  refreshSubmit() {
    this._saveButton.textContent = "Сохранить";
  }

  close() {
    super.close();
    this._form.reset();
  }

  setEventListeners() {
    super.setEventListeners();

    this._popupElement.addEventListener("submit", (evt) =>
      this._handleFormSubmit(evt, this._getInputValues())
    );
  }
}
