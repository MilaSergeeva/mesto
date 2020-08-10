import './index.css'; // добавьте импорт главного файла стилей
import { Card } from '../components /Card.js';
import { FormValidator } from '../components /FormValidator.js';
import { Section } from '../components /Section.js';
import { PopupWithImage } from '../components /PopupWithImage.js';
import { PopupWithForm } from '../components /PopupWithForm.js';
import { UserInfo } from '../components /UserInfo.js';

import {
  popupEditOpenBtn,
  popupAddOpenBtn,
  userNameSelector,
  userOccupationSelector,
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
} from '../utils/constants.js';

const userProfileInfo = new UserInfo(userNameSelector, userOccupationSelector);

const openPopupEditProfile = () => {
  const userData = userProfileInfo.getUserInfo();

  nameInput.value = userData.userName;
  occupationInput.value = userData.userOccupation;

  nameInput.dispatchEvent(new Event('input'));

  popupEditProfile.openPopup();
};

//Открыть Edit popup, заполнить значениями
// const openPopupEditProfile = function (_event) {
//   nameInput.value = userName.textContent;
//   occupationInput.value = userOccupation.textContent;

//   nameInput.dispatchEvent(new Event('input'));

//   popupEditProfile.openPopup();
// };

// //Придать новые значения в profile
const handleEditProfileSubmit = function (formData) {
  const userInfo = {
    userName: formData['user-name'],
    userOccupation: formData['user-occupation'],
  };

  userProfileInfo.setUserInfo(userInfo);

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
const handleAddPlaceSubmit = (formData) => {
  const placeElement = {
    name: formData['place-name'],
    link: formData['place-link'],
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
