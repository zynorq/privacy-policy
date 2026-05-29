document.addEventListener("DOMContentLoaded", () => {
  const footerElement = document.querySelector(".footer");
  if (!footerElement) return;

  const currentYear = new Date().getFullYear();

  footerElement.innerHTML = `
    <div class="footer-content">
      <div>&copy; ${currentYear} BLOCK PUZZLE</div>
    </div>
  `;
});
