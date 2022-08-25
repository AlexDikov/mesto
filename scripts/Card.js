export default class Card {

  constructor (data, templateSelector, handleImageClick) {
    this._name = data.name;
    this._link = data.link;
    this._card = templateSelector;
    this._handleImageClick = handleImageClick;
  }

  _getTemplate() {
      const cardElement = document
      .querySelector(this._card)
      .content
      .querySelector('.element')
      .cloneNode(true);
      
      return cardElement;
  } 

  createCard() {
    this.element = this._getTemplate();
    this._setEventListeners();

    this.element.querySelector('.element-place__name').textContent = this._name;
    this.element.querySelector('.element__image').src = this._link;
    this.element.querySelector('.element__image').alt = this._name;

    return this.element;
  }

  _handleLikeClick() {
    this.element.querySelector('.element-place__like-button').classList.toggle('element-place__like-button_active');
  }

  _handleDeleteClick() {
    this.element.remove();
  }

  _setEventListeners() {
    this.element.querySelector('.element-place__like-button').addEventListener('click', () => {
      this._handleLikeClick();
    });
    this.element.querySelector('.element__delete-button').addEventListener('click', () => {
      this._handleDeleteClick();
    });

    this.element.querySelector('.element__image').addEventListener('click', () => {
      this._handleImageClick(this._name, this._link);
    });
  }
}