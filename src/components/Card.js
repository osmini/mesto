export class Card {

  constructor(initialCards, templateSelector, {handleCardClick}) {
    this._name = initialCards.name;
    this._link = initialCards.link;

    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;

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
    this._likeButton.classList.toggle("plases-card__like_active");
  }

  // слушатель кнопки лайка
  _likeListeners() {
    this._likeButton.addEventListener('click', () => {
      this._likeActive();
    });  
  }

  // удалить карточку
  _dellCard(){
    this._element.remove();
  }

  // слушатель кнопки удалить карточку
  _dellCardListeners() {
    this._dellCardButton.addEventListener('click', () => {
      this._dellCard();
    });  
  }

  // наполнить попап место
  _setEventListener (){
    this._plasesCardImg.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  }

  //добавить слушатели обработчики
  _addListenersCard(){
    this._likeListeners(); // добавим обработчики кнопки лайк
    this._dellCardListeners(); // добавим обработчики кнопки удалить карточку
    this._setEventListener(); // добавим обработчики попап картинки
  }

  // заполнить карточку данными
  generateCard() {
    // Запишем разметку в приватное поле _element. 
    // Так у других элементов появится доступ к ней.
    this._element = this._getTemplate();
    this._likeButton = this._element.querySelector('.plases-card__like');
    this._dellCardButton = this._element.querySelector('.plases-card__del')
    this._plasesCardImg = this._element.querySelector('.plases-card__img');

    this._addListenersCard();

    // Добавим данные
    const buttonImg = this._element.querySelector('.plases-card__img');
    buttonImg.src = this._link;
    buttonImg.alt = this._name;
    this._element.querySelector('.plases-card__title').textContent = this._name;
  
    // Вернём элемент наружу
    return this._element;
  } 
}