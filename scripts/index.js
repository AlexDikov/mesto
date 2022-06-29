const popup = document.querySelector('.popup');
const closeButton = popup.querySelector('.popup__close-button');
const saveButton = popup.querySelector('.popup__save-button');
const nameInput = popup.querySelector('.popup__name-form');
const jobInput = popup.querySelector('.popup__job-form');
const formElement = popup.querySelector('.popup__form');
const editButton = document.querySelector('.profile__edit-button');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const likeButton = document.querySelector('.element-place__like-button');

function openPopup() {
  popup.classList.add('popup_opened');
}

editButton.addEventListener('click', openPopup);

function closePopup() {
  popup.classList.remove('popup_opened');
  
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

closeButton.addEventListener('click', closePopup);

function saveChanges() {
  popup.classList.remove('popup_opened');
}
formElement.addEventListener('submit', saveChanges);

nameInput.value = profileName.textContent;
jobInput.value = profileJob.textContent;

function formSubmitHandler (evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
}

formElement.addEventListener('submit', formSubmitHandler); 
