//функция изменения текста на кнопке и блокировки кнопки
export function handleButtonState(submitButton, isLoading) {
  if (isLoading) {
    submitButton.textContent = 'Сохранение...';  // Изменяем текст на кнопке на "Сохранение..."
    submitButton.disabled = true;  // Отключаем кнопку, чтобы избежать повторных кликов
  } else {
    submitButton.textContent = 'Сохранить';  // Восстанавливаем исходный текст
    submitButton.disabled = false;  // Включаем кнопку обратно
  }
}