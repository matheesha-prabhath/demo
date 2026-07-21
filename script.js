// Replace this number with the client's WhatsApp number using country code, without + or spaces.
const whatsappNumber = "94776217530";

window.addEventListener("load", () => {
  window.setTimeout(() => document.getElementById("loader").classList.add("hidden"), 850);
});

document.getElementById("year").textContent = new Date().getFullYear();

const menuButton = document.getElementById("menuButton");
const mainNav = document.getElementById("mainNav");
menuButton.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
});
mainNav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  mainNav.classList.remove("open");
  menuButton.setAttribute("aria-expanded", "false");
}));

const getWhatsAppUrl = message => `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

const whatsappModal = document.getElementById("whatsappModal");
const modalTitle = document.getElementById("whatsappModalTitle");
const modalConfirm = document.getElementById("modalConfirm");
const modalCancel = document.getElementById("modalCancel");
const modalText = document.getElementById("whatsappModalText");
let pendingWhatsAppUrl = "";
let lastFocusedElement = null;

function openWhatsAppModal(message, enquiryTitle) {
  pendingWhatsAppUrl = getWhatsAppUrl(message);
  lastFocusedElement = document.activeElement;

  if (enquiryTitle) {
    modalTitle.textContent = `Enquire about ${enquiryTitle}?`;
    modalText.textContent = `Would you like to contact the designer about ${enquiryTitle}? You will be redirected to WhatsApp with a ready-to-send message.`;
  } else {
    modalTitle.textContent = "Send a message on WhatsApp?";
    modalText.textContent = "You will be redirected to WhatsApp with a ready-to-send enquiry message.";
  }

  whatsappModal.classList.add("active");
  whatsappModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  window.setTimeout(() => modalConfirm.focus(), 50);
}

function closeWhatsAppModal() {
  whatsappModal.classList.remove("active");
  whatsappModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
  pendingWhatsAppUrl = "";

  if (lastFocusedElement instanceof HTMLElement) {
    lastFocusedElement.focus();
  }
}

modalConfirm.addEventListener("click", () => {
  if (pendingWhatsAppUrl) {
    window.open(pendingWhatsAppUrl, "_blank", "noopener,noreferrer");
  }
  closeWhatsAppModal();
});
modalCancel.addEventListener("click", closeWhatsAppModal);
whatsappModal.addEventListener("click", event => {
  if (event.target === whatsappModal) closeWhatsAppModal();
});
document.addEventListener("keydown", event => {
  if (event.key === "Escape" && whatsappModal.classList.contains("active")) closeWhatsAppModal();
});

document.querySelectorAll(".whatsapp-link, .product-enquiry").forEach(link => {
  link.addEventListener("click", event => {
    event.preventDefault();
    const message = link.dataset.message || "Hi, I would like to know more about your design services.";
    const enquiryTitle = link.dataset.title || "";
    openWhatsAppModal(message, enquiryTitle);
  });
});

const filterButtons = document.querySelectorAll(".filter");
const projectCards = document.querySelectorAll(".project-card");
filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    filterButtons.forEach(item => item.classList.remove("active"));
    button.classList.add("active");
    const category = button.dataset.filter;
    projectCards.forEach(card => {
      card.classList.toggle("is-hidden", category !== "all" && card.dataset.category !== category);
    });
  });
});

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach(element => revealObserver.observe(element));

const cursorGlow = document.getElementById("cursorGlow");
if (window.matchMedia("(pointer:fine)").matches) {
  document.addEventListener("pointermove", event => {
    cursorGlow.style.left = `${event.clientX}px`;
    cursorGlow.style.top = `${event.clientY}px`;
  });
} else {
  cursorGlow.style.display = "none";
}
