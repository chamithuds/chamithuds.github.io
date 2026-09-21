
// ===============================
// TYPING ANIMATION
// ===============================

const typingElement = document.getElementById("typing");

const words = [
  "building business systems.",
  "learning web development.",
  "working with databases.",
  "developing an ERP system."
];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {
  const currentWord = words[wordIndex];

  if (!deleting) {
    typingElement.textContent = currentWord.substring(0, charIndex + 1);
    charIndex++;

    if (charIndex === currentWord.length) {
      deleting = true;
      setTimeout(typeEffect, 1500);
      return;
    }
  } else {
    typingElement.textContent = currentWord.substring(0, charIndex - 1);
    charIndex--;

    if (charIndex === 0) {
      deleting = false;
      wordIndex = (wordIndex + 1) % words.length;
    }
  }

  setTimeout(typeEffect, deleting ? 35 : 65);
}

if (typingElement) {
  typeEffect();
}


// ===============================
// SAFE SCROLL REVEAL + SKILL STAGGER
// ===============================

const revealElements = document.querySelectorAll(".reveal:not(.skill-card)");
const skillCards = document.querySelectorAll(".skill-card.reveal");
const skillsGrid = document.querySelector(".skills-grid");

if ("IntersectionObserver" in window) {
  // Normal sections reveal independently.
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
  );

  revealElements.forEach((element) => revealObserver.observe(element));

  // Skills reveal as one sequence: 1 -> 2 -> 3 -> 4.
  if (skillsGrid && skillCards.length) {
    const skillsObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          skillCards.forEach((card, index) => {
            window.setTimeout(() => {
              card.classList.add("active");
            }, index * 400);
          });

          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.18, rootMargin: "0px 0px -70px 0px" }
    );

    skillsObserver.observe(skillsGrid);
  }
} else {
  document.querySelectorAll(".reveal").forEach((element) => {
    element.classList.add("active");
  });
}


// ===============================
// NAVBAR SCROLL EFFECT
// ===============================

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  if (window.scrollY > 40) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});


// ===============================
// MOBILE MENU
// ===============================

const menuButton = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");

menuButton.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
  });
});


// ===============================
// MOUSE GLOW
// ===============================

const cursorGlow = document.querySelector(".cursor-glow");

if (cursorGlow && window.matchMedia("(pointer: fine)").matches) {
  window.addEventListener("mousemove", (event) => {
    cursorGlow.style.left = event.clientX + "px";
    cursorGlow.style.top = event.clientY + "px";
  });
}


// ===============================
// HERO IMAGE 3D EFFECT
// ===============================

const heroImage = document.querySelector(".image-frame");

if (heroImage && window.matchMedia("(pointer: fine)").matches) {

  heroImage.addEventListener("mousemove", (event) => {

    const rect = heroImage.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const mouseX = (x / rect.width) * 100;
const mouseY = (y / rect.height) * 100;

projectCard.style.setProperty("--mouse-x", `${mouseX}%`);
projectCard.style.setProperty("--mouse-y", `${mouseY}%`);

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;

    heroImage.style.transform =
      `perspective(900px)
       rotateX(${rotateX}deg)
       rotateY(${rotateY}deg)
       scale(1.02)`;
  });

  heroImage.addEventListener("mouseleave", () => {
    heroImage.style.transform =
      "perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)";
  });
}


// ===============================
// SKILL CARD MOUSE EFFECT
// ===============================

document.querySelectorAll(".skill-card").forEach((card) => {

  card.addEventListener("mousemove", (event) => {

    const rect = card.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    card.style.background =
      `radial-gradient(
        circle at ${x}px ${y}px,
        rgba(56,189,248,.12),
        rgba(15,23,42,.62) 45%
      )`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.background = "";
  });

});

// ===============================
// ERP PROJECT 3D TILT
// ===============================

const projectCard = document.querySelector(".featured-project");

if (projectCard && window.matchMedia("(pointer: fine)").matches) {

  projectCard.addEventListener("mousemove", (event) => {
    const rect = projectCard.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateY = ((x - centerX) / centerX) * 2.5;
    const rotateX = ((y - centerY) / centerY) * -2.5;

    projectCard.style.transform =
      `perspective(1200px)
       rotateX(${rotateX}deg)
       rotateY(${rotateY}deg)
       scale(1.01)`;
  });

  projectCard.addEventListener("mouseleave", () => {
    projectCard.style.transform =
      "perspective(1200px) rotateX(0deg) rotateY(0deg) scale(1)";
  });
}


// ===============================
// ACTIVE NAVIGATION
// ===============================

const sections = document.querySelectorAll("section[id]");
const navigationLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {

  let currentSection = "";

  sections.forEach((section) => {

    const sectionTop = section.offsetTop;

    if (window.scrollY >= sectionTop - 180) {
      currentSection = section.getAttribute("id");
    }

  });

  navigationLinks.forEach((link) => {

    link.classList.remove("active");

    if (link.getAttribute("href") === "#" + currentSection) {
      link.classList.add("active");
    }

  });

});
