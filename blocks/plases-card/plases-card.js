const initialCards = [
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

let plasesСardTemplate = document.querySelector('#plases-card').content;
let plases = document.querySelector('.plases');

initialCards.forEach(function (item) {
  let plasesСardElement = plasesСardTemplate.querySelector('.plases-card').cloneNode(true);
  plasesСardElement.querySelector('.plases-card__img').src = item['link'];
  plasesСardElement.querySelector('.plases-card__img').alt = item['name'];
  plasesСardElement.querySelector('.plases-card__title').textContent = item['name'];

  plases.append(plasesСardElement); 
});

