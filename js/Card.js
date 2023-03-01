export class Card {

  constructor(initialCards, templateSelector) {
    this._name = initialCards.name;
    this._link = initialCards.link;
    this._templateSelector = templateSelector;
  }

  // получить шаблон карточки
  _getTemplate() {

    const cardTemplate = document
    .querySelector(this._templateSelector)
    .content
    .querySelector('.plases-card')
    .cloneNode(true);

    return cardTemplate;
  }

  // сделать кнопку лайка активной
  _likeActive(){
    this._element.querySelector('.plases-card__like').classList.toggle("plases-card__like_active");
  }

  // слушатель кнопки лайка
  _likeListeners() {
    this._element.querySelector('.plases-card__like').addEventListener('click', () => {
      this._likeActive();
    });  
  }

  // удалить карточку
  _dellCard(){
    this._element.closest('.plases-card').remove();
  }

  // слушатель кнопки удалить карточку
  _dellCardListeners() {
    this._element.querySelector('.plases-card__del').addEventListener('click', () => {
      this._dellCard();
    });  
  }

  // наполнить попап место
  _сardPopap(){
    const popupImg = document.querySelector('.popup__image');
    popupImg.src = this._link;
    popupImg.alt = this._name;
    document.querySelector('.popup__caption').textContent = this._name;
    document.querySelector('#popup_img').classList.add('popup_active');
  }

  // слушатель открыть просмотр карточки места в попапе
  _сardPopapListeners() {
    this._element.querySelector('.plases-card__img').addEventListener('click', () => {
      this._сardPopap();
    });  
  }

  // заполнить карточку данными
  generateCard() {
    // Запишем разметку в приватное поле _element. 
    // Так у других элементов появится доступ к ней.
    this._element = this._getTemplate();
    this._likeListeners(); // добавим обработчики кнопки лайк
    this._dellCardListeners(); // добавим обработчики кнопки удалить карточку
    this._сardPopapListeners(); // добавим обработчики попап картинки

    // Добавим данные
    const buttonImg = this._element.querySelector('.plases-card__img');
    buttonImg.src = this._link;
    buttonImg.alt = this._name;
    this._element.querySelector('.plases-card__title').textContent = this._name;
  
    // Вернём элемент наружу
    return this._element;
  } 
}