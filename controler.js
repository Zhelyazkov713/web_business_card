"use strict";

//elementite na formata za kontakti
const contactForm = document.querySelector(".contact-form");
const nameInput = contactForm.querySelector('[name="name"]');
const phoneInput = contactForm.querySelector('[name="phone"]');
const messageInput = contactForm.querySelector('[name="message"]');
const formMessage = contactForm.querySelector(".form-message");
const nameRegex = /^[\p{L}\s'-]+$/u;
const phoneRegex = /^\+?[0-9\s-]{8,}$/;

//elementite na modalniq prozorec

const projectCards = document.querySelectorAll("[data-project]");
const modal = document.querySelector("#projectModal");
const modalTitle = document.querySelector("#modalTitle");
const modalDescription = document.querySelector("#modalDescription");
const modalImage = document.querySelector("#modalImage");
const modalCounter = document.querySelector("#modalCounter");
const prevButton = document.querySelector("#prevImage");
const nextButton = document.querySelector("#nextImage");
const closeButtons = document.querySelectorAll("[data-close-modal]");

let activeProject = null;
let activeImageIndex = 0;

//obekt sydyrjasht vsichki snimki za stroitelnite deinosti

const projects = {
  repairWork: {
    title: "Интериорен ремонт",
    description:
      "Примерна серия снимки за вътрешен ремонт, освежаване на помещения и довършителни дейности.",
    images: [
      {
        src: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80",
        alt: "Завършен интериор след ремонт",
      },
      {
        src: "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80",
        alt: "Обновено помещение с модерно обзавеждане",
      },
      {
        src: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80",
        alt: "Светъл интериор след ремонт",
      },
    ],
  },
  installation: {
    title: "Монтаж",
    description:
      "Примери за монтажни дейности, работа с инструменти и техническо изпълнение на обект.",
    images: [
      {
        src: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1200&q=80",
        alt: "Работа с инструменти при монтаж",
      },
      {
        src: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80",
        alt: "Строителни и монтажни дейности",
      },
      {
        src: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1200&q=80",
        alt: "Работник на строителен обект",
      },
    ],
  },
  finishingWorks: {
    title: "Довършителни работи",
    description:
      "Снимки шпакловка, боядисване, детайли по завършване и подготовка на обекта за предаване.",
    images: [
      {
        src: "https://images.unsplash.com/photo-1592928302636-c83cf1e1f55f?auto=format&fit=crop&w=1200&q=80",
        alt: "Довършителни дейности в помещение",
      },
      {
        src: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80",
        alt: "Завършен интериорен детайл",
      },
      {
        src: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80",
        alt: "Работа на строителен обект",
      },
    ],
  },
  exteriorInsulation: {
    title: "Външни топлоизолации",
    description:
      "Примерни снимки за фасадни, външни и строителни дейности около сграда.",
    images: [
      {
        src: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80",
        alt: "Работа по външна строителна конструкция",
      },
      {
        src: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80",
        alt: "Строителен обект с външни дейности",
      },
      {
        src: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1200&q=80",
        alt: "Работници при строителни дейности",
      },
    ],
  },
  projectProgress: {
    title: "Обект в процес",
    description:
      "Снимки, които показват междинен етап от работа, организация на обекта и напредък по проекта.",
    images: [
      {
        src: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80",
        alt: "Строителен обект в процес",
      },
      {
        src: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80",
        alt: "Екип в процес на работа",
      },
      {
        src: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1200&q=80",
        alt: "Инструменти и работа на обект",
      },
    ],
  },
};

//upravlenie na modalniq prozorec

function openModal(projectId) {
  activeProject = projects[projectId];
  activeImageIndex = 0;

  if (!activeProject) {
    return;
  }

  updateModalContent();
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
}

function closeModal() {
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}

function updateModalContent() {
  const currentImage = activeProject.images[activeImageIndex];

  modalTitle.textContent = activeProject.title;
  modalDescription.textContent = activeProject.description;
  modalImage.src = currentImage.src;
  modalImage.alt = currentImage.alt;
  modalCounter.textContent = `Снимка ${activeImageIndex + 1} от ${activeProject.images.length}`;
}

function showNextImage() {
  activeImageIndex = (activeImageIndex + 1) % activeProject.images.length;
  updateModalContent();
}

function showPreviousImage() {
  activeImageIndex =
    (activeImageIndex - 1 + activeProject.images.length) %
    activeProject.images.length;
  updateModalContent();
}

projectCards.forEach((card) => {
  card.addEventListener("click", () => {
    openModal(card.dataset.project);
  });

  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openModal(card.dataset.project);
    }
  });
});

closeButtons.forEach((button) => {
  button.addEventListener("click", closeModal);
});

nextButton.addEventListener("click", showNextImage);
prevButton.addEventListener("click", showPreviousImage);

//eventlistener za izbranata deinost zarevdana w modalniq prozorec

document.addEventListener("keydown", (event) => {
  if (!modal.classList.contains("is-open")) {
    return;
  }

  if (event.key === "Escape") {
    closeModal();
  }

  if (event.key === "ArrowRight") {
    showNextImage();
  }

  if (event.key === "ArrowLeft") {
    showPreviousImage();
  }
});

window.projects = projects;

// proverka na dannite vyv formata za kontakt

function validateContactForm() {
  const errors = {};
  const nameValue = nameInput.value.trim();
  const phoneValue = phoneInput.value.trim();
  const messageValue = messageInput.value.trim();

  if (nameValue.length < 2 || !nameRegex.test(nameValue)) {
    errors.name = "Моля, въведете име с поне 2 букви.";
  }

  if (!phoneRegex.test(phoneValue)) {
    errors.phone = "Моля, въведете валиден телефонен номер.";
  }

  if (messageValue.length < 10) {
    errors.message = "Опишете услугата с поне 10 символа.";
  }

  return errors;
}

function clearFormFeedback() {
  contactForm
    .querySelectorAll(".form-error")
    .forEach((error) => error.remove());
  formMessage.textContent = "";
  formMessage.classList.remove("form-message--success");

  [nameInput, phoneInput, messageInput].forEach((field) => {
    field.classList.remove("input-error");
  });
}

function showFieldError(field, message) {
  field.classList.add("input-error");
  field.insertAdjacentHTML(
    "afterend",
    `<small class="form-error">${message}</small>`,
  );
}

function showErrors(errors) {
  clearFormFeedback();

  if (errors.name) {
    showFieldError(nameInput, errors.name);
  }

  if (errors.phone) {
    showFieldError(phoneInput, errors.phone);
  }

  if (errors.message) {
    showFieldError(messageInput, errors.message);
  }
}

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const errors = validateContactForm();

  if (Object.keys(errors).length > 0) {
    showErrors(errors);
    return;
  }

  const formData = {
    name: nameInput.value.trim(),
    phone: phoneInput.value.trim(),
    message: messageInput.value.trim(),
  };

  console.log("Данни от контактната форма:", formData);

  clearFormFeedback();
  formMessage.textContent =
    "Запитването е подготвено успешно. Следваща стъпка: реално изпращане към имейл или сървър.";
  formMessage.classList.add("form-message--success");
  contactForm.reset();
});
