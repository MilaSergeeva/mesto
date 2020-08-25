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

  api
    .updateUserInfo(userInfo)
    .then((updatedUserInfo) => {
      userProfileInfo.setUserInfo(updatedUserInfo);

      popupEditProfile.closePopup();
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    });
};

//функция открытия popup с карточкой
function handleCardClick(link, name) {
  popupShowCard.openPopup(name, link);
}

function renderPlace(place) {
  const userInfo = userProfileInfo.getUserInfo();
  const card = new Card(place, userInfo, placesTemplateElement, popupWithConfirm, handlers);

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

  api
    .postCard(placePayload)
    .then((data) => {
      const boundRendered = renderAndAddPlace.bind(cardsSection);

      boundRendered(data);

      popupAddCard.closePopup();
      placeNameInput.dispatchEvent(new Event('input'));
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    });
};

const handleEditAvatarSubmit = (formData) => {
  const userInfo = {
    avatar: formData['avatar-link'],
  };

  api
    .updateAvatar(userInfo)
    .then((updatedUserInfo) => {
      userProfileInfo.setUserInfo(updatedUserInfo);
      console.log(updatedUserInfo);
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    });
  popupEditAvatar.closePopup();
};

const clickLikeHandler = (event, place, likesCounter) => {
  if (event.target.classList.contains('place__like-btn_on')) {
    api
      .deleteLikeCard(place._id)
      .then((cardInfo) => {
        event.target.classList.toggle('place__like-btn_on');

        likesCounter.textContent = cardInfo.likes.length;
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
  } else {
    api
      .likeCard(place._id)
      .then((cardInfo) => {
        event.target.classList.toggle('place__like-btn_on');

        likesCounter.textContent = cardInfo.likes.length;
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
  }
};

const clickDeleteHandler = (placeObject, cardElement) => {
  popupWithConfirm.setOnPopupConfirm(() => {
    api.deleteCard(placeObject._id).then(() => {
      cardElement.remove();
    });
  });

  popupWithConfirm.openPopup();
};

const handlers = {
  handleCardClick: handleCardClick,
  cardLikeHandler: clickLikeHandler,
  cardDeleteHandler: clickDeleteHandler,
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

// init popups
const popupEditProfile = new PopupWithForm('.popup_edit', handleEditProfileSubmit);
const popupAddCard = new PopupWithForm('.popup_add', handleAddPlaceSubmit);
const popupShowCard = new PopupWithImage('.popup-pic');
const popupEditAvatar = new PopupWithForm('.popup_edit-avatar', handleEditAvatarSubmit);
const popupWithConfirm = new PopupWithConfirm('.popup-card-del');

popupEditProfile.setEventListeners();
popupAddCard.setEventListeners();
popupShowCard.setEventListeners();
popupEditAvatar.setEventListeners();
popupWithConfirm.setEventListeners();

const userProfileInfo = new UserInfo(userNameSelector, userOccupationSelector, userAvatarSelector);

//Получаем карточки с сервера
const cardsSection = new Section(
  {
    renderer: renderAndAddPlace,
  },
  placesContainerSelector
);

// api.getUserInfo().then((userInfo) => {
//   userProfileInfo.setUserInfo(userInfo);
//   api.getInitialCards().then((items) => {
//     cardsSection.renderAllItems(items);
//   });
// });

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then((res) => {
    const [userInfo, items] = res;

    userProfileInfo.setUserInfo(userInfo);
    cardsSection.renderAllItems(items);
  })
  .catch((err) => {
    console.log(err); // выведем ошибку в консоль
  });
