import { putLike, deleteLike, deleteCard } from './api.js';  // Импортируем функции для работы с лайками

const cardTemplate = document.querySelector('#card-template').content;



// Функция удаления карточки
function handleDeleteCard(evt, cardId) {
  const eventTarget = evt.target;

   // Отправляем запрос на удаление карточки с сервера
   deleteCard(cardId)
   .then((data) => {
     console.log('Карточка удалена с сервера:', data);
     // Удаляем карточку из DOM только после успешного ответа удаления с сервера
     eventTarget.closest('.places__item').remove();
   })
   .catch((error) => {
     console.error('Ошибка при удалении карточки:', error);
   });
}

// Функция копирования клонированного шаблона карточки
function getCardTemplate() {
  return cardTemplate.querySelector('.places__item').cloneNode(true);
}

//Функция лайка карточки
function handleLikeClick(element, likeButton, likeCounter) {
  // Если лайкнут — убираем лайк, иначе ставим лайк
  if (likeButton.classList.contains('card__like-button_is-active')) {
    // Убираем лайк
    deleteLike(element._id)
      .then((updatedCard) => {
        likeButton.classList.remove('card__like-button_is-active');
        likeCounter.textContent = updatedCard.likes.length;
      })
      .catch((error) => console.error('Ошибка при снятии лайка:', error));
  } else {
    // Ставим лайк
    putLike(element._id)
      .then((updatedCard) => {
        likeButton.classList.add('card__like-button_is-active');
        likeCounter.textContent = updatedCard.likes.length;
      })
      .catch((error) => console.error('Ошибка при добавлении лайка:', error));
  }
}

// Функция создания карточки
function createCard(element, handleLikeClick, handleDeleteCard, handleImageClick) {
  const cardElement = getCardTemplate();
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  const likeCounter = cardElement.querySelector('.card__like-counter');

  cardImage.src = element.link;
  cardImage.alt = element.alt;
  cardTitle.textContent = element.name;

    // Отображаем количество лайков
    likeCounter.textContent = element.likes ? element.likes.length : 0;
  
// Подсветка лайка, если пользователь уже лайкал
if (element.likes && element.currentUserId) {
  const isLiked = element.likes.some(like => like._id === element.currentUserId);
  if (isLiked) {
    likeButton.classList.add('card__like-button_is-active');
  }
}

// Скрываем кнопку удаления, если карточка не принадлежит текущему пользователю
if (element.owner._id !== element.currentUserId) {
  deleteButton.style.display = 'none';
} else {
  // Если это моя карточка, прикрепляем обработчик удаления
  deleteButton.addEventListener('click', (evt) => handleDeleteCard(evt, element._id));
}

  cardImage.addEventListener('click', () => handleImageClick(element));
  likeButton.addEventListener('click', () => handleLikeClick(element, likeButton, likeCounter));

  return cardElement;
}

export { createCard, handleLikeClick, handleDeleteCard };
