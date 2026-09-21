
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
// SAFE SCROLL REVEAL
// ===============================

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.08,
      rootMargin: "0px 0px -40px 0px"
    }
  );

revealElements.forEach((element) => {

  // Stagger skill cards one after another
  if (element.classList.contains("skill-card")) {
    const skillCards = [...document.querySelectorAll(".skill-card")];
    const index = skillCards.indexOf(element);

    element.style.transitionDelay = `${index * 180}ms`;
  }

  revealObserver.observe(element);
});

} else {

  // Fallback for unsupported browsers
  revealElements.forEach((element) => {
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
