import {Popup} from './Popup.js';

//  класс PopupWithForm для работы с формами в попапах
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

  //закрыть попап
  close(){
    super.close();
    this.inputs.forEach((input) => {
      if (input.name){
        input.name = '';
      }
    })
  }

  // смена надписи кнопки при загрузки данных на сервер
  renderLoading(loading){
    if(loading){
      this._buttonSubmitForm.textContent = 'Сохранение...';
    } else {
      this._buttonSubmitForm.textContent = 'Сохранили';
    }
  };

  // слушатель клика иконки закрытия попапа
  setEventListeners(){

    this._form.addEventListener('submit', (evt) => {
      this._submitHandler(evt, this._getInputValues());
    });

    super.setEventListeners();
  }
}


