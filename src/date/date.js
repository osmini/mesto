export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

export const setings = {
  formSelector: 'popup__form',
  inputSelector: 'popup__input',
  submitButtonSelector: 'popup__button',
  hoverButton: 'hover-batton',
  inputErrorBorder: 'popup__input_error-border',
  errorClass: 'popup__input-error_error_active'
};

export const plases = document.querySelector('.plases');

export const buttonOpenPopupProfile = document.querySelector('.profile-info__button-edit');
export const buttonOpenPopupMesto = document.querySelector('.profile__button-add');

export const formPopupProfile = document.forms['popup_profile'];
export const formPopupMesto = document.forms['popup_place'];

export const nameInput = document.querySelector('#popup_name-profile');
export const jobInput = document.querySelector('#popup_work-profile');

export const info = {
  infoTitle: document.querySelector('.profile-info__title'),
  infoSubtitle: document.querySelector('.profile-info__subtitle')
};