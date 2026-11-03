
document.addEventListener("DOMContentLoaded", () => {
  // ========================================
  // 1. ACTIVE NAVIGATION
  // ========================================

  const currentPage =
    window.location.pathname.split("/").pop() || "index.html";

  document.querySelectorAll(".sidebar nav a").forEach((link) => {
    const linkPage = link.getAttribute("href").split("/").pop();

    link.classList.toggle("active", linkPage === currentPage);
  });


  // ========================================
  // 2. SMOOTH SECTION SCROLLING
  // ========================================

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const target = document.querySelector(link.getAttribute("href"));

      if (target) {
        event.preventDefault();
        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    });
  });


  // ========================================
  // 3. ORIGAMI GALLERY
  // ========================================

  const galleryImages = Array.from(
    document.querySelectorAll(".gallery-item img")
  );

  if (galleryImages.length > 0) {
    let currentImageIndex = 0;

    const lightbox = document.createElement("div");
    lightbox.className = "lightbox";
    lightbox.setAttribute("role", "dialog");
    lightbox.setAttribute("aria-modal", "true");
    lightbox.setAttribute("aria-label", "Origami image viewer");
    lightbox.innerHTML = `
      <button class="lightbox-close" aria-label="Close image viewer">&times;</button>
      <button class="lightbox-prev" aria-label="Previous image">&#10094;</button>
      <figure>
        <img class="lightbox-image" src="" alt="">
        <figcaption class="lightbox-caption"></figcaption>
      </figure>
      <button class="lightbox-next" aria-label="Next image">&#10095;</button>
    `;

    document.body.appendChild(lightbox);

    const lightboxImage = lightbox.querySelector(".lightbox-image");
    const lightboxCaption = lightbox.querySelector(".lightbox-caption");
    const closeButton = lightbox.querySelector(".lightbox-close");
    const prevButton = lightbox.querySelector(".lightbox-prev");
    const nextButton = lightbox.querySelector(".lightbox-next");

    function showImage(index) {
      currentImageIndex =
        (index + galleryImages.length) % galleryImages.length;

      const image = galleryImages[currentImageIndex];

      lightboxImage.src = image.src;
      lightboxImage.alt = image.alt;

      const caption = image.closest(".gallery-item")
        ?.querySelector("h3");

      lightboxCaption.textContent = caption
        ? caption.textContent
        : image.alt;
    }

    function openLightbox(index) {
      showImage(index);
      lightbox.classList.add("open");
      document.body.style.overflow = "hidden";
      closeButton.focus();
    }

    function closeLightbox() {
      lightbox.classList.remove("open");
      document.body.style.overflow = "";
    }

    galleryImages.forEach((image, index) => {
      image.addEventListener("click", () => openLightbox(index));
    });

    closeButton.addEventListener("click", closeLightbox);

    prevButton.addEventListener("click", () => {
      showImage(currentImageIndex - 1);
    });

    nextButton.addEventListener("click", () => {
      showImage(currentImageIndex + 1);
    });

    lightbox.addEventListener("click", (event) => {
      if (event.target === lightbox) {
        closeLightbox();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (!lightbox.classList.contains("open")) return;

      if (event.key === "Escape") closeLightbox();
      if (event.key === "ArrowLeft") showImage(currentImageIndex - 1);
      if (event.key === "ArrowRight") showImage(currentImageIndex + 1);
    });
  }
});
