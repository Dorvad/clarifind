const menuToggle = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector(".mobile-menu");
const navLinks = document.querySelectorAll(".nav-links a[href^='#'], .mobile-menu a[href^='#']");
const year = document.getElementById("year");

if (year) {
  year.textContent = new Date().getFullYear();
}

const setMenuState = (isOpen) => {
  if (!menuToggle || !mobileMenu) return;
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  mobileMenu.hidden = !isOpen;
};

if (menuToggle) {
  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    setMenuState(!isOpen);
  });
}

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    setMenuState(false);
  });
});

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!prefersReducedMotion) {
  document.documentElement.style.scrollBehavior = "smooth";
}

const sections = document.querySelectorAll("main section[id]");
const desktopLinks = document.querySelectorAll(".nav-links a[href^='#']");
const revealElements = document.querySelectorAll(".reveal");
const contactForm = document.querySelector(".contact-form");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        desktopLinks.forEach((link) => {
          link.classList.toggle("is-active", link.getAttribute("href") === `#${entry.target.id}`);
        });
      }
    });
  },
  { rootMargin: "-40% 0px -50% 0px" }
);

sections.forEach((section) => observer.observe(section));

if (revealElements.length) {
  if (prefersReducedMotion) {
    revealElements.forEach((element) => element.classList.add("is-visible"));
  } else {
    const revealObserver = new IntersectionObserver(
      (entries, observerInstance) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observerInstance.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    revealElements.forEach((element) => revealObserver.observe(element));
  }
}

if (contactForm) {
  const statusMessage = contactForm.querySelector(".form-status");

  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!contactForm.checkValidity()) {
      contactForm.reportValidity();
      return;
    }

    if (statusMessage) {
      statusMessage.textContent = "Sending...";
      statusMessage.hidden = false;
    }

    try {
      const response = await fetch(contactForm.action, {
        method: "POST",
        body: new FormData(contactForm),
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        contactForm.reset();
        if (statusMessage) {
          statusMessage.textContent = "Thanks! Your message has been sent.";
        }
      } else if (statusMessage) {
        statusMessage.textContent = "Something went wrong. Please try again.";
      }
    } catch (error) {
      if (statusMessage) {
        statusMessage.textContent = "Unable to send right now. Please try again later.";
      }
    }
  });
}
