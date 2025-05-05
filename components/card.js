const cardTemplate = document.querySelector('#card-template').content;
const placesList = document.querySelector('.places__list');

// Функция удаления карточки
function removeCard(evt) {
  const eventTarget = evt.target;
  eventTarget.closest('.places__item').remove();
}

// Функция создания карточки
function createCard(element, handleLike) {
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  cardElement.querySelector('.card__image').src = element.link;
  cardElement.querySelector('.card__image').alt = element.alt;
  cardElement.querySelector('.card__title').textContent = element.name;
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  deleteButton.addEventListener('click', removeCard);
  likeButton.addEventListener('click', handleLike);
  return cardElement;
}

//Функция лайка карточки
function handleLikeClick(evt) {
  evt.target.classList.toggle('card__like-button_is-active');
}

// Функция добавления карточки в начало
function renderCard(dataAboutPlace) {
  const readyCard = createCard(dataAboutPlace, handleLikeClick);
  placesList.prepend(readyCard); // Добавляем в начало
}

export { createCard, renderCard };
