import {Card} from '../components/Card.js';
import {Section} from '../components/Section.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import {PopupWithImage} from '../components/PopupWithImage.js';
import {UserInfo} from '../components/UserInfo.js';
import {FormValidator} from '../components/FormValidator.js';
import {initialCards, setings, plases, buttonOpenPopupProfile, buttonOpenPopupMesto, formPopupProfile, formPopupMesto, nameInput, jobInput, info} from '../date/date.js';
import './../pages/index.css';

// экземпляры валидации форм
const validProfile = new FormValidator(setings, '#popup_form-profile');
validProfile.enableValidation();
const validMesto = new FormValidator(setings, '#popup_form-place');
validMesto.enableValidation();

// экземпляры попапов
const popupProfile = new PopupWithForm('#popup_profile');
popupProfile.setEventListeners();
const popupMesto = new PopupWithForm('#popup_mesto');
popupMesto.setEventListeners();
const popupMestoImg = new PopupWithImage('#popup_img');
popupMestoImg.setEventListeners();

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

  const plaseInfo = popupProfile.getInputValues();

  const name = plaseInfo.popup_name; 
  const work = plaseInfo.popup_work;

  infoUser.setUserInfo(name, work);
  popupProfile.close();
});


// открыть попап для добавления карточки места
buttonOpenPopupMesto.addEventListener('click', function(){ 
  validMesto.resetValidation();
  popupMesto.open();
}); 


// добавить новую карточку места
formPopupMesto.addEventListener('submit', function(evt){ 

  evt.preventDefault(); 
  const plaseInfo = popupMesto.getInputValues();

  const newCard = [ 
    {
      name: plaseInfo.popup_name,
      link: plaseInfo.popup_link
    }
  ];

  const cardElement = createCard(newCard[0]);
  // Добавляем в DOM 
  plases.prepend(cardElement);
  popupMesto.close();
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
const addCard = new Section({
  items: initialCards,
  render: (messageItem) => {
      const cardElement = createCard(messageItem);
      // Добавляем в DOM
      addCard.addItem(cardElement);
    }
  },
  '.plases'
); 

addCard.renderItems(); 

