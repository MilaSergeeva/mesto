import { Popup } from './Popup.js';

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);

    this._cardImgElement = this._element.querySelector('.popup-pic__img');
    this._cardTitleElement = this._element.querySelector('.popup-pic__title');
  }

  openPopup(name, link) {
    this._cardImgElement.src = link;
    this._cardTitleElement.textContent = name;

    super.openPopup();
  }
}

export { PopupWithImage };
