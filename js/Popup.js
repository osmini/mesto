// отвечает за открытие и закрытие попапа
export class Popup{

  constructor(popup){
    this._popup = document.querySelector(popup);
    this._closeButtons = this._popup.querySelector(`${popup}-close`);
  }

  // открыть попап
  open(){
    this._popup.classList.add('popup_active');
  }

  //закрыть попап
  close(){
    this._popup.classList.remove('popup_active');
  }

  // закрытия попапа клавишей Esc и клик по путому месту
  _handleEscClose(evt){
    if (evt.key === 'Escape') {
      this.close();
    }
    if (evt.target.classList.contains('popup_active')){
      this.close();
    }
  }

  // слушатель клика иконки закрытия попапа
  setEventListeners(){
    this._closeButtons.addEventListener('click', () => this.close());
    document.addEventListener('keydown', (evt) => this._handleEscClose(evt));
    document.addEventListener('mousedown', (evt) => this._handleEscClose(evt));
  }
}


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

