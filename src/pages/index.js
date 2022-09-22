import './index.css'
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js'
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
} from '../components/constants.js'


//--------------------функции

//создание и добавление карточек из исходного массива
const reversedCards = initialCards.reverse();

const section = new Section({
  items: reversedCards, renderer: (item) => createCard(item)
}, '.elements');

section.createSection();

//отправка формы карточки и создание новой
function submitCardForm(evt, data) {
  evt.preventDefault();

  const info = {
    name: data['place'],
    link: data['place-link']
  }

  section.addItem(createCard(info));
  popupCard.close();
};

function createCard(item) {
  const card = new Card(item, '#card', handleImageClick);
  const cardElement = card.createCard();
  return cardElement
}


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

  profileFormValidator.resetValidation()
  popupProfile.open();
};

//открытие-закрытие попапа добавления карточки
function openPopupAddCard() {
  cardFormValidator.resetValidation()
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