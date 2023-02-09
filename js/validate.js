const validationClases = {
  formSelector: 'popup__form',
  inputSelector: 'popup__input',
  submitButtonSelector: 'popup__button',
  hoverButton: 'hover-batton',
  inputErrorBorder: 'popup__input_error-border',
  errorClass: 'popup__input-error_error_active'
};

// Функция, которая добавляет класс с ошибкой
const showInputError = (formElement, inputElement, errorMessage) => {

  // Находим элемент ошибки внутри самой функции
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

  inputElement.classList.add(validationClases.inputErrorBorder);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationClases.errorClass);
};

// Функция, которая удаляет класс с ошибкой
const hideInputError = (formElement, inputElement) => {

  // Находим элемент ошибки внутри самой функции
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

  inputElement.classList.remove(validationClases.inputErrorBorder);
  errorElement.classList.remove(validationClases.errorClass);
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
const setEventListeners = (formElement) => {

  const inputList = Array.from(formElement.querySelectorAll(`.${validationClases.inputSelector}`));
  const buttonElement = formElement.querySelector(`.${validationClases.submitButtonSelector}`);

  
  // деактивируем кнопку при 1й загрузке сайта
  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);

    });
  });
  
};

  // Найдём все формы с указанным классом в DOM,
const enableValidation = () => {

  const formList = Array.from(document.querySelectorAll(`.${validationClases.formSelector}`));

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
const toggleButtonState = (inputList, buttonElement) => {

  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    buttonElement.disabled = true;
    buttonElement.classList.remove(validationClases.hoverButton);
  } else {
    // иначе сделай кнопку активной
    buttonElement.disabled = false;
    buttonElement.classList.add(validationClases.hoverButton);
  }
};

// Вызовем функцию
enableValidation();
