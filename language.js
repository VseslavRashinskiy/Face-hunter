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

  let currentLanguage = localStorage.getItem('language') || 'RU';

  function updateText() {
    if (currentLanguage === 'RU') {
      langToggle.textContent = russianText.buttonText;
      themeToggle.textContent = russianText.theme;
      webcamButton.value = russianText.webcam;
    } else {
      langToggle.textContent = englishText.buttonText;
      themeToggle.textContent = englishText.theme;
      webcamButton.value = englishText.webcam;
    }
  }

  updateText();

  function toggleLanguage() {
    currentLanguage = currentLanguage === 'RU' ? 'EN' : 'RU';
    localStorage.setItem('language', currentLanguage);

    updateText();
  }

  langToggle.addEventListener('click', toggleLanguage);
});
