document.addEventListener("DOMContentLoaded", () => {
  const animatedElements = document.querySelectorAll(".section, .hero-content");

  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1
  };

  const elementObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  animatedElements.forEach(element => {
    element.classList.add("reveal");
    elementObserver.observe(element);
  });
});
