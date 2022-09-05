import Card from './Card.js';
import FormValidator from './FormValidator.js';
import Section from './Section.js';
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

// reversedCards.forEach((data) => {
//   createNewCard(data)
// });

//отправка формы карточки и создание новой
function submitCardForm(evt) {
  evt.preventDefault();

  const data = {
    name: placeInput.value,
    link: picInput.value,
  }

  createNewCard(data);

  closePopup(popupAddCard);

  disableSaveButton();
};

//создание и добавление в разметку карточки
// function createNewCard(data) {
//   const card = new Card(data, '#card', handleImageClick);
//   const cardElement = card.createCard();
//   addCard(cardElement);
// }


//добавление карточки в разметку
// function addCard(card) {
//   elements.prepend(card);
// }

//создание и добавление карточек из исходного массива
const initialCardList = new Section({
  items: reversedCards,
  renderer: (item) => {
    const card = new Card(item, '#card');
    const cardElement = card.createCard();
    initialCardList.addItem(cardElement);
  }
}, elements);

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
  if (evt.key === 'Escape') {
    const popupActive = document.querySelector('.popup_opened');
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

//открытие-закрытие попапа добавления карточки
function openPopupAddCard() {
  formNewCard.reset();

  openPopup(popupAddCard);
};

//открытие-закрытие зума картинки карточки
function openPopupZoomPic() {
  openPopup(popupZoomPic);
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
profileCardEditButton.addEventListener('click', openPopupAddCard);
popupEditProfileCloseButton.addEventListener('click', () => closePopup(popupEditProfile));
popupAddCardCloseButton.addEventListener('click', () => closePopup(popupAddCard));
popupZoomPicCloseButton.addEventListener('click', () => closePopup(popupZoomPic));