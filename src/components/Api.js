
// класс для работы с api яндекс практикума
export class Api {

  constructor(apiConfig){

    this._token  = apiConfig.token,
    this._identifikator = apiConfig.identifikator
  }

  // получить данные о профиле с сервера
  getInfoUserForServer(){

    return fetch(`https://mesto.nomoreparties.co/v1/${this._identifikator}/users/me`, {
    headers: {
      authorization: this._token 
    }
  })
  .then(res => {
    if(res.ok){
      return res.json();
    }
    return Promise.reject('Ошибка запроса данных о пользователе с сервера');
    })
  }

  // изменить данные о профиле с сервера и загрузить на страницу сайта
  patchInfoUserForServer(name, work){

    return fetch(`https://mesto.nomoreparties.co/v1/${this._identifikator}/users/me`, {
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
    .then(res => {
      if(res.ok){
        return res.json();
      }
      return Promise.reject('Ошибка загрузки информации о пользователе на сервер');
    })
  }

  // изменить аватар
  patchAvatarForServer(avatar){

    return fetch(`https://mesto.nomoreparties.co/v1/${this._identifikator}/users/me/avatar `, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: avatar
      })
    })
    .then(res => {
      if(res.ok){
        return res.json();
      }
      return Promise.reject('Ошибка загрузки аватара на сервер');
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
    .then(res => {
      if(res.ok){
        return res.json();
      }
      return Promise.reject('Ошибка загрузки карточки на сервер');
    })
  }

  // удаление карточки
  deleteCardForServer(cardId){
    
    return fetch(`https://mesto.nomoreparties.co/v1/${this._identifikator}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token
      }
    })
    .then(res => {
      if(res.ok){
        this._popup = document.querySelector('#popup_dell-card')
        this._popup.classList.remove('popup_active'); 
        return res.json();
      }
      return Promise.reject('Ошибка удаления своей карточки с сервера');
    })
  } 

  //поставить лайк
  putLikeForServer(cardId){
    
    return fetch(`https://mesto.nomoreparties.co/v1/${this._identifikator}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {
        authorization: this._token
      }
    })
    .then(res => {
      if(res.ok){
        return res.json();
      }
      return Promise.reject('Ошибка не получилось поставить лайк');
    })
  } 

  //убрать лайк
  deleteLikeForServer(cardId){
    
    return fetch(`https://mesto.nomoreparties.co/v1/${this._identifikator}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: this._token
      }
    })
    .then(res => {
      if(res.ok){
        return res.json();
      }
      return Promise.reject('Ошибка не получилось убрать лайк');
    })
  } 


} 

  



