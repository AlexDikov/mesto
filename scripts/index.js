import Card from './Card.js';
import FormValidator from './FormValidator.js';
import Section from './Section.js';
import Popup from './Popup.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import UserInfo from './UserInfo.js'
import {
initialCards,
popups,
popupEditProfile,
popupEditProfileCloseButton,
formEditProfile,
nameInput,
jobInput,
popupAddCard,
popupAddCardSaveButton,
popupAddCardCloseButton,
formNewCard,
placeInput,
picInput,
popupZoomPic,
popupPic,
popupPicName,
popupZoomPicCloseButton,
profileEditButton,
profileCardEditButton,
profileName,
profileJob,
elements,
validationData
} from './constants.js'


//--------------------функции

//создание и добавление карточек из исходного массива
const reversedCards = initialCards.reverse();

const section = new Section({items: reversedCards, renderer: (item) => {
  const card = new Card(item, '#card', handleImageClick);
  const cardElement = card.createCard();
  return cardElement;
}}, '.elements'); 

section.createSection();

//отправка формы карточки и создание новой
function submitCardForm(evt, data) {
  evt.preventDefault();

  // const data = {
  //   name: placeInput.value,
  //   link: picInput.value,
  // }

  const card = new Card(data, '#card', handleImageClick) 
  const cardElement = card.createCard(data);

  section.addItem(cardElement);
};


// const popupProfile = new PopupWithForm (popupEditProfile, submitPorfileForm);
const popupCard = new PopupWithForm (popupAddCard, submitCardForm);
const popupZoom = new PopupWithImage (popupZoomPic);
const userData = new UserInfo (profileName, profileJob);

// popupProfile.setEventListeners();
popupCard.setEventListeners();
popupZoom.setEventListeners();

//отправка формы профиля
// function submitPorfileForm(evt) {
//   evt.preventDefault();

//   userData.setUserInfo();
// };


//открытие-закрытие попапа профиля
function openPopupEditProfile() {
  
  const userInfo = userData.getUserInfo();

  nameInput.value = userInfo.name;
  jobInput.value = userInfo.job;

  popupProfile.open();
};

//открытие-закрытие попапа добавления карточки
function openPopupAddCard() {
  formNewCard.reset();

  popupCard.open();
};

//наполнение зума картинки
function handleImageClick(name, link) {
  popupZoom.open(name, link);
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
profileCardEditButton.addEventListener('click', openPopupAddCard);