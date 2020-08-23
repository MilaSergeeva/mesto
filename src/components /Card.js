class Card {
  constructor(place, currentUserInfo, api, placesTemplateElement, popupPicViewConfig, handleCardClick) {
    this.place = place;
    this.currentUserInfo = currentUserInfo;
    this.api = api;
    this.placesTemplateElement = placesTemplateElement;
    this.popup = popupPicViewConfig.popupPicView;
    this._handleCardClick = handleCardClick;
    this.authorId = null;
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
    this._handleLikeButton = (event) => {
      if (event.target.classList.contains('place__like-btn_on')) {
        this.api.deleteLikeCard(this.place._id).then((cardInfo) => {
          event.target.classList.toggle('place__like-btn_on');
          this.likesCounter.textContent = cardInfo.likes.length;
          console.log(cardInfo);
        });
      } else {
        this.api.likeCard(this.place._id).then((cardInfo) => {
          event.target.classList.toggle('place__like-btn_on');
          this.likesCounter.textContent = cardInfo.likes.length;
          console.log(cardInfo);
        });
      }
    };

    //когда лайкаем в свойстро лайкс объекта карточки добовляем
    // объект с данными пользователя

    //event.target.classList.toggle('place__like-btn_on');

    //удаление карточки
    this._deleteCard = (event) => {
      this.api.deleteCard(this.place._id).then(() => {
        const place = event.target.closest('.place');

        this._removeEventListeners();

        place.remove();
      });
      console.log(this.place._id);
    };

    //функция открытия popup с просмотром картинки
    this._openPopupPlacePic = (event) => {
      const link = event.target.src;
      const name = event.target.alt;

      this._handleCardClick(link, name);
    };

    this.imageElement.addEventListener('click', this._openPopupPlacePic);
    this.deleteElement.addEventListener('click', this._deleteCard);
    this.likeElement.addEventListener('click', this._handleLikeButton);
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
