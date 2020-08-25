import { ESC_KEYCODE } from '../utils/constants.js';
class Popup {
  constructor(popupSelector) {
    this._element = document.querySelector(popupSelector);
    this._closeButtonElement = this._element.querySelector('.popup__close');

    this._popupOpenedClassName = 'popup_opened';

    this._handleEscClose = (event) => {
      if (event.keyCode === ESC_KEYCODE) {
        const popupOpened = document.querySelector('.popup_opened');

        if (popupOpened) {
          this.closePopup(popupOpened);
        }
      }
    };

    this._handleOverlayClose = (event) => {
      if (this._element === event.target && this._element.classList.contains('popup')) {
        this.closePopup();
      }
    };
  }

  openPopup() {
    this._element.classList.add(this._popupOpenedClassName);

    document.addEventListener('keydown', this._handleEscClose);
  }

  closePopup() {
    this._element.classList.remove(this._popupOpenedClassName);

    document.removeEventListener('keydown', this._handleEscClose);
  }

  setEventListeners() {
    this._closeButtonElement.addEventListener('click', () => {
      this.closePopup();
    });

    this._element.addEventListener('click', this._handleOverlayClose);
  }
}

export { Popup };
