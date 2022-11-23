import './index.css'
import Api from '../components/Api'
import Card from '../components/Card';
import FormValidator from '../components/FormValidator';
import Section from '../components/Section';
import Popup from '../components/Popup';
import PopupWithImage from '../components/PopupWithImage';
import PopupWithForm from '../components/PopupWithForm';
import UserInfo from '../components/UserInfo'
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
} from '../utils/constants'
import PopupConfirmation from '../components/popupConfirmation';

export const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-54",
  headers: {
    authorization: "b4cc6e60-7c2a-4c93-961f-3d990169c3ad",
    "Content-Type": "application/json",
  },
});

//загрузка профиля с сервера

api.getProfile()
  .then(data => {
    userData.setUserInfo(data.name, data.about, data.avatar) 
  }).catch((err) => {console.log(err)});

//загрузка массива карточек с сервера

api.getInitialCards()
  .then(data => { 
    const section = new Section({
      items: data.reverse(), renderer: (item) => createCard(item)
    }, '.elements');
   
    section.createSection();
}).catch((err) => {
  console.log(err);
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
  .catch((err) => {
    console.log(err);
  });

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
const popupDeleteConfirm = new PopupConfirmation(popupDeleteCard);

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
  .then((data) => {
    userData.setUserInfo(data.name, data.about, data.avatar)
  })
  .catch((err) => {
    console.log(err);
  });

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

  api.editAvatar(data["place-link"])
  .then((data) => {
    userData.setUserInfo(data.name, data.about, data.avatar)
  })
  .catch((err) => {
    console.log(err);
  });

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

  deleteForm.addEventListener('submit', api.removeCard(id)
  .catch((err) => {
    console.log(err);
  }));
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

