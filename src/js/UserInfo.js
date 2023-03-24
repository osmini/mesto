
// класс который отвечает за отрисовку элементов на странице
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
  setUserInfo(){
    this._infoTitle.textContent = document.querySelector('#popup_name-profile').value;
    this._infoSubtitle.textContent = document.querySelector('#popup_work-profile').value;
  }
  
}
