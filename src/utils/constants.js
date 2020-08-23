const popupEditOpenBtn = document.querySelector('.profile-info__edit-button');
const popupAddOpenBtn = document.querySelector('.profile__add-button'); //добавляем кнопку добавить
const editAvatarBtn = document.querySelector('.profile__avatar-cover');

// edit user popup
const popupEdit = document.querySelector('.popup_edit');
// const userName = document.querySelector('.profile-info__name');
// const userOccupation = document.querySelector('.profile-info__occupation');
const nameInput = document.querySelector('input[name="user-name"]');
const occupationInput = document.querySelector('input[name="user-occupation"]');
const userNameSelector = '.profile-info__name';
const userOccupationSelector = '.profile-info__occupation';
const userAvatarSelector = '.profile__avatar';

// add place popup
const popupAdd = document.querySelector('.popup_add');
const popupWithConfirmation = document.querySelector('.popup-card-del');
const placeNameInput = popupAdd.querySelector('input[name="place-name"]');
const placeLinkInput = popupAdd.querySelector('input[name="place-link"]');
const avatarLinkInput = document.querySelector('.popup__input-container');

// Картиночки
const placesContainerSelector = '.places';
const places = document.querySelector('.places');

const popupPicView = document.querySelector('.popup-pic');

const placesTemplateElement = document.querySelector('.places-template').content;

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
  editAvatarBtn,
  popupEdit,
  popupWithConfirmation,
  userNameSelector,
  userOccupationSelector,
  userAvatarSelector,
  nameInput,
  occupationInput,
  popupAdd,
  placeNameInput,
  placeLinkInput,
  avatarLinkInput,
  places,
  placesContainerSelector,
  popupPicView,
  placesTemplateElement,
  formSelector,
  formInputSelector,
  validationConfig,
};
