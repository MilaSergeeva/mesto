class Card {
  constructor(name, link, placesTemplateElement, popupPicViewUtils) {
    this.name = name;
    this.link = link;
    this.placesTemplateElement = placesTemplateElement;
    this.closePopupByEscListener = popupPicViewUtils.closePopupByEscListener;
    this.togglePopupElement = popupPicViewUtils.togglePopupElement;
  }

  _getTemplate() {
    return this.placesTemplateElement.cloneNode(true);
  }

  //кнопка лайка
  _handleLikeButton(event) {
    event.target.classList.toggle('place__like-btn_on');
  }

  //удаление карточки
  _deleteCard(event) {
    const placeDelete = event.target.closest('.place');

    placeDelete.remove();

    event.target.removeEventListener('click', this._deleteCard);
    event.target.removeEventListener('click', this._handleLikeButton);
    event.target.removeEventListener('click', this._openPopupPlacePic);
  }

  //функция открытия popup с просмотром картинки
  _openPopupPlacePic() {
    document.querySelector('.popup-pic__img').src = event.target.src;
    document.querySelector('.popup-pic__title').textContent = event.target.alt;

    const popupPicView = document.querySelector('.popup-pic');
    this.togglePopupElement(popupPicView);
  }

  //рендер карточки места
  renderPlace() {
    const place = this._getTemplate();
    place.querySelector('.place__title').textContent = this.name;

    const placeImg = place.querySelector('.place__img');

    placeImg.src = this.link;
    placeImg.alt = this.name;

    //Просмотр картинки из галереи
    placeImg.addEventListener('click', event => {
      this._openPopupPlacePic();
    });

    //Бинды ивентов для элементов place
    place.querySelector('.place__bin-btn').addEventListener('click', event => {
      this._deleteCard(event);
    });

    place.querySelector('.place__like-btn').addEventListener('click', event => {
      this._handleLikeButton(event);
    });

    return place;
  }
}

export { Card };
