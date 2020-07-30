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

  //кнопка лайка
  _handleLikeButton = event => {
    event.target.classList.toggle('place__like-btn_on');
  };

  //удаление карточки
  _deleteCard = event => {
    const place = event.target.closest('.place');

    place.remove();

    this.imageElement.removeEventListener('click', this._openPopupPlacePic);
    this.deleteElement.removeEventListener('click', this._deleteCard);
    this.likeElement.removeEventListener('click', this._handleLikeButton);
  };

  //функция открытия popup с просмотром картинки
  _openPopupPlacePic = () => {
    this.popup.querySelector('.popup-pic__img').src = event.target.src;
    this.popup.querySelector('.popup-pic__title').textContent = event.target.alt;

    const popupPicView = this.popup;

    this.togglePopupElement(popupPicView);
  };

  //рендер карточки места
  renderPlace() {
    const place = this._getTemplate();

    place.querySelector('.place__title').textContent = this.name;

    this.imageElement = place.querySelector('.place__img');
    this.likeElement = place.querySelector('.place__like-btn');
    this.deleteElement = place.querySelector('.place__bin-btn');

    this.imageElement.src = this.link;
    this.imageElement.alt = this.name;

    this.imageElement.addEventListener('click', this._openPopupPlacePic);
    this.deleteElement.addEventListener('click', this._deleteCard);
    this.likeElement.addEventListener('click', this._handleLikeButton);

    return place;
  }
}

export { Card };
