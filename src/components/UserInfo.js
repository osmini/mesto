// класс отвечает только за блок профиля
export class UserInfo {

  constructor() {
    this._nameUser = document.querySelector('.profile-info__title'),
    this._aboutUser = document.querySelector('.profile-info__subtitle'),
    this._avatarUser = document.querySelector('.profile__avatar')

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
  setUserInfo(name, work, avatar){
    if (name){
      this._nameUser.textContent = name;
    }
    if (work){
      this._aboutUser.textContent = work;
    }
    if (avatar){
      this._avatarUser.src = avatar;
    }
  }
}

