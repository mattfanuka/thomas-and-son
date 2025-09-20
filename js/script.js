const track = document.querySelector(".carousel-track");
const cards = document.querySelectorAll(".card");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");

let isDragging = false;
let startX = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let animationID = 0;
let currentIndex = 0;

// --- Utilities ---
function getCardFullWidth() {
  const cardWidth = cards[0].offsetWidth;
  const gap = parseFloat(getComputedStyle(track).gap) || 0;
  return cardWidth + gap;
}

function setTrackPosition(translateX) {
  track.style.transform = `translateX(${translateX}px)`;
}

function getMaxIndex() {
  const step = getCardFullWidth();
  return Math.ceil((track.scrollWidth - track.parentElement.clientWidth) / step);
}

function moveToIndex(index) {
  const cardFullWidth = getCardFullWidth();
  const maxScroll = track.scrollWidth - track.parentElement.clientWidth;
  currentTranslate = -Math.min(index * cardFullWidth, maxScroll);
  prevTranslate = currentTranslate;
  track.style.transition = "transform 0.3s ease";
  setTrackPosition(currentTranslate);
}

// --- Button Controls ---
nextBtn.addEventListener("click", () => {
  if (currentIndex < getMaxIndex()) {
    currentIndex++;
    moveToIndex(currentIndex);
  } else if (currentIndex === getMaxIndex()) {
    currentIndex = 0;
    moveToIndex(currentIndex);
  }
});

prevBtn.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;
    moveToIndex(currentIndex);
  } else if (currentIndex === 0) {
    currentIndex = getMaxIndex();
    moveToIndex(currentIndex);
  }
});

// --- Swipe / Drag ---
function touchStart(index) {
  return function(event) {
    isDragging = true;
    currentIndex = index;
    startX = event.type.includes("mouse") ? event.pageX : event.touches[0].clientX;
    animationID = requestAnimationFrame(animation);
    track.style.transition = "none";
  };
}

function touchMove(event) {
  if (!isDragging) return;
  const currentX = event.type.includes("mouse") ? event.pageX : event.touches[0].clientX;
  const diff = currentX - startX;
  currentTranslate = prevTranslate + diff;
}

function touchEnd() {
  if (!isDragging) return;
  cancelAnimationFrame(animationID);
  isDragging = false;

  const movedBy = currentTranslate - prevTranslate;
  const threshold = 100; // swipe threshold
  const maxIndex = getMaxIndex();

  if (movedBy < -threshold && currentIndex < maxIndex) currentIndex++;
  if (movedBy > threshold && currentIndex > 0) currentIndex--;

  moveToIndex(currentIndex);
}

function animation() {
  setTrackPosition(currentTranslate);
  if (isDragging) requestAnimationFrame(animation);
}

// --- Attach events to cards ---
cards.forEach((card, index) => {
  const start = touchStart(index);
  card.addEventListener("mousedown", start);
  card.addEventListener("touchstart", start, { passive: true });
});

window.addEventListener("mouseup", touchEnd);
window.addEventListener("touchend", touchEnd);
window.addEventListener("mousemove", touchMove);
window.addEventListener("touchmove", touchMove, { passive: true });

// Initialize
track.style.cursor = "grab";
moveToIndex(currentIndex);


//   --Scoll-animations--
document.addEventListener('DOMContentLoaded', scrollFade());


function scrollFade() {
  const objectsToAnimate = document.querySelectorAll('.fade-on-scroll');

  const observer = new IntersectionObserver(objects => {
    objects.forEach(object => {
      if(object.isIntersecting) {
        object.target.classList.add('floatUp');
      }
    });
  }, {
    threshold: 0.4
  });

  objectsToAnimate.forEach(object => {
    observer.observe(object);
  })
}


//Rotators
const rotators = document.querySelectorAll('.rotator');

if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  addAnimation();
}

function addAnimation() {
  rotators.forEach(rotator => {
    const rotatorWheel = rotator.querySelector('.rotator-wheel');
    rotator.setAttribute("data-animated", true);

    const children = Array.from(rotatorWheel.children);
    
    children.forEach(child => {
      const dupe = child.cloneNode(true);
      dupe.setAttribute("aria-hidden", true);
      
      rotatorWheel.appendChild(dupe);
    });
  });
}

//Copyright year auto-update
function renderCopyrightDate() {
  const year = document.querySelector('.copyright-year');
  date = new Date();
  year.innerText = date.getFullYear();
}

document.addEventListener('DOMContentLoaded', renderCopyrightDate());


//Header buttons
function toggleMobileMenu() {
  const mobileNav = document.getElementById('mobileNav');
  const hamburger = document.querySelector('.hamburger');
  
  mobileNav.classList.toggle('active');
  hamburger.classList.toggle('active');
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.mobile-nav .link, .mobile-nav .contact').forEach(link => {
    link.addEventListener('click', () => {
        const mobileNav = document.getElementById('mobileNav');
        const hamburger = document.querySelector('.hamburger');
        
        mobileNav.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    const mobileNav = document.getElementById('mobileNav');
    const hamburger = document.querySelector('.hamburger');
    
    if (!e.target.closest('.hamburger') && !e.target.closest('.mobile-nav')) {
        mobileNav.classList.remove('active');
        hamburger.classList.remove('active');
    }
});