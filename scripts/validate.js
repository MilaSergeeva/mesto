//Показываем текст ошибки
// const showInputError = (inputElement, validationConfig, errorMessage) => {
//   const errorElement = inputElement
//     .closest('.popup__input-container')
//     .querySelector('.popup__error');

//   inputElement.classList.add(validationConfig.inputErrorClass);
//   errorElement.textContent = errorMessage;
//   errorElement.classList.add(validationConfig.errorClass);
// };

//скрыть текст ошибки
// const hideInputError = (inputElement, validationConfig) => {
//   const errorElement = inputElement
//     .closest('.popup__input-container')
//     .querySelector('.popup__error');

//   inputElement.classList.remove(validationConfig.inputErrorClass);
//   errorElement.classList.remove(validationConfig.errorClass);
//   errorElement.textContent = '';
// };

//проверка валидности инпутов
// function checkInputValidity(inputElement, validationConfig) {
//   if (!inputElement.validity.valid) {
//     showInputError(
//       inputElement,
//       validationConfig,
//       inputElement.validationMessage
//     );
//   } else {
//     hideInputError(inputElement, validationConfig);
//   }
// }

// для элементов формы находить инпуты
// и биндить для них проверку валидности
// const setEventListeners = (formElement, validationConfig) => {
//   const inputList = Array.from(
//     formElement.querySelectorAll(validationConfig.inputSelector)
//   );
//   const buttonElement = formElement.querySelector(
//     validationConfig.submitButtonSelector
//   );

//   inputList.forEach(inputElement => {
//     inputElement.addEventListener('input', function() {
//       inputList.forEach(input => {
//         checkInputValidity(input, validationConfig);
//       });

//       toggleButtonState(inputList, buttonElement, validationConfig);
//     });
//   });

//   toggleButtonState(inputList, buttonElement, validationConfig);
// };

// //наличие не валидных данных
// function hasInvalidInput(inputList) {
//   return inputList.some(inputElement => {
//     return !inputElement.validity.valid;
//   });
// }

// // добавление класса для кнопки сабмит, который делает ее не активной

// function disableSubmitButtonElement(element, disabledElementClassName) {
//   element.classList.add(disabledElementClassName);
//   element.disabled = true;
// }

// // удаление класса для кнопки сабмит, который делает ее не активной
// function enableSubmitButtonElement(element, disabledElementClassName) {
//   element.classList.remove(disabledElementClassName);
//   element.disabled = false;
// }

// //Кнопка ввода переключение класса
// function toggleButtonState(inputList, buttonElement, validationConfig) {
//   if (hasInvalidInput(inputList)) {
//     disableSubmitButtonElement(
//       buttonElement,
//       validationConfig.inactiveButtonClass
//     );
//   } else {
//     enableSubmitButtonElement(
//       buttonElement,
//       validationConfig.inactiveButtonClass
//     );
//   }
// }

// function enableValidation(validationConfig) {
//   const { formSelector } = validationConfig;

//   const formList = Array.from(document.querySelectorAll(formSelector));

//   formList.forEach((formElement) => {
//     formElement.addEventListener('submit', function (event) {
//       event.preventDefault();
//     });

//     setEventListeners(formElement, validationConfig);
//   });
// }

// enableValidation({
//   formSelector: '.popup__form',
//   inputSelector: '.popup__input',
//   submitButtonSelector: '.popup__btn-save',
//   inactiveButtonClass: 'popup__btn-save_disabled',
//   inputErrorClass: 'popup__input_type_error',
//   errorClass: 'popup__error_visible'
// });

// ------

class FormValidator {
  constructor(validationConfig, formElement) {
    this.validationConfig = validationConfig;
    this.formElement = formElement;
  }

  //Показываем текст ошибки
  _showInputError(inputElement, errorMessage) {
    const errorElement = inputElement
      .closest('.popup__input-container')
      .querySelector('.popup__error');

    inputElement.classList.add(this.validationConfig.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this.validationConfig.errorClass);
  }

  //скрыть текст ошибки
  _hideInputError(inputElement) {
    const errorElement = inputElement
      .closest('.popup__input-container')
      .querySelector('.popup__error');

    inputElement.classList.remove(this.validationConfig.inputErrorClass);
    errorElement.classList.remove(this.validationConfig.errorClass);
    errorElement.textContent = '';
  }

  //проверка валидности инпутов
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  // для элементов формы находить инпуты
  // и биндить для них проверку валидности
  _setEventListeners() {
    const inputList = Array.from(
      this.formElement.querySelectorAll(this.validationConfig.inputSelector)
    );
    const buttonElement = this.formElement.querySelector(
      this.validationConfig.submitButtonSelector
    );

    inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        inputList.forEach(input => {
          this.checkInputValidity(input);
        });

        this._toggleButtonState(inputList, buttonElement);
      });
    });

    this._toggleButtonState(inputList, buttonElement);
  }

  //наличие не валидных данных
  _hasInvalidInput(inputList) {
    return inputList.some(inputElement => {
      return !inputElement.validity.valid;
    });
  }

  // добавление класса для кнопки сабмит, который делает ее не активной

  _disableSubmitButtonElement(element) {
    element.classList.add(this.validationConfig.inactiveButtonClass);
    element.disabled = true;
  }

  // удаление класса для кнопки сабмит, который делает ее не активной
  _enableSubmitButtonElement(element) {
    element.classList.remove(this.validationConfig.inactiveButtonClass);
    element.disabled = false;
  }

  //Кнопка ввода переключение класса
  _toggleButtonState(inputList, buttonElement) {
    if (this.hasInvalidInput(inputList)) {
      this._disableSubmitButtonElement(buttonElement);
    } else {
      this._enableSubmitButtonElement(buttonElement);
    }
  }

  enableValidation() {
    this.formElement.addEventListener('submit', event => {
      event.preventDefault();
    });

    this._setEventListeners();
  }
}

// для каждой формы
// -- создать экземпляр класса FormValidator c передаными в него validation config & формы
// -- -- вызывать метод enableValidation

const formSelector = '.popup__form';
const validationConfig = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__btn-save',
  inactiveButtonClass: 'popup__btn-save_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

const formList = Array.from(document.querySelectorAll(formSelector));

formList.forEach(formElement => {
  const formValidator = new FormValidator(validationConfig, formElement);

  formValidator.enableValidation();
});
