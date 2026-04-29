const menuToggle = document.querySelector("[data-menu-toggle]");
const menu = document.querySelector("[data-menu]");

if (menuToggle && menu) {
  const setMenuState = (isOpen) => {
    document.body.classList.toggle("nav-open", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  };

  menuToggle.addEventListener("click", () => {
    setMenuState(!document.body.classList.contains("nav-open"));
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setMenuState(false));
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 1080) {
      setMenuState(false);
    }
  });
}

document.querySelectorAll("[data-track-prev]").forEach((button) => {
  button.addEventListener("click", () => {
    const trackId = button.getAttribute("data-track-prev");
    const track = trackId ? document.getElementById(trackId) : null;

    if (!track) {
      return;
    }

    track.scrollBy({ left: -track.clientWidth * 0.9, behavior: "smooth" });
  });
});

document.querySelectorAll("[data-track-next]").forEach((button) => {
  button.addEventListener("click", () => {
    const trackId = button.getAttribute("data-track-next");
    const track = trackId ? document.getElementById(trackId) : null;

    if (!track) {
      return;
    }

    track.scrollBy({ left: track.clientWidth * 0.9, behavior: "smooth" });
  });
});

const searchForm = document.querySelector("[data-search-form]");

if (searchForm) {
  searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const searchSection = document.getElementById("urunler");

    if (searchSection) {
      searchSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
}
