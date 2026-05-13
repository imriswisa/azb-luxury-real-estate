const body = document.body;
const header = document.querySelector(".site-header");
const animatedItems = document.querySelectorAll("[data-animate]");
const contactForm = document.querySelector(".contact-form");
const formStatus = document.querySelector(".form-status");

const finishIntro = () => {
  body.classList.add("intro-done");
};

window.addEventListener("load", () => {
  window.setTimeout(finishIntro, 2600);
});

document.querySelector(".intro")?.addEventListener("click", finishIntro);

const syncHeader = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 20);
};

syncHeader();
window.addEventListener("scroll", syncHeader, { passive: true });

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16, rootMargin: "0px 0px -8% 0px" }
);

animatedItems.forEach((item, index) => {
  item.style.transitionDelay = `${Math.min(index * 70, 360)}ms`;
  revealObserver.observe(item);
});

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const target = document.querySelector(link.getAttribute("href"));
    if (!target) return;

    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

contactForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(contactForm);
  const name = String(formData.get("name") || "").trim();
  formStatus.textContent = name
    ? `${name}, קיבלנו את הפרטים. נחזור אליך לשיחה מסודרת.`
    : "קיבלנו את הפרטים. נחזור אליך לשיחה מסודרת.";
  contactForm.reset();
});
