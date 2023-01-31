// секция куда вставляем карточки
const plases = document.querySelector('.plases');
// шаблон карточки
const cardTemplate = document.querySelector('#plases-card').content;

const popupProfile = document.querySelector('#popup_profile');
const popupMesto = document.querySelector('#popup_mesto');
const popupImg = document.querySelector('#popup_img');

const buttonClosePopupProfile = document.querySelector('#popup_profile-close');
const buttonClosePopupMesto = document.querySelector('#popup_mesto-close');
const buttonClosePopupImg = document.querySelector('#popup_img-close');

// окрыть popup редактирования профиля
// popup - попап который необходимо открыть
function openPopup(popup) {
  popup.classList.add("popup_active");

  //nameInput.value = infoTitle.textContent;
  //jobInput.value = infoSubtitle.textContent;
}

// закрыть popup редактирования профиля
// popup - попап который необходимо закрыть
function closesPopup(popup) {
  popup.classList.remove("popup_active");
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

/* функция создания карточки на сайте 
  item - элемент массива с заголовком и ссылкой на картинку
*/
function createCard(item) {
  // клонирование карточки
  const card = cardTemplate.querySelector('.plases-card').cloneNode(true);
  // кнопка лайков
  const buttonLike = card.querySelector('.plases-card__like');
  // кнопка корзина 
  const basket = card.querySelector('.plases-card__del');
  // кнопка картинка
  const buttonImg = card.querySelector('.plases-card__img');

  // заполняем карточку данными
  card.querySelector('.plases-card__img').src = item['link'];
  card.querySelector('.plases-card__img').alt = item['name'];
  card.querySelector('.plases-card__title').textContent = item['name'];

  // обработчик лайков
  buttonLike.addEventListener('click', function(){
    buttonLike.classList.toggle("plases-card__like_active");
  });

  // обработчик корзины
  basket.addEventListener("click", function(){
    card.closest('.plases-card').delCard.remove();
  });

  // обработчик попап картинка
  buttonImg.addEventListener("click", function(){ openPopup(popupImg); }); 

  return card
}


// заполняем карточками сайт
initialCards.forEach(function(item){
  plases.append(createCard(item)); 
})


 // закрыть попап картинку
buttonClosePopupImg.addEventListener("click", function(){ closesPopup(popupImg); }); 




const popup = document.querySelector(".popup");
const popupOpen = document.querySelector(".profile-info__button-edit");
const popupCloses = document.querySelector(".popup__close-button");
// Находим форму в DOM
const formElement = document.querySelector(".popup__eddit-form");
// Находим поля формы в DOM
const input = document.querySelectorAll(".popup__input");
const nameInput = input[0];
const jobInput = input[1];
// поля информации из профиля
const infoTitle = document.querySelector(".profile-info__title");
const infoSubtitle = document.querySelector(".profile-info__subtitle");

const popupEdd = document.querySelector(".popup-edd");
const buttonAdd = document.querySelector(".popup-edd__button");
const popupMestoCloses = document.querySelector(".popup-edd__close-button");




// изменить данные о профиле
function handleFormSubmit (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

  let valNameInput = nameInput.value;
  let valJobInput = jobInput.value;

  // Вставьте новые значения с помощью textContent
  infoTitle.textContent = valNameInput;
  infoSubtitle.textContent = valJobInput;

  popup.classList.remove("popup_active");
}

// добавить карточну нового места на сайт
function popapAddMesto(){
  popupEdd.classList.add("popup_active");

  // кнопка закрытия попап
  popupMestoCloses.addEventListener("click", function(){
    popupEdd.classList.remove("popup_active");
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

    popupEdd.classList.remove("popup_active");
  
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
    popapImg.classList.remove("popup_active");
  }

  imagePlases.forEach(function(amgActive) {

    amgActive.addEventListener("click", function(item){
      
      let ssilkaPopupImg = popapImg.querySelector(".popup-img__image");
      ssilkaPopupImg.src = item.target['src'];

      let captionPopupImg = popapImg.querySelector(".popup-img__caption");
      captionPopupImg.textContent = item.target['alt'];

      popapImg.classList.add("popup_active");

      buttonClossePopapImg.addEventListener("click", closesPopupImg);

    });
  });
}

dellCard();
openImgMesto();

// ообработчик попапа редактирования профиля
formElement.addEventListener("submit", handleFormSubmit);
popupOpen.addEventListener("click", openPopup);
popupCloses.addEventListener("click", closesPopup);

// ообработчик попапа добавления карточки нового места
popupMesto.addEventListener("click", popapAddMesto);
