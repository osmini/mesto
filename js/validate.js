// Функция, которая добавляет класс с ошибкой
const showInputError = (formElement, inputElement, errorMessage, setings) => {

  // Находим элемент ошибки внутри самой функции
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

  inputElement.classList.add(setings.inputErrorBorder);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(setings.errorClass);
};

// Функция, которая удаляет класс с ошибкой
const hideInputError = (formElement, inputElement, setings) => {

  // Находим элемент ошибки внутри самой функции
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

  inputElement.classList.remove(setings.inputErrorBorder);
  errorElement.classList.remove(setings.errorClass);
  errorElement.textContent = '';
};

const isValid = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    // showInputError теперь получает параметром форму, в которой
    // находится проверяемое поле, и само это поле
    showInputError(formElement, inputElement, inputElement.validationMessage, setings);
  } else {
    // hideInputError теперь получает параметром форму, в которой
    // находится проверяемое поле, и само это поле
    hideInputError(formElement, inputElement, setings);
  }
}; 

// слушатель событий добавится всем полям ввода внутри формы
const setEventListeners = (formElement, setings) => {

  const inputList = Array.from(formElement.querySelectorAll(`.${setings.inputSelector}`));
  const buttonElement = formElement.querySelector(`.${setings.submitButtonSelector}`);

  
  // деактивируем кнопку при 1й загрузке сайта
  toggleButtonState(inputList, buttonElement, setings);
  
  formElement.addEventListener('reset', () => {
    // `setTimeout` нужен для того, чтобы дождаться очищения формы (вызов уйдет в конце стэка) и только потом вызвать `toggleButtonState`
    setTimeout(() => {
    toggleButtonState(inputList, buttonElement, setings);
    }, 0); // достаточно указать 0 миллисекунд, чтобы после `reset` уже сработало действие
  });

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement);
      toggleButtonState(inputList, buttonElement, setings);
    });
  });
  
};

  // Найдём все формы с указанным классом в DOM,
const enableValidation = (setings) => {

  const formList = Array.from(document.querySelectorAll(`.${setings.formSelector}`));

  formList.forEach((formElement) => {
    setEventListeners(formElement, setings);
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
const toggleButtonState = (inputList, buttonElement, setings) => {

  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    buttonElement.disabled = true;
    buttonElement.classList.remove(setings.hoverButton);
  } else {
    // иначе сделай кнопку активной
    buttonElement.disabled = false;
    buttonElement.classList.add(setings.hoverButton);
  }
};

// Вызовем функцию
enableValidation(setings = {
  formSelector: 'popup__form',
  inputSelector: 'popup__input',
  submitButtonSelector: 'popup__button',
  hoverButton: 'hover-batton',
  inputErrorBorder: 'popup__input_error-border',
  errorClass: 'popup__input-error_error_active'
});
