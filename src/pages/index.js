import {Card} from '../components/Card.js';
import {Section} from '../components/Section.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import {PopupWithImage} from '../components/PopupWithImage.js';
import {PopupDellCard} from '../components/PopupDellCard.js';
import {PopupAvatar} from '../components/PopupAvatar.js';
import {Api} from '../components/Api.js';
import {UserInfo} from '../components/UserInfo.js';
import {FormValidator} from '../components/FormValidator.js';
import {setings, apiConfig, buttonOpenPopupProfile, buttonOpenPopupMesto, nameInput, jobInput, info} from '../date/date.js';
import './../pages/index.css';

// экземпляры валидации форм
const validProfile = new FormValidator(setings, '#popup_form-profile');
validProfile.enableValidation();
const validMesto = new FormValidator(setings, '#popup_form-place');
validMesto.enableValidation();
const validAvatar = new FormValidator(setings, '#popup_form-avatar');
validAvatar.enableValidation();

// ари яндекс
const apiYandex =  new Api(apiConfig);

// отрисовка на странице пользователя с сервера
apiYandex.getInfoUserForServer();

// экземпляр изменения данных о пользователе 
const infoUser = new UserInfo(info);

// экземпляр изменения аватара
const popupAvatar = new PopupAvatar('#popup_avatar', {
  appAvatar: (evt, avatar) =>{
    evt.preventDefault(); 
    apiYandex.patchAvatarForServer(avatar);
  }
});

popupAvatar.setEventListeners();


// попап изменения информации о пользователе
const popupProfile = new PopupWithForm('#popup_profile',  {
  appDate: (evt, dateProfile) => { 
  
    evt.preventDefault(); 
  
    const plaseInfo = dateProfile;
    const name = plaseInfo.popup_name; 
    const work = plaseInfo.popup_work;
  
    apiYandex.patchInfoUserForServer(name, work)
    infoUser.setUserInfo(name, work);
    popupProfile.close();
    
    }
  }
);

popupProfile.setEventListeners();

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


// отрисовка карточек с сервера
apiYandex.getCardsForServer()
  .then(res =>{

    // создать карточку
    function createCard(item) {
      const card = new Card(item, '#plases-card',  {
        handleCardClick: ( name, link) => {  
          popupMestoImg.open(name, link); 
          },
        likeCard:() =>{
          apiYandex.putLikeForServer(item['_id']);
        },
        likeDelCard:() =>{
          apiYandex.deleteLikeForServer(item['_id']);
        }  
      });
      
      // Создаём карточку и возвращаем наружу
      const cardElement = card.generateCard(apiConfig.myId);

      return cardElement
    }


    // попап добавления карточки
    const popupMesto = new PopupWithForm('#popup_mesto', {
      appDate: (evt, dateProfile) => { 

        evt.preventDefault(); 
        const plaseInfo = dateProfile;
      
        const newCardDate = [ 
          {
            name: plaseInfo.popup_name,
            link: plaseInfo.popup_link,
            likes: 0
          }
        ];

        const cardElement = createCard(newCardDate[0]);
        apiYandex.postCardsForServer(newCardDate[0]);
        cards.prependItem(cardElement);
        popupMesto.close();

        }
      }
    );

    popupMesto.setEventListeners();

    // открыть попап для добавления карточки места
    buttonOpenPopupMesto.addEventListener('click', function(){ 
      validMesto.resetValidation();
      popupMesto.open();
    }); 

    // отрисовка карточек через взаимодействие классов
    const cards = new Section({
    items: res,
    render: (messageItem, myCard, myCardId) => {
      const cardElement = createCard(messageItem);

      //проверка что карточка наша тогда можем удалить её
      if (myCard == 0){
        cardElement.querySelector('.plases-card__del').classList.add('plases-card__del_opasiti');
      }else {
        
        const popupDellCard = new PopupDellCard('#popup_dell-card', cardElement, {
          dellMyCards: ()=> {
            apiYandex.deleteCardForServer(myCardId);
          }
        });
        popupDellCard.setEventListeners();
      };


            
      // Добавляем в DOM
      cards.addItem(cardElement);
    }
      },
    '.plases'
    ); 

    cards.renderItems(apiConfig.myId); 
    
  })

  .catch(err => {
    console.log(err);
  });

