// Основная логика сайта
// Подключение интерактивных элементов: меню, навигация, загрузка проектов, форма и инициалиация анимаций

document.addEventListener('DOMContentLoaded', () => {
  // 1. Toggle мобильного меню
  const menuToggle = document.querySelector('.menu-toggle');
  const navList = document.querySelector('.nav-list');
  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      navList.classList.toggle('open');
    });
  }

  // 2. Плавная прокрутка к секциям
  document.querySelectorAll('nav a[href^="#"]').forEach(link => {
    link.addEventListener('click', event => {
      event.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
      // Закрыть мобильное меню после клика
      if (navList.classList.contains('open')) {
        navList.classList.remove('open');
      }
    });
  });

  // 3. Загрузка и рендеринг проектов из data/projects.json
  const projectsContainer = document.querySelector('.projects-container');
  if (projectsContainer) {
    fetch('data/projects.json')
      .then(response => response.json())
      .then(data => {
        data.projects.forEach(project => {
          const card = document.createElement('div');
          card.className = 'project-card';
          card.innerHTML = `
            <img src="${project.image}" alt="${project.title}" class="project-image">
            <div class="project-info">
              <h3 class="project-title">${project.title}</h3>
              <p class="project-desc">${project.description}</p>
              <a href="${project.link}" class="project-link" target="_blank" rel="noopener">Перейти</a>
            </div>
          `;
          projectsContainer.append(card);
        });
      })
      .catch(error => console.error('Ошибка загрузки проектов:', error));
  }

  // 4. Обработка отправки контактной формы
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', event => {
      event.preventDefault();
      // TODO: заменить на реальный отправщик (EmailJS, fetch в API и т.п.)
      alert('Спасибо! Ваше сообщение отправлено.');
      contactForm.reset();
    });
  }

  // 5. Инициализация фоновой анимации пузырьков
  if (typeof initBubbles === 'function') {
    initBubbles();
  }
});
