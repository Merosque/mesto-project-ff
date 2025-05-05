import './pages/index.css';
import { initialCards } from './cards.js';
import './modal.js';
import { closePopup, openPopup } from "./modal.js";
import { renderCard } from './card.js'; // импорт логики карточек

//значения по дефолту в профиле
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

//кнопки
const editButton = document.querySelector('.profile__edit-button');
const editPopup = document.querySelector('.popup_type_edit');
const newCardPopup = document.querySelector('.popup_type_new-card');
const addCardButton = document.querySelector('.profile__add-button');
const imagePopup = document.querySelector('.popup_type_image');

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

addCardButton.addEventListener('click', () => {
  formElementAddCard.reset(); // сбрасываем поля
  openPopup(newCardPopup);
});

// Прикрепляем обработчик к кнопке редактировать профиль
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
  });

  formElementAddCard.reset();
  closePopup(newCardPopup);
}
formElementAddCard.addEventListener('submit', handleFormSubmitAddCard);
