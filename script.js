(() => {
  const year = document.getElementById("year");
  const burger = document.getElementById("burger");
  const mobileMenu = document.getElementById("mobileMenu");
  const header = document.querySelector(".header");
  const themeToggle = document.getElementById("themeToggle");
  const themeToggleMobile = document.getElementById("themeToggleMobile");

  const themeToggles = [themeToggle, themeToggleMobile].filter(Boolean);

  const getPreferredTheme = () => {
    const stored = localStorage.getItem("theme");
    if (stored) return stored;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  };

  const setToggleLabel = (toggle, text) => {
    const label = toggle.querySelector(".toggle__label");
    if (label) {
      label.textContent = text;
    } else {
      toggle.textContent = text;
    }
  };

  const updateThemeToggleText = (theme) => {
    const text = theme === "dark" ? "Light mode" : "Dark mode";
    themeToggles.forEach((toggle) => {
      setToggleLabel(toggle, text);
      toggle.setAttribute("aria-pressed", String(theme === "dark"));
    });
  };

  const setTheme = (theme) => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
    updateThemeToggleText(theme);
  };

  if (year) year.textContent = String(new Date().getFullYear());

  if (burger && mobileMenu) {
    burger.addEventListener("click", () => {
      const isOpen = burger.getAttribute("aria-expanded") === "true";
      burger.setAttribute("aria-expanded", String(!isOpen));
      mobileMenu.hidden = isOpen;
      if (!isOpen) {
        header?.classList.remove("header--hidden");
      }
    });

    mobileMenu.addEventListener("click", (e) => {
      if (e.target && e.target.tagName === "A") {
        burger.setAttribute("aria-expanded", "false");
        mobileMenu.hidden = true;
      }
    });
  }

  themeToggles.forEach((toggle) => {
    toggle.addEventListener("click", () => {
      const current = document.documentElement.getAttribute("data-theme") || "light";
      setTheme(current === "dark" ? "light" : "dark");
    });
  });

  setTheme(getPreferredTheme());

  if (header) {
    const mobileMedia = window.matchMedia("(max-width: 980px)");
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateHeaderVisibility = () => {
      const currentScrollY = window.scrollY;
      const isScrollingDown = currentScrollY > lastScrollY;
      const shouldHide = mobileMedia.matches && isScrollingDown && currentScrollY > 80;

      if (!burger || burger.getAttribute("aria-expanded") !== "true") {
        header.classList.toggle("header--hidden", shouldHide);
      }

      lastScrollY = currentScrollY;
      ticking = false;
    };

    window.addEventListener("scroll", () => {
      if (!ticking) {
        window.requestAnimationFrame(updateHeaderVisibility);
        ticking = true;
      }
    });

    mobileMedia.addEventListener("change", () => {
      header.classList.remove("header--hidden");
      lastScrollY = window.scrollY;
    });
  }

  const servicesRoot = document.querySelector("[data-services]");
  if (servicesRoot) {
    const tabs = servicesRoot.querySelectorAll(".services__tab");
    const panels = servicesRoot.querySelectorAll(".services__panel");

    const activateService = (targetId) => {
      tabs.forEach((tab) => {
        const isActive = tab.dataset.service === targetId;
        tab.classList.toggle("is-active", isActive);
        tab.setAttribute("aria-selected", String(isActive));
      });
      panels.forEach((panel) => {
        panel.classList.toggle("is-active", panel.id === targetId);
      });
    };

    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        activateService(tab.dataset.service);
      });
    });
  }

  const revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealItems.length) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }

  window.clarifindSubmit = (event) => {
    event.preventDefault();
    alert("Thanks! This is a demo form. To make it send, connect Formspree or Netlify Forms.");
    return false;
  };
})();
