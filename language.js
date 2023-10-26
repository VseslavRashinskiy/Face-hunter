document.addEventListener('DOMContentLoaded', function() {
  const langToggle = document.getElementById('lang-toggle');
  const themeToggle = document.getElementById('theme-toggle');
  const webcamButton = document.getElementById('webcam');

  const russianText = {
    buttonText: 'Сменить язык',
    theme: 'Сменить тему',
    webcam: 'Запуск веб-камеры',
  };

  const englishText = {
    buttonText: 'Change Language',
    theme: 'Change theme',
    webcam: 'Start webcam',
  };

  let isRussian = true;

  function toggleLanguage() {
    if (isRussian) {
      langToggle.textContent = englishText.buttonText;
      themeToggle.textContent = englishText.theme;
      webcamButton.value = englishText.webcam;
    } else {
      langToggle.textContent = russianText.buttonText;
      themeToggle.textContent = russianText.theme;
      webcamButton.value = russianText.webcam;
    }
    isRussian = !isRussian;
  }

  langToggle.addEventListener('click', toggleLanguage);
});
