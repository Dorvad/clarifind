const menuToggle = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector(".mobile-menu");
const burgerToggle = document.querySelector(".burger");
const projectMobileMenu = document.querySelector(".mobileMenu");
const menuLinks = document.querySelectorAll(".mobile-menu a, .mobileMenu a");
const year = document.getElementById("year");
const menuInstances = [];
const focusableSelector =
  "a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex='-1'])";

if (year) {
  year.textContent = new Date().getFullYear();
}

const createMenuController = ({ toggle, menu, openLabel, closeLabel }) => {
  if (!toggle || !menu) return null;
  let isOpen = false;
  let previousFocus = null;

  const updateLabel = () => {
    if (openLabel && closeLabel) {
      toggle.setAttribute("aria-label", isOpen ? closeLabel : openLabel);
      const srLabel = toggle.querySelector(".sr-only");
      if (srLabel) {
        srLabel.textContent = isOpen ? closeLabel : openLabel;
      }
    }
  };

  const setState = (nextState) => {
    isOpen = nextState;
    toggle.setAttribute("aria-expanded", String(isOpen));
    menu.hidden = !isOpen;
    updateLabel();

    if (isOpen) {
      previousFocus = document.activeElement;
      const focusable = menu.querySelectorAll(focusableSelector);
      if (focusable.length) {
        focusable[0].focus();
      }
      document.addEventListener("keydown", handleKeydown);
    } else {
      document.removeEventListener("keydown", handleKeydown);
      if (previousFocus && typeof previousFocus.focus === "function") {
        previousFocus.focus();
      } else {
        toggle.focus();
      }
    }
  };

  const handleKeydown = (event) => {
    if (!isOpen) return;

    if (event.key === "Escape") {
      event.preventDefault();
      setState(false);
      return;
    }

    if (event.key !== "Tab") return;

    const focusable = Array.from(menu.querySelectorAll(focusableSelector));
    if (!focusable.length) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  toggle.addEventListener("click", () => {
    setState(!isOpen);
  });

  return { close: () => setState(false) };
};

const primaryMenu = createMenuController({
  toggle: menuToggle,
  menu: mobileMenu,
  openLabel: "Open menu",
  closeLabel: "Close menu",
});

if (primaryMenu) {
  menuInstances.push(primaryMenu);
}

const projectMenu = createMenuController({
  toggle: burgerToggle,
  menu: projectMobileMenu,
  openLabel: "Open menu",
  closeLabel: "Close menu",
});

if (projectMenu) {
  menuInstances.push(projectMenu);
}

menuLinks.forEach((link) => {
  link.addEventListener("click", () => {
    menuInstances.forEach((instance) => instance.close());
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
  const fields = Array.from(contactForm.querySelectorAll("input, textarea"));

  const getErrorMessage = (field) => {
    if (field.validity.valueMissing) {
      return `Please enter your ${field.getAttribute("data-label") || "information"}.`;
    }
    if (field.validity.typeMismatch && field.type === "email") {
      return "Please enter a valid email address.";
    }
    return "Please check this field for errors.";
  };

  const showFieldError = (field) => {
    const errorId = field.getAttribute("aria-describedby");
    if (!errorId) return;
    const errorElement = contactForm.querySelector(`#${errorId}`);
    if (!errorElement) return;
    if (field.checkValidity()) {
      errorElement.hidden = true;
      field.removeAttribute("aria-invalid");
      return;
    }
    errorElement.textContent = getErrorMessage(field);
    errorElement.hidden = false;
    field.setAttribute("aria-invalid", "true");
  };

  const validateForm = () => {
    let firstInvalid = null;
    fields.forEach((field) => {
      if (!field.checkValidity()) {
        showFieldError(field);
        if (!firstInvalid) firstInvalid = field;
      } else {
        showFieldError(field);
      }
    });
    if (firstInvalid) {
      firstInvalid.focus();
      return false;
    }
    return true;
  };

  fields.forEach((field) => {
    field.addEventListener("blur", () => showFieldError(field));
    field.addEventListener("input", () => {
      if (field.checkValidity()) {
        showFieldError(field);
      }
    });
  });

  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!validateForm()) return;

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
          statusMessage.textContent =
            "Thanks — I got it. I’ll reply within 2 business days with next steps.";
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
