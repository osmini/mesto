const plases = document.querySelector('.plases');
const cardTemplate = document.querySelector('#plases-card').content;

const buttonOpenPopupProfile = document.querySelector('.profile-info__button-edit');
const buttonOpenPopupMesto = document.querySelector('.profile__button-add');

const closeButtons = document.querySelectorAll('.popup__close-button');

const popupProfile = document.querySelector('#popup_profile');
const popupMesto = document.querySelector('#popup_mesto');
const popupImg = document.querySelector('#popup_img');

const buttonChaingProfile = document.querySelector('.profile-info__button-edit');
const formPopupProfile = document.forms['popup_profile'];
const formPopupPlace = document.forms['popup_place'];

const nameInput = document.querySelector('#popup_name-profile');
const jobInput = document.querySelector('#popup_work-profile');

const infoTitle = document.querySelector('.profile-info__title');
const infoSubtitle = document.querySelector('.profile-info__subtitle');

const buttonAddPlase = popupMesto.querySelector('.popup__button');

const popupImgLink = popupImg.querySelector('.popup__image');
const popupImgTitle = popupImg.querySelector('.popup__caption');

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

function createCard(title, link) {

  const card = cardTemplate.querySelector('.plases-card').cloneNode(true);
  const buttonLike = card.querySelector('.plases-card__like');
  const basket = card.querySelector('.plases-card__del');
  const buttonImg = card.querySelector('.plases-card__img');

  buttonImg.src = link;
  buttonImg.alt = title;
  card.querySelector('.plases-card__title').textContent = title;

  buttonLike.addEventListener('click', function(){
    buttonLike.classList.toggle("plases-card__like_active");
  });

  basket.addEventListener('click', function(){
    card.closest('.plases-card').remove();
  });

  buttonImg.addEventListener('click', function(){ 
    popupImgLink.src = link;
    popupImgLink.alt = title;
    popupImgTitle.textContent = title;
    openPopup(popupImg); 
  }); 

  return card
}

buttonOpenPopupProfile.addEventListener('click', function(){ openPopup(popupProfile); }); 
buttonOpenPopupMesto.addEventListener('click', function(){ openPopup(popupMesto); }); 

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
    plases.prepend(createCard(placeTitle.value, placeLink.value)); 
    closesPopup(popupMesto);
  }
  evt.target.reset();
  
});

initialCards.forEach(function(item){
  plases.append(createCard(item['name'], item['link'])); 
})

