import {Card} from './Card.js';
import {Section} from './Section.js';
import {Popup, PopupWithImage} from './Popup.js';
import {FormValidator} from './FormValidator.js';
import {initialCards, setings} from './date.js';


const plases = document.querySelector('.plases');

const buttonOpenPopupProfile = document.querySelector('.profile-info__button-edit');
const buttonOpenPopupMesto = document.querySelector('.profile__button-add');

//const popupImg = document.querySelector('.popup__image');
//const popupCaption = document.querySelector('.popup__caption')

const formPopupProfile = document.forms['popup_profile'];
const formPopupPlace = document.forms['popup_place'];

const nameInput = document.querySelector('#popup_name-profile');
const jobInput = document.querySelector('#popup_work-profile');

const infoTitle = document.querySelector('.profile-info__title');
const infoSubtitle = document.querySelector('.profile-info__subtitle');

const placeTitle = document.querySelector('#popup__name-place');
const placeLink = document.querySelector('#popup__link-place');

// экземпляры валидации форм
const validProfile = new FormValidator(setings, '#popup_form-profile');
validProfile.enableValidation();
const validMesto = new FormValidator(setings, '#popup_form-place');
validMesto.enableValidation();

// экземпляры попапов
const popupProfile = new Popup('#popup_profile');
popupProfile.setEventListeners();
const popupMesto = new Popup('#popup_mesto');
popupMesto.setEventListeners();

// изменить профиль
function changeProfile() {
  infoTitle.textContent = nameInput.value;
  infoSubtitle.textContent = jobInput.value;
}

// открыть попап для редактирования профиля
buttonOpenPopupProfile.addEventListener('click', function(){ 
  nameInput.value =  infoTitle.textContent;
  jobInput.value = infoSubtitle.textContent 
  popupProfile.open();
}); 

// изменить данные о профиле при отправки формы
formPopupProfile.addEventListener('submit', function(evt){ 
  evt.preventDefault(); 
  changeProfile();
  popupProfile.close();
});

// создать карточку
function createCard(item) {
  const card = new Card(item, '#plases-card',  {
    handleCardClick: (name, link) => {  
      const popupMestoImg = new PopupWithImage(name, link, '#popup_img');
      popupMestoImg.open(); 
      popupMestoImg.setEventListeners(); 
      } 
    }
  );
  
  // Создаём карточку и возвращаем наружу
  const cardElement = card.generateCard();
  return cardElement
}

// открыть попап для добавления карточки места
buttonOpenPopupMesto.addEventListener('click', function(){ 
  validMesto.resetValidation();
  popupMesto.open();
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

    popupMesto.close();
  }
  evt.target.reset();
  
});

// отрисовка карточек через взаимодействие классов
const addCard = new Section({
  items: initialCards,
  render: (messageItem) => {
      const cardElement = createCard(messageItem);
      // Добавляем в DOM
      addCard.addItem(cardElement);
    }
  },
  plases
); 

addCard.renderItems(); 

