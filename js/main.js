
document.addEventListener("DOMContentLoaded", () => {
  // Highlight the current page in the sidebar.
  const currentPage =
    window.location.pathname.split("/").pop() || "index.html";

  document.querySelectorAll(".sidebar nav a").forEach((link) => {
    const linkPage = link.getAttribute("href").split("/").pop();

    link.classList.toggle("active", linkPage === currentPage);
  });

  // Enable smooth scrolling for links to sections on the same page.
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const target = document.querySelector(link.getAttribute("href"));

      if (target) {
        event.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
});
