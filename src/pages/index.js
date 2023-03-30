import {Card} from '../components/Card.js';
import {Section} from '../components/Section.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import {PopupWithImage} from '../components/PopupWithImage.js';
import {UserInfo} from '../components/UserInfo.js';
import {FormValidator} from '../components/FormValidator.js';
import {initialCards, setings, plases, buttonOpenPopupProfile, buttonOpenPopupMesto, nameInput, jobInput, info} from '../date/date.js';
import './../pages/index.css';

// экземпляры валидации форм
const validProfile = new FormValidator(setings, '#popup_form-profile');
validProfile.enableValidation();
const validMesto = new FormValidator(setings, '#popup_form-place');
validMesto.enableValidation();

// экземпляр изменения данных о пользователе 
const infoUser = new UserInfo(info);

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

    // отрисовка карточек через взаимодействие классов
    const newCard = new Section({
      items: newCardDate,
      render: (messageItem) => {
          const cardElement = createCard(messageItem);
          // Добавляем в DOM
          newCard.prependItem(cardElement);
        }
      },
      '.plases'
    ); 

    newCard.renderItems(); 

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
const card = new Section({
  items: initialCards,
  render: (messageItem) => {
      const cardElement = createCard(messageItem);
      // Добавляем в DOM
      card.addItem(cardElement);
    }
  },
  '.plases'
); 

card.renderItems(); 