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

