import {Popup} from './Popup.js';

// попап подтвержения ужаления своей карточки
export class PopupConfirmation extends Popup{
  
  constructor(popup, {dellMyCards}){
    super(popup);
    this._dellCardSoglasie = this._popup.querySelector('.popup__button-dell');
    this._dellMyCards = dellMyCards
  }

  // слушатель клика иконки закрытия попапа
  setEventListeners(cardElement, cardId){

    this._dellButtonCard = cardElement.querySelector('.plases-card__del');

    if (this._dellButtonCard){
      this._dellButtonCard.addEventListener('click', ()=> {
        console.log(this._dellButtonCard);
        super.open();
        super.setEventListeners();

        this._dellCardSoglasie.addEventListener('click', ()=> {
          this._dellMyCards(cardId);
          cardElement.remove();
        })
      });
    }
  }
}
