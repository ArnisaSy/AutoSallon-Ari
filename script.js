const header = document.querySelector("[data-header]");
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelectorAll(".nav-links a");
const filters = document.querySelectorAll("[data-filter]");
const cards = document.querySelectorAll(".car-card");
const galleryButtons = document.querySelectorAll("[data-gallery]");
const lightbox = document.querySelector("[data-lightbox]");
const lightboxImage = document.querySelector("[data-lightbox-image]");
const closeLightbox = document.querySelector("[data-close]");

const setHeaderState = () => {
  header.classList.toggle("scrolled", window.scrollY > 18);
};

setHeaderState();
window.addEventListener("scroll", setHeaderState, { passive: true });

menuToggle.addEventListener("click", () => {
  const isOpen = header.classList.toggle("menu-active");
  document.body.classList.toggle("menu-open", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    header.classList.remove("menu-active");
    document.body.classList.remove("menu-open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

filters.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    filters.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");

    cards.forEach((card) => {
      const shouldShow = filter === "all" || card.dataset.category === filter;
      card.classList.toggle("is-hidden", !shouldShow);
    });
  });
});

galleryButtons.forEach((button) => {
  button.addEventListener("click", () => {
    lightboxImage.src = button.dataset.gallery;
    lightboxImage.alt = button.querySelector("img")?.alt || "Pamje e Auto Sallon ARI";
    lightbox.showModal();
  });
});

closeLightbox.addEventListener("click", () => lightbox.close());

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    lightbox.close();
  }
});
