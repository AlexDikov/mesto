//--------------------initials

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

//--------------------DOM elements

const popupEditProfile = document.querySelector('.popup_profile-data');
const closePopupEditProfileButton = popupEditProfile.querySelector('.popup__close-button');
const formElement = popupEditProfile.querySelector('.popup__form');
const nameInput = formElement.querySelector('.popup__input_field_name');
const jobInput = formElement.querySelector('.popup__input_field_job');
const popupAddCard = document.querySelector('.popup_add-card');
const closePopupAddCardButton = popupAddCard.querySelector('.popup__close-button');
const formNewCard = popupAddCard.querySelector('.popup__form');
const placeInput = formNewCard.querySelector('.popup__input_field_name');
const picInput = formNewCard.querySelector('.popup__input_field_job');
const popupZoomPic = document.querySelector('.popup_zoom-pic');
const popupPic = popupZoomPic.querySelector('.popup__picture');
const popupPicName = popupZoomPic.querySelector('.popup__picture-cap');
const closePopupZoomPicButton = popupZoomPic.querySelector('.popup__close-button');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button')
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const elements = document.querySelector('.elements');
const templateCard = document.querySelector('#card').content;

//--------------------functions

function openPopupEditProfile() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;

  popupEditProfile.classList.add('popup_opened');
};

function closePopupEditProfile() {
  popupEditProfile.classList.remove('popup_opened');
};

function openPopupAddCard() {
  placeInput.value = null;
  picInput.value = null;

  popupAddCard.classList.add('popup_opened');
};

function closePopupAddCard() {
  popupAddCard.classList.remove('popup_opened');
};

function openPopupZoomPic() {

  popupZoomPic.classList.add('popup_opened');
};

function closePopupZoomPic() {
  popupZoomPic.classList.remove('popup_opened');
};

function porfileFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  closePopupEditProfile();
};

function cardFormSubmit(evt) {
  evt.preventDefault();

  const card = templateCard.querySelector('.element').cloneNode(true);
  card.querySelector('.element__image').src = picInput.value;
  card.querySelector('.element__image').alt = placeInput.value;
  card.querySelector('.element-place__name').textContent = placeInput.value;
  card.querySelector('.element-place__like-button').addEventListener('click', likePic);
  card.querySelector('.element__delete-button').addEventListener('click', deleteCard);

  elements.prepend(card);

  function likePic(evt) {
    evt.target.classList.toggle('element-place__like-button_active');
  };

  function deleteCard(evt) {
    evt.target.closest('.element').remove();
  };

  closePopupAddCard();
};

function getCard(cardData) {
  const card = templateCard.querySelector('.element').cloneNode(true);
  card.querySelector('.element__image').src = cardData.link;
  card.querySelector('.element__image').alt = cardData.name;
  card.querySelector('.element-place__name').textContent = cardData.name;
  card.querySelector('.element-place__like-button').addEventListener('click', likePic);
  card.querySelector('.element__delete-button').addEventListener('click', deleteCard);
  card.querySelector('.element__image').addEventListener('click', zoomPic);

  function likePic(evt) {
    evt.target.classList.toggle('element-place__like-button_active');
  };

  function deleteCard(evt) {
    evt.target.closest('.element').remove();
  };

  function zoomPic() {
    popupPic.src = cardData.link;
    popupPicName.alt = cardData.name;
    popupPicName.textContent = cardData.name;
    openPopupZoomPic();
  };

  elements.append(card);
};

initialCards.forEach(getCard);

//--------------------events
formElement.addEventListener('submit', porfileFormSubmit);
formNewCard.addEventListener('submit', cardFormSubmit);
editButton.addEventListener('click', openPopupEditProfile);
closePopupEditProfileButton.addEventListener('click', closePopupEditProfile);
addButton.addEventListener('click', openPopupAddCard);
closePopupAddCardButton.addEventListener('click', closePopupAddCard);
closePopupZoomPicButton.addEventListener('click', closePopupZoomPic);