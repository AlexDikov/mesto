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
const ProfileCardEditButton = document.querySelector('.profile__add-button')
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const elements = document.querySelector('.elements');
const templateCard = document.querySelector('#card').content;
let popupActive = null;

//--------------------functions 
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handleEscClose);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleEscClose);
}

function handleEscClose(evt) {
  if (evt.key === 'Escape') {
    closePopupActive()
  }
};

function openPopupEditProfile() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;

  openPopup(popupEditProfile);

  clearPopup(validationConfig);

  activateButton(popupEditProfile);

  popupActive = popupEditProfile;
};

function closePopupActive() {
  closePopup(popupActive);
};

function openPopupAddCard() {
  formNewCard.reset();

  openPopup(popupAddCard);

  clearPopup(validationConfig);

  desableButton(popupAddCard);

  popupActive = popupAddCard;
};

function activateButton(popup) {
  const button = popup.querySelector('.popup__save-button');
  button.removeAttribute('disabled');
  button.classList.remove('popup__save-button_inactive');
}

function desableButton(popup) {
  const button = popup.querySelector('.popup__save-button');
  button.setAttribute('disabled', true);
  button.classList.add('popup__save-button_inactive');
}

function openPopupZoomPic() {
  openPopup(popupZoomPic);

  popupActive = popupZoomPic;
};

function submitPorfileForm(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  closePopupActive();
};

function createCard(cardData) {
  const newCard = templateCard.querySelector('.element').cloneNode(true);
  const cardImage = newCard.querySelector('.element__image');
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  newCard.querySelector('.element-place__name').textContent = cardData.name;
  newCard.querySelector('.element-place__like-button').addEventListener('click', likePic);
  newCard.querySelector('.element__delete-button').addEventListener('click', deleteCard);
  cardImage.addEventListener('click', zoomPic);

  function likePic(evt) {
    evt.target.classList.toggle('element-place__like-button_active');
  };

  function deleteCard() {
    newCard.remove();
  };

  function zoomPic() {
    popupPic.src = cardData.link;
    popupPic.alt = cardData.name;
    popupPicName.textContent = cardData.name;
    openPopupZoomPic();
  };
  return newCard;
};

function submitCardForm(evt) {
  evt.preventDefault();

  const cardData = {
    link: picInput.value,
    name: placeInput.value
  };

  addCard(cardData);

  closePopupActive();
};

function addCard(cardData) {
  elements.prepend(createCard(cardData));
};

const reversedCards = initialCards.reverse();
reversedCards.forEach(addCard);

//--------------------events 

formEditProfile.addEventListener('submit', submitPorfileForm);
formNewCard.addEventListener('submit', submitCardForm);
profileEditButton.addEventListener('click', openPopupEditProfile);
popupEditProfileCloseButton.addEventListener('click', closePopupActive);
ProfileCardEditButton.addEventListener('click', openPopupAddCard);
popupAddCardCloseButton.addEventListener('click', closePopupActive);
popupZoomPicCloseButton.addEventListener('click', closePopupActive);