import { Popup } from './Popup.js';

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);

    this._cardImg = this._element.querySelector('.popup-pic__img');
    this._cardTitle = this._element.querySelector('.popup-pic__title');
  }

  openPopup(name, link) {
    super.openPopup();

    this._cardImg.src = link;
    this._cardTitle.textContent = name;
  }
}

export { PopupWithImage };
