import {Popup} from './Popup.js';

// В методе open класса PopupWithForm нужно вставлять в попап картинку с src изображения и подписью к картинке.
export class PopupAvatar extends Popup{
  
  constructor(popup, {appAvatar}){
    super(popup);
    this._edditButtonAvatar = document.querySelector('.profile__avatar-button');
    this._form = this._popup.querySelector('.popup__form');
    this._input = this._form.querySelector('.popup__input');
    this._buttonForm = this._form.querySelector('.popup__button');
    this._appAvatar = appAvatar;
  }

  // слушатель клика иконки закрытия попапа
  setEventListeners(){

    this._edditButtonAvatar.addEventListener('click', ()=> {
      super.open();
      this._form.addEventListener('submit', (evt) => {
        this._appAvatar(evt, this._getAvatar())
        super.close();
      });
      super.setEventListeners();
      this._dellInpytAvatar()
    })
  }

  // получить ссылку на аватар
  _getAvatar(){
      return this._input.value;
    }

  // очистить форму
  _dellInpytAvatar(){
    this._input.value = '';
    this._buttonForm.disabled = true;
  }

}