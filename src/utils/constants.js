const popupEditOpenBtn = document.querySelector('.profile-info__edit-button');
const popupAddOpenBtn = document.querySelector('.profile__add-button'); //добавляем кнопку добавить

// edit user popup
const popupEdit = document.querySelector('.popup_edit');
// const userName = document.querySelector('.profile-info__name');
// const userOccupation = document.querySelector('.profile-info__occupation');
const nameInput = document.querySelector('input[name="user-name"]');
const occupationInput = document.querySelector('input[name="user-occupation"]');
const userNameSelector = '.profile-info__name';
const userOccupationSelector = '.profile-info__occupation';

// add place popup
const popupAdd = document.querySelector('.popup_add');
const placeNameInput = popupAdd.querySelector('input[name="place-name"]');
const placeLinkInput = popupAdd.querySelector('input[name="place-link"]');

// Картиночки
const placesContainerSelector = '.places';
const places = document.querySelector('.places');

const popupPicView = document.querySelector('.popup-pic');

const placesTemplateElement = document.querySelector('.places-template').content;

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
  },
];

const formSelector = '.popup__form';
const formInputSelector = '.popup__input';

const validationConfig = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__btn-save',
  inactiveButtonClass: 'popup__btn-save_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};

export {
  popupEditOpenBtn,
  popupAddOpenBtn,
  popupEdit,
  userNameSelector,
  userOccupationSelector,
  nameInput,
  occupationInput,
  popupAdd,
  placeNameInput,
  placeLinkInput,
  places,
  placesContainerSelector,
  popupPicView,
  placesTemplateElement,
  initialCards,
  formSelector,
  formInputSelector,
  validationConfig,
};
