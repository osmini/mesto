// Функция, которая добавляет класс с ошибкой
const showInputError = (formElement, inputElement, errorMessage, inputErrorBorder, errorClass) => {

  // Находим элемент ошибки внутри самой функции
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

  inputElement.classList.add(inputErrorBorder);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
};

// Функция, которая удаляет класс с ошибкой
const hideInputError = (formElement, inputElement, inputErrorBorder, errorClass) => {

  // Находим элемент ошибки внутри самой функции
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

  inputElement.classList.remove(inputErrorBorder);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
};

const isValid = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    // showInputError теперь получает параметром форму, в которой
    // находится проверяемое поле, и само это поле
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    // hideInputError теперь получает параметром форму, в которой
    // находится проверяемое поле, и само это поле
    hideInputError(formElement, inputElement);
  }
}; 

// слушатель событий добавится всем полям ввода внутри формы
const setEventListeners = (formElement, inputSelector, submitButtonSelector) => {

  const inputList = Array.from(formElement.querySelectorAll(`.${inputSelector}`));
  
  const buttonElement = formElement.querySelector(`.${submitButtonSelector}`);

  
  // деактивируем кнопку при 1й загрузке сайта
  toggleButtonState(inputList, buttonElement);

  formElement.addEventListener('reset', () => {
    // `setTimeout` нужен для того, чтобы дождаться очищения формы (вызов уйдет в конце стэка) и только потом вызвать `toggleButtonState`
    setTimeout(() => {
    toggleButtonState(inputList, buttonElement);
    }, 0); // достаточно указать 0 миллисекунд, чтобы после `reset` уже сработало действие
  });

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

  // Найдём все формы с указанным классом в DOM,
const enableValidation = (formSelector) => {

  console.log(formSelector);
  const formList = Array.from(document.querySelectorAll(`.${formSelector}`));

  formList.forEach((formElement) => {
    setEventListeners(formElement);
  });
};

// Функция принимает массив полей
const hasInvalidInput = (inputList) => {

  // проходим по этому массиву методом some
  return inputList.some((inputElement) => {

    // Если поле не валидно, колбэк вернёт true
    // Обход массива прекратится и вся функция
    // hasInvalidInput вернёт true
    return !inputElement.validity.valid;
  })
}; 

// Функция принимает массив полей ввода
// и элемент кнопки, состояние которой нужно менять
const toggleButtonState = (inputList, buttonElement, hoverButton) => {

  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    buttonElement.disabled = true;
    buttonElement.classList.remove(hoverButton);
  } else {
    // иначе сделай кнопку активной
    buttonElement.disabled = false;
    buttonElement.classList.add(hoverButton);
  }
};

// Вызовем функцию
enableValidation({
  formSelector: 'popup__form',
  inputSelector: 'popup__input',
  submitButtonSelector: 'popup__button',
  hoverButton: 'hover-batton',
  inputErrorBorder: 'popup__input_error-border',
  errorClass: 'popup__input-error_error_active'
});
