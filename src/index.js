import '../pages/index.css';
import { initialCards } from './cards.js';

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

