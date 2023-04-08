
// класс отвечает только за блок профиля
export class UserInfo {

  constructor(api) {
    this._toket = api.token,
    this._identifikator = api.identifikator,
    this._nameUser = document.querySelector('.profile-info__title'),
    this._aboutUser = document.querySelector('.profile-info__subtitle'),
    this._avatarUser = document.querySelector('.profile__avatar')

  }

  // получить данные о профиле с сервера и загрузить на страницу сайта
  getInfoUserForServer(){
    fetch(`https://mesto.nomoreparties.co/v1/${this._identifikator}/users/me `, {
      headers: {
        authorization: this._toket
      }
    })
    .then(res => res.json())
    .then((result) => {
      this._nameUser.textContent =  result.name,
      this._aboutUser.textContent = result.about,
      this._avatarUser.src = result.avatar
    })
  }


  // возвращает объект с данными пользователя. Этот метод пригодится когда данные пользователя нужно будет подставить в форму при открытии.
  getUserInfo(){

    this.dateInfo = {
      dateTitle: this._nameUser.textContent,
      dateSubtitle: this._aboutUser.textContent
    };

    return this.dateInfo;
  }

  //  принимает новые данные пользователя и добавляет их на страницу.
  setUserInfo(name, work){
    this._nameUser.textContent = name;
    this._aboutUser.textContent = work;
  }

  
}

