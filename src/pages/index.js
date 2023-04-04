import {Card} from '../components/Card.js';
import {Section} from '../components/Section.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import {PopupWithImage} from '../components/PopupWithImage.js';
import {UserInfo} from '../components/UserInfo.js';
import {FormValidator} from '../components/FormValidator.js';
import {initialCards, setings, buttonOpenPopupProfile, buttonOpenPopupMesto, nameInput, jobInput, api} from '../date/date.js';
import './../pages/index.css';

// экземпляры валидации форм
const validProfile = new FormValidator(setings, '#popup_form-profile');
validProfile.enableValidation();
const validMesto = new FormValidator(setings, '#popup_form-place');
validMesto.enableValidation();

// экземпляр изменения данных о пользователе 
const infoUser = new UserInfo(api);
infoUser.getInfoUserForServer();

// попап изменения информации о пользователе
const popupProfile = new PopupWithForm('#popup_profile',  {
  appDate: (evt, dateProfile) => { 

    console.log(dateProfile);
  
    evt.preventDefault(); 
  
    const plaseInfo = dateProfile;
    const name = plaseInfo.popup_name; 
    const work = plaseInfo.popup_work;
  
    infoUser.setUserInfo(name, work);
    popupProfile.close();
    
    }
  }
);

popupProfile.setEventListeners();

// попап добавления карточки
const popupMesto = new PopupWithForm('#popup_mesto', {
  appDate: (evt, dateProfile) => { 

    evt.preventDefault(); 
    const plaseInfo = dateProfile;
  
    const newCardDate = [ 
      {
        name: plaseInfo.popup_name,
        link: plaseInfo.popup_link
      }
    ];

    const cardElement = createCard(newCardDate[0]);
    cards.prependItem(cardElement);
    popupMesto.close();

    }
  }
);

popupMesto.setEventListeners();

// попап просмотра изображения большой картинкой
const popupMestoImg = new PopupWithImage('#popup_img');
popupMestoImg.setEventListeners();

// открыть попап для редактирования профиля
buttonOpenPopupProfile.addEventListener('click', function(){

  const textUser = infoUser.getUserInfo();
  nameInput.value = textUser.dateTitle;
  jobInput.value = textUser.dateSubtitle 
  popupProfile.open();
}); 

// открыть попап для добавления карточки места
buttonOpenPopupMesto.addEventListener('click', function(){ 
  validMesto.resetValidation();
  popupMesto.open();
}); 

// создать карточку
function createCard(item) {
  const card = new Card(item, '#plases-card',  {
    handleCardClick: (name, link) => {  
      popupMestoImg.open(name, link); 
      } 
    }
  );
  
  // Создаём карточку и возвращаем наружу
  const cardElement = card.generateCard();
  return cardElement
}

// отрисовка карточек через взаимодействие классов
const cards = new Section({
  items: initialCards,
  render: (messageItem) => {
      const cardElement = createCard(messageItem);
      // Добавляем в DOM
      cards.addItem(cardElement);
    }
  },
  '.plases'
); 

cards.renderItems(); 


// API запрос к карточкам 
fetch(`https://mesto.nomoreparties.co/v1/${api.identifikator}/cards`, {
  headers: {
    authorization: api.token
  }
})
  .then(res => res.json())
  .then((result) => {
    console.log(result);
  }); 


  // API запрос о пользователе 
/*fetch(`https://mesto.nomoreparties.co/v1/${api.identifikator}/users/me `, {
  headers: {
    authorization: api.token
  }
})
  .then(res => res.json())
  .then((result) => {
    console.log(result);
  }); */