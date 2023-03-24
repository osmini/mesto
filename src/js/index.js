import {Card} from './Card.js';
import {Section} from './Section.js';
import {Popup} from './Popup.js';
import {PopupWithForm} from './PopupWithForm.js';
import {PopupWithImage} from './PopupWithImage.js';
import {UserInfo} from './UserInfo.js';
import {FormValidator} from './FormValidator.js';
import {initialCards, setings} from './date.js';
import './../pages/index.css';



const plases = document.querySelector('.plases');

const buttonOpenPopupProfile = document.querySelector('.profile-info__button-edit');
const buttonOpenPopupMesto = document.querySelector('.profile__button-add');

const formPopupProfile = document.forms['popup_profile'];

const nameInput = document.querySelector('#popup_name-profile');
const jobInput = document.querySelector('#popup_work-profile');

const info = {
  infoTitle: document.querySelector('.profile-info__title'),
  infoSubtitle: document.querySelector('.profile-info__subtitle')
};

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

// экземпляр изменения данных о пользователе 
const infoUser = new UserInfo(info);

// открыть попап для редактирования профиля
buttonOpenPopupProfile.addEventListener('click', function(){

  const textUser = infoUser.getUserInfo();
  nameInput.value = textUser.dateTitle;
  jobInput.value = textUser.dateSubtitle 
  popupProfile.open();
}); 

// изменить данные о профиле при отправки формы
formPopupProfile.addEventListener('submit', function(evt){ 

  evt.preventDefault(); 
  infoUser.setUserInfo();
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

const cardPlase = new PopupWithForm('#popup_mesto', {
  addPlase: (evt, placeTitle, placeLink) => {  

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
      cardPlase.close(evt);
    }
  }
});

cardPlase.setEventListeners(); 

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

