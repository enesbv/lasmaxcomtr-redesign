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

// ==========================================================================
// INTERACTIVE TIMELINE (about.html)
// ==========================================================================
const milestones = document.querySelectorAll('.journey-milestone');
const backdrop = document.querySelector('.journey-timeline__backdrop');

if (milestones.length > 0 && backdrop) {
  let activeIndex = 0;
  let autoplayTimer;

  // Add a transition to the backdrop for smooth fading
  backdrop.style.transition = 'background-image 0.5s ease-in-out';

  const setMilestone = (index) => {
    // Determine the image to show.
    const milestone = milestones[index];
    const imgElement = milestone.querySelector('.journey-milestone__media img');
    let bgUrl = '';
    
    if (imgElement && imgElement.getAttribute('src')) {
      bgUrl = imgElement.getAttribute('src');
    } else {
      // Fallback if no image (like the Yarın card)
      bgUrl = 'assets/hero-about.jpg';
    }

    // Change backdrop
    backdrop.style.backgroundImage = `url('${bgUrl}')`;
    
    // Optional: Add an active class to highlight the current milestone card
    milestones.forEach((m, i) => {
      if (i === index) {
        m.style.transform = 'scale(1.05)';
        m.style.transition = 'transform 0.3s ease';
      } else {
        m.style.transform = 'scale(1)';
      }
    });
    
    activeIndex = index;
  };

  const startAutoplay = () => {
    clearInterval(autoplayTimer);
    autoplayTimer = setInterval(() => {
      let nextIndex = (activeIndex + 1) % milestones.length;
      setMilestone(nextIndex);
    }, 5000);
  };

  // Add hover listeners
  milestones.forEach((milestone, index) => {
    milestone.addEventListener('mouseenter', () => {
      setMilestone(index);
      startAutoplay(); // Reset timer on hover
    });
  });

  // Init
  setMilestone(0);
  startAutoplay();
}
