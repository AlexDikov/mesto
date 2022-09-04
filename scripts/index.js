import Card from './Card.js';
import FormValidator from './FormValidator.js';
import {
initialCards,
popups,
popupEditProfile,
popupEditProfileCloseButton,
formEditProfile,
nameInput,
jobInput,
popupAddCard,
popupAddCardCloseButton,
formNewCard,
placeInput,
picInput,
popupZoomPic,
popupPic,
popupPicName,
popupZoomPicCloseButton,
profileEditButton,
ProfileCardEditButton,
profileName,
profileJob,
elements,
validationData
} from './constants.js'


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

  //clearPopup(validationConfig);

  activateButton(popupEditProfile);
};

function closePopupEditProfile() {
  closePopup(popupEditProfile);
};

//открытие-закрытие попапа добавления карточки
function openPopupAddCard() {
  formNewCard.reset();

  openPopup(popupAddCard);

  //clearPopup(validationConfig);

  disableButton(popupAddCard);
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

//активация кнопки отправки формы
function activateButton(popup) {
  const button = popup.querySelector('.popup__save-button');
  button.removeAttribute('disabled');
  button.classList.remove('popup__save-button_inactive');
};

function disableButton(popup) {
  const button = popup.querySelector('.popup__save-button');
  button.setAttribute('disabled', true);
  button.classList.add('popup__save-button_inactive');
};

const profileFormValidator = new FormValidator(validationData, '#profile');
profileFormValidator.enableValidation();

//const cardFormValidator = new FormValidator(validationData, '#card');
//cardFormValidator.enableValidation();

//--------------------слушатели 

formEditProfile.addEventListener('submit', submitPorfileForm);
formNewCard.addEventListener('submit', submitCardForm);
profileEditButton.addEventListener('click', openPopupEditProfile);
popupEditProfileCloseButton.addEventListener('click', closePopupEditProfile);
ProfileCardEditButton.addEventListener('click', openPopupAddCard);
popupAddCardCloseButton.addEventListener('click', closeAddCard);
popupZoomPicCloseButton.addEventListener('click', closePopupZoomPic);