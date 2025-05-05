import './pages/index.css';
import { initialCards } from './cards.js';
import './modal.js';

const cardTemplate = document.querySelector('#card-template').content;
const placesList = document.querySelector('.places__list');

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

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    // Так мы можем определить свою логику отправки.
    // О том, как это делать, расскажем позже.

    // Получите значение полей jobInput и nameInput из свойства value
    const userJob = jobInput.value;
    const userName = nameInput.value;
       
    // Выберите элементы, куда должны быть вставлены значения полей
    const profileTitle = document.querySelector(".profile__title");
    const profileDescription = document.querySelector(".profile__description");

    // Вставьте новые значения с помощью textContent
    profileDescription.textContent = userJob;
    profileTitle.textContent = userName;
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);