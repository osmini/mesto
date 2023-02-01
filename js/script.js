
const plases = document.querySelector('.plases');
const cardTemplate = document.querySelector('#plases-card').content;

const buttonOpenPopupProfile = document.querySelector('.profile-info__button-edit');
const buttonOpenPopupMesto = document.querySelector('.profile__button-add');

const buttonClosePopupProfile = document.querySelector('#popup_profile-close');
const buttonClosePopupMesto = document.querySelector('#popup_mesto-close');
const buttonClosePopupImg = document.querySelector('#popup_img-close');

const popupProfile = document.querySelector('#popup_profile');
const popupMesto = document.querySelector('#popup_mesto');
const popupImg = document.querySelector('#popup_img');

const buttonChaingProfile = document.querySelector('.profile-info__button-edit');
const formPopupProfile = document.querySelector('#popup_form-profile');
const formPopupPlace = document.querySelector('#popup_form-place');

const nameInput = document.querySelector('#popup_name-profile');
const jobInput = document.querySelector('#popup_work-profile');

const infoTitle = document.querySelector('.profile-info__title');
const infoSubtitle = document.querySelector('.profile-info__subtitle');

const buttonAddPlase = popupMesto.querySelector('.popup__button');

const popupImgLink = popupImg.querySelector('.popup__image');
const popupImgTitle = popupImg.querySelector('.popup__caption');


function openPopup(popup) {
  popup.classList.add("popup_active");
}

function closesPopup(popup) {
  popup.classList.remove("popup_active");
}

function chaingProfile() {
  
  const valNameInput = nameInput.value;
  const valJobInput = jobInput.value;

  nameInput.value = infoTitle.textContent;
  jobInput.value = infoSubtitle.textContent;

  infoTitle.textContent = valNameInput;
  infoSubtitle.textContent = valJobInput;
}

function createCard(title, link) {

  const card = cardTemplate.querySelector('.plases-card').cloneNode(true);
  const buttonLike = card.querySelector('.plases-card__like');
  const basket = card.querySelector('.plases-card__del');
  const buttonImg = card.querySelector('.plases-card__img');

  card.querySelector('.plases-card__img').src = link;
  card.querySelector('.plases-card__img').alt = title;
  card.querySelector('.plases-card__title').textContent = title;

  buttonLike.addEventListener('click', function(){
    buttonLike.classList.toggle("plases-card__like_active");
  });

  basket.addEventListener('click', function(){
    card.closest('.plases-card').remove();
  });

  buttonImg.addEventListener('click', function(){ 
    openPopup(popupImg); 
    popupImgLink.src = link;
    popupImgLink.alt = title;
    popupImgTitle.textContent = title;
  }); 

  return card
}

buttonOpenPopupProfile.addEventListener('click', function(){ openPopup(popupProfile); }); 

buttonClosePopupProfile.addEventListener('click', function(){ closesPopup(popupProfile); }); 

buttonClosePopupProfile.addEventListener('click', function(){ closesPopup(popupProfile); }); 

buttonOpenPopupMesto.addEventListener('click', function(){ openPopup(popupMesto); }); 

buttonClosePopupMesto.addEventListener('click', function(){ 
  closesPopup(popupMesto); 
}); 

buttonClosePopupImg.addEventListener('click', function(){ closesPopup(popupImg); }); 

formPopupProfile.addEventListener('submit', function(evt){ 
  evt.preventDefault(); 
  chaingProfile();
  closesPopup(popupProfile); 
});

formPopupPlace.addEventListener('submit', function(evt){ 
  evt.preventDefault(); 
  evt.target.reset();   

  const placeTitle = popupMesto.querySelector('#popup__name-place').value;
  const placeLink = popupMesto.querySelector('#popup_link-place').value;
  plases.prepend(createCard(placeTitle, placeLink)); 
  closesPopup(popupMesto);
});

initialCards.forEach(function(item){
  plases.append(createCard(item['name'], item['link'])); 
})
