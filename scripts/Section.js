class Section {
  constructor ({items, renderer}, containerSelector) {
    this._rendereItems = items;
    this._renderer = renderer;
    this._containerSelector = document.querySelector(containerSelector);
  }
}