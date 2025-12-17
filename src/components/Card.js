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
      const link = this.imageElement.src;
      const name = this.imageElement.alt;

      this._handleCardClick(link, name);
    };

    this.imageElement.addEventListener('click', this._openPopupPlacePic);
    this.deleteElement.addEventListener('click', () => {
      this._confirmDeleteCard(this.place, this.cardElement);
    });
    this.likeElement.addEventListener('click', (event) => {
      this._handleLikeButton(event, this.place, this.likesCounter);
    });
  }

  //рендер карточки места
  render() {
    this.placeElement = this._getTemplate();

    this.cardElement = this.placeElement.querySelector('.place');

    this.likesCounter = this.cardElement.querySelector('.place__likes-counter');
    this.imageElement = this.cardElement.querySelector('.place__img');
    this.likeElement = this.cardElement.querySelector('.place__like-btn');
    this.deleteElement = this.cardElement.querySelector('.place__bin-btn');
    this.titleElement = this.cardElement.querySelector('.place__title');

    this.titleElement.textContent = this.place.name;
    this.likesCounter.textContent = this.place.likes.length;

    // лайк текущего пользователя
    if (this.place.likes.find((el) => el._id === this.currentUserInfo._id)) {
      this.likeElement.classList.add('place__like-btn_on');
    }

    // скрываем корзину, если не владелец
    if (this.place.owner._id !== this.currentUserInfo._id) {
      this.deleteElement.remove();
    }

    const link = String(this.place.link || '').trim();

    // бан по слову
    if (typeof isBlockedUrl === 'function' && isBlockedUrl(link)) {
      this.cardElement.remove();
      return this.cardElement; // вернём элемент, но он уже удалён — addItem ничего не покажет
    }

    this.imageElement.alt = this.place.name;

    // Ставим src только если это реально изображение
    const probe = new Image();
    probe.onload = () => {
      this.imageElement.src = link;
    };
    probe.onerror = () => {
      this._removeEventListeners();
      this.cardElement.remove(); // ✅ удаляем реальный DOM-элемент карточки
    };
    probe.src = link;

    this._setEventListeners();

    return this.cardElement; // ✅ возвращаем реальную карточку
  }
  render() {
    this.placeElement = this._getTemplate();

    this.cardElement = this.placeElement.querySelector('.place');

    this.likesCounter = this.cardElement.querySelector('.place__likes-counter');
    this.imageElement = this.cardElement.querySelector('.place__img');
    this.likeElement = this.cardElement.querySelector('.place__like-btn');
    this.deleteElement = this.cardElement.querySelector('.place__bin-btn');
    this.titleElement = this.cardElement.querySelector('.place__title');

    this.titleElement.textContent = this.place.name;
    this.likesCounter.textContent = this.place.likes.length;

    // лайк текущего пользователя
    if (this.place.likes.find((el) => el._id === this.currentUserInfo._id)) {
      this.likeElement.classList.add('place__like-btn_on');
    }

    // скрываем корзину, если не владелец
    if (this.place.owner._id !== this.currentUserInfo._id) {
      this.deleteElement.remove();
    }

    const link = String(this.place.link || '').trim();

    // бан по слову
    if (typeof isBlockedUrl === 'function' && isBlockedUrl(link)) {
      this.cardElement.remove();
      return this.cardElement; // вернём элемент, но он уже удалён — addItem ничего не покажет
    }

    this.imageElement.alt = this.place.name;

    // Ставим src только если это реально изображение
    const probe = new Image();
    probe.onload = () => {
      this.imageElement.src = link;
    };
    probe.onerror = () => {
      this._removeEventListeners();
      this.cardElement.remove(); // удаляем реальный DOM-элемент карточки
    };
    probe.src = link;

    this._setEventListeners();

    return this.cardElement; // возвращаем реальную карточку
  }
}

export { Card };
