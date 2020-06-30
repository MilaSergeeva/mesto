const popupOpenBtn = document.querySelector('.profile-info__edit-button');
const popups = document.querySelectorAll('.popup');
const popupEdit = document.querySelector('.popup_edit');
const popupAdd = document.querySelector('.popup_add');
const popupSaveBtns = document.querySelectorAll('.popup__btn-save');
const popupCloseBtns = document.querySelectorAll('.popup__close');
const userName = document.querySelector('.profile-info__name');
const userOccupation = document.querySelector('.profile-info__occupation');
const nameInput = document.querySelector('input[name="user-name"]');
const occupationInput = document.querySelector('input[name="user-occupation"]');
const saveElements = document.querySelectorAll('.popup__form');

console.log(popupCloseBtns, popupCloseBtns.length);
// Открыть popup, заполнить значениями, закрыть popup
const popupToggle = function (_event) {
    if (!popupEdit.classList.contains('popup_opened')) {
        nameInput.value = userName.textContent;
        occupationInput.value = userOccupation.textContent;
    }
    popupEdit.classList.toggle('popup_opened');
}

// закрыть popup при нажатии на зону вне popup
const popupOverlayClose = function (event) {
    if (event.target !== event.currentTarget) {
        return;
    }
    
    popupToggle();
}

//Придать новые значения в profile
function formSubmitHandler(event) {
    event.preventDefault();

    userName.textContent = nameInput.value;
    userOccupation.textContent = occupationInput.value;

    popupToggle();
}

popupOpenBtn.addEventListener('click', popupToggle);
popupCloseBtns[0].addEventListener('click', popupToggle);
popups[0].addEventListener('click', popupOverlayClose);

saveElements[0].addEventListener('submit', formSubmitHandler);
saveElements[1].addEventListener('submit', placeSubmitHandler);



const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];


const places =  document.querySelector('.places');
// const placesTemplateElement = document.querySelector('.places-template');
// console.log(placesTemplateElement);

function addPlace(name, link) {
    // const place = placesTemplateElement.сontent.cloneNode(true); //клонируем карточку из tamplate
    const placesTemplateElement = document.querySelector('.places-template').content;
    const place = placesTemplateElement.cloneNode(true);

    place.querySelector('.place__title').textContent = name; //заполняем элемент карточки по индексу массива
    place.querySelector('.place__img').src = link;
    place.querySelector('.place__img').alt = name;
    
    place.querySelector('.place__bin-btn').addEventListener('click', deliteCard);

    places.prepend(place);
};

initialCards.reverse().forEach(element => {
    addPlace(element.name, element.link);
});

function deliteCard(event) {
    const placeDelite = event.target.closest('.place');
    
    placeDelite.remove();
}

let placeNameInput = popups[1].querySelector('input[name="place-name"]');
let placeLinkInput = popups[1].querySelector('input[name="place-link"]');
const popupAddOpenBtn = document.querySelector('.profile__add-button'); //добавляем кнопку добавить

//функция закрытия открытия popup add 
const popupAddToggle = function (_event) {
    if (!popupAdd.classList.contains('popup_opened')) {  
    }
    popupAdd.classList.toggle('popup_opened');
}

popupAddOpenBtn.addEventListener('click', popupAddToggle);
popupCloseBtns[1].addEventListener('click', popupAddToggle);


function placeSubmitHandler(event) {
    event.preventDefault();
    
    const arrElement = { 
        name: placeNameInput.value,
        link: placeLinkInput.value
    };

    initialCards.unshift(arrElement);
    addPlace(arrElement.name, arrElement.link);

    popupAddToggle();
}

const popupAddOverlayClose = function (event) {
    if (event.target !== event.currentTarget) {
        return;
    }
    
    popupAddToggle();
}

popups[1].addEventListener('click', popupAddOverlayClose);