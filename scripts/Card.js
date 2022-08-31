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
    this._element = this._getTemplate();
    this._elementImage = this._element.querySelector('.element__image')
    this._setEventListeners();

    this._element.querySelector('.element-place__name').textContent = this._name;
    this._elementImage.src = this._link;
    this._elementImage.alt = this._name;

    return this._element;
  }

  _handleLikeClick() {
    this._element.querySelector('.element-place__like-button').classList.toggle('element-place__like-button_active');
  }

  _handleDeleteClick() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    this._element.querySelector('.element-place__like-button').addEventListener('click', () => {
      this._handleLikeClick();
    });
    this._element.querySelector('.element__delete-button').addEventListener('click', () => {
      this._handleDeleteClick();
    });
    this._element.querySelector('.element__image').addEventListener('click', () => {
      this._handleImageClick(this._name, this._link);
    });
  }
}