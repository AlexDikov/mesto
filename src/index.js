import './pages/index.css'
import Card from './Card.js';
import FormValidator from './FormValidator.js';
import Section from './Section.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import UserInfo from './UserInfo.js'
import {
  initialCards,
  popupEditProfile,
  nameInput,
  jobInput,
  popupAddCard,
  formNewCard,
  popupZoomPic,
  profileEditButton,
  profileCardEditButton,
  validationData
} from './constants.js'


//--------------------функции

//создание и добавление карточек из исходного массива
const reversedCards = initialCards.reverse();

const section = new Section({
  items: reversedCards, renderer: (item) => {
    const card = new Card(item, '#card', handleImageClick);
    const cardElement = card.createCard();
    return cardElement;
  }
}, '.elements');

section.createSection();

//отправка формы карточки и создание новой
function submitCardForm(evt, data) {
  evt.preventDefault();

  const info = {
    name: data['place'],
    link: data['place-link']
  }

  const card = new Card(info, '#card', handleImageClick)
  const cardElement = card.createCard(data);

  section.addItem(cardElement);
  popupCard.close();
};


const popupProfile = new PopupWithForm(popupEditProfile, submitPorfileForm);
const userData = new UserInfo({ userName: '.profile__name', userJob: '.profile__job' });
const popupCard = new PopupWithForm(popupAddCard, submitCardForm);
const popupZoom = new PopupWithImage(popupZoomPic);

popupProfile.setEventListeners();
popupCard.setEventListeners();
popupZoom.setEventListeners();

//отправка формы профиля
function submitPorfileForm(evt, data) {
  evt.preventDefault();

  const { person, job } = data;

  userData.setUserInfo(person, job);
  popupProfile.close();
};


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

profileEditButton.addEventListener('click', openPopupEditProfile);
profileCardEditButton.addEventListener('click', openPopupAddCard);