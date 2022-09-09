export default class Card {

  //на вход массив карточек, образец разметки, обработчик клика зума
  constructor (data, templateSelector, handleImageClick) {
    this._name = data.name;
    this._link = data.link;
    this._card = templateSelector;
    this._handleImageClick = handleImageClick;
  }

  //копирование образца
  _getTemplate() {
    const cardElement = document
    .querySelector(this._card)
    .content
    .querySelector('.element')
    .cloneNode(true);
      
    return cardElement;
  } 

  //генерирование новой карточки
  createCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.element-place__name').textContent = this._name;
    this._element.querySelector('.element__image').src = this._link;
    this._element.querySelector('.element__image').alt = this._name;

    return this._element;
  }

  //обработчик клика лайк
  _handleLikeClick() {
    this._element.querySelector('.element-place__like-button').classList.toggle('element-place__like-button_active');
  }

  //обработчик клика удалить
  _handleDeleteClick() {
    this._element.remove();
  }

  //навешивание слушателей
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