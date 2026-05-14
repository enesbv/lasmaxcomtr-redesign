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
const timelineData = [
  {
    year: "1979",
    subtitle: "Kuruluş",
    desc: "KONLAS, 1979 yılında 20 m²'lik bir alanda faaliyetlerine başlamış; sürdürülebilir büyüme anlayışıyla güçlü temeller atmıştır.",
    img: "assets/hero-about.jpg"
  },
  {
    year: "1989",
    subtitle: "Fulda Distribütörlüğü",
    desc: "1989 yılında Fulda markasının distribütörlüğünü üstlenerek pazar payını ve ürün çeşitliliğini artırmıştır.",
    img: "assets/timeline-fulda.svg"
  },
  {
    year: "1997",
    subtitle: "Lassa Distribütörlüğü",
    desc: "Uluslararası pazarlara açılan KONLAS, kaliteli lastik markalarını Türkiye pazarına sunarak sektöründe güçlü ve güvenilir bir ithalatçı konumuna ulaşmıştır.",
    img: "assets/contact-photo.jpg"
  },
  {
    year: "1998",
    subtitle: "Triangle Distribütörlüğü",
    desc: "Triangle markasının Türkiye distribütörlüğünü alarak global işbirliklerine bir yenisini eklemiştir.",
    img: "assets/TriangleBlue.svg"
  },
  {
    year: "2006",
    subtitle: "Otani Distribütörlüğü",
    desc: "Otani markasının Türkiye distribütörlüğü alınarak ağır vasıta ve ticari segmentlerdeki güç pekiştirilmiştir.",
    img: "assets/timeline-otani.png"
  },
  {
    year: "2007",
    subtitle: "Giti & ZC Rubber",
    desc: "Giti ve ZC Rubber gibi global devlerin Türkiye distribütörlüğü alınarak pazar liderliği yolunda önemli adımlar atılmıştır.",
    img: "assets/timeline-giti.png"
  },
  {
    year: "2013",
    subtitle: "Lasmax Kuruluyor",
    desc: "KONLAS A.Ş.'nin bayilik sistemi olarak kurulan Lasmax, bugün Türkiye'nin dört bir yanındaki bayi ve hizmet ağıyla büyümesini sürdürmekte, premium segmentte sürdürülebilir bir değer zinciri kurmaktadır.",
    img: "assets/timeline-tire.png"
  },
  {
    year: "2015",
    subtitle: "Groundspeed",
    desc: "Groundspeed Türkiye distribütörlüğünü alarak marka yelpazesini daha da genişletmiştir.",
    img: "assets/timeline-groundspeed.png"
  }
];

const timelineBtns = document.querySelectorAll('.timeline-year-btn');
const displayImg = document.getElementById('timeline-display-img');
const displayTitle = document.getElementById('timeline-display-title');
const displayDesc = document.getElementById('timeline-display-desc');
const bgYear = document.getElementById('timeline-bg-year');
const bgImg = document.getElementById('timeline-bg-img'); // New blurred background image

if (timelineBtns.length > 0 && displayImg) {
  timelineBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all
      timelineBtns.forEach(b => b.classList.remove('active'));
      // Add active class to clicked
      btn.classList.add('active');
      
      // Center the clicked button in the scroll container
      btn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });

      // Get data
      const index = parseInt(btn.getAttribute('data-index'));
      const data = timelineData[index];

      // Fade out
      displayImg.style.opacity = 0;
      displayTitle.style.opacity = 0;
      displayDesc.style.opacity = 0;
      if (bgYear) bgYear.style.opacity = 0;
      if (bgImg) bgImg.style.opacity = 0;

      // Update content and fade in after a short delay
      setTimeout(() => {
        // Change image object-fit depending on if it's an SVG logo or a photo
        if(data.img.includes('.svg') || data.img.includes('giti') || data.img.includes('otani') || data.img.includes('groundspeed') || data.img.includes('tire')) {
            displayImg.classList.remove('object-cover');
            displayImg.classList.add('object-contain');
            displayImg.classList.add('bg-[#1a1a1a]'); // Add a dark background to logos so they pop
            displayImg.classList.add('p-8');
        } else {
            displayImg.classList.remove('object-contain');
            displayImg.classList.remove('bg-[#1a1a1a]');
            displayImg.classList.remove('p-8');
            displayImg.classList.add('object-cover');
        }

        displayImg.src = data.img;
        displayTitle.textContent = data.year;
        displayDesc.textContent = data.desc;
        if (bgYear) bgYear.textContent = data.year;
        
        // Also update the blurred background image
        if (bgImg) {
          bgImg.src = data.img;
        }

        displayImg.style.opacity = 1;
        displayTitle.style.opacity = 1;
        displayDesc.style.opacity = 1;
        if (bgYear) bgYear.style.opacity = 1;
        if (bgImg) bgImg.style.opacity = 0.2; // Keep opacity low as set in CSS
      }, 300);
    });
  });
}
