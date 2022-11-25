import { api } from "../pages/index";

export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrlUser = `${baseUrl}/users/me`;
    this._baseUrlCards = `${baseUrl}/cards`;
    this._headers = headers;
  }

  _checkRespondStatus(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getProfile() {
    return fetch(this._baseUrlUser, {
      headers: this._headers,
    }).then((res) => this._checkRespondStatus(res));
  }

  editProfile(data) {
    return fetch(this._baseUrlUser, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then((res) => _checkRespondStatus(res));
  }

  editAvatar(data) {
    return fetch(`${this._baseUrlUser}/avatar`, {
      method: "PATCH",
      headers: this._headers,

      body: JSON.stringify({
        avatar: data,
      }),
    }).then((res) => this._checkRespondStatus(res));
  }

  getInitialCards() {
    return fetch(this._baseUrlCards, {
      headers: this._headers,
    }).then((res) => this._checkRespondStatus(res));
  }

  addNewCard(data) {
    return fetch(this._baseUrlCards, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then((res) => this._checkRespondStatus(res));
  }

  removeCard(cardId) {
    return fetch(`${this._baseUrlCards}/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => this._checkRespondStatus(res));
  }

  addLike(cardId, isLiked) {
    if (isLiked.length < 2) {
      return fetch(`${this._baseUrlCards}/${cardId}/likes/`, {
        method: "PUT",
        headers: this._headers,
        body: JSON.stringify(
          api.getProfile().then((data) => {
            data;
          })
        ),
      }).then((res) => this._checkRespondStatus(res));
    }
  }

  removeLike(cardId, isLiked) {
    if (isLiked.length > 1) {
      return fetch(`${this._baseUrlCards}/${cardId}/likes/`, {
        method: "DELETE",
        headers: this._headers,
        body: JSON.stringify(
          api.getProfile().then((data) => {
            data;
          })
        ),
      }).then((res) => this._checkRespondStatus(res));
    }
  }
}
