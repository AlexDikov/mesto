export default class Section {
  constructor ({items, renderer}, elementContainer) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._elementContainer = document.querySelector(elementContainer);
  }

  createSection () {
    this._renderedItems.forEach((item) => {
      const renderedCard = this._renderer(item);
      this.addItem(renderedCard);
    })
  }

  createElement () {
    (item) => {
      const renderedCard = this._renderer(item);
      this.addItem(renderedCard);
    }
  }

  addItem(element) {
    this._elementContainer.prepend(element);
  }
}