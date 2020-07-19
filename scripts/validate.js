//Показываем текст ошибки
const showInputError = (inputElement, validationConfig, errorMessage) => {
  const errorElement = inputElement.closest('.popup__input-container').querySelector('.popup__error');

  inputElement.classList.add(validationConfig.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationConfig.errorClass);
};

//скрыть текст ошибки
const hideInputError = (inputElement, validationConfig,) => {
  const errorElement = inputElement.closest('.popup__input-container').querySelector('.popup__error');

  inputElement.classList.remove(validationConfig.inputErrorClass); 
  errorElement.classList.remove(validationConfig.errorClass);
  errorElement.textContent = '';
};

//проверка валидности инпутов
function checkInputValidity(inputElement, validationConfig) {
  if (!inputElement.validity.valid) {
    showInputError(inputElement, validationConfig, inputElement.validationMessage);
    
  } else {
    hideInputError(inputElement, validationConfig);
  }
}

// для элементов формы находить инпуты
// и биндить для них проверку валидности
const setEventListeners = (formElement, validationConfig) => {
  const inputList = Array.from(formElement.querySelectorAll(
    validationConfig.inputSelector
  ));
  const buttonElement = formElement.querySelector(
    validationConfig.submitButtonSelector
  );

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      inputList.forEach(input => {
        checkInputValidity(input, validationConfig); 
      });
      
      toggleButtonState(inputList, buttonElement, validationConfig);
    });
  });

  toggleButtonState(inputList, buttonElement, validationConfig);
};

//наличие не валидных данных
function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

// добавление класса для кнопки сабмит, который делает ее не активной

function disableSubmitButtonElement(element, disabledElementClassName) {
  element.classList.add(disabledElementClassName);
  element.disabled = true;
}

// удаление класса для кнопки сабмит, который делает ее не активной
function enableSubmitButtonElement(element, disabledElementClassName) {
  element.classList.remove(disabledElementClassName);
  element.disabled = false;
}

//Кнопка ввода переключение класса
function toggleButtonState(inputList, buttonElement, validationConfig) {
  if (hasInvalidInput(inputList)) {
    disableSubmitButtonElement(buttonElement, validationConfig.inactiveButtonClass);
  } else {
    enableSubmitButtonElement(buttonElement, validationConfig.inactiveButtonClass);
  }
}

function enableValidation(validationConfig) {
  const { formSelector } = validationConfig;
  
  const formList = Array.from(document.querySelectorAll(formSelector));
  
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (event) {
      event.preventDefault();
    });

    setEventListeners(formElement, validationConfig);
  });
}


enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__btn-save',
  inactiveButtonClass: 'popup__btn-save_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});
