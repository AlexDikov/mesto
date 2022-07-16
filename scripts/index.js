//--------------------DOM elements

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
const profileAddButton = document.querySelector('.profile__add-button')
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
  formNewCard.reset();

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

function submitPorfileForm(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  closePopupEditProfile();
};

function submitCardForm(evt) {
  evt.preventDefault();

  const card = templateCard.cloneNode(true);
  const cardImage = card.querySelector('.element__image');
  cardImage.src = picInput.value;
  cardImage.alt = placeInput.value;
  card.querySelector('.element-place__name').textContent = placeInput.value;
  card.querySelector('.element-place__like-button').addEventListener('click', likePic);
  card.querySelector('.element__delete-button').addEventListener('click', deleteCard);
  cardImage.addEventListener('click', zoomPic);

  elements.prepend(card);

  function likePic(evt) {
    evt.target.classList.toggle('element-place__like-button_active');
  };

  function deleteCard() {
    card.remove();
  };

  function zoomPic() {
    popupPic.src = picInput.value;
    popupPic.alt = placeInput.value;
    popupPicName.textContent = placeInput.value;
    openPopupZoomPic();
  };

  closePopupAddCard();
};

function addCard(cardData) {
  const card = templateCard.cloneNode(true);
  const cardImage = card.querySelector('.element__image');
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  card.querySelector('.element-place__name').textContent = cardData.name;
  card.querySelector('.element-place__like-button').addEventListener('click', likePic);
  card.querySelector('.element__delete-button').addEventListener('click', deleteCard);
  cardImage.addEventListener('click', zoomPic);

  function likePic(evt) {
    evt.target.classList.toggle('element-place__like-button_active');
  };

  function deleteCard() {
    card.remove();
  };

  function zoomPic() {
    popupPic.src = cardData.link;
    popupPic.alt = cardData.name;
    popupPicName.textContent = cardData.name;
    openPopupZoomPic();
  };

  elements.prepend(card);
};

const reversedCards = initialCards.reverse();

reversedCards.forEach(addCard);

//--------------------events
formEditProfile.addEventListener('submit', submitPorfileForm);
formNewCard.addEventListener('submit', submitCardForm);
profileEditButton.addEventListener('click', openPopupEditProfile);
popupEditProfileCloseButton.addEventListener('click', closePopupEditProfile);
profileAddButton.addEventListener('click', openPopupAddCard);
popupAddCardCloseButton.addEventListener('click', closePopupAddCard);
popupZoomPicCloseButton.addEventListener('click', closePopupZoomPic);