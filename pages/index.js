import { Card } from '../scripts/Card.js';
import { FormValidator } from '../scripts/FormValidator.js';
import { Section } from '../scripts/Section.js';
import { Popup } from '../scripts/Popup.js';
import { PopupWithImage } from '../scripts/PopupWithImage.js';

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
const popupShowCard = new PopupWithImage('.popup-pic');

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

function handleCardClick(link, name) {
  popupShowCard.openPopup(name, link);
}

function renderPlace(place) {
  const { name, link } = place;
  const card = new Card(name, link, placesTemplateElement, popupPicViewConfig, handleCardClick);

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
popupShowCard.setEventListeners();
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
