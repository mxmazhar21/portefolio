// =========================================================
// SCRIPT.JS : un seul fichier JavaScript pour les 4 pages
// Chaque partie vérifie d'abord que l'élément existe sur la page
// =========================================================

// ===== 1. TRANSITIONS DE PAGE (style dans style.css, partie "TRANSITIONS") =====
const links = document.querySelectorAll(".nav-link");
const transitionLayer = document.getElementById("page-transition");

// "pageshow" se déclenche au chargement ET quand on revient avec le bouton Retour
// du navigateur (sinon la page restait floue)
window.addEventListener("pageshow", () => {
  document.body.classList.remove("blur-out");
  transitionLayer.classList.remove("active");
  document.body.classList.add("loaded");
});

// Clic sur un lien du menu : on floute la page, puis on change de page
links.forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault(); // bloque la navigation immédiate

    const href = this.href;

    transitionLayer.classList.add("active");
    document.body.classList.add("blur-out");

    // après la durée de l'animation, on redirige
    setTimeout(() => {
      window.location.href = href;
    }, 500); // durée en ms (doit correspondre à la transition CSS)
  });
});

// ===== 2. TEXTE TAPÉ LETTRE PAR LETTRE (page Accueil, index.html) =====
const typedText = document.getElementById("typed-text");

if (typedText) {
  // Le texte est écrit dans le HTML (utile pour Google et sans JavaScript) :
  // on le garde, on vide le titre, puis on le retape lettre par lettre
  const text = typedText.textContent;
  const speed = 80; // ms entre chaque lettre
  let index = 0;

  typedText.textContent = "";

  function typeWriter() {
    if (index < text.length) {
      typedText.textContent += text.charAt(index);
      index++;
      setTimeout(typeWriter, speed);
    }
  }

  window.addEventListener("load", typeWriter);
}

// ===== 3. FONDU AU NOIR À LA FIN DE LA VIDÉO (pages À propos et Contact) =====
// La vidéo a un attribut data-fade-time="2" : le fondu commence 2 s avant la fin
const fadeVideo = document.querySelector("video[data-fade-time]");

if (fadeVideo) {
  const overlay = document.querySelector(".video-fade-overlay");
  const fadeTime = Number(fadeVideo.dataset.fadeTime);

  fadeVideo.addEventListener("timeupdate", () => {
    const timeLeft = fadeVideo.duration - fadeVideo.currentTime;

    if (timeLeft <= fadeTime) {
      overlay.style.opacity = 1;
    } else {
      overlay.style.opacity = 0;
    }
  });
}
