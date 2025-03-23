const cardTemplate = document.querySelector('#card-template').content;
const placesList = document.querySelector('.places__list');

function removeCard(evt) {
  const eventTarget = evt.target;
  eventTarget.parentElement.remove();
}

initialCards.forEach(function(element) {
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  cardElement.querySelector('.card__image').src = element.link;
  cardElement.querySelector('.card__title').textContent = element.name;
  const deleteButton = cardElement.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', removeCard);
  placesList.append(cardElement);
});