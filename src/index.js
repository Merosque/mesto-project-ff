import './pages/index.css';
import { initialCards } from './cards.js';
import './modal.js';
import { closePopup, editPopup, openPopup } from "./modal.js";

const cardTemplate = document.querySelector('#card-template').content;
const placesList = document.querySelector('.places__list');

//значения по дефолту в профиле
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

//кнопка редактирования профиля
const editButton = document.querySelector('.profile__edit-button');


function removeCard(evt) {
  const eventTarget = evt.target;
  eventTarget.closest('.places__item').remove();
}

function renderCard(dataAboutPlace) {
  const readyCard = createCard(dataAboutPlace);
  placesList.append(readyCard);
}

function createCard(element) {
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  cardElement.querySelector('.card__image').src = element.link;
  cardElement.querySelector('.card__image').alt = element.alt;
  cardElement.querySelector('.card__title').textContent = element.name;
  const deleteButton = cardElement.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', removeCard);
  return cardElement;
}

initialCards.forEach(renderCard);

// Находим форму в DOM
const formElement = document.querySelector(".popup__form[name='edit-profile']");
// Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
const nameInput = document.querySelector('.popup__input_type_name')
// Воспользуйтесь инструментом .querySelector()
const jobInput = document.querySelector('.popup__input_type_description')
// Воспользуйтесь инструментом .querySelector()

//Обработчик открытия формы редактирования профиля и подставка дефолтных значений
const handleEditProfileDefaultValue = () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
  openPopup(editPopup);
};

// Прикрепляем обработчик к кнопке редактировать профиль:
// он будет следить за событием нажатием кнопки
editButton.addEventListener("click", handleEditProfileDefaultValue);

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    // Так мы можем определить свою логику отправки.
    // О том, как это делать, расскажем позже.

    // Получите значение полей jobInput и nameInput из свойства value
    const userJob = jobInput.value;
    const userName = nameInput.value;

    // Вставьте новые значения с помощью textContent
    profileDescription.textContent = userJob;
    profileName.textContent = userName;
    closePopup(editPopup);
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);

//Обработчик открытия формы редактирования профиля и подставка дефолтных значений
