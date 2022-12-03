import "./index.css";
import Api from "../components/Api";
import Card from "../components/Card";
import FormValidator from "../components/FormValidator";
import Section from "../components/Section";
import PopupConfirmation from "../components/popupConfirmation";
import PopupWithImage from "../components/PopupWithImage";
import PopupWithForm from "../components/PopupWithForm";
import UserInfo from "../components/UserInfo";
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
  validationData,
} from "../utils/constants";

export const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-54",
  headers: {
    authorization: "b4cc6e60-7c2a-4c93-961f-3d990169c3ad",
    "Content-Type": "application/json",
  },
});

//загрузка профиля с сервера
export const userData = new UserInfo({
  userName: ".profile__name",
  userJob: ".profile__job",
});

api
  .getProfile()
  .then((data) => {
    userData.setUserInfo(data.name, data.about, data.avatar, data._id);
  })
  .catch((err) => {
    console.log(err);
  });

let section;

//создание новой карточки
function createCard(item, userId) {
  const card = new Card(
    item,
    userId,
    "#card",
    handleImageClick,
    handleDeleteClick,
    handleLikeClick
  );
  const cardElement = card.renderCard();

  section.addCard(cardElement);
}

//загрузка массива карточек с сервера

api
  .getInitialCards()
  .then((data) => {
    const userId = userData.getUserInfo().id;
    section = new Section(
      {
        items: data.reverse(),
        renderer: (item) => createCard(item, userId),
      },
      ".elements"
    );

    section.renderItems();
  })
  .catch((err) => {
    console.log(err);
  });

//инстанс попапа доюавления карточки
const popupCard = new PopupWithForm(popupAddCard, submitCardForm);
popupCard.setEventListeners();

//открытие-закрытие попапа добавления карточки
function openPopupAddCard() {
  cardFormValidator.resetValidation();
  popupCard.open();
}

//отправка формы карточки и создание новой
function submitCardForm(evt, data) {
  evt.preventDefault();

  popupCard.proceedSubmit();

  const info = {
    name: data.place,
    link: data.link,
  };

  api
    .addNewCard(info)
    .then((res) => {
      const userId = userData.getUserInfo().id;
      createCard(res, userId);
    })
    .then(popupCard.refreshSubmit(), popupCard.close())
    .catch((err) => {
      console.log(err);
    });
}

//инстанс попапа профиля
const popupProfile = new PopupWithForm(popupEditProfile, submitPorfileForm);
popupProfile.setEventListeners();

//открытие-закрытие попапа профиля
function openPopupEditProfile() {
  const userInfo = userData.getUserInfo();

  nameInput.value = userInfo.name;
  jobInput.value = userInfo.job;

  profileFormValidator.resetValidation();
  popupProfile.open();
}

//отправка формы профиля
function submitPorfileForm(evt, data) {
  evt.preventDefault();

  popupProfile.proceedSubmit();

  api
    .editProfile(data)
    .then((data) => {
      userData.setUserInfo(data.name, data.about, data.avatar);
      popupProfile.refreshSubmit();
      popupProfile.close();
    })
    .catch((err) => {
      console.log(err);
    });
}

const popupAvatar = new PopupWithForm(popupEditAvatar, submitAvatarForm);
popupAvatar.setEventListeners();

//открытие-закрытие попапа аватара
function openPopupEditAvatar() {
  cardFormValidator.resetValidation();
  popupAvatar.open();
}

//отправка формы профиля
function submitAvatarForm(evt, data) {
  evt.preventDefault();

  popupAvatar.proceedSubmit();

  api
    .editAvatar(data["place-link"])
    .then((data) => {
      userData.setUserInfo(data.name, data.about, data.avatar);
      popupAvatar.refreshSubmit();
      popupAvatar.close();
    })
    .catch((err) => {
      console.log(err);
    });
}

const popupZoom = new PopupWithImage(popupZoomPic);
popupZoom.setEventListeners();

//наполнение зума картинки
function handleImageClick(name, link) {
  popupZoom.open(name, link);
}

//обработчик клика удалить
function handleDeleteClick(id) {
  const popupDeleteConfirm = new PopupConfirmation(popupDeleteCard, () =>
    api
      .removeCard(id)
      .then(this._element.remove())
      .then(popupDeleteConfirm.close())
      .catch((err) => {
        console.log(err);
      })
  );
  popupDeleteConfirm.setEventListeners();

  popupDeleteConfirm.open();
}

//обработчик клика лайк
function handleLikeClick(id, like) {
  if (this._isLiked.length < 2) {
    api.addLike(id, like).catch((err) => {
      console.log(err);
    });
    this._likeButton.classList.add("element-place__like-button_active");
    this._likes.textContent -= "-1";
  } else {
    api.removeLike(id, like).catch((err) => {
      console.log(err);
    });
    this._likeButton.classList.remove("element-place__like-button_active");
    this._likes.textContent -= "1";
  }
}

//-------------------валидация
const cardFormValidator = new FormValidator(validationData, "#new-card");
cardFormValidator.enableValidation();

const profileFormValidator = new FormValidator(validationData, "#profile");
profileFormValidator.enableValidation();

const profileAvatarValidator = new FormValidator(
  validationData,
  "#edit-avatar"
);
profileAvatarValidator.enableValidation();

//--------------------слушатели

profileEditButton.addEventListener("click", openPopupEditProfile);
cardAddButton.addEventListener("click", openPopupAddCard);
avatarEditButton.addEventListener("click", openPopupEditAvatar);
