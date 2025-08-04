// Основная логика сайта
// Подключение интерактивных элементов: меню, навигация, загрузка проектов, форма и инициалиация анимаций

document.addEventListener("DOMContentLoaded", () => {
  // 1. Toggle мобильного меню
  const menuToggle = document.querySelector(".menu-toggle");
  const navList = document.querySelector(".nav-list");
  if (menuToggle && navList) {
    menuToggle.addEventListener("click", () => {
      const expanded = navList.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", String(expanded));
    });
  }

  // 2. Плавная прокрутка к секциям
  document.querySelectorAll('nav a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const target = document.querySelector(link.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
      // Закрыть мобильное меню после клика
      if (navList && navList.classList.contains("open")) {
        navList.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
      }
    });
  });

  // 3. Загрузка и рендеринг проектов из data/projects.json
  const projectsContainer = document.querySelector(".projects-container");
  if (projectsContainer) {
    (async () => {
      try {
        const response = await fetch("data/projects.json");
        if (!response.ok) {
          throw new Error(`HTTP error ${response.status}`);
        }
        const data = await response.json();
        data.projects.forEach((project, index) => {
          const card = document.createElement("div");
          card.className = "project-card";
          card.style.animationDelay = `${index * 0.2}s`;

          const img = document.createElement("img");
          img.src = project.image;
          img.alt = project.title;
          img.className = "project-image";
          img.loading = "lazy";

          const info = document.createElement("div");
          info.className = "project-info";

          const title = document.createElement("h3");
          title.className = "project-title";
          title.textContent = project.title;

          const desc = document.createElement("p");
          desc.className = "project-desc";
          desc.textContent = project.description;

          const link = document.createElement("a");
          link.href = project.link;
          link.className = "project-link btn";
          link.target = "_blank";
          link.rel = "noopener noreferrer";
          link.textContent = "Перейти";

          info.append(title, desc, link);
          card.append(img, info);
          projectsContainer.append(card);
        });
      } catch (error) {
        console.error("Ошибка загрузки проектов:", error);
      }
    })();
  }

  // 4. Обработка отправки контактной формы
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const name = contactForm.elements["name"].value.trim();
      const email = contactForm.elements["email"].value.trim();
      const message = contactForm.elements["message"].value.trim();

      if (!name || !email || !message) {
        alert("Пожалуйста, заполните все поля.");
        return;
      }

      // TODO: заменить на реальный отправщик (EmailJS, fetch в API и т.п.)
      alert("Спасибо! Ваше сообщение отправлено.");
      contactForm.reset();
    });
  }
  // 5. Инициализация фоновой анимации пузырьков
  if (typeof initBubbles === "function") {
    initBubbles();
  }

  // 6. Показ/скрытие игры Tower
  const towerToggle = document.getElementById("tower-toggle");
  const towerWrapper = document.getElementById("tower-wrapper");
  if (towerToggle && towerWrapper) {
    towerToggle.addEventListener("click", () => {
      towerWrapper.hidden = !towerWrapper.hidden;
      towerToggle.setAttribute("aria-expanded", String(!towerWrapper.hidden));
    });
  }
});
