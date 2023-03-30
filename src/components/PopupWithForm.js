import {Popup} from './Popup.js';

// В методе open класса PopupWithForm нужно вставлять в попап картинку с src изображения и подписью к картинке.
export class PopupWithForm extends Popup{
  
  constructor(popup,  {appDate}){
    super(popup);
    this._form = this._popup.querySelector('.popup__form');
    this.inputs = this._form.querySelectorAll('.popup__input');
    this._appDate = appDate;
  }

  // собирает данные всех полей формы.
  _getInputValues(){

    this.plaseInfo = {};

    this.inputs.forEach((input) => {
      this.plaseInfo[input.name] = input.value;
    })

    return this.plaseInfo;
  }

  // слушатель клика иконки закрытия попапа
  setEventListeners(){
    this._form.addEventListener('submit', (evt) => {
      this._appDate(evt, this._getInputValues())
    });
    super.setEventListeners();
  }

}
