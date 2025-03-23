// @todo: Темплейт карточки

const cardTemplate = document.querySelector('#card-template').content;
const placesList = document.querySelector('.places__list');

initialCards.forEach(function(element) {
  // клонируем содержимое тега template
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  // наполняем содержимым
  cardElement.querySelector('.card__image').src = element.link;
  cardElement.querySelector('.card__title').textContent = element.name;
  // добавляем на страницу
  placesList.append(cardElement);
});








// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
