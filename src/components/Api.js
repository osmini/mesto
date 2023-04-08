
// класс для работы с api яндекс практикума
export class Api {

  constructor(apiConfig){

    this._token  = apiConfig.token,
    this._identifikator = apiConfig.identifikator

    this._nameUser = document.querySelector('.profile-info__title'),
    this._aboutUser = document.querySelector('.profile-info__subtitle'),
    this._avatarUser = document.querySelector('.profile__avatar'),
    this._dellCard = document.querySelector('.popup__button-dell')
  }

  // получить данные о профиле с сервера и загрузить на страницу сайта
  getInfoUserForServer(){

    fetch(`https://mesto.nomoreparties.co/v1/${this._identifikator}/users/me`, {
      headers: {
        authorization: this._token 
      }
    })
    .then(res => res.json())
    .then((result) => {
      this._nameUser.textContent =  result.name,
      this._aboutUser.textContent = result.about,
      this._avatarUser.src = result.avatar
    })
  }

  // изменить данные о профиле с сервера и загрузить на страницу сайта
  patchInfoUserForServer(name, work){

    fetch(`https://mesto.nomoreparties.co/v1/${this._identifikator}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        about: work
      })
    })
    .catch(err => {
      return console.log (`${err} Ошибка загрузки информации о пользователе на сервер`);
    })
  }

  // изменить аватар
  patchAvatarForServer(avatar){

    fetch(`https://mesto.nomoreparties.co/v1/${this._identifikator}/users/me/avatar `, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: avatar
      })
    })
    .catch(err => {
      return console.log (`${err} Ошибка загрузки аватара на сервер`);
    })
  }

  // получить карточки с сервера
  getCardsForServer(){
    
    return fetch(`https://mesto.nomoreparties.co/v1/${this._identifikator}/cards`, {
        headers: {
          authorization: this._token 
        }
      })
      .then(res => {
        if(res.ok){
          return res.json();
        }
        return Promise.reject('Ошибка запроса карточек с сервера');
      })
  }

  // добавить новую карточку на сервер
  postCardsForServer(newCardDate){
    
    return fetch(`https://mesto.nomoreparties.co/v1/${this._identifikator}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: newCardDate.name,
        link: newCardDate.link
      })
    })
    .catch(err => {
        return console.log (`${err} Ошибка загрузки карточки на сервер`);
      })
  } 

  // удаление карточки
  deleteCardForServer(cardId){
    
    fetch(`https://mesto.nomoreparties.co/v1/${this._identifikator}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token
      }
    })
    .catch(err => {
        return console.log (`${err} Ошибка удаления своей карточки с сервера`);
      })
  } 

  //поставить лайк
  putLikeForServer(cardId){
    
    fetch(`https://mesto.nomoreparties.co/v1/${this._identifikator}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {
        authorization: this._token
      }
    })
    .catch(err => {
        return console.log (`${err} Ошибка не получилось поставить лайк`);
      })
  } 

  //убрать лайк
  deleteLikeForServer(cardId){
    
    fetch(`https://mesto.nomoreparties.co/v1/${this._identifikator}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: this._token
      }
    })
    .catch(err => {
        return console.log (`${err} Ошибка не получилось убрать лайк`);
      })
  } 


} 

  



