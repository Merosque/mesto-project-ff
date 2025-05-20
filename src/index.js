import './pages/index.css';
import { closePopup, openPopup, popups } from "./components/modal.js";
import { createCard, handleLikeClick, handleDeleteCard, handleImageClick } from './components/card.js'; // импорт логики карточек
import { getUserInfo, getInitialCards, updateUserInfo, addNewCard, updateAvatar } from './components/api.js'; // импорт API-функций
import { enableValidation, clearValidation } from './components/validation.js';

//значения имени и занятия по дефолту в профиле
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileAvatar = document.querySelector(".profile__image"); // для отображения аватара

//кнопки
const editButton = document.querySelector('.profile__edit-button');
const editPopup = document.querySelector('.popup_type_edit');
const newCardPopup = document.querySelector('.popup_type_new-card');
const addCardButton = document.querySelector('.profile__add-button');

//DOM элемент списка мест
let placesList = document.querySelector('.places__list');

// Функция добавления карточки в начало
function renderCard(dataAboutPlace) {
  const readyCard = createCard(dataAboutPlace, handleLikeClick, handleDeleteCard, handleImageClick);
  placesList.prepend(readyCard); // Добавляем в начало
}

// Загрузка информации о пользователе и карточек с сервера
document.addEventListener('DOMContentLoaded', () => {
  // Загружаем данные о пользователе и карточки параллельно с использованием Promise.all
  Promise.all([getUserInfo(), getInitialCards()])
    .then(([userData, cards]) => {
      // Обновляем DOM с полученными данными о пользователе
      profileName.textContent = userData.name;
      profileDescription.textContent = userData.about;
      profileAvatar.style.backgroundImage = `url(${userData.avatar})`;
      profileName.dataset.userId = userData._id; 

      // Отображаем карточки
        cards.forEach((cardData) => {
        // Передаем currentUserId в данные карточки
          cardData.currentUserId = userData._id; // Добавляем currentUserId

          const cardElement = createCard(cardData, handleLikeClick, handleDeleteCard, handleImageClick);
          placesList.appendChild(cardElement);
        });
    })
    .catch((error) => {
      console.error('Ошибка при загрузке данных:', error);
    });
});

// Находим формы в DOM
const formElementEditProfile = document.querySelector(".popup__form[name='edit-profile']");
const formElementAddCard = document.querySelector(".popup__form[name='new-place']");
const formElementEditAvatar = document.querySelector(".popup__form[name='edit-avatar']");
const avatarPopup = document.querySelector('.popup_type_avatar');

// Находим поля формы в DOM
const userNameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const placeNameInput = document.querySelector('.popup__input_type_card-name');
const placeLinkInput = document.querySelector('.popup__input_type_url');

//функция изменения текста на кнопке и блокировки кнопки
function handleButtonState(submitButton, isLoading) {
  if (isLoading) {
    submitButton.textContent = 'Сохранение...';  // Изменяем текст на кнопке на "Сохранение..."
    submitButton.disabled = true;  // Отключаем кнопку, чтобы избежать повторных кликов
  } else {
    submitButton.textContent = 'Сохранить';  // Восстанавливаем исходный текст
    submitButton.disabled = false;  // Включаем кнопку обратно
  }
}


//Обработчик открытия формы редактирования профиля и подставка дефолтных значений
const handleEditProfileDefaultValue = () => {
  userNameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
  openPopup(editPopup);
  clearValidation(formElementEditProfile, validationConfig);
};

//Обработчик открытия формы добавления новой карточки
const handleAddCard = () => {
  formElementAddCard.reset(); // сбрасываем поля
  openPopup(newCardPopup);
  clearValidation(formElementAddCard, validationConfig);
};

// Прикрепляем обработчик открытия формы к кнопке добавить новую карточку
addCardButton.addEventListener('click', handleAddCard);

// Прикрепляем обработчик открытия формы к кнопке редактировать профиль
editButton.addEventListener("click", handleEditProfileDefaultValue);

// Обработчик отправки формы редактирования профиля
function handleFormSubmitEditProfile(evt) {
  evt.preventDefault();
  const userJob = jobInput.value;
  const userName = userNameInput.value;

  const submitButton = evt.submitter; // Кнопка "Сохранить"
  handleButtonState(submitButton, true);  // Включаем состояние загрузки

  updateUserInfo(userName, userJob)
    .then((data) => {
      profileName.textContent = data.name;
      profileDescription.textContent = data.about;
      closePopup(editPopup);
    })
    .catch(err => {
      console.error('Ошибка при обновлении профиля:', err);
    }).finally(() => {
      handleButtonState(submitButton, false);  // Восстанавливаем кнопку
    });
}

// Прикрепляем обработчик отправки к кнопке "сохранить" формы редактирования профиля
formElementEditProfile.addEventListener('submit', handleFormSubmitEditProfile);

// Обработчик отправки формы добавления карточки
function handleFormSubmitAddCard(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

  const submitButton = evt.submitter; // Кнопка "Сохранить"
  handleButtonState(submitButton, true);  // Включаем состояние загрузки

  const userPlaceName = placeNameInput.value;
  const userPlaceUrl = placeLinkInput.value;

 // Отправляем данные на сервер
 addNewCard(userPlaceName, userPlaceUrl)
 .then((newCardData) => {
  // Передаем currentUserId в данные карточки
  newCardData.currentUserId = profileName.dataset.userId;

   // Добавляем карточку на страницу
   renderCard({
      name: newCardData.name,
      link: newCardData.link,
      alt: newCardData.name,
      likes: newCardData.likes,
      currentUserId: newCardData.currentUserId, // Передаем currentUserId в карточку
      owner: newCardData.owner,
   });
   
   // Закрываем попап и сбрасываем форму
   formElementAddCard.reset();
   closePopup(newCardPopup);
 })
 .catch((error) => {
   console.error('Ошибка при добавлении карточки:', error);
 }).finally(() => {
  handleButtonState(submitButton, false);  // Восстанавливаем кнопку
});
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

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'form__input-error_active'
};

// Обработчик открытия попапа изменения аватара
const handleEditAvatar = () => {
  formElementEditAvatar.reset(); // сбрасываем поля
  openPopup(avatarPopup);
  clearValidation(formElementEditAvatar, validationConfig);
};

// Прикрепляем обработчик открытия формы к кнопке редактировать аватар
profileAvatar.addEventListener("click", handleEditAvatar);

//Обработчик отправки формы изменения аватара
function handleFormSubmitEditAvatar(evt) {
  evt.preventDefault();  // отменяем стандартную отправку формы
  const avatarUrl = evt.target.avatar.value;  // получаем новый URL

  const submitButton = evt.submitter; // Кнопка "Сохранить"
  handleButtonState(submitButton, true);  // Включаем состояние загрузки

  updateAvatar(avatarUrl)
    .then((data) => {
      // обновляем аватар на странице
      profileAvatar.style.backgroundImage = `url(${data.avatar})`;

      // Закрываем попап и сбрасываем форму
      formElementEditAvatar.reset();
      closePopup(avatarPopup);
    })
    .catch((error) => {
      console.error('Ошибка при обновлении аватара:', error);
    }).finally(() => {
      handleButtonState(submitButton, false);  // Восстанавливаем кнопку
    });
}

// Обработчик отправки формы изменения аватара
formElementEditAvatar.addEventListener('submit', handleFormSubmitEditAvatar);

enableValidation(validationConfig);
