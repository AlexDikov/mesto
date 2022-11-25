import { api } from "../pages/index";

export default class Card {
  //на вход массив карточек, образец разметки
  constructor(
    data,
    userId,
    templateSelector,
    handleImageClick,
    handleDeleteClick,
    handleLikeClick
  ) {
    this._name = data.name;
    this._link = data.link;
    this._like = data.likes;
    this._id = data.owner._id;
    this._likeId = data.likes._id;
    this._cardId = data._id;
    this._userId = userId;
    this._card = templateSelector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector(".element__image");
    this._likeButton = this._element.querySelector(
      ".element-place__like-button"
    );
    this._isLiked = this._likeButton.classList;
    this._likes = this._element.querySelector(".element-place__like-counter");
    this._deleteButton = this._element.querySelector(".element__delete-button");
  }

  //копирование образца
  _getTemplate() {
    const cardElement = document
      .querySelector(this._card)
      .content.querySelector(".element")
      .cloneNode(true);

    return cardElement;
  }

  //генерирование новой карточки
  renderCard() {
    this._setEventListeners();

    this._element.querySelector(".element-place__name").textContent =
      this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._likes.textContent = this._like.length;

    if (this._id === this._userId) {
      this._deleteButton.classList.add("element__delete-button_active");
    }
    if (this._like.some((item) => item._id === this._userId)) {
      this._likeButton.classList.add("element-place__like-button_active");
    }
    return this._element;
  }

  //навешивание слушателей
  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      this._handleLikeClick(this._cardId, this._isLiked);
    });
    this._deleteButton.addEventListener("click", () => {
      this._handleDeleteClick(this._cardId);
    });
    this._cardImage.addEventListener("click", () => {
      this._handleImageClick(this._name, this._link);
    });
  }
}
