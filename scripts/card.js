import { popupPicImg, popupPicTitle, togglePopupClass } from './index.js';

export class Card {
  constructor(name, link, placesTemplateElement) {
    this.name = name;
    this.link = link;
    this.placesTemplateElement = placesTemplateElement;
  }

  _getTemplate() {
    const placeTamplate = this.placesTemplateElement.cloneNode(true);

    return placeTamplate;
  }

  //кнопка лайка
  _handleLikeButton(event) {
    event.target.classList.toggle('place__like-btn_on');
  }

  //удаление карточки
  _deleteCard(event) {
    const placeDelete = event.target.closest('.place');

    placeDelete.remove();
  }

  //функция открытия popup с просмотром картинки
  _openPopupPlacePic(_event) {
    popupPicImg.src = event.target.src;
    popupPicTitle.textContent = event.target.alt;

    togglePopupClass(popupPicView);
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
