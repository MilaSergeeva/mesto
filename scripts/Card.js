class Card {
  constructor(name, link, placesTemplateElement, popupPicViewConfig) {
    this.name = name;
    this.link = link;
    this.placesTemplateElement = placesTemplateElement;
    this.closePopupByEscListener = popupPicViewConfig.closePopupByEscListener;
    this.togglePopupElement = popupPicViewConfig.togglePopupElement;
    this.popup = popupPicViewConfig.popupPicView;
  }

  _getTemplate() {
    return this.placesTemplateElement.cloneNode(true);
  }

  _removeEventListeners() {
    this.imageElement.removeEventListener('click', this._openPopupPlacePic);
    this.deleteElement.removeEventListener('click', this._deleteCard);
    this.likeElement.removeEventListener('click', this._handleLikeButton);
  }

  _setEventListeners() {
    // кнопка лайк
    this._handleLikeButton = event => {
      event.target.classList.toggle('place__like-btn_on');
    };

    //удаление карточки
    this._deleteCard = event => {
      const place = event.target.closest('.place');

      this._removeEventListeners();

      place.remove();
    };

    //функция открытия popup с просмотром картинки
    this._openPopupPlacePic = event => {
      this.popup.querySelector('.popup-pic__img').src = event.target.src;
      this.popup.querySelector('.popup-pic__title').textContent = event.target.alt;

      const popupPicView = this.popup;

      this.togglePopupElement(popupPicView);
    };

    this.imageElement.addEventListener('click', this._openPopupPlacePic);
    this.deleteElement.addEventListener('click', this._deleteCard);
    this.likeElement.addEventListener('click', this._handleLikeButton);
  }

  //рендер карточки места
  renderPlace() {
    this.place = this._getTemplate();

    this.place.querySelector('.place__title').textContent = this.name;

    this.imageElement = this.place.querySelector('.place__img');
    this.likeElement = this.place.querySelector('.place__like-btn');
    this.deleteElement = this.place.querySelector('.place__bin-btn');

    this.imageElement.src = this.link;
    this.imageElement.alt = this.name;

    this._setEventListeners();

    return this.place;
  }
}

export { Card };
