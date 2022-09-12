import Card from './Card.js';
import FormValidator from './FormValidator.js';
import Section from './Section.js';
import Popup from './Popup.js';
// import PopupWithImage from './PopupWithImage.js';
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
function submitCardForm(evt) {
  evt.preventDefault();

  const data = {
    name: placeInput.value,
    link: picInput.value,
  }

  const card = new Card(data, '#card', handleImageClick) 
  const cardElement = card.createCard();

  section.addItem(cardElement);

  closePopup(popupAddCard);

  disableSaveButton();
};

//отправка формы профиля
function submitPorfileForm(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  closePopup(popupEditProfile);
};

//дизактивация кнопки сохранить
function disableSaveButton() {
  popupAddCardSaveButton.setAttribute('disabled', true);
  popupAddCardSaveButton.classList.add(validationData.buttonInactive);
}

const popupProfile = new Popup (popupEditProfile);
popupProfile.setEventListeners();
const popupCard = new Popup (popupAddCard);
popupCard.setEventListeners();
const popupZoom = new Popup(popupZoomPic);
popupZoom.setEventListeners();

//открытие-закрытие попапа профиля
function openPopupEditProfile() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;

  popupProfile.open();
};

//открытие-закрытие попапа добавления карточки
function openPopupAddCard() {
  formNewCard.reset();

  popupCard.open();
};

//открытие-закрытие зума картинки карточки
// function openPopupZoomPic() {
//   openPopup(popupZoomPic);
// };

//наполнение зума картинки
function handleImageClick(name, link) {
  popupPic.src = link;
  popupPic.alt = name;
  popupPicName.textContent = name;
  popupZoom.open();
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
// popupEditProfileCloseButton.addEventListener('click', () => popupProfile.close());
//popupAddCardCloseButton.addEventListener('click', () => closePopup(popupAddCard));
//popupZoomPicCloseButton.addEventListener('click', () => closePopup(popupZoomPic));