import './index.css'
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import Popup from '../components/Popup.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js'
import {
  popupEditAvatar,
  popupDeleteCard,
  popupEditProfile,
  nameInput,
  jobInput,
  popupAddCard,
  popupZoomPic,
  profileEditButton,
  cardAddButton,
  avatarEditButton,
  validationData
} from '../components/constants.js'
import {api} from '../components/Api.js'

//загрузка профиля с сервера

api.getProfile()
  .then(data => {userData.setUserInfo(data.name, data.about, data.avatar) 
});

//загрузка массива карточек с сервера

api.getInitialCards()
  .then(data => { 
    const section = new Section({
      items: data.reverse(), renderer: (item) => createCard(item)
    }, '.elements');
   
    section.createSection();
});

//отправка формы карточки и создание новой
function submitCardForm(evt, data) {
  evt.preventDefault();

  popupCard.proceedSubmit()

  const info = {
    name: data.place,
    link: data.link
  }

  api.addNewCard(info)

  popupCard.close();
  
};

function createCard(item) {
  const card = new Card(item, '#card', handleImageClick, handleDeleteClick);
  const cardElement = card.createCard();
  return cardElement
}

const popupProfile = new PopupWithForm(popupEditProfile, submitPorfileForm);
export const userData = new UserInfo({ userName: '.profile__name', userJob: '.profile__job' });
const popupCard = new PopupWithForm(popupAddCard, submitCardForm);
const popupZoom = new PopupWithImage(popupZoomPic);
const popupAvatar = new PopupWithForm(popupEditAvatar, submitAvatarForm);
const popupDeleteConfirm = new Popup(popupDeleteCard);

popupProfile.setEventListeners();
popupCard.setEventListeners();
popupZoom.setEventListeners();
popupAvatar.setEventListeners();
popupDeleteConfirm.setEventListeners();

//отправка формы профиля
function submitPorfileForm(evt, data) {
  evt.preventDefault();

  popupProfile.proceedSubmit()

  api.editProfile(data)

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

//открытие-закрытие попапа аватара
function openPopupEditAvatar() {
  cardFormValidator.resetValidation()
  popupAvatar.open();
};

//отправка формы профиля
function submitAvatarForm(evt, data) {
  evt.preventDefault();

  popupAvatar.proceedSubmit()

  api.editAvatar(data["place-link"]);

  popupAvatar.close();
};

//наполнение зума картинки
function handleImageClick(name, link) {
  popupZoom.open(name, link);
};


//обработчик клика удалить
function handleDeleteClick(id) {
  popupDeleteConfirm.open();

  const deleteForm = document.getElementById('confirmation')

  deleteForm.addEventListener('submit', api.removeCard(id));
}

//-------------------валидация
const cardFormValidator = new FormValidator(validationData, '#new-card');
cardFormValidator.enableValidation();

const profileFormValidator = new FormValidator(validationData, '#profile');
profileFormValidator.enableValidation();

const profileAvatarValidator = new FormValidator(validationData, '#edit-avatar');
profileAvatarValidator.enableValidation();

//--------------------слушатели 

profileEditButton.addEventListener('click', openPopupEditProfile);
cardAddButton.addEventListener('click', openPopupAddCard);
avatarEditButton.addEventListener('click', openPopupEditAvatar)

