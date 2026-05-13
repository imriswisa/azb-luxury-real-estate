const body = document.body;
const header = document.querySelector(".site-header");
const animatedItems = document.querySelectorAll("[data-animate]");
const contactForm = document.querySelector(".contact-form");
const formStatus = document.querySelector(".form-status");
const ownerPanel = document.querySelector(".owner-profile-panel");
const ownerPanelTitle = ownerPanel?.querySelector("h3");
const ownerPanelText = ownerPanel?.querySelector(".owner-profile__text");
const ownerCloseButton = ownerPanel?.querySelector(".owner-profile__close");
const ownerButtons = document.querySelectorAll(".owner-more");

const ownerProfiles = {
  adi: {
    name: "עדי צים",
    paragraphs: [
      "עדי צים הינו אחד מאנשי העסקים הבולטים והמובילים בישראל. בשנת 2012 ביצע אקזיט עם מכירת רשת הקמעונאות ״מחסני כמעט חינם״ בשווי 350 מיליון ש״ח.",
      "קבוצת עדי צים מובילה במגוון תחומים: נדל״ן, מימון, פיננסים, קמעונאות והשקעות. בין החברות המרכזיות בקבוצה ניתן למצוא את אס.אר אקורד, צים נדל״ן מניב, אול אין ישראל, מימון נדל״ן-ארנו קפיטל, סנס שוקי הון, סלטי שמיר והאחים יעקובי."
    ]
  },
  danny: {
    name: "דני סויסה",
    paragraphs: [
      "דני סויסה בעל רקע אקדמי הכולל תארים במערכות מידע (B.A), טכנולוגיה וניהול (M.Sc) ומשפטים (LL.B). שימש כמנכ״ל וכבעלים של חברות מובילות במשק, וכיהן במשך כעשור כדירקטור בחברות ציבוריות.",
      "במגזר הציבורי מילא תפקידים בכירים, ביניהם סגן מהנדס העיר ומנכ״ל עיריית פתח תקווה. עם ניסיון של למעלה מ-30 שנה, רכש מומחיות מעמיקה בניהול בתחומי הנדל״ן, התכנון והבנייה, הפיננסים, הטכנולוגיה והחברה."
    ]
  },
  elad: {
    name: "אלעד חג׳ג׳",
    paragraphs: [
      "אלעד חג׳ג׳ בעל תואר ראשון (LL.B) במשפטים, עם ניסיון של כ-20 שנה בעולם הנדל״ן והתחדשות עירונית. כיהן במשך תשע שנים כמנכ״ל תחום ההתחדשות העירונית בקבוצת חג׳ג׳, אחת מהחברות המובילות בענף הנדל״ן.",
      "הוביל עשרות פרויקטים מורכבים ורחבי היקף תוך ניהול משא ומתן עם בעלי דירות, רשויות וגופים רגולטוריים. צבר מומחיות בניהול תהליכים אורבניים מורכבים, ליווי תכנוני ומשפטי ותיאום מול גורמים עסקיים וציבוריים."
    ]
  }
};

const finishIntro = () => {
  body.classList.add("intro-done");
};

window.addEventListener("load", () => {
  window.setTimeout(finishIntro, document.querySelector(".intro") ? 2600 : 0);
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

const closeOwnerPanel = () => {
  if (!ownerPanel) return;
  ownerPanel.hidden = true;
  ownerButtons.forEach((button) => {
    button.classList.remove("is-active");
    button.setAttribute("aria-expanded", "false");
  });
};

ownerButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const profile = ownerProfiles[button.dataset.owner];
    if (!profile || !ownerPanel || !ownerPanelTitle || !ownerPanelText) return;

    ownerPanel.hidden = false;
    ownerPanelTitle.textContent = profile.name;
    ownerPanelText.innerHTML = profile.paragraphs.map((paragraph) => `<p>${paragraph}</p>`).join("");

    ownerButtons.forEach((item) => {
      const isActive = item === button;
      item.classList.toggle("is-active", isActive);
      item.setAttribute("aria-expanded", String(isActive));
    });

    ownerPanel.scrollIntoView({ behavior: "smooth", block: "center" });
  });
});

ownerCloseButton?.addEventListener("click", closeOwnerPanel);

contactForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(contactForm);
  const name = String(formData.get("name") || "").trim();
  formStatus.textContent = name
    ? `${name}, קיבלנו את הפרטים. נחזור אליך לשיחה מסודרת.`
    : "קיבלנו את הפרטים. נחזור אליך לשיחה מסודרת.";
  contactForm.reset();
});
