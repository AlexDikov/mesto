const popup = document.querySelector('.popup');
const editButton = document.querySelector('.profile__edit-button');
const closeButton = document.querySelector('.popup__close-button');
const saveButton = document.querySelector('.popup__save-button');
const nameInput = document.querySelector('.popup__name-form');
const jobInput = document.querySelector('.popup__job-form');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const formElement = document.querySelector('.popup__form');

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
formElement.addEventListener('submit', closePopup);

nameInput.value = profileName.textContent;
jobInput.value = profileJob.textContent;

function formSubmitHandler (evt) {
    evt.preventDefault();

    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
}

formElement.addEventListener('submit', formSubmitHandler); 