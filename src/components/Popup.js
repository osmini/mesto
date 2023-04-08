// отвечает за открытие и закрытие попапа
export class Popup{

  constructor(popup){
    this._popup = document.querySelector(popup);
    this._closeButtons = this._popup.querySelector(`${popup}-close`);
    this._escClose = this._handleEscClose.bind(this);
  }

  // закрытия попапа клавишей Esc и клик по путому месту
  _handleEscClose(evt){
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  // закрытия попапа кликом на пустое место
  _handleClikClose(evt){
    if (evt.target.classList.contains('popup_active')){
      this.close();
    }
  }

  // открыть попап
  open(){
    this._popup.classList.add('popup_active');
    document.addEventListener('keydown', this._escClose);
  }

  //закрыть попап
  close(){
    this._popup.classList.remove('popup_active');
    document.removeEventListener('keydown', this._escClose);
  }

  // слушатель клика иконки закрытия попапа
  setEventListeners(){
    this._closeButtons.addEventListener('click', () => this.close());
    this._popup.addEventListener('mousedown', (evt) => this._handleClikClose(evt));
  }

}