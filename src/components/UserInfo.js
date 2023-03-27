
// класс отвечает только за блок профиля
export class UserInfo {

  constructor(info) {
    this._infoTitle = info.infoTitle,
    this._infoSubtitle = info.infoSubtitle
  }

  // возвращает объект с данными пользователя. Этот метод пригодится когда данные пользователя нужно будет подставить в форму при открытии.
  getUserInfo(){

    this.dateInfo = {
      dateTitle: this._infoTitle.textContent,
      dateSubtitle: this._infoSubtitle.textContent
    };

    return this.dateInfo;
  }

  //  принимает новые данные пользователя и добавляет их на страницу.
  setUserInfo(name, work){
    this._infoTitle.textContent = name;
    this._infoSubtitle.textContent = work;
  }
  
}
