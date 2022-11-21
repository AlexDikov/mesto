
//--------------------переменные
export const popupEditAvatar = document.querySelector('.popup_edit-avatar')
export const popupDeleteCard = document.querySelector('.popup_delete-card');
export const popupEditProfile = document.querySelector('.popup_profile-data');
export const popupEditProfileCloseButton = popupEditProfile.querySelector('.popup__close-button');
export const formEditProfile = popupEditProfile.querySelector('.popup__form');
export const nameInput = formEditProfile.querySelector('.popup__input_field_name');
export const jobInput = formEditProfile.querySelector('.popup__input_field_job');
export const popupAddCard = document.querySelector('.popup_add-card');
export const formNewCard = popupAddCard.querySelector('.popup__form');
export const popupZoomPic = document.querySelector('.popup_zoom-pic');
export const profileEditButton = document.querySelector('.profile__edit-button');
export const cardAddButton = document.querySelector('.profile__add-button');
export const avatarEditButton = document.querySelector('.profile__edit-avatar-button')

//селекторы для валидации
export const validationData = {
  form: '.popup__form',
  input: '.popup__input',
  button: '.popup__save-button',
  buttonInactive: 'popup__save-button_inactive',
  fieldInvalid: 'popup__input_invalid'
};