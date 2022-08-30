import Card from './Card.js';
import FormValidator from './FormValidator.js';

const initialCards = [{
  name: 'Архыз',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
},
{
  name: 'Челябинская область',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
},
{
  name: 'Иваново',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
},
{
  name: 'Камчатка',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
},
{
  name: 'Холмогорский район',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
},
{
  name: 'Байкал',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
}
];

//--------------------переменные

const popups = document.querySelectorAll('.popup')
const popupEditProfile = document.querySelector('.popup_profile-data');
const popupEditProfileCloseButton = popupEditProfile.querySelector('.popup__close-button');
const formEditProfile = popupEditProfile.querySelector('.popup__form');
const nameInput = formEditProfile.querySelector('.popup__input_field_name');
const jobInput = formEditProfile.querySelector('.popup__input_field_job');
const popupAddCard = document.querySelector('.popup_add-card');
const popupAddCardCloseButton = popupAddCard.querySelector('.popup__close-button');
const formNewCard = popupAddCard.querySelector('.popup__form');
const placeInput = formNewCard.querySelector('.popup__input_field_name');
const picInput = formNewCard.querySelector('.popup__input_field_job');
const popupZoomPic = document.querySelector('.popup_zoom-pic');
const popupPic = popupZoomPic.querySelector('.popup__picture');
const popupPicName = popupZoomPic.querySelector('.popup__picture-cap');
const popupZoomPicCloseButton = popupZoomPic.querySelector('.popup__close-button');
const profileEditButton = document.querySelector('.profile__edit-button');
const ProfileCardEditButton = document.querySelector('.profile__add-button')
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const elements = document.querySelector('.elements');

//селекторы для валидации
const validationData = {
  form: '.popup__form',
  input: '.popup__input',
  button: '.popup__save-button',
  closeButton: '.popup__close-button',
  buttonInactive: 'popup__save-button_inactive',
  fieldInvalid: 'popup__input_invalid'
};

//--------------------функции

//создание карточек из исходного массива
const reversedCards = initialCards.reverse();

reversedCards.forEach((data) => {
  const card = new Card(data, '#card', handleImageClick);
  const cardElement = card.createCard();

  addCard(cardElement);
});

//отправка формы карточки и создание новой
function submitCardForm(evt) {
  evt.preventDefault();

  const data = {
    name: placeInput.value,
    link: picInput.value,
  }

  const card = new Card(data, '#card', handleImageClick);
  const cardElement = card.createCard();

  addCard(cardElement);

  closePopup(popupAddCard);
};

//добавление карточки в разметку
function addCard(card) {
  elements.prepend(card);
}

//отправка формы профиля
function submitPorfileForm(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  closePopup(popupEditProfile);
};

//открытие-закрытие попапа
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handleEscClose);
};

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleEscClose);
};

//закрытие попапа при нажатии esc
function handleEscClose(evt) {
  const popupActive = document.querySelector('.popup_opened');
  if (evt.key === 'Escape') {
    closePopup(popupActive)
  }
};

//закрытие попапа по оверлею
popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup)
    }
  })
});

//открытие-закрытие попапа профиля
function openPopupEditProfile() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;

  openPopup(popupEditProfile);
};

function closePopupEditProfile() {
  closePopup(popupEditProfile);
};

//открытие-закрытие попапа добавления карточки
function openPopupAddCard() {
  formNewCard.reset();

  openPopup(popupAddCard);
};

function closeAddCard() {
  closePopup(popupAddCard);
};

//открытие-закрытие зума картинки карточки
function openPopupZoomPic() {
  openPopup(popupZoomPic);
};

function closePopupZoomPic() {
  closePopup(popupZoomPic);
};

//наполнение зума картинки
function handleImageClick(name, link) {
  popupPic.src = link;
  popupPic.alt = name;
  popupPicName.textContent = name;
  openPopupZoomPic();
};

//-------------------валидация
const cardFormValidator = new FormValidator(validationData, '#new-card');
cardFormValidator.enableValidation();

const profileFormValidator = new FormValidator(validationData, '#profile');
profileFormValidator.enableValidation();

//--------------------слушатели 

formEditProfile.addEventListener('submit', submitPorfileForm);
formNewCard.addEventListener('submit', submitCardForm);
profileEditButton.addEventListener('click', openPopupEditProfile);
popupEditProfileCloseButton.addEventListener('click', closePopupEditProfile);
ProfileCardEditButton.addEventListener('click', openPopupAddCard);
popupAddCardCloseButton.addEventListener('click', closeAddCard);
popupZoomPicCloseButton.addEventListener('click', closePopupZoomPic);