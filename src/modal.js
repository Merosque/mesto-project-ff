// Найдём все попапы 
const popups = document.querySelectorAll('.popup');

// Функция открытия попапа 
function openPopup(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', handleEscClose);
}

// Функция закрытия попапа 
function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', handleEscClose);
}

// Закрытие попапа по клавише Escape 
function handleEscClose(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
}

// Закрытие попапа по клику на оверлей или на крестик 
popups.forEach((popup) => {
  // Клик по оверлею
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target === popup) {
      closePopup(popup);
    }
  });

  // Клик по крестику
  const closeButton = popup.querySelector('.popup__close');
  if (closeButton) {
    closeButton.addEventListener('click', () => closePopup(popup));
  }
});

// Кнопки открытия попапов 
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const editPopup = document.querySelector('.popup_type_edit');
const newCardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');

// Открытие попапов по кнопкам 
editButton.addEventListener('click', () => openPopup(editPopup));
addButton.addEventListener('click', () => openPopup(newCardPopup));

// Открытие попапа изображения по клику на изображение карточки
document.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('card__image')) {
    const popupImage = imagePopup.querySelector('.popup__image');
    const popupCaption = imagePopup.querySelector('.popup__caption');

    popupImage.src = evt.target.src;
    popupImage.alt = evt.target.alt;
    popupCaption.textContent = evt.target.alt;

    openPopup(imagePopup);
  }
});
