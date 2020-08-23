import { Popup } from './Popup.js';

class PopupWithConfirm extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  setOnPopupConfirm(func) {
    this.func = func;
  }

  setEventListeners() {
    super.setEventListeners();

    this.confirmButton = this._element.querySelector('.popup__btn-save');

    this.confirmButton.addEventListener('click', () => {
      this.closePopup();
      this.func();
    });
  }
}

export { PopupWithConfirm };

//
