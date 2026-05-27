document.addEventListener("DOMContentLoaded", () => {
  const animatedElements = document.querySelectorAll(".section, .card, .hero-content");

  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1
  };

  const elementObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-up");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  animatedElements.forEach(element => {
    elementObserver.observe(element);
  });
});