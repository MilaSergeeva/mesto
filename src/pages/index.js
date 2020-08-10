import './index.css'; // добавьте импорт главного файла стилей
import { Card } from '../scripts/Card.js';
import { FormValidator } from '../scripts/FormValidator.js';
import { Section } from '../scripts/Section.js';
import { PopupWithImage } from '../scripts/PopupWithImage.js';
import { PopupWithForm } from '../scripts/PopupWithForm.js';

import {
  popupEditOpenBtn,
  popupAddOpenBtn,
  userName,
  userOccupation,
  nameInput,
  occupationInput,
  placeNameInput,
  placeLinkInput,
  placesContainerSelector,
  popupPicView,
  placesTemplateElement,
  initialCards,
  formSelector,
  validationConfig,
} from '../scripts/constants.js';

//Открыть Edit popup, заполнить значениями
const openPopupEditProfile = function (_event) {
  nameInput.value = userName.textContent;
  occupationInput.value = userOccupation.textContent;

  nameInput.dispatchEvent(new Event('input'));

  popupEditProfile.openPopup();
};

//Придать новые значения в profile
const handleEditProfileSubmit = function (event) {
  event.preventDefault();

  userName.textContent = nameInput.value;
  userOccupation.textContent = occupationInput.value;

  popupEditProfile.closePopup();
};

const popupPicViewConfig = {
  popupPicView,
};

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
    items: initialCards.reverse(),
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
};

//добавление новой карточки на страницу
const handleAddPlaceSubmit = (event) => {
  event.preventDefault();

  const placeElement = {
    name: placeNameInput.value,
    link: placeLinkInput.value,
  };

  cardsSection.addItem(renderPlace(placeElement));

  popupAddCard.closePopup();
  placeNameInput.dispatchEvent(new Event('input'));
};

// bind toggle to popups
popupEditOpenBtn.addEventListener('click', openPopupEditProfile);
popupAddOpenBtn.addEventListener('click', openPopupAddPlace);

// для каждой формы
// -- создать экземпляр класса FormValidator c передаными в него validation config & формы
// -- -- вызывать метод enableValidation

const formList = Array.from(document.querySelectorAll(formSelector));

formList.forEach((formElement) => {
  const formValidator = new FormValidator(validationConfig, formElement);

  formValidator.enableValidation();
});

const popupEditProfile = new PopupWithForm('.popup_edit', handleEditProfileSubmit);
const popupAddCard = new PopupWithForm('.popup_add', handleAddPlaceSubmit);
const popupShowCard = new PopupWithImage('.popup-pic');

//устанавливаем слушатели
popupEditProfile.setEventListeners();
popupAddCard.setEventListeners();
popupShowCard.setEventListeners();
