import { openPopup } from './modal.js';

const cardTemplate = document.querySelector('#card-template').content;
const imagePopup = document.querySelector('.popup_type_image');
const popupImage = imagePopup.querySelector('.popup__image');
const popupCaption = imagePopup.querySelector('.popup__caption');

// Функция удаления карточки
function handleDeleteCard(evt) {
  const eventTarget = evt.target;
  eventTarget.closest('.places__item').remove();
}

// Функция копирования клонированного шаблона карточки
function getCardTemplate() {
  return cardTemplate.querySelector('.places__item').cloneNode(true);
}

//Функция лайка карточки
function handleLikeClick(evt) {
  evt.target.classList.toggle('card__like-button_is-active');
}

// Функция открытия попапа изображения по клику на изображение карточки
function handleImageClick(element) {
  popupImage.src = element.link;
  popupImage.alt = element.alt;
  popupCaption.textContent = element.alt;
  openPopup(imagePopup);
}

// Функция создания карточки
function createCard(element, handleLikeClick, handleDeleteCard, handleImageClick) {
  const cardElement = getCardTemplate();
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');

  cardImage.src = element.link;
  cardImage.alt = element.alt;
  cardTitle.textContent = element.name;
  
  cardImage.addEventListener('click', () => handleImageClick(element));
  deleteButton.addEventListener('click', handleDeleteCard);
  likeButton.addEventListener('click', handleLikeClick);

  return cardElement;
}

export { createCard, handleLikeClick, handleDeleteCard, handleImageClick };
