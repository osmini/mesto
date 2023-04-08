import {Popup} from './Popup.js';

// В методе open класса PopupWithImage нужно вставлять в попап картинку с src изображения и подписью к картинке.
export class PopupWithImage extends Popup{
  
  constructor(popup){
    super(popup);

    this._popupImg = document.querySelector('.popup__image');
    this._popupCaption = document.querySelector('.popup__caption');
  }

  // открыть попап
  open(name, link){
    this._popupImg.src = link;
    this._popupImg.alt = name;
    this._popupCaption.textContent = name;
    super.open();
  }

}