import {Popup} from './Popup.js';

// В методе open класса PopupWithForm нужно вставлять в попап картинку с src изображения и подписью к картинке.
export class PopupConfirmation extends Popup{
  
  constructor(popup, cardElement, {dellMyCards}){
    super(popup);
    this._dellButtonCard = cardElement.querySelector('.plases-card__del');
    this._dellCardSoglasie = this._popup.querySelector('.popup__button-dell');
    this._cardElement = cardElement
    this._dellMyCards = dellMyCards;
  }


  close(){
    super.close();
  }

  // слушатель клика иконки закрытия попапа
  setEventListeners(){

    if (this._dellButtonCard){
      this._dellButtonCard.addEventListener('click', ()=> {
        super.open();
        super.setEventListeners();

        this._dellCardSoglasie.addEventListener('click', ()=> {
          this._dellMyCards();
          this._cardElement.remove();
        })
      });
    }
  }
}
