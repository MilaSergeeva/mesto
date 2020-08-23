import './index.css'; // добавьте импорт главного файла стилей
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import { PopupWithConfirm } from '../components/PopupWithConfirm.js';
import { api } from '../utils/api/index.js';

import {
  popupEditOpenBtn,
  popupAddOpenBtn,
  editAvatarBtn,
  userNameSelector,
  userOccupationSelector,
  userAvatarSelector,
  nameInput,
  occupationInput,
  placeNameInput,
  placeLinkInput,
  avatarLinkInput,
  placesContainerSelector,
  placesTemplateElement,
  formSelector,
  validationConfig,
} from '../utils/constants.js';

const openPopupEditProfile = () => {
  const userData = userProfileInfo.getUserInfo();

  nameInput.value = userData.name;
  occupationInput.value = userData.about;

  nameInput.dispatchEvent(new Event('input'));

  popupEditProfile.openPopup();
};

//Придать новые значения в profile
const handleEditProfileSubmit = function (formData) {
  const userInfo = {
    name: formData['user-name'],
    about: formData['user-occupation'],
  };

  api.updateUserInfo(userInfo).then((updatedUserInfo) => {
    userProfileInfo.setUserInfo(updatedUserInfo);

    popupEditProfile.closePopup();
  });
};

//функция открытия popup с карточкой
function handleCardClick(link, name) {
  popupShowCard.openPopup(name, link);
}

function renderPlace(place) {
  const userInfo = userProfileInfo.getUserInfo();
  const card = new Card(place, userInfo, placesTemplateElement, popupWithConfirm, handleCardClick);

  return card.render();
}

//рендер и добавоение карточки
function renderAndAddPlace(place) {
  const renderedPlace = renderPlace(place);
  this.addItem(renderedPlace);
}

//функция открытия popup add
const openPopupAddPlace = function (_event) {
  placeNameInput.value = '';
  placeLinkInput.value = '';

  placeNameInput.dispatchEvent(new Event('input'));

  popupAddCard.openPopup();
};

//функция открытия popup edit avatar
const openPopupEditAvatar = function (_event) {
  avatarLinkInput.value = '';

  avatarLinkInput.dispatchEvent(new Event('input'));

  popupEditAvatar.openPopup();
};

//добавление новой карточки на страницу
const handleAddPlaceSubmit = (formData) => {
  const placePayload = {
    name: formData['place-name'],
    link: formData['place-link'],
  };

  api.postCard(placePayload).then((data) => {
    const boundRendered = renderAndAddPlace.bind(cardsSection);

    boundRendered(data);

    popupAddCard.closePopup();
    placeNameInput.dispatchEvent(new Event('input'));
  });
};

const handleEditAvatarSubmit = (formData) => {
  const userInfo = {
    avatar: formData['avatar-link'],
  };

  api.updateAvatar(userInfo).then((updatedUserInfo) => {
    userProfileInfo.setUserInfo(updatedUserInfo);
  });
  popupEditAvatar.closePopup();
};

// bind toggle to popups
popupEditOpenBtn.addEventListener('click', openPopupEditProfile);
popupAddOpenBtn.addEventListener('click', openPopupAddPlace);
editAvatarBtn.addEventListener('click', openPopupEditAvatar);

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
const popupEditAvatar = new PopupWithForm('.popup_edit-avatar', handleEditAvatarSubmit);
const popupWithConfirm = new PopupWithConfirm('.popup-card-del');

//устанавливаем слушатели
popupEditProfile.setEventListeners();
popupAddCard.setEventListeners();
popupShowCard.setEventListeners();
popupEditAvatar.setEventListeners();
popupWithConfirm.setEventListeners();

//добовоение счетчика лайков (стили )

// const likeCounter = document.querySelector('.place__likes-counter');
// likeCounter.style.display = 'block';

// const likeBtn = document.querySelector('.place__like-btn');
// likeBtn.style = 'grid-row: 1/2';

// updateCardHandler() {
//   const cardPayload = {
//     name : '123',
//     link: '123',
//   }

const userProfileInfo = new UserInfo(userNameSelector, userOccupationSelector, userAvatarSelector);

//Получаем карточки с сервера
const cardsSection = new Section(
  {
    renderer: renderAndAddPlace,
  },
  placesContainerSelector
);

api.getUserInfo().then((userInfo) => {
  userProfileInfo.setUserInfo(userInfo);

  api.getInitialCards().then((items) => {
    cardsSection.renderAllItems(items);
  });
});
