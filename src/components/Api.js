import { data } from "autoprefixer";
import { userData } from "../pages/index.js"

class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrlUser = `${baseUrl}/users/me`;
    this._baseUrlCards = `${baseUrl}/cards`;
    this._headers = headers;
  }

  getProfile() {
    return fetch(this._baseUrlUser, {
      headers: this._headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getId() {
    return fetch(this._baseUrlUser, {
      headers: this._headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then((data) => {
        return data._id;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  editProfile(data) {
    return fetch(this._baseUrlUser, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((data) => {
      userData.setUserInfo(data.name, data.about, data.avatar)
    })
    .catch((err) => {
      console.log(err);
    });
  }

  editAvatar(data) {
    return fetch(`${this._baseUrlUser}/avatar`, {
      method: "PATCH",
      headers: this._headers,

      body: JSON.stringify({
        avatar: data,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((data) => {
      userData.setUserInfo(data.name, data.about, data.avatar)
    })
    .catch((err) => {
      console.log(err);
    });
  }

  getInitialCards() {
    return fetch(this._baseUrlCards, {
      headers: this._headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  addNewCard(data) {
    return fetch(this._baseUrlCards, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then((res) => {
      if (res.ok) {
        window.location.reload();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  removeCard(cardId) {
    return fetch(`${this._baseUrlCards}/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  toggleLike(cardId, isLiked) {
    if (isLiked.length < 2) {
      return fetch(`${this._baseUrlCards}/${cardId}/likes/`, {
        method: "PUT",
        headers: this._headers,
        body: JSON.stringify(
          api.getProfile().then((data) => {
            data;
          })
        ),
      });
    } else {
      return fetch(`${this._baseUrlCards}/${cardId}/likes/`, {
        method: "DELETE",
        headers: this._headers,
        body: JSON.stringify(
          api.getProfile().then((data) => {
            data;
          })
        ),
      }).then((res) => res.json());
    }
  }
}

export const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-54",
  headers: {
    authorization: "b4cc6e60-7c2a-4c93-961f-3d990169c3ad",
    "Content-Type": "application/json",
  },
});
