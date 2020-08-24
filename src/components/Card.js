class Card {
  constructor(place, currentUserInfo, placesTemplateElement, popupWithConfirm, handlers) {
    this.place = place;
    this.currentUserInfo = currentUserInfo;
    this.placesTemplateElement = placesTemplateElement;
    this._handleCardClick = handlers.handleCardClick;
    this._handleLikeButton = handlers.cardLikeHandler;
    this._confirmDeleteCard = handlers.cardDeleteHandler;
    this.popupWithConfirm = popupWithConfirm;
  }

  _getTemplate() {
    return this.placesTemplateElement.cloneNode(true);
  }

  _removeEventListeners() {
    this.imageElement.removeEventListener('click', this._openPopupPlacePic);
    this.deleteElement.removeEventListener('click', this._confirmDeleteCard);
    this.likeElement.removeEventListener('click', this._handleLikeButton);
  }

  _setEventListeners() {
    //функция открытия popup с просмотром картинки
    this._openPopupPlacePic = (event) => {
      const link = event.target.src;
      const name = event.target.alt;

      this._handleCardClick(link, name);
    };

    this.imageElement.addEventListener('click', this._openPopupPlacePic);
    this.deleteElement.addEventListener('click', (event) => {
      this._confirmDeleteCard(event, this.place);
    });
    this.likeElement.addEventListener('click', (event) => {
      this._handleLikeButton(event, this.place, this.likesCounter);
    });
  }

  //рендер карточки места
  render() {
    this.placeElement = this._getTemplate();

    this.likesCounter = this.placeElement.querySelector('.place__likes-counter');
    this.imageElement = this.placeElement.querySelector('.place__img');
    this.likeElement = this.placeElement.querySelector('.place__like-btn');
    this.deleteElement = this.placeElement.querySelector('.place__bin-btn');
    this.titleElement = this.placeElement.querySelector('.place__title');

    this.titleElement.textContent = this.place.name;
    this.likesCounter.textContent = this.place.likes.length;
    //если в списке  лаков  есть лайк пользователя

    if (
      this.place.likes.find((element) => {
        return element._id === this.currentUserInfo._id;
      })
    ) {
      this.likeElement.classList.add('place__like-btn_on');
    }

    if (this.place.owner._id != this.currentUserInfo._id) {
      this.deleteElement.remove();
    }

    this.imageElement.src = this.place.link;
    this.imageElement.alt = this.place.name;

    this._setEventListeners();

    return this.placeElement;
  }
}

export { Card };
