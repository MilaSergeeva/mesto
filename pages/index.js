import { Card } from '../scripts/Card.js';
import { FormValidator } from '../scripts/FormValidator.js';
import { Section } from '../scripts/Section.js';
import { Popup } from '../scripts/Popup.js';
import {
  popupEditOpenBtn,
  popupAddOpenBtn,
  popupEdit,
  userName,
  userOccupation,
  nameInput,
  occupationInput,
  profileFormEdit,
  popupAdd,
  placeNameInput,
  placeLinkInput,
  placeFormAdd,
  placesContainerSelector,
  popupPicView,
  popupCloseBtns,
  placesTemplateElement,
  initialCards,
  formSelector,
  validationConfig,
} from '../scripts/constants.js';

const popupEditProfile = new Popup('.popup_edit');
const popupAddCard = new Popup('.popup_add');
const popupCard = new Popup('.popup-pic');

// const closePopupByEscListener = function (event) {
//   if (event.keyCode === 27) {
//     const popupOpened = document.querySelector('.popup_opened');

//     if (popupOpened) {
//       togglePopupClass(popupOpened);
//     }
//   }
// };

// //Переключатель класса popup_opened
// function togglePopupClass(element) {
//   element.classList.toggle('popup_opened');
// }

// // назначения слушателя по ESC
// function toggleEscEventListener(element) {
//   if (element.classList.contains('popup_opened')) {
//     document.addEventListener('keydown', closePopupByEscListener);
//   } else {
//     document.removeEventListener('keydown', closePopupByEscListener);
//   }
// }

// function togglePopupElement(element) {
//   togglePopupClass(element);

//   toggleEscEventListener(element);
// }

// закрыть popup при нажатии на зону вне popup
// const closePopupOverlay = function (event) {
//   const popupElement = event.target;

//   if (popupElement.classList.contains('popup')) {
//     popup.closePopup();
//     // togglePopupElement(popupElement);
//   }
// };

//Открыть Edit popup, заполнить значениями
const openPopupEditProfile = function (_event) {
  nameInput.value = userName.textContent;
  occupationInput.value = userOccupation.textContent;

  nameInput.dispatchEvent(new Event('input'));

  popupEditProfile.openPopup();
  // togglePopupElement(popupEdit);
};

//Придать новые значения в profile
const handleEditProfileSubmit = function (event) {
  event.preventDefault();

  userName.textContent = nameInput.value;
  userOccupation.textContent = occupationInput.value;

  popupEditProfile.closePopup();
  // togglePopupElement(popupEdit);
};

const popupPicViewConfig = {
  // closePopupByEscListener,
  // togglePopupElement,
  popupPicView,
};

// function addPlace(name, link) {
//   const card = new Card(name, link, placesTemplateElement, popupPicViewConfig);
//   const renderedPlace = card.renderPlace();

//   placeNameInput.value = '';
//   placeLinkInput.value = '';

//   placeNameInput.dispatchEvent(new Event('input'));

//   places.prepend(renderedPlace);
// }

function renderPlace(place) {
  const { name, link } = place;
  const card = new Card(name, link, placesTemplateElement, popupPicViewConfig);

  return card.renderPlace();
}

//инициализаыия класса Section
const cardsSection = new Section(
  {
    items: initialCards,
    renderer: renderPlace,
  },
  placesContainerSelector
);

cardsSection.renderAllItems();

//функция открытия popup add
const openPopupAddPlace = function (_event) {
  placeNameInput.value = '';
  placeLinkInput.value = '';

  placeNameInput.dispatchEvent(new Event('input'));

  popupAddCard.openPopup();
  // togglePopupElement(popupAdd);
};

//добавление новой карточки на страницу
const handleAddPlaceSubmit = function (event) {
  event.preventDefault();

  const placeElement = {
    name: placeNameInput.value,
    link: placeLinkInput.value,
  };

  addPlace(placeElement.name, placeElement.link);

  popupAddCard.closePopup();
  // togglePopupElement(popupAdd);
};

//закрытие просмотра картинки
// popupPicView.addEventListener('click', closePopupOverlay);

// bind toggle to popups
popupEditOpenBtn.addEventListener('click', openPopupEditProfile);
popupAddOpenBtn.addEventListener('click', openPopupAddPlace);

// // close on overlay click
popupEditProfile.setEventListeners();
popupAddCard.setEventListeners();
// popupEdit.addEventListener('click', closePopupOverlay);
// popupAdd.addEventListener('click', closePopupOverlay);

// // submit events
profileFormEdit.addEventListener('submit', handleEditProfileSubmit);
placeFormAdd.addEventListener('submit', handleAddPlaceSubmit);

//закрытие popup
// pop;
// popupCloseBtns.forEach((element) => {
//   element.addEventListener('click', (event) => {
//     const popupElement = event.target.closest('.popup');

//     togglePopupElement(popupElement);
//   });
// });

// для каждой формы
// -- создать экземпляр класса FormValidator c передаными в него validation config & формы
// -- -- вызывать метод enableValidation

const formList = Array.from(document.querySelectorAll(formSelector));

formList.forEach((formElement) => {
  const formValidator = new FormValidator(validationConfig, formElement);

  formValidator.enableValidation();
});
