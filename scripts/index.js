const popupOpenBtn = document.querySelector('.profile-info__popup-open');
const popup = document.querySelector('.popup');
const popupSaveBtn = popup.querySelector('.popup_btn-save');
const popupCloseBtn = popup.querySelector('.popup__close');


// Присваем модификатор для отрадения попап на странице
const popupToggle = function (event) {
    popup.classList.toggle('popup_opened');
}

const popupOverlayClose = function (event) {
    if (event.target !== event.currentTarget) {return}
    popupToggle()    
}


popupOpenBtn.addEventListener('click',popupToggle);
popupCloseBtn.addEventListener('click',popupToggle);
popup.addEventListener('click',popupOverlayClose);


const userName = document.querySelector('.profile-info__name');
const userOccupation = document.querySelector('.profile-info__occupation');
const nameInput = document.querySelector('.popup__name');
const occupationInput = document.querySelector('.popup__occupation');
nameInput.value = userName.textContent;
occupationInput.value = userOccupation.textContent

let saveElement = popup.querySelector('.popup_btn-save');
function formSubmitHandler (event) {
    event.preventDefault();
    userName.textContent = nameInput.value;
    userOccupation.textContent = occupationInput.value;   
}

saveElement.addEventListener('click',formSubmitHandler);


 