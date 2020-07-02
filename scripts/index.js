const popupEditOpenBtn = document.querySelector('.profile-info__edit-button');
const popupAddOpenBtn = document.querySelector('.profile__add-button'); //добавляем кнопку добавить


// edit user popup
const popupEdit = document.querySelector('.popup_edit');
const userName = document.querySelector('.profile-info__name');
const userOccupation = document.querySelector('.profile-info__occupation');
const nameInput = document.querySelector('input[name="user-name"]');
const occupationInput = document.querySelector('input[name="user-occupation"]');
const profileFormEdit = popupEdit.querySelector('.popup__form');
const popupEditCloseBtn = popupEdit.querySelector('.popup__close');

// add place popup
const popupAdd = document.querySelector('.popup_add');
const placeNameInput = popupAdd.querySelector('input[name="place-name"]');
const placeLinkInput = popupAdd.querySelector('input[name="place-link"]');
const placeFormAdd = popupAdd.querySelector('.popup__form');
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


const togglePopupClass = function (name, value) {
    name.classList.toggle(value);
};

//Открыть Edit popup, заполнить значениями
const openEditPopup = function (_event) {
    if (!popupEdit.classList.contains('popup_opened')) {
        nameInput.value = userName.textContent;
        occupationInput.value = userOccupation.textContent;
    }

    togglePopupClass(popupEdit, 'popup_opened');
};

// закрыть popup при нажатии на зону вне popup
const closeEditPopupOverlay = function (event) {
    if (event.target !== event.currentTarget) {
        return;
    }
    
    togglePopupClass(popupEdit, 'popup_opened');
};

//Придать новые значения в profile
const handleEditProfileSubmit = function (event) {
    event.preventDefault();

    userName.textContent = nameInput.value;
    userOccupation.textContent = occupationInput.value;

    togglePopupClass(popupEdit, 'popup_opened');
};

//функция открытия  закрытия popup с просмотром картинки
const openClosePopupPlacePic = function (_event) {
    if (!popupPicView.classList.contains('popup-pic_opened')) {  
        popupPicImg.src = event.target.src;
        popupPicTitle.textContent = event.target.alt;
    }

    togglePopupClass(popupPicView, 'popup-pic_opened');
    // popupPicView.classList.toggle('popup-pic_opened');
};

//функция ставим лайк
const handleLikeButton = function (event) {
    event.target.classList.toggle('place__like-btn_on');
};

//рендер карточки места
function renderPlace(name, link) {
    const placesTemplateElement = document.querySelector('.places-template').content;
    const place = placesTemplateElement.cloneNode(true);

    place.querySelector('.place__title').textContent = name; //заполняем элемент карточки по индексу массива
    
    const img = place.querySelector('.place__img');
    
    img.src = link;
    img.alt = name;
    //Просмотр картинки из галереи
    img.addEventListener('click', openClosePopupPlacePic);
    //Бинды иментов для элементов place
    place.querySelector('.place__bin-btn').addEventListener('click', deliteCard);
    place.querySelector('.place__like-btn').addEventListener('click', handleLikeButton);

    return place;
};

function addPlace(name, link) {
    const renderedPlace = renderPlace(name, link);    
    placeNameInput.value = "";
    placeLinkInput.value = "";

    places.prepend(renderedPlace);
};

initialCards.reverse().forEach(element => {
    addPlace(element.name, element.link);
   
});

//удаление карточки
function deliteCard(event) {
    const placeDelite = event.target.closest('.place');
    // remove from array а может быть и нет
    
    placeDelite.remove();
};

//функция открытия popup add 
const openPopupAdd = function (_event) {
    if (!popupAdd.classList.contains('popup_opened')) {
        placeNameInput.value = "";
        placeLinkInput.value = "";
    }

    togglePopupClass(popupAdd, 'popup_opened');
    // popupAdd.classList.toggle('popup_opened');
};



const handleAddPlaceSubmit = function (event) {
    event.preventDefault();
    
    const arrElement = { 
        name: placeNameInput.value,
        link: placeLinkInput.value
    };

    initialCards.unshift(arrElement);
    addPlace(arrElement.name, arrElement.link);

    togglePopupClass(popupAdd, 'popup_opened');
};

//закрытие popup Add через overlay
const closePopupAddOverlay = function (event) {
    if (event.target !== event.currentTarget) {
        return;
    }
    
    togglePopupClass(popupAdd, 'popup_opened');
};



//закрытие popup просмотра картинки через overlay
const closePopupPicViewOverlay = function (event) {
    if (event.target !== event.currentTarget) {
        return;
    }

    togglePopupClass(popupPicView, 'popup-pic_opened');;
};

//закрытие просмотра картинки
popupPicViewCloseBtn.addEventListener('click', openClosePopupPlacePic);
popupPicView.addEventListener('click', closePopupPicViewOverlay)

// bind toggle to popups
popupEditOpenBtn.addEventListener('click', openEditPopup);
popupAddOpenBtn.addEventListener('click', openPopupAdd);
popupEditCloseBtn.addEventListener('click', openEditPopup);
popupAddCloseBtn.addEventListener('click', openPopupAdd);

// close on overlay click
popupEdit.addEventListener('click', closeEditPopupOverlay);
popupAdd.addEventListener('click', closePopupAddOverlay);

// submit events
profileFormEdit.addEventListener('submit', handleEditProfileSubmit);
placeFormAdd.addEventListener('submit', handleAddPlaceSubmit);
