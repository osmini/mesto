let popup = document.querySelector(".pop-up");
let popupOpen = document.querySelector(".profile-info__button-edit");
let popupCloses = document.querySelector(".eddit-form__close-button");

popupOpen.addEventListener("click", openPopup);
popupCloses.addEventListener("click", closesPopup);

function openPopup() {
  popup.classList.remove("close-popup");
}

function closesPopup() {
  popup.classList.add("close-popup");
}

// Находим форму в DOM
let formElement = document.querySelector(".eddit-form");
// Находим поля формы в DOM
let Input = document.querySelectorAll(".eddit-form__input");
let nameInput = Input[0];
let jobInput = Input[1];

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

    let ValNameInput = nameInput.value;
    let ValJobInput = jobInput.value;

    // Выберите элементы, куда должны быть вставлены значения полей
    let infoTitle = document.querySelector(".profile-info__title");
    let infoSubtitle = document.querySelector(".profile-info__subtitle");

    // Вставьте новые значения с помощью textContent
    infoTitle.textContent = ValNameInput;
    infoSubtitle.textContent = ValJobInput;

    console.log(infoTitle);

    popup.classList.add("close-popup");
  }


// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);