
export class Card {

  constructor(initialCards, templateSelector, {handleCardClick, likeCard, likeDelCard}) {
    this._name = initialCards.name;
    this._link = initialCards.link;
    this._liks = initialCards.likes.length;
    this._myLike = initialCards.likes,
    this._templateSelector = templateSelector;

    this._card = initialCards;
    this._handleCardClick = handleCardClick;
    this._likeCard = likeCard;
    this._likeDelCard = likeDelCard;
    this._popup = document.querySelector('#popup_dell-card');
    
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

    if (this._likeButton.classList.contains('plases-card__like_active')){
      this._likeButton.classList.remove('plases-card__like_active');
      this._likeDelCard();
    } else{
      this._likeButton.classList.add('plases-card__like_active');
      this._likeCard();
    }
  }

  // слушатель кнопки лайка
  _likeListeners() {
    this._likeButton.addEventListener('click', () => {
      this._likeActive();
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
    this._setEventListener(); // добавим обработчики попап картинки
  }

  // проверить карточка наша или нет
  examinationMyCard(myId){
    //проверка что карточка наша 
    if(this._card.hasOwnProperty('owner')){
      if (myId == this._card['owner']['_id']){
        this.myCardId = this._card['_id']
        return this.myCardId;
      } else {
        this._element.querySelector('.plases-card__del').classList.add('plases-card__del_opasiti');
      }
    }
  }

  // заполнить карточку данными
  generateCard(myId) {
    // Запишем разметку в приватное поле _element. 
    // Так у других элементов появится доступ к ней.
    this._element = this._getTemplate();
    this._likeButton = this._element.querySelector('.plases-card__like');
    this._dellCardButton = this._element.querySelector('.plases-card__del')

    this._plasesCardImg = this._element.querySelector('.plases-card__img');
    this._countLiks = this._element.querySelector('.plases-card__like-count');

    // если мы лайкали карточку то будет сердечко активное
    if (this._myLike){
      this._myLike.forEach(element => {
        if (element['_id'] == myId){
          this._likeButton.classList.add('plases-card__like_active');
        }
      });
    };

    this._addListenersCard();

    // Добавим данные
    const buttonImg = this._element.querySelector('.plases-card__img');
    buttonImg.src = this._link;
    buttonImg.alt = this._name;
    this._countLiks.textContent = this._liks;

    this._element.querySelector('.plases-card__title').textContent = this._name;

    // Вернём элемент наружу
    return this._element;
  } 
  
}