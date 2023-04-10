import {Card} from '../components/Card.js';
import {Section} from '../components/Section.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import {PopupWithImage} from '../components/PopupWithImage.js';
import {PopupConfirmation} from '../components/PopupConfirmation.js';
import {Api} from '../components/Api.js';
import {UserInfo} from '../components/UserInfo.js';
import {FormValidator} from '../components/FormValidator.js';
import {setings, apiConfig, buttonOpenPopupProfile, buttonOpenPopupMesto, edditButtonAvatar, nameInput, jobInput, avatar} from '../date/date.js';
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

// отрисовка на странице информации пользователя с сервера
apiYandex.getInfoUserForServer()
  .then(res =>{
    // экземпляр изменения данных о пользователе 
    const infoUser = new UserInfo();
    infoUser.setUserInfo(res['name'], res['about'], res['avatar']);

    // попап изменения информации о пользователе
    const popupProfile = new PopupWithForm('#popup_profile',  {
      submitHandler: (evt, dateProfile) => { 
      
        evt.preventDefault(); 
      
        const plaseInfo = dateProfile;
        const name = plaseInfo.popup_name; 
        const work = plaseInfo.popup_work;
      
        apiYandex.patchInfoUserForServer(name, work)
        .catch(err => {
          console.log(err);
        });
            
        infoUser.setUserInfo(name, work);
        popupProfile.close();
        
        }
      })

    // открыть попап для редактирования профиля
    buttonOpenPopupProfile.addEventListener('click', function(){

      popupProfile.open();
      const textUser = infoUser.getUserInfo();
      nameInput.value = textUser.dateTitle;
      jobInput.value = textUser.dateSubtitle 
    });

    popupProfile.setEventListeners();
      
  })

  .catch(err => {
    console.log(err);
  });

// попап редактирование аватара
const popupAvatar = new PopupWithForm('#popup_avatar', {
  submitHandler: (evt, dateProfile) => { 

    evt.preventDefault(); 
    apiYandex.patchAvatarForServer(dateProfile.popup_link)
    .then(res =>{
      avatar.src = res.avatar;
    })
    .catch(err => {
      console.log(err);
    });
  
    popupAvatar.close();

    }
  }
);

popupAvatar.setEventListeners();

edditButtonAvatar.addEventListener('click', function(){ 
  validAvatar.resetValidation();
  popupAvatar.open();
}); 

// попап просмотра изображения большой картинкой
const popupImage = new PopupWithImage('#popup_img');
popupImage.setEventListeners();

// отрисовка карточек с сервера
apiYandex.getCardsForServer()
  .then(res =>{

    // создать карточку
    function createCard(item) {
      const card = new Card(item, '#plases-card',  {
        items: res,
        handleCardClick: ( name, link) => {  
          popupImage.open(name, link); 
          },
          likeCard:() =>{
            console.log(item);
          apiYandex.putLikeForServer(item['_id'])
          .then(res =>{
            const countLike = cardElement.querySelector('.plases-card__like-count');
            countLike.textContent = res.likes.length;
          })
          .catch(err => {
            console.log(err);
          });        
          },
          likeDelCard:() =>{
          apiYandex.deleteLikeForServer(item['_id'])
          .then(res =>{
            const countLike = cardElement.querySelector('.plases-card__like-count');
            countLike.textContent = res.likes.length;
          })
          .catch(err => {
            console.log(err);
          });
        }        
      })
      
      const cardElement = card.generateCard(apiConfig.myId);

      // попап удаления своей карточки
      const cardId = card.examinationMyCard(apiConfig.myId);
      const popupConfirmation = new PopupConfirmation('#popup_dell-card', cardElement, {
        dellMyCards: ()=> {

            apiYandex.deleteCardForServer(cardId)
            .catch(err => {
              console.log(err);
            });                   
            popupConfirmation.close();
          }
        })
      
      popupConfirmation.setEventListeners();
      return cardElement

    }

    // отрисовка карточек через взаимодействие классов
    const cards = new Section({
      items: res,
      render: (messageItem) => {
          const cardElement = createCard(messageItem);
          
          // Добавляем в DOM
          cards.addItem(cardElement);
        }
      },
      '.plases'
    ); 

    cards.renderItems(); 

    // попап добавления карточки
    const popupAddCard = new PopupWithForm('#popup_mesto', {
      submitHandler: (evt, dateProfile) => { 

        evt.preventDefault(); 
        
        const newCardDate = [ 
          {
            name: dateProfile.popup_name,
            link: dateProfile.popup_link,
            likes: 0,
          }
        ];
        
        apiYandex.postCardsForServer(newCardDate[0])
          .then( (res)=> {
            
            popupAddCard.close();

            const newCardDate = [ 
              {
                name: res.name,
                link: res.link,
                likes: 0,
                _id: res._id
              }
            ];

            const cardElement = createCard(newCardDate[0]);
            cards.prependItem(cardElement);
            
          })
          .catch(err => {
            console.log(err);
          });  
        }
      }
    );

    popupAddCard.setEventListeners();

    // открыть попап для добавления карточки места
    buttonOpenPopupMesto.addEventListener('click', function(){ 
      validMesto.resetValidation();
      popupAddCard.open();
    }); 

  })

  .catch(err => {
    console.log(err);
  });

