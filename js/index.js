import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';
import {initialCards, setings} from './date.js';

(function () {
  const plases = document.querySelector('.plases');

  const buttonOpenPopupProfile = document.querySelector('.profile-info__button-edit');
  const buttonOpenPopupMesto = document.querySelector('.profile__button-add');

  const closeButtons = document.querySelectorAll('.popup__close-button');

  const popupProfile = document.querySelector('#popup_profile');
  const popupMesto = document.querySelector('#popup_mesto');
  const popupMestoImg = document.querySelector('#popup_img');

  const popupImg = popupMestoImg.querySelector('.popup__image');
  const popupCaption = popupMestoImg.querySelector('.popup__caption')

  const formPopupProfile = document.forms['popup_profile'];
  const formPopupPlace = document.forms['popup_place'];

  const nameInput = document.querySelector('#popup_name-profile');
  const jobInput = document.querySelector('#popup_work-profile');

  const infoTitle = document.querySelector('.profile-info__title');
  const infoSubtitle = document.querySelector('.profile-info__subtitle');

  const placeTitle = popupMesto.querySelector('#popup__name-place');
  const placeLink = popupMesto.querySelector('#popup__link-place');

  const validProfile = new FormValidator(setings, '#popup_form-profile');
  validProfile.enableValidation();
  const validMesto = new FormValidator(setings, '#popup_form-place');
  validMesto.enableValidation();

  function closeByEscape(evt) {
    if (evt.key === 'Escape') {
      const openedPopup = document.querySelector('.popup_active');
      closesPopup(openedPopup);
    }
  }

  function closeByСlick(evt) {
    if (evt.target.classList.contains('popup_active')){
      closesPopup(evt.target);
    }
  }

  function openPopup(popup) {
    if (popup == '#popup_profile'){
      nameInput.value =  infoTitle.textContent;
      jobInput.value = infoSubtitle.textContent
    }
    
    popup.classList.add('popup_active');
    document.addEventListener('keydown', closeByEscape); 
    document.addEventListener('mousedown', closeByСlick); 
  }

  function closesPopup(popup) {
    popup.classList.remove('popup_active');
    document.removeEventListener('keydown', closeByEscape);
    document.removeEventListener('mousedown', closeByСlick); 
  }

  // открыть и наполнить попап просмотра картинки места
  function handleCardClick(name, link) {
    popupImg.src = link;
    popupImg.alt = name;
    popupCaption.textContent = name;
    openPopup(popupMestoImg); 
  }
  
  // изменить профиль
  function changeProfile() {
    infoTitle.textContent = nameInput.value;
    infoSubtitle.textContent = jobInput.value;
  }

  // открыть попап для редактирования профиля
  buttonOpenPopupProfile.addEventListener('click', function(){ 
    openPopup(popupProfile); 

  }); 

  // изменить данные о профиле при отправки формы
  formPopupProfile.addEventListener('submit', function(evt){ 
    evt.preventDefault(); 
    changeProfile();
    closesPopup(popupProfile); 
  });


  // создать карточку
  function createCard(item) {
    const card = new Card(item, '#plases-card',  handleCardClick);
    // Создаём карточку и возвращаем наружу
    const cardElement = card.generateCard();
    return cardElement
  }

  // открыть попап для добавления карточки места
  buttonOpenPopupMesto.addEventListener('click', function(){ 
    validMesto.resetValidation();
    openPopup(popupMesto); 
  }); 

  closeButtons.forEach((button) => {
    // находим 1 раз ближайший к крестику попап 
    const popup = button.closest('.popup');
    // устанавливаем обработчик закрытия на крестик
    button.addEventListener('click', () => closesPopup(popup));
  });

  formPopupPlace.addEventListener('submit', function(evt){ 
    evt.preventDefault(); 

    if (placeTitle.value && placeLink.value){

      const newCard = [ 
        {
          name: placeTitle.value,
          link: placeLink.value
        }
      ];

      const cardElement = createCard(newCard[0]);
      // Добавляем в DOM 
      plases.prepend(cardElement); 

      closesPopup(popupMesto);
    }
    evt.target.reset();
    
  });

  // циклом добавляем карточки на страницу
  initialCards.forEach((item) => {

    const cardElement = createCard(item);
    // Добавляем в DOM
    plases.append(cardElement);

  }); 
  
})(); 

