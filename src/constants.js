//исходный массив карточек
export const initialCards = [{
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

//--------------------переменные

export const popupEditProfile = document.querySelector('.popup_profile-data');
export const popupEditProfileCloseButton = popupEditProfile.querySelector('.popup__close-button');
export const formEditProfile = popupEditProfile.querySelector('.popup__form');
export const nameInput = formEditProfile.querySelector('.popup__input_field_name');
export const jobInput = formEditProfile.querySelector('.popup__input_field_job');
export const popupAddCard = document.querySelector('.popup_add-card');
export const formNewCard = popupAddCard.querySelector('.popup__form');
export const popupZoomPic = document.querySelector('.popup_zoom-pic');
export const profileEditButton = document.querySelector('.profile__edit-button');
export const profileCardEditButton = document.querySelector('.profile__add-button');

//селекторы для валидации
export const validationData = {
  form: '.popup__form',
  input: '.popup__input',
  button: '.popup__save-button',
  buttonInactive: 'popup__save-button_inactive',
  fieldInvalid: 'popup__input_invalid'
};