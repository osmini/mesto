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
const apiYandex = new Api(apiConfig);

// экземпляр изменения данных о пользователе 
const infoUser = new UserInfo();

// попап изменения информации о пользователе
const popupProfile = new PopupWithForm('#popup_profile',  {
  submitHandler: (evt, dateProfile) => { 

      evt.preventDefault(); 
      popupProfile.renderLoading(true);

      const plaseInfo = dateProfile;
      const name = plaseInfo.popup_name; 
      const work = plaseInfo.popup_work;

      apiYandex.patchInfoUserForServer(name, work)
        .then (res =>{
          infoUser.setUserInfo(res['name'], res['about']);
          popupProfile.close();
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {
          popupProfile.renderLoading(false);
        })
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

// отрисовка на странице информации пользователя с сервера
apiYandex.getInfoUserForServer()
  .then(res =>{

    // изменение данных пользователя
    infoUser.setUserInfo(res['name'], res['about'], res['avatar']);
  })

  .catch(err => {
    console.log(err);
  });


// попап редактирование аватара
const popupAvatar = new PopupWithForm('#popup_avatar', {
  submitHandler: (evt, dateProfile) => { 

    evt.preventDefault(); 

    popupAvatar.renderLoading(true);
    apiYandex.patchAvatarForServer(dateProfile.popup_link)
      .then(res =>{
        avatar.src = res.avatar;
        popupAvatar.close();
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        popupAvatar.renderLoading(false);
      })
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


// попап удаления своей карточки
const popupConfirmation = new PopupConfirmation('#popup_dell-card', {
  dellMyCards: (cardId)=> {
      apiYandex.deleteCardForServer(cardId)
        .then( ()=> {
          popupConfirmation.close();
        })
        .catch(err => {
          console.log(err);
        });                   
    }
  })


// отрисовка карточек с сервера
Promise.all ([apiYandex.getCardsForServer(), apiYandex.getInfoUserForServer()])
  .then(([cardsData, userData])=>{

    // создать карточку
    function createCard(item) {
      const card = new Card(item, userData._id, '#plases-card',  {
        items: cardsData,
        handleCardClick: ( name, link) => {  
          popupImage.open(name, link); 
          },
          likeCard:() =>{
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
      popupConfirmation.setEventListeners(cardElement, item['_id']);

      return cardElement

    }

    // отрисовка карточек через взаимодействие классов
    const cards = new Section({
      items: cardsData,
      render: (messageItem) => {
          const cardElement = createCard(messageItem);
          
          // Добавляем в DOM
          cards.prependItem(cardElement);
        }
      },
      '.plases'
    ); 

    cards.renderItems(); 

    // попап добавления карточки
    const popupAddCard = new PopupWithForm('#popup_mesto', {
      submitHandler: (evt, dateProfile) => { 

        evt.preventDefault(); 
        popupAddCard.renderLoading(true);
        
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

            cards.addItem(cardElement);
            
          })
          .catch(err => {
            console.log(err);
          }) 
          .finally(() => {
            popupAddCard.renderLoading(false);
          })
          
        }
      }
    );

    popupAddCard.setEventListeners();

    // открыть попап для просмотра карточки места
    buttonOpenPopupMesto.addEventListener('click', function(){ 
      validMesto.resetValidation();
      popupAddCard.open();
    }); 

  })

  .catch(err => {
    console.log(err);
  });

