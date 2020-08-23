import { Popup } from './Popup.js';
import { formSelector, formInputSelector } from '../utils/constants.js';

// при нажатии на submit button
//и до закрытия попап кнопка менялась
class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);

    this._formElement = this._element.querySelector(formSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._submitButton = this._formElement.querySelector('.popup__btn-save');

    this._submitButtonDefaultLabel = this._submitButton.textContent.trim();
    this._submitButtonSubmittingLabel = this._submitButton.dataset.submittingLabel;
  }

  _getInputValues() {
    const inputsList = Array.from(this._formElement.querySelectorAll(formInputSelector));
    const formData = {};

    inputsList.forEach((input) => {
      const inputName = input.name;
      const inputValue = input.value;

      formData[inputName] = inputValue;
    });

    return formData;
  }

  setEventListeners() {
    super.setEventListeners();

    this._formElement.addEventListener('submit', (event) => {
      event.preventDefault();

      this._submitButton.textContent = this._submitButtonSubmittingLabel;
      const formData = this._getInputValues();

      this._handleFormSubmit(formData);
    });
  }

  closePopup() {
    super.closePopup();
    this._submitButton.textContent = this._submitButtonDefaultLabel;
    this._formElement.reset();
  }
}

export { PopupWithForm };
