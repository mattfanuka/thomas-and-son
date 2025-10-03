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


//Mobile menu
let isMobileMenuOpen = false;

function toggleMobileMenu() {
  const mobileNav = document.getElementById('mobileNav');
  const hamburger = document.querySelector('.hamburger');
  
  mobileNav.classList.toggle('active');
  hamburger.classList.toggle('active');

  if (isMobileMenuOpen && document.body.classList.contains('no-scroll')) {
    isMobileMenuOpen = false;
  } else if (!isMobileMenuOpen && !document.body.classList.contains('no-scroll')) {
    isMobileMenuOpen = true;
  }

  handleScrolling();
}

function handleScrolling() {
  const body = document.body;

  if (isMobileMenuOpen) {
    body.classList.add('no-scroll');
  } else if (!isMobileMenuOpen) {
    body.classList.remove('no-scroll');
  }
}


// Close mobile menu when clicking on a link
document.querySelectorAll('.mobile-nav .link, .mobile-nav .contact').forEach(link => {
    link.addEventListener('click', () => {
        const mobileNav = document.getElementById('mobileNav');
        const hamburger = document.querySelector('.hamburger');
        
        mobileNav.classList.remove('active');
        hamburger.classList.remove('active');
        isMobileMenuOpen = false;
        handleScrolling();
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    const mobileNav = document.getElementById('mobileNav');
    const hamburger = document.querySelector('.hamburger');
    
    if (!e.target.closest('.hamburger') && !e.target.closest('.mobile-nav')) {
        mobileNav.classList.remove('active');
        hamburger.classList.remove('active');

        isMobileMenuOpen = false;
        handleScrolling();
    }
});