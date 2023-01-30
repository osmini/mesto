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

let popup = document.querySelector(".pop-up");
let popupOpen = document.querySelector(".profile-info__button-edit");
let popupCloses = document.querySelector(".pop-up__close-button");
// Находим форму в DOM
let formElement = document.querySelector(".pop-up__eddit-form");
let popupMesto =  document.querySelector(".profile__button-add");
// Находим поля формы в DOM
let input = document.querySelectorAll(".pop-up__input");
let nameInput = input[0];
let jobInput = input[1];
// поля информации из профиля
let infoTitle = document.querySelector(".profile-info__title");
let infoSubtitle = document.querySelector(".profile-info__subtitle");

let popupEdd = document.querySelector(".popup-edd");
let buttonAdd = document.querySelector(".popup-edd__button");
let popupMestoCloses = document.querySelector(".popup-edd__close-button");

// Добавление карточек мест на страницу по умолчанию
function addCards(){
  initialCards.forEach(function (item) {
    let plasesСardElement = plasesСardTemplate.querySelector('.plases-card').cloneNode(true);

    plasesСardElement.querySelector('.plases-card__img').src = item['link'];
    plasesСardElement.querySelector('.plases-card__img').alt = item['name'];
    plasesСardElement.querySelector('.plases-card__title').textContent = item['name'];

    plases.append(plasesСardElement); 
  });
}

// поставить и убрать лайк карточки
function likes(){
  let buttonLike = document.querySelectorAll('.plases-card__like');
  buttonLike.forEach(function(button) {
    button.addEventListener("click", function(like){
      
      like.target.classList.toggle("plases-card__like_active");

    });
  });
}

// удаляет карточку места по нажатию на корзину
function dellCard(){
  let buttonDel = document.querySelectorAll('.plases-card__del');
  buttonDel.forEach(function(button) {
    button.addEventListener("click", function(del){
      
      let delCard = del.target.closest('.plases-card');
      delCard.remove();

    });
  });
}

// окрыть pop-up редактирования профиля
function openPopup() {
  popup.classList.add("pop-up_active");

  nameInput.value = infoTitle.textContent;
  jobInput.value = infoSubtitle.textContent;
}

// закрыть pop-up редактирования профиля
function closesPopup() {
  popup.classList.remove("pop-up_active");
}


// изменить данные о профиле
function handleFormSubmit (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

  let valNameInput = nameInput.value;
  let valJobInput = jobInput.value;

  // Вставьте новые значения с помощью textContent
  infoTitle.textContent = valNameInput;
  infoSubtitle.textContent = valJobInput;

  popup.classList.remove("pop-up_active");
}

// добавить карточну нового места на сайт
function popapAddMesto(){
  popupEdd.classList.add("pop-up_active");

  // кнопка закрытия попап
  popupMestoCloses.addEventListener("click", function(){
    popupEdd.classList.remove("pop-up_active");
  });

  // кнопка добавить новое место
  buttonAdd.addEventListener("click", function(evt){

    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

    let plasesСardTemplate = document.querySelector('#plases-card').content;
    let plases = document.querySelector('.plases');
    let plasesСardElement = plasesСardTemplate.querySelector('.plases-card').cloneNode(true);

    plasesСardElement.querySelector('.plases-card__img').src = popupEdd.querySelector('#popup-edd_ssilka').value;
    plasesСardElement.querySelector('.plases-card__img').alt = popupEdd.querySelector('#popup-edd_name').value;
    plasesСardElement.querySelector('.plases-card__title').textContent = popupEdd.querySelector('#popup-edd_name').value;

    popupEdd.classList.remove("pop-up_active");
  
    plases.prepend(plasesСardElement); 

    buttonLike = document.querySelectorAll('.plases-card__like');

  });

}

// открыть попап картинки на карточке места 
function openImgMesto(){

  let popapImg = document.querySelector(".popup-img");
  let buttonClossePopapImg = document.querySelector(".popup-img__close-button");
  let imagePlases = document.querySelectorAll(".plases-card__img");

  function closesPopupImg() {
    popapImg.classList.remove("pop-up_active");
  }

  imagePlases.forEach(function(amgActive) {

    amgActive.addEventListener("click", function(item){
      
      console.log(111);
      let ssilkaPopupImg = popapImg.querySelector(".popup-img__image");
      ssilkaPopupImg.src = item.target['src'];

      let captionPopupImg = popapImg.querySelector(".popup-img__caption");
      captionPopupImg.textContent = item.target['alt'];

      popapImg.classList.add("pop-up_active");

      buttonClossePopapImg.addEventListener("click", closesPopupImg);

    });
  });
}

addCards();
likes();
dellCard();
openImgMesto();

// ообработчик попапа редактирования профиля
formElement.addEventListener("submit", handleFormSubmit);
popupOpen.addEventListener("click", openPopup);
popupCloses.addEventListener("click", closesPopup);

// ообработчик попапа добавления карточки нового места
popupMesto.addEventListener("click", popapAddMesto);
