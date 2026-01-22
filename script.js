(function () {
  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  const burger = document.getElementById("burger");
  const mobileMenu = document.getElementById("mobileMenu");

  if (burger && mobileMenu) {
    burger.addEventListener("click", () => {
      const isOpen = burger.getAttribute("aria-expanded") === "true";
      burger.setAttribute("aria-expanded", String(!isOpen));
      mobileMenu.hidden = isOpen;
    });

    mobileMenu.addEventListener("click", (e) => {
      if (e.target && e.target.tagName === "A") {
        burger.setAttribute("aria-expanded", "false");
        mobileMenu.hidden = true;
      }
    });
  }

  // Demo form handler
  window.clarifindSubmit = function (event) {
    event.preventDefault();
    alert("Thanks! This is a demo form. To make it send, connect Formspree or Netlify Forms.");
    return false;
  };
})();
