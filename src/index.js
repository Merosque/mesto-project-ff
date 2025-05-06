import './pages/index.css';
import { initialCards } from './cards.js';
import { closePopup, openPopup, popups } from "./components/modal.js";
import { createCard, handleLikeClick, handleDeleteCard, handleImageClick } from './components/card.js'; // импорт логики карточек

//значения имени и занятия по дефолту в профиле
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

//кнопки
const editButton = document.querySelector('.profile__edit-button');
const editPopup = document.querySelector('.popup_type_edit');
const newCardPopup = document.querySelector('.popup_type_new-card');
const addCardButton = document.querySelector('.profile__add-button');

//DOM элемент списка мест
const placesList = document.querySelector('.places__list');

// Функция добавления карточки в начало
function renderCard(dataAboutPlace) {
  const readyCard = createCard(dataAboutPlace, handleLikeClick, handleDeleteCard,
  handleImageClick);
  placesList.prepend(readyCard); // Добавляем в начало
}

// Отрисовка стартовых карточек
initialCards.forEach(renderCard);

// Находим формы в DOM
const formElementEditProfile = document.querySelector(".popup__form[name='edit-profile']");
const formElementAddCard = document.querySelector(".popup__form[name='new-place']");

// Находим поля формы в DOM
const userNameInput = document.querySelector('.popup__input_type_name');
const placeNameInput = document.querySelector('.popup__input_type_card-name');
const jobInput = document.querySelector('.popup__input_type_description');
const placeLinkInput = document.querySelector('.popup__input_type_url');

//Обработчик открытия формы редактирования профиля и подставка дефолтных значений
const handleEditProfileDefaultValue = () => {
  userNameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
  openPopup(editPopup);
};

//Обработчик открытия формы добавления новой карточки
const handleAddCard = () => {
  formElementAddCard.reset(); // сбрасываем поля
  openPopup(newCardPopup);
};

// Прикрепляем обработчик открытия формы к кнопке добавить новую карточку
addCardButton.addEventListener('click', handleAddCard);

// Прикрепляем обработчик открытия формы к кнопке редактировать профиль
editButton.addEventListener("click", handleEditProfileDefaultValue);

// Обработчик отправки формы редактирования профиля
function handleFormSubmitEditProfile(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  const userJob = jobInput.value;
  const userName = userNameInput.value;
  profileDescription.textContent = userJob;
  profileName.textContent = userName;
  closePopup(editPopup);
}

// Прикрепляем обработчик отправки к кнопке "сохранить" формы редактирования профиля
formElementEditProfile.addEventListener('submit', handleFormSubmitEditProfile);

// Обработчик отправки формы добавления карточки
function handleFormSubmitAddCard(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  const userPlaceName = placeNameInput.value;
  const userPlaceUrl = placeLinkInput.value;

  renderCard({
    name: userPlaceName,
    link: userPlaceUrl,
    alt: userPlaceName
  },
  
  handleLikeClick,
  handleDeleteCard,
  handleImageClick
);

  formElementAddCard.reset();
  closePopup(newCardPopup);
}

// Прикрепляем обработчик отправки к кнопке "сохранить" формы добавления карточки
formElementAddCard.addEventListener('submit', handleFormSubmitAddCard);

// Закрытие попапа по клику на оверлей
popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target === popup) {
      closePopup(popup);
    }
  })
});


