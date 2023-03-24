import {Popup} from './Popup.js';

// В методе open класса PopupWithImage нужно вставлять в попап картинку с src изображения и подписью к картинке.
export class PopupWithImage extends Popup{
  
  constructor(name, link, popup){
    super(popup);

    this._popupImg = document.querySelector('.popup__image');
    this._popupCaption = document.querySelector('.popup__caption');
    this._name = name;
    this._link = link;
  }

  // открыть попап
  open(){
    this._popupImg.src = this._link;
    this._popupImg.alt = this._name;
    this._popupCaption.textContent = this._name;
    this._popup.classList.add('popup_active');
  }

}