export default class Section {
  constructor ({items, renderer}, elementContainer) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._elementContainer = document.querySelector(elementContainer);
    debugger;
  }

  //добавление элемента в разметку
  addItem() {
    this._elementContainer.prepend(this.element);
  }

}