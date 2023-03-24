import {Popup} from './Popup.js';

// В методе open класса PopupWithForm нужно вставлять в попап картинку с src изображения и подписью к картинке.
export class PopupWithForm extends Popup{
  
  constructor(popup, {addPlase}){
    super(popup);
    this._addPlase = addPlase; 

    this._form = document.forms['popup_place'];
  }

  // собирает данные всех полей формы.
  _getInputValues(){
    this.plaseInfo = {
      placeTitle: document.querySelector('#popup__name-place'),
      placeLink: document.querySelector('#popup__link-place')
    }

    return this.plaseInfo;
  }

  // слушатель клика иконки закрытия попапа
  setEventListeners(){

    this._closeButtons.addEventListener('click', () => this.close());
    this._form.addEventListener('keydown', (evt) => this._handleEscClose(evt));
    this._form.addEventListener('mousedown', (evt) => this._handleEscClose(evt));

    this.datePlase = this._getInputValues();

    this._form.addEventListener('submit', (evt) => this._addPlase(evt, this.datePlase.placeTitle, this.datePlase.placeLink));
  }

  //закрыть попап
  close(evt){
    this._popup.classList.remove('popup_active');
    evt.target.reset();
  }
}
