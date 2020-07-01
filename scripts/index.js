const popupEditOpenBtn = document.querySelector('.profile-info__edit-button');
const popupAddOpenBtn = document.querySelector('.profile__add-button'); //добавляем кнопку добавить


// edit user popup
const popupEdit = document.querySelector('.popup_edit');
const userName = document.querySelector('.profile-info__name');
const userOccupation = document.querySelector('.profile-info__occupation');
const nameInput = document.querySelector('input[name="user-name"]');
const occupationInput = document.querySelector('input[name="user-occupation"]');
const editProfileForm = popupEdit.querySelector('.popup__form');
const popupEditCloseBtn = popupEdit.querySelector('.popup__close');

// add place popup
const popupAdd = document.querySelector('.popup_add');
const placeNameInput = popupAdd.querySelector('input[name="place-name"]');
const placeLinkInput = popupAdd.querySelector('input[name="place-link"]');
const addPlaceForm = popupAdd.querySelector('.popup__form');
const popupAddCloseBtn = popupAdd.querySelector('.popup__close');

// Картиночки
const places =  document.querySelector('.places');

const popupPicView = document.querySelector('.popup-pic');
const popupPicImg = document.querySelector('.popup-pic__img');
const popupPicTitle = document.querySelector('.popup-pic__title');
const popupPicViewCloseBtn = popupPicView.querySelector('.popup__close');

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
function editProfileSubmitHandler(event) {
    event.preventDefault();

    userName.textContent = nameInput.value;
    userOccupation.textContent = occupationInput.value;

    popupToggle();
}

function renderPlace(name, link) {
    const placesTemplateElement = document.querySelector('.places-template').content;
    const place = placesTemplateElement.cloneNode(true);

    place.querySelector('.place__title').textContent = name; //заполняем элемент карточки по индексу массива
    
    const img = place.querySelector('.place__img');
    
    img.src = link;
    img.alt = name;
    //Просмотр картинки из галереи
    img.addEventListener('click', popupPlacePicToggle);
    //Бинды иментов для элементов place
    place.querySelector('.place__bin-btn').addEventListener('click', deliteCard);
    place.querySelector('.place__like-btn').addEventListener('click', likeBtnToggle);

    return place;
};

function addPlace(name, link) {
    const renderedPlace = renderPlace(name, link);    

    places.prepend(renderedPlace);
};

initialCards.reverse().forEach(element => {
    addPlace(element.name, element.link);
});

function deliteCard(event) {
    const placeDelite = event.target.closest('.place');
    // remove from array а может быть и нет
    
    placeDelite.remove();
}

//функция закрытия открытия popup add 
const popupAddToggle = function (_event) {
    if (!popupAdd.classList.contains('popup_opened')) {
        placeNameInput.value = "";
        placeLinkInput.value = "";
    }

    popupAdd.classList.toggle('popup_opened');
}

//функция ставим лайк
function likeBtnToggle(event) {
    event.target.classList.toggle('place__like-btn_on');
};

function addPlaceSubmitHandler(event) {
    event.preventDefault();
    
    const arrElement = { 
        name: placeNameInput.value,
        link: placeLinkInput.value
    };

    initialCards.unshift(arrElement);
    addPlace(arrElement.name, arrElement.link);

    popupAddToggle();
}
//закрытие popup Add через overlay
const popupAddOverlayClose = function (event) {
    if (event.target !== event.currentTarget) {
        return;
    }
    
    popupAddToggle();
}

//функция открытия  закрытия popup с просмотром картинки
function popupPlacePicToggle(_event) {
    if (!popupPicView.classList.contains('popup-pic_opened')) {  
        popupPicImg.src = event.target.src;
        popupPicTitle.textContent = event.target.alt;
    }

    popupPicView.classList.toggle('popup-pic_opened');
};

//закрытие popup PicView через overlay
const popupPicViewOverlayClose = function (event) {
    if (event.target !== event.currentTarget) {
        return;
    }

    popupPlacePicToggle();
};

//закрытие просмотра картинки
popupPicViewCloseBtn.addEventListener('click', popupPlacePicToggle);
popupPicView.addEventListener('click', popupPicViewOverlayClose)

// bind toggle to popups
popupEditOpenBtn.addEventListener('click', popupToggle);
popupAddOpenBtn.addEventListener('click', popupAddToggle);
popupEditCloseBtn.addEventListener('click', popupToggle);
popupAddCloseBtn.addEventListener('click', popupAddToggle);

// close on overlay click
popupEdit.addEventListener('click', popupOverlayClose);
popupAdd.addEventListener('click', popupAddOverlayClose);

// submit events
editProfileForm.addEventListener('submit', editProfileSubmitHandler);
addPlaceForm.addEventListener('submit', addPlaceSubmitHandler);
