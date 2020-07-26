import validationConfig from './index.js';

export class FormValidator {
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
          this._checkInputValidity(input);
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
    if (this._hasInvalidInput(inputList)) {
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
