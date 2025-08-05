const { createApp, ref, onMounted } = Vue;

createApp({
  setup() {
    const isMenuOpen = ref(false);
    const projects = ref([]);
    const form = ref({ name: "", email: "", message: "" });
    const isGameVisible = ref(false);

    const toggleMenu = () => {
      isMenuOpen.value = !isMenuOpen.value;
    };

    const scrollTo = (id) => {
      const target = document.getElementById(id);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
      isMenuOpen.value = false;
    };

    const loadProjects = async () => {
      try {
        const response = await fetch("data/projects.json");
        if (!response.ok) throw new Error(`HTTP error ${response.status}`);
        const data = await response.json();
        projects.value = data.projects;
      } catch (err) {
        console.error("Ошибка загрузки проектов:", err);
      }
    };

    const sanitize = (str) => str.replace(/[<>&]/g, "");

    const submitForm = async () => {
      const name = sanitize(form.value.name.trim());
      const email = sanitize(form.value.email.trim());
      const message = sanitize(form.value.message.trim());

      if (!name || !email || !message) {
        alert("Пожалуйста, заполните все поля.");
        return;
      }

      try {
        const response = await fetch("https://formsubmit.co/ajax/ruslan@mirvelov.ru", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ name, email, message }),
        });

        if (response.ok) {
          alert("Спасибо! Ваше сообщение отправлено.");
          form.value.name = "";
          form.value.email = "";
          form.value.message = "";
        } else {
          document.getElementById("contact-form").submit();
        }
      } catch (error) {
        console.error("Ошибка отправки формы:", error);
        alert("Произошла ошибка при отправке. Попробуйте позже.");
        document.getElementById("contact-form").submit();
      }
    };

    const toggleGame = () => {
      isGameVisible.value = !isGameVisible.value;
    };

    onMounted(() => {
      loadProjects();
      if (typeof initBubbles === "function") {
        initBubbles();
      }
    });

    return {
      isMenuOpen,
      toggleMenu,
      scrollTo,
      projects,
      form,
      submitForm,
      isGameVisible,
      toggleGame,
    };
  },
}).mount("#app");
