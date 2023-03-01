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

  const formPopupProfile = document.forms['popup_profile'];
  const formPopupPlace = document.forms['popup_place'];

  const nameInput = document.querySelector('#popup_name-profile');
  const jobInput = document.querySelector('#popup_work-profile');

  const infoTitle = document.querySelector('.profile-info__title');
  const infoSubtitle = document.querySelector('.profile-info__subtitle');

  const placeTitle = popupMesto.querySelector('#popup__name-place');
  const placeLink = popupMesto.querySelector('#popup__link-place');

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

    popup.classList.add('popup_active');
    document.addEventListener('keydown', closeByEscape); 
    document.addEventListener('mousedown', closeByСlick); 
  }

  function closesPopup(popup) {

    popup.classList.remove('popup_active');
    document.removeEventListener('keydown', closeByEscape);
    document.removeEventListener('mousedown', closeByСlick); 
  }

  function changeProfile() {

    infoTitle.textContent = nameInput.value;
    infoSubtitle.textContent = jobInput.value;
  }

  // открыть попап для редактирования профиля
  buttonOpenPopupProfile.addEventListener('click', function(){ 
    openPopup(popupProfile); 
    const validProfile = new FormValidator(setings, '#popup_form-profile');
    validProfile.enableValidation();

  }); 

  // открыть попап для добавления карточки места
  buttonOpenPopupMesto.addEventListener('click', function(){ 
    const validMesto = new FormValidator(setings, '#popup_form-place');
    validMesto.enableValidation();
    openPopup(popupMesto); 
  }); 

  closeButtons.forEach((button) => {
    // находим 1 раз ближайший к крестику попап 
    const popup = button.closest('.popup');
    // устанавливаем обработчик закрытия на крестик
    button.addEventListener('click', () => closesPopup(popup));
  });

  formPopupProfile.addEventListener('submit', function(evt){ 
    evt.preventDefault(); 
    changeProfile();
    closesPopup(popupProfile); 
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

      // Создадим экземпляр карточки
      const card = new Card(newCard[0], '#plases-card');
      // Создаём карточку и возвращаем наружу
      const cardElement = card.generateCard();

      // Добавляем в DOM
      plases.prepend(cardElement);
      closesPopup(popupMesto);
    }
    evt.target.reset();
    
  });

  // циклом добавляем карточки на страницу
  initialCards.forEach((item) => {
    // Создадим экземпляр карточки
    const card = new Card(item, '#plases-card');
    // Создаём карточку и возвращаем наружу
    const cardElement = card.generateCard();

    // Добавляем в DOM
    plases.append(cardElement);
  }); 
})(); 

