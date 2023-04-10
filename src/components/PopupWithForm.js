import {Popup} from './Popup.js';

// В методе open класса PopupWithForm нужно вставлять в попап картинку с src изображения и подписью к картинке.
export class PopupWithForm extends Popup{
  
  constructor(popup, {submitHandler}){
    super(popup);
    this._form = this._popup.querySelector('.popup__form');
    this.inputs = this._form.querySelectorAll('.popup__input');
    this._submitHandler = submitHandler;
    this._buttonSubmitForm = this._popup.querySelector('.popup__button');
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
      this._submitHandler(evt, this._getInputValues());

      this._buttonSubmitForm.textContent = 'Сохранение...';
    });
    super.setEventListeners();
  }
}


