import {Popup} from './Popup.js';

// В методе open класса PopupWithForm нужно вставлять в попап картинку с src изображения и подписью к картинке.
export class PopupWithForm extends Popup{
  
  constructor(popup){
    super(popup);

    this._form = this._popup.querySelector('.popup__form');
  }

  // собирает данные всех полей формы.
  getInputValues(){

    const inputs = this._form.querySelectorAll('.popup__input');
    this.plaseInfo = {};

    inputs.forEach((input) => {
      this.plaseInfo[input.name] = input.value;
    })

    return this.plaseInfo;
  }

}
