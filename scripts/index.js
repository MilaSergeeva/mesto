const popupOpenBtn = document.querySelector('.profile-info__edit-button');
const popup = document.querySelector('.popup');
const popupSaveBtn = popup.querySelector('.popup__btn-save');
const popupCloseBtn = popup.querySelector('.popup__close');
const userName = document.querySelector('.profile-info__name');
const userOccupation = document.querySelector('.profile-info__occupation');
const nameInput = document.querySelector('input[name="user-name"]');
const occupationInput = document.querySelector('input[name="user-occupation"]');
const saveElement = popup.querySelector('.popup__form');


const popupToggle = function (_event) {
    popup.classList.toggle('popup_opened');
    nameInput.value = userName.textContent;
    occupationInput.value = userOccupation.textContent;
}

const popupOverlayClose = function (event) {
    if (event.target !== event.currentTarget) {
        return;
    }
    
    popupToggle();
}


function formSubmitHandler(event) {
    event.preventDefault();

    userName.textContent = nameInput.value;
    userOccupation.textContent = occupationInput.value;

    popupToggle();
}


popupOpenBtn.addEventListener('click', popupToggle);
popupCloseBtn.addEventListener('click', popupToggle);
popup.addEventListener('click', popupOverlayClose);
saveElement.addEventListener('submit', formSubmitHandler);
 