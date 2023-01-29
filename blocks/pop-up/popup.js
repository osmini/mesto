
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

function openPopup() {
  popup.classList.remove("pop-up_active");

  nameInput.value = infoTitle.textContent;
  jobInput.value = infoSubtitle.textContent;
}

function closesPopup() {
  popup.classList.add("pop-up_active");
}

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

    let valNameInput = nameInput.value;
    let valJobInput = jobInput.value;

    // Вставьте новые значения с помощью textContent
    infoTitle.textContent = valNameInput;
    infoSubtitle.textContent = valJobInput;

    popup.classList.add("pop-up_active");
  }



// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener("submit", handleFormSubmit);

popupOpen.addEventListener("click", openPopup);
popupCloses.addEventListener("click", closesPopup);

