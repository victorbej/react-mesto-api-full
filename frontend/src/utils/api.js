class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  _handleOriginalResponse(res) {
    if (!res.ok) {
      return Promise.reject(`Error: ${res.status}`);
    }
    return res.json();
  }

  getUserInfo() {
    return fetch(`${this._url}users/me`, {
      headers: this._headers
    })
      .then(res => this._handleOriginalResponse(res))
  }

  editUserInfo(data) {
    return fetch(`${this._url}users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
      .then(res => this._handleOriginalResponse(res))
  }

  editAvatar(avatar) {
    return fetch(`${this._url}users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar
      })
    })
      .then(res => this._handleOriginalResponse(res))
  }

  getInitialCards() {
    return fetch(`${this._url}cards`, {
      headers: this._headers
    })
      .then(res => this._handleOriginalResponse(res))
  }

  addPlaceCard(data) {
    return fetch(`${this._url}cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
      .then(res => this._handleOriginalResponse(res))
  }

  deletePlaceCard(card) {
    return fetch(`${this._url}cards/${card}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(res => this._handleOriginalResponse(res))
  }

  addLike(card) {
    return fetch(`${this._url}cards/likes/${card}`, {
      method: 'PUT',
      headers: this._headers
    })
      .then(res => this._handleOriginalResponse(res))
  }

  deleteLike(card) {
    return fetch(`${this._url}cards/likes/${card}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(res => this._handleOriginalResponse(res))
  }

  changeLikeCardStatus(card, isLiked) {
    if (isLiked) {
      return this.deleteLike(card);
    } else {
      return this.addLike(card);
    }
  }

}

const api = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-20/",
  headers: {
    "Content-Type": "application/json",
    authorization: "3b5720a2-0d91-4d09-b4f0-91da5b71591f",
  },
});

export default api;