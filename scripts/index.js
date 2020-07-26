const popupEditOpenBtn = document.querySelector('.profile-info__edit-button');
const popupAddOpenBtn = document.querySelector('.profile__add-button'); //добавляем кнопку добавить

// edit user popup
const popupEdit = document.querySelector('.popup_edit');
const userName = document.querySelector('.profile-info__name');
const userOccupation = document.querySelector('.profile-info__occupation');
const nameInput = document.querySelector('input[name="user-name"]');
const occupationInput = document.querySelector('input[name="user-occupation"]');
const profileFormEdit = popupEdit.querySelector('.popup__form');

// add place popup
const popupAdd = document.querySelector('.popup_add');
const placeNameInput = popupAdd.querySelector('input[name="place-name"]');
const placeLinkInput = popupAdd.querySelector('input[name="place-link"]');
//const savePlaceButton = popupAdd.querySelector('button[type="submit"]');
const placeFormAdd = popupAdd.querySelector('.popup__form');

// Картиночки
const places = document.querySelector('.places');

const popupPicView = document.querySelector('.popup-pic');
const popupPicImg = document.querySelector('.popup-pic__img');
const popupPicTitle = document.querySelector('.popup-pic__title');

const popupCloseBtns = document.querySelectorAll('.popup__close');

const placesTemplateElement = document.querySelector('.places-template')
  .content;

export { popupPicImg, popupPicTitle, togglePopupClass };

const initialCards = [
  {
    name: 'Архыз',
    link:
      'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link:
      'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link:
      'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link:
      'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link:
      'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link:
      'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const closePopupByEscListener = function(event) {
  if (event.keyCode === 27) {
    const popupOpened = document.querySelector('.popup_opened');

    if (popupOpened) {
      togglePopupClass(popupOpened);
    }
  }
};

//Переключатель класса popup_opened
const togglePopupClass = function(element) {
  element.classList.toggle('popup_opened');

  if (element.classList.contains('popup_opened')) {
    document.addEventListener('keydown', closePopupByEscListener);
  } else {
    document.removeEventListener('keydown', closePopupByEscListener);
  }
};

// закрыть popup при нажатии на зону вне popup
const closePopupOverlay = function(event) {
  const popupElement = event.target;

  if (popupElement.classList.contains('popup')) {
    togglePopupClass(popupElement);
  }
};

//Открыть Edit popup, заполнить значениями
const openEditPopup = function(_event) {
  nameInput.value = userName.textContent;
  occupationInput.value = userOccupation.textContent;

  nameInput.dispatchEvent(new Event('input'));

  togglePopupClass(popupEdit);
};

//Придать новые значения в profile
const handleEditProfileSubmit = function(event) {
  event.preventDefault();

  userName.textContent = nameInput.value;
  userOccupation.textContent = occupationInput.value;

  togglePopupClass(popupEdit);
};

function addPlace(name, link) {
  const card = new Card(name, link, placesTemplateElement);
  const renderedPlace = card.renderPlace();

  placeNameInput.value = '';
  placeLinkInput.value = '';

  places.prepend(renderedPlace);
}

// //создание карточек для всех еллементов массива
initialCards.reverse().forEach(element => {
  addPlace(element.name, element.link);
});

//функция открытия popup add
const openPopupAdd = function(_event) {
  placeNameInput.value = '';
  placeLinkInput.value = '';

  placeNameInput.dispatchEvent(new Event('input'));

  togglePopupClass(popupAdd);
};

//добавление новой карточки на страницу
const handleAddPlaceSubmit = function(event) {
  event.preventDefault();

  const placeElement = {
    name: placeNameInput.value,
    link: placeLinkInput.value
  };

  addPlace(placeElement.name, placeElement.link);

  togglePopupClass(popupAdd);
};

//закрытие просмотра картинки
popupPicView.addEventListener('click', closePopupOverlay);

// bind toggle to popups
popupEditOpenBtn.addEventListener('click', openEditPopup);
popupAddOpenBtn.addEventListener('click', openPopupAdd);

// // close on overlay click
popupEdit.addEventListener('click', closePopupOverlay);
popupAdd.addEventListener('click', closePopupOverlay);

// // submit events
profileFormEdit.addEventListener('submit', handleEditProfileSubmit);
placeFormAdd.addEventListener('submit', handleAddPlaceSubmit);

//закрытие popup
popupCloseBtns.forEach(element => {
  element.addEventListener('click', event => {
    const popupElement = event.target.closest('.popup');

    togglePopupClass(popupElement);
  });
});

// валидация формы
// для каждой формы
// -- создать экземпляр класса FormValidator c передаными в него validation config & формы
// -- -- вызывать метод enableValidation
const formSelector = '.popup__form';

const validationConfig = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__btn-save',
  inactiveButtonClass: 'popup__btn-save_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

const formList = Array.from(document.querySelectorAll(formSelector));

formList.forEach(formElement => {
  const formValidator = new FormValidator(validationConfig, formElement);

  formValidator.enableValidation();
});

import Card from './card.js';
import FormValidator from './formValidator.js';
