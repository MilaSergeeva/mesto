import { Popup } from './Popup.js';
import { formSelector, formInputSelector } from './constants.js';

class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);

    this._formElement = this._element.querySelector(formSelector);
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    const inputsList = Array.from(this._formElement.querySelector(formInputSelector));
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

    this._formElement.addEventListener('submit', this._handleFormSubmit);
  }

  closePopup() {
    super.closePopup();

    this._formElement.reset();
  }
}

export { PopupWithForm };
