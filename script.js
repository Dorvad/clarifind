const focusableSelector =
  "a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex='-1'])";
const languageStorageKey = "clarifind_lang";
const languagePaths = {
  en: "/i18n/en.json",
  he: "/i18n/he.json",
};

const createMenuController = ({ toggle, menu, openLabel, closeLabel }) => {
  if (!toggle || !menu) return null;
  let isOpen = false;
  let previousFocus = null;
  let closeHandler = null;
  let openHandler = null;
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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
    if (isOpen === nextState) return;
    isOpen = nextState;
    toggle.setAttribute("aria-expanded", String(isOpen));
    updateLabel();

    if (isOpen) {
      if (closeHandler) {
        menu.removeEventListener("transitionend", closeHandler);
        closeHandler = null;
      }
      menu.hidden = false;
      menu.classList.add("is-open");
      const targetHeight = menu.scrollHeight;
      menu.style.maxHeight = `${targetHeight}px`;
      if (!prefersReducedMotion) {
        openHandler = (event) => {
          if (event.propertyName !== "max-height") return;
          menu.style.maxHeight = "none";
          menu.removeEventListener("transitionend", openHandler);
          openHandler = null;
        };
        menu.addEventListener("transitionend", openHandler);
      } else {
        menu.style.maxHeight = "none";
      }
      previousFocus = document.activeElement;
      const focusable = menu.querySelectorAll(focusableSelector);
      if (focusable.length) {
        focusable[0].focus();
      }
      document.addEventListener("keydown", handleKeydown);
    } else {
      if (openHandler) {
        menu.removeEventListener("transitionend", openHandler);
        openHandler = null;
      }
      if (prefersReducedMotion) {
        menu.classList.remove("is-open");
        menu.hidden = true;
        menu.style.maxHeight = "";
      } else {
        const currentHeight = menu.scrollHeight;
        menu.style.maxHeight = `${currentHeight}px`;
        requestAnimationFrame(() => {
          menu.classList.remove("is-open");
          menu.style.maxHeight = "0px";
        });
        closeHandler = (event) => {
          if (event.propertyName !== "max-height") return;
          menu.hidden = true;
          menu.style.maxHeight = "";
          menu.removeEventListener("transitionend", closeHandler);
          closeHandler = null;
        };
        menu.addEventListener("transitionend", closeHandler);
      }
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

const getPathLanguage = () => (window.location.pathname.startsWith("/he/") ? "he" : "en");

const getTargetPath = (language) => (language === "he" ? "/he/" : "/");

const getStoredLanguage = () => localStorage.getItem(languageStorageKey);

const formatMessage = (template, values) =>
  template.replace(/\{(\w+)\}/g, (_, key) => values[key] ?? "");

const loadTranslations = async (language) => {
  const response = await fetch(languagePaths[language] || languagePaths.en);
  if (!response.ok) {
    throw new Error("Unable to load translations.");
  }
  return response.json();
};

const resolveKey = (translations, key) => {
  return key.split(".").reduce((acc, part) => (acc && acc[part] !== undefined ? acc[part] : null), translations);
};

const applyTranslations = (translations) => {
  const elements = document.querySelectorAll("[data-i18n]");
  elements.forEach((element) => {
    const key = element.getAttribute("data-i18n");
    const value = resolveKey(translations, key);
    if (value !== null && value !== undefined) {
      element.textContent = value;
    }
  });

  const attrElements = document.querySelectorAll("[data-i18n-attr]");
  attrElements.forEach((element) => {
    const mapping = element.getAttribute("data-i18n-attr");
    if (!mapping) return;
    const pairs = mapping.split(",").map((item) => item.trim()).filter(Boolean);
    pairs.forEach((pair) => {
      const [attr, key] = pair.split(":").map((part) => part.trim());
      if (!attr || !key) return;
      const value = resolveKey(translations, key);
      if (value !== null && value !== undefined) {
        element.setAttribute(attr, value);
      }
    });
  });
};

const setupLanguageToggle = (language) => {
  const toggles = document.querySelectorAll("[data-lang-toggle]");
  toggles.forEach((toggle) => {
    const buttons = toggle.querySelectorAll("button[data-lang]");
    buttons.forEach((button) => {
      const buttonLanguage = button.dataset.lang;
      button.setAttribute("aria-pressed", String(buttonLanguage === language));
      button.addEventListener("click", () => {
        if (buttonLanguage === language) return;
        localStorage.setItem(languageStorageKey, buttonLanguage);
        window.location.href = `${getTargetPath(buttonLanguage)}${window.location.search}${window.location.hash}`;
      });
    });
  });
};

const init = async () => {
  const pathLanguage = getPathLanguage();
  const storedLanguage = getStoredLanguage();
  if (storedLanguage && storedLanguage !== pathLanguage) {
    window.location.href = `${getTargetPath(storedLanguage)}${window.location.search}${window.location.hash}`;
    return;
  }

  const year = document.getElementById("year");
  if (year) {
    year.textContent = new Date().getFullYear();
  }

  let translations = null;
  try {
    translations = await loadTranslations(pathLanguage);
    applyTranslations(translations);
  } catch (error) {
    translations = null;
  }

  setupLanguageToggle(pathLanguage);

  const t = (key) => (translations ? resolveKey(translations, key) ?? key : key);

  const menuToggle = document.querySelector(".menu-toggle");
  const mobileMenu = document.querySelector(".mobile-menu");
  const burgerToggle = document.querySelector(".burger");
  const projectMobileMenu = document.querySelector(".mobileMenu");
  const menuLinks = document.querySelectorAll(".mobile-menu a, .mobileMenu a");
  const menuInstances = [];

  const primaryMenu = createMenuController({
    toggle: menuToggle,
    menu: mobileMenu,
    openLabel: t("nav.openMenu"),
    closeLabel: t("nav.closeMenu"),
  });

  if (primaryMenu) {
    menuInstances.push(primaryMenu);
  }

  const projectMenu = createMenuController({
    toggle: burgerToggle,
    menu: projectMobileMenu,
    openLabel: t("nav.openMenu"),
    closeLabel: t("nav.closeMenu"),
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

  const proofSection = document.querySelector(".proof-section");
  if (proofSection) {
    const metricsBand = proofSection.querySelector("[data-proof-metrics]");
    const countItems = proofSection.querySelectorAll("[data-count-target]");

    const animateCount = (element) => {
      if (element.dataset.counted === "true") return;

      const startValue = Number.parseFloat(element.dataset.countStart || "0");
      const targetValue = Number.parseFloat(element.dataset.countTarget || "0");
      const duration = Number.parseInt(element.dataset.countDuration || "600", 10);
      const prefix = element.dataset.countPrefix || "";
      const suffix = element.dataset.countSuffix || "";
      const decimals = Number.parseInt(element.dataset.countDecimals || "0", 10);

      if (Number.isNaN(targetValue)) return;

      const startTime = performance.now();
      const range = targetValue - startValue;

      const step = (now) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const value = startValue + range * progress;
        element.textContent = `${prefix}${value.toFixed(decimals)}${suffix}`;

        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          element.dataset.counted = "true";
        }
      };

      requestAnimationFrame(step);
    };

    if (prefersReducedMotion) {
      proofSection.classList.add("is-visible");
      if (metricsBand) {
        metricsBand.classList.add("is-visible");
      }
    } else {
      const proofObserver = new IntersectionObserver(
        (entries, observerInstance) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              proofSection.classList.add("is-visible");
              observerInstance.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.2 }
      );

      proofObserver.observe(proofSection);

      if (metricsBand) {
        const metricsObserver = new IntersectionObserver(
          (entries, observerInstance) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                metricsBand.classList.add("is-visible");
                countItems.forEach((item) => animateCount(item));
                observerInstance.unobserve(entry.target);
              }
            });
          },
          { threshold: 0.6 }
        );

        metricsObserver.observe(metricsBand);
      }
    }
  }

  if (contactForm) {
    const statusMessage = contactForm.querySelector(".form-status");
    const fields = Array.from(contactForm.querySelectorAll("input, textarea"));
    const submitButton = contactForm.querySelector("button[type='submit']");
    const defaultSubmitText = submitButton ? submitButton.textContent : "";

    const getErrorMessage = (field) => {
      if (field.validity.valueMissing) {
        return formatMessage(t("form.errors.required"), {
          field: field.getAttribute("data-label") || t("form.errors.genericField"),
        });
      }
      if (field.validity.typeMismatch && field.type === "email") {
        return t("form.errors.invalidEmail");
      }
      return t("form.errors.generic");
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
        statusMessage.classList.remove("is-success", "is-error");
        statusMessage.textContent = t("form.status.sending");
        statusMessage.hidden = false;
      }
      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = t("form.status.sending");
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
            statusMessage.textContent = t("form.status.success");
            statusMessage.classList.add("is-success");
          }
        } else if (statusMessage) {
          statusMessage.textContent = t("form.status.error");
          statusMessage.classList.add("is-error");
        }
      } catch (error) {
        if (statusMessage) {
          statusMessage.textContent = t("form.status.network");
          statusMessage.classList.add("is-error");
        }
      } finally {
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.textContent = defaultSubmitText;
        }
      }
    });
  }
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
