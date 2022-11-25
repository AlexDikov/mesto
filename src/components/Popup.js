export default class Popup {
  constructor(popupElement) {
    this._popupElement = popupElement;
    this._handleEscClick = this._handleEscClick.bind(this);
    this._closeButton = this._popupElement.querySelector(
      ".popup__close-button"
    );
  }

  open() {
    this._popupElement.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClick);
  }

  close() {
    this._popupElement.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClick);
  }

  _handleEscClick(evt) {
    if (evt.key === "Escape") {
      this._popupElement.classList.remove("popup_opened");
    }
  }

  setEventListeners() {
    this._closeButton.addEventListener("click", () => {
      this.close();
    });
    this._popupElement.addEventListener("mousedown", (evt) => {
      if (evt.target.classList.contains("popup_opened")) {
        this.close();
      }
    });
  }
}
